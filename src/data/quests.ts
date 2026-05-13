// Quest system for Ontology Playground demo

export interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'exploration' | 'traversal' | 'query';
  steps: QuestStep[];
  reward: {
    badge: string;
    badgeIcon: string;
    points: number;
  };
}

export interface QuestStep {
  id: string;
  instruction: string;
  targetType: 'entity' | 'relationship' | 'property' | 'query';
  targetId?: string;
  hint?: string;
}

export const quests: Quest[] = [
  {
    id: "quest-1",
    title: "认识实体",
    description: "通过探索实体类型，认识星际咖啡本体的核心构件。",
    difficulty: "beginner",
    category: "exploration",
    steps: [
      {
        id: "step-1-1",
        instruction: "点击“客户”实体，了解客户信息",
        targetType: "entity",
        targetId: "customer",
        hint: "在图谱中寻找 👤 图标"
      },
      {
        id: "step-1-2",
        instruction: "现在探索“产品”实体",
        targetType: "entity",
        targetId: "product",
        hint: "找到 ☕ 咖啡杯图标"
      },
      {
        id: "step-1-3",
        instruction: "最后查看“门店”实体",
        targetType: "entity",
        targetId: "store",
        hint: "定位 🏪 门店图标"
      }
    ],
    reward: {
      badge: "实体探索者",
      badgeIcon: "🎖️",
      points: 100
    }
  },
  {
    id: "quest-2",
    title: "咖啡豆路径",
    description: "沿着关系追踪咖啡豆从供应商到客户的旅程。",
    difficulty: "intermediate",
    category: "traversal",
    steps: [
      {
        id: "step-2-1",
        instruction: "从“供应商”实体开始，咖啡豆从这里出发",
        targetType: "entity",
        targetId: "supplier",
        hint: "找到 🚚 卡车图标"
      },
      {
        id: "step-2-2",
        instruction: "沿着“采购自”关系到达“产品”",
        targetType: "relationship",
        targetId: "product_sourced_from_supplier",
        hint: "点击连接“供应商”和“产品”的连线"
      },
      {
        id: "step-2-3",
        instruction: "探索“包含”关系，了解产品如何出现在订单中",
        targetType: "relationship",
        targetId: "order_contains_product",
        hint: "查看“订单”和“产品”之间的连接"
      },
      {
        id: "step-2-4",
        instruction: "最后查看“下单”关系，看看是谁创建了订单",
        targetType: "relationship",
        targetId: "customer_places_order",
        hint: "找到从“客户”到“订单”的关系"
      }
    ],
    reward: {
      badge: "咖啡豆侦探",
      badgeIcon: "🔍",
      points: 250
    }
  },
  {
    id: "quest-3",
    title: "供应链导航",
    description: "了解发货单如何连接供应商和门店。",
    difficulty: "intermediate",
    category: "traversal",
    steps: [
      {
        id: "step-3-1",
        instruction: "点击“发货单”实体",
        targetType: "entity",
        targetId: "shipment",
        hint: "找到 📦 包裹图标"
      },
      {
        id: "step-3-2",
        instruction: "探索到“供应商”的“发送方”关系",
        targetType: "relationship",
        targetId: "shipment_from_supplier",
        hint: "查看发货单来自哪里"
      },
      {
        id: "step-3-3",
        instruction: "沿着“送达至”关系到达“门店”",
        targetType: "relationship",
        targetId: "shipment_to_store",
        hint: "查看发货单去往哪里"
      }
    ],
    reward: {
      badge: "供应链达人",
      badgeIcon: "🌐",
      points: 200
    }
  },
  {
    id: "quest-4",
    title: "查询探索者",
    description: "学习使用自然语言查询提出问题。",
    difficulty: "advanced",
    category: "query",
    steps: [
      {
        id: "step-4-1",
        instruction: "试着提问：“显示所有金卡客户”",
        targetType: "query",
        hint: "在查询面板中输入"
      },
      {
        id: "step-4-2",
        instruction: "现在提问：“哪些产品来自埃塞俄比亚？”",
        targetType: "query",
        hint: "用自然语言按产地筛选"
      },
      {
        id: "step-4-3",
        instruction: "试一个遍历查询：“Alex Rivera 下过哪些订单？”",
        targetType: "query",
        hint: "这会沿着“客户 → 订单”关系查询"
      }
    ],
    reward: {
      badge: "查询能手",
      badgeIcon: "🧙",
      points: 300
    }
  },
  {
    id: "quest-5",
    title: "数据绑定发现",
    description: "了解本体概念如何连接到 OneLake 中的真实数据源。",
    difficulty: "advanced",
    category: "exploration",
    steps: [
      {
        id: "step-5-1",
        instruction: "选择“客户”实体并查看它的数据绑定",
        targetType: "entity",
        targetId: "customer",
        hint: "在检查器中查找“数据绑定”部分"
      },
      {
        id: "step-5-2",
        instruction: "检查“客户”属性如何映射到 Lakehouse 列",
        targetType: "property",
        targetId: "name",
        hint: "注意“name”如何映射到源中的“full_name”"
      },
      {
        id: "step-5-3",
        instruction: "查看“产品”实体的绑定，了解 Power BI 语义模型连接",
        targetType: "entity",
        targetId: "product",
        hint: "产品连接到 Power BI 语义模型"
      }
    ],
    reward: {
      badge: "绑定专家",
      badgeIcon: "🔗",
      points: 350
    }
  }
];

// Pre-defined NL query responses for demo
export interface QueryResponse {
  query: string;
  matches: string[];
  result: string;
  highlightEntities: string[];
  highlightRelationships: string[];
}

export const nlQueryResponses: QueryResponse[] = [
  {
    query: "show me all gold tier customers",
    matches: ["gold tier", "gold customers", "customers gold"],
    result: "找到 1 位金卡客户：\n• Alex Rivera (CUST-001) - 2024 年起为金卡等级",
    highlightEntities: ["customer"],
    highlightRelationships: []
  },
  {
    query: "which products come from ethiopia",
    matches: ["products ethiopia", "ethiopian", "from ethiopia"],
    result: "找到 1 个来自埃塞俄比亚的产品：\n• Ethiopian Single Origin（☕ 冲煮咖啡）- $4.50\n  采购自：Ethiopia Highlands Farm",
    highlightEntities: ["product", "supplier"],
    highlightRelationships: ["product_sourced_from_supplier"]
  },
  {
    query: "what orders did alex rivera place",
    matches: ["orders alex", "alex rivera orders", "alex placed"],
    result: "Alex Rivera 的订单：\n• ORD-2025-001 - $12.50（已完成）\n  商品：Ethiopian Single Origin x2, Cosmic Latte x1\n  门店：Downtown Seattle",
    highlightEntities: ["customer", "order", "store"],
    highlightRelationships: ["customer_places_order", "order_processed_at_store"]
  },
  {
    query: "how many stores are in seattle",
    matches: ["stores seattle", "seattle stores", "how many stores"],
    result: "在西雅图找到 2 家门店：\n• Cosmic Coffee - Downtown Seattle（45 个座位）\n• Cosmic Coffee - Capitol Hill（32 个座位）",
    highlightEntities: ["store"],
    highlightRelationships: []
  },
  {
    query: "show supply chain for cosmic latte",
    matches: ["supply chain", "cosmic latte", "where does cosmic latte come from"],
    result: "Cosmic Latte 的供应链：\n• 咖啡豆产地：哥伦比亚 🇨🇴\n• 供应商：Colombian Mountain Roasters\n• 认证：Rainforest Alliance 🌿\n• 最新发货单：SHIP-001（1 月 27 日已送达）",
    highlightEntities: ["product", "supplier", "shipment"],
    highlightRelationships: ["product_sourced_from_supplier", "shipment_from_supplier"]
  },
  {
    query: "what is an entity type",
    matches: ["what is entity", "entity type", "define entity"],
    result: "实体类型是现实世界概念（如客户、产品或订单）的可复用逻辑模型。它统一名称、说明、标识符和属性，让不同团队使用同一术语时含义一致。",
    highlightEntities: [],
    highlightRelationships: []
  },
  {
    query: "what is a relationship",
    matches: ["what is relationship", "define relationship", "relationships"],
    result: "关系是实体类型之间带类型、带方向的连接。例如“客户下单订单”定义了客户如何连接到订单。关系也可以拥有数量、置信度等属性。",
    highlightEntities: [],
    highlightRelationships: []
  },
  {
    query: "show me platinum customers",
    matches: ["platinum", "platinum customers", "customers platinum"],
    result: "找到 1 位白金客户：\n• Jordan Chen (CUST-002) - 白金等级\n  总消费：$3,420.00\n  2023 年 1 月加入",
    highlightEntities: ["customer"],
    highlightRelationships: []
  },
  {
    query: "list all organic products",
    matches: ["organic", "organic products", "is organic"],
    result: "找到 2 个有机产品：\n• Ethiopian Single Origin（冲煮咖啡）- $4.50 🌱\n• Nebula Cold Brew（冷萃）- $5.25 🌱",
    highlightEntities: ["product"],
    highlightRelationships: []
  }
];
