import type { Ontology } from './ontology';

export interface QueryResponse {
  query: string;
  result: string;
  highlightEntities: string[];
  highlightRelationships: string[];
  interpretation?: string;
}

function stripLeadingArticle(text: string): string {
  return text.replace(/^(a|an|the)\s+/, '').trim();
}

function singularize(text: string): string {
  return text.endsWith('s') ? text.slice(0, -1) : text;
}

// Generate dynamic query suggestions based on the current ontology
export function generateQuerySuggestions(ontology: Ontology): string[] {
  const suggestions: string[] = [];
  const entities = ontology.entityTypes;
  const relationships = ontology.relationships;

  // Entity-based queries
  if (entities.length > 0) {
    const firstEntity = entities[0];
    suggestions.push(`显示所有${firstEntity.name}`);
    
    if (entities.length > 1) {
      const secondEntity = entities[1];
      suggestions.push(`列出所有${secondEntity.name}`);
    }
  }

  // Property-based queries
  entities.forEach(entity => {
    entity.properties.forEach(prop => {
      if (prop.type === 'string' && !prop.isIdentifier && prop.name !== 'name') {
        suggestions.push(`按 ${prop.name} 查看${entity.name}`);
      }
    });
  });

  // Relationship-based queries
  if (relationships.length > 0) {
    const rel = relationships[0];
    const fromEntity = entities.find(e => e.id === rel.from);
    const toEntity = entities.find(e => e.id === rel.to);
    if (fromEntity && toEntity) {
      suggestions.push(`${fromEntity.name} 如何连接到 ${toEntity.name}？`);
    }
  }

  // Conceptual queries always available
  suggestions.push("什么是实体类型？");
  suggestions.push("什么是关系？");
  suggestions.push("本体如何工作？");

  // Return unique suggestions (max 6)
  return [...new Set(suggestions)].slice(0, 6);
}

// Process a natural language query against the ontology
export function processQuery(query: string, ontology: Ontology): QueryResponse {
  const normalizedQuery = query.toLowerCase().trim();
  const normalizedNoPunctuation = normalizedQuery.replace(/[?!.:,;]+/g, '').trim();
  const entities = ontology.entityTypes;
  const relationships = ontology.relationships;

  // Conceptual queries (work for any ontology)
  if (normalizedQuery.includes('what is') && (normalizedQuery.includes('entity') || normalizedQuery.includes('ontology'))) {
    return {
      query,
      result: "**实体类型**是现实世界概念（如客户、产品或订单）的可复用逻辑模型。在 Fabric IQ 本体中，实体类型会标准化：\n\n• **名称与说明** - 统一业务术语\n• **属性** - 带类型和单位的特征\n• **标识符** - 每个实例的唯一键\n\n实体类型让组织内不同团队使用一致的定义。",
      highlightEntities: entities.slice(0, 2).map(e => e.id),
      highlightRelationships: [],
      interpretation: "已识别：关于实体类型的概念问题"
    };
  }

  if (normalizedQuery.includes('what is') && normalizedQuery.includes('relationship')) {
    return {
      query,
      result: "**关系**是实体类型之间带类型、带方向的连接。关系会定义：\n\n• **名称** - 动作或连接语义\n• **方向** - 从一个实体指向另一个实体\n• **基数** - 一对一、一对多等\n• **属性** - 连接上的可选属性\n\n关系让你可以遍历本体并回答复杂问题。",
      highlightEntities: [],
      highlightRelationships: relationships.slice(0, 2).map(r => r.id),
      interpretation: "已识别：关于关系的概念问题"
    };
  }

  if (normalizedQuery.includes('how') && (normalizedQuery.includes('ontology') || normalizedQuery.includes('work'))) {
    return {
      query,
      result: `**${ontology.name}** 本体包含：\n\n• **${entities.length} 个实体类型** - ${entities.map(e => e.name).join('、')}\n• **${relationships.length} 条关系** - 将实体连接在一起\n\n本体作为语义层绑定到 OneLake 数据源，让自然语言查询能够理解你的业务概念。`,
      highlightEntities: entities.map(e => e.id),
      highlightRelationships: [],
      interpretation: "已识别：关于本体结构的问题"
    };
  }

  // Entity definition queries: "What is a Customer?"
  if (normalizedNoPunctuation.startsWith('what is ')) {
    const subjectRaw = normalizedNoPunctuation.slice('what is '.length).trim();
    const subject = stripLeadingArticle(subjectRaw);

    for (const entity of entities) {
      const entityNameLower = entity.name.toLowerCase();
      const entityNameSingular = entityNameLower.endsWith('s') ? entityNameLower.slice(0, -1) : entityNameLower;

      if (
        subject === entityNameLower ||
        subject === entityNameSingular ||
        singularize(subject) === entityNameSingular
      ) {
        const propList = entity.properties
          .slice(0, 4)
          .map(p => `• **${p.name}** (${p.type})${p.isIdentifier ? ' 🔑' : ''}`)
          .join('\n');

        return {
          query,
          result: `**${entity.name}** ${entity.icon}\n${entity.description}\n\n**属性：**\n${propList}`,
          highlightEntities: [entity.id],
          highlightRelationships: [],
          interpretation: `已识别：${entity.name} 的定义查询`
        };
      }
    }
  }

  // Entity listing queries
  for (const entity of entities) {
    const entityNameLower = entity.name.toLowerCase();
    const entityNamePlural = entityNameLower + 's';
    
    if (
      normalizedQuery.includes(`show me all ${entityNameLower}`) ||
      normalizedQuery.includes(`show me all ${entityNamePlural}`) ||
      normalizedQuery.includes(`list all ${entityNameLower}`) ||
      normalizedQuery.includes(`list all ${entityNamePlural}`) ||
      normalizedQuery.includes(`show ${entityNamePlural}`) ||
      normalizedQuery.includes(`list ${entityNamePlural}`)
    ) {
      const propList = entity.properties
        .slice(0, 4)
        .map(p => `• **${p.name}** (${p.type})${p.isIdentifier ? ' 🔑' : ''}`)
        .join('\n');
      
      return {
        query,
        result: `**${entity.name}** ${entity.icon}\n${entity.description}\n\n**属性：**\n${propList}\n\n_在真实部署中，这会查询 OneLake 中实际的 ${entityNameLower} 记录。_`,
        highlightEntities: [entity.id],
        highlightRelationships: [],
        interpretation: `已识别：${entity.name} 实体查询`
      };
    }
  }

  // Relationship/connection queries
  for (const rel of relationships) {
    const relationNameNormalized = rel.name.toLowerCase().trim().replace(/\s+/g, ' ');
    const fromEntity = entities.find(e => e.id === rel.from);
    const toEntity = entities.find(e => e.id === rel.to);

    if (
      normalizedNoPunctuation.includes(relationNameNormalized) &&
      (normalizedNoPunctuation.includes('connection') || normalizedNoPunctuation.includes('connections') || normalizedNoPunctuation.includes('relationship'))
    ) {
      return {
        query,
        result: `**${rel.name}** 将 **${fromEntity?.name ?? rel.from}** 连接到 **${toEntity?.name ?? rel.to}**（${rel.cardinality}）。${rel.description ? `\n\n${rel.description}` : ''}`,
        highlightEntities: [rel.from, rel.to],
        highlightRelationships: [rel.id],
        interpretation: `已识别：${rel.name} 关系查询`
      };
    }
  }

  for (const entity of entities) {
    const entityNameLower = entity.name.toLowerCase();
    
    if (normalizedQuery.includes(`how does ${entityNameLower}`) || 
        normalizedQuery.includes(`${entityNameLower} connect`) ||
        normalizedQuery.includes(`${entityNameLower} relate`)) {
      
      const relatedRels = relationships.filter(r => r.from === entity.id || r.to === entity.id);
      
      if (relatedRels.length > 0) {
        const relList = relatedRels.map(rel => {
          const isOutgoing = rel.from === entity.id;
          const otherEntityId = isOutgoing ? rel.to : rel.from;
          const otherEntity = entities.find(e => e.id === otherEntityId);
          const direction = isOutgoing ? '→' : '←';
          return `• **${rel.name}** ${direction} ${otherEntity?.icon} ${otherEntity?.name} (${rel.cardinality})`;
        }).join('\n');

        return {
          query,
          result: `**${entity.name}** ${entity.icon} 有 ${relatedRels.length} 条连接：\n\n${relList}`,
          highlightEntities: [entity.id, ...relatedRels.map(r => r.from === entity.id ? r.to : r.from)],
          highlightRelationships: relatedRels.map(r => r.id),
          interpretation: `已识别：${entity.name} 的关系查询`
        };
      }
    }
  }

  // Property-based queries
  for (const entity of entities) {
    for (const prop of entity.properties) {
      if (normalizedQuery.includes(prop.name.toLowerCase()) && normalizedQuery.includes(entity.name.toLowerCase())) {
        return {
          query,
          result: `**${entity.name}.${prop.name}**\n\n• 类型：${prop.type}\n${prop.unit ? `• 单位：${prop.unit}` : ''}\n${prop.isIdentifier ? '• 这是标识属性 🔑' : ''}\n${prop.description ? `• ${prop.description}` : ''}\n\n_在生产环境中，你可以按此属性筛选 ${entity.name.toLowerCase()}。_`,
          highlightEntities: [entity.id],
          highlightRelationships: [],
          interpretation: `已识别：${entity.name}.${prop.name} 属性查询`
        };
      }
    }
  }

  // Counting queries
  if (normalizedQuery.includes('how many')) {
    for (const entity of entities) {
      if (normalizedQuery.includes(entity.name.toLowerCase())) {
        return {
          query,
          result: `本体定义了 **${entity.name}** 实体类型。\n\n_在生产环境中，这个查询会统计 OneLake 中实际的 ${entity.name.toLowerCase()} 记录。_\n\n示例："SELECT COUNT(*) FROM ${entity.name.toLowerCase()}s"`,
          highlightEntities: [entity.id],
          highlightRelationships: [],
          interpretation: `已识别：${entity.name} 计数查询`
        };
      }
    }
  }

  // Schema overview query
  if (normalizedQuery.includes('entities') || normalizedQuery.includes('schema') || normalizedQuery.includes('overview')) {
    const entityList = entities.map(e => `• ${e.icon} **${e.name}** - ${e.description.slice(0, 50)}...`).join('\n');
    return {
      query,
      result: `**${ontology.name}** 架构概览\n\n${entityList}\n\n**合计：** ${entities.length} 个实体，${relationships.length} 条关系`,
      highlightEntities: entities.map(e => e.id),
      highlightRelationships: [],
      interpretation: "已识别：架构概览请求"
    };
  }

  // No match found - provide helpful suggestions
  const suggestions = generateQuerySuggestions(ontology).slice(0, 3);
  return {
    query,
    result: `我无法针对 **${ontology.name}** 理解“${query}”。\n\n可以试着这样问：\n${suggestions.map(s => `• “${s}”`).join('\n')}\n\n也可以点击图谱元素，以可视化方式探索本体。`,
    highlightEntities: [],
    highlightRelationships: [],
    interpretation: undefined
  };
}
