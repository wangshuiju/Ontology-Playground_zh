import type { Ontology, Relationship } from '../data/ontology';
import type { CatalogueEntry } from '../types/catalogue';
import type { LearnArticle, LearnCourse, LearnManifest } from '../types/learn';

const TERM_MAP: Record<string, string> = {
  'Ontology Playground': '本体游乐场',
  'Ontology School': '本体学院',
  'Cosmic Coffee Company': '星际咖啡公司',
  'E-Commerce Platform': '电商平台',
  'Healthcare System': '医疗健康系统',
  'Banking & Finance': '银行与金融',
  'Smart Manufacturing': '智能制造',
  'University System': '大学系统',
  Customer: '客户',
  Customers: '客户',
  Buyer: '买家',
  Product: '产品',
  Products: '产品',
  Order: '订单',
  Orders: '订单',
  Store: '门店',
  Stores: '门店',
  Supplier: '供应商',
  Shipment: '发货单',
  Shipments: '发货单',
  Patient: '患者',
  Provider: '医护人员',
  Appointment: '预约',
  Diagnosis: '诊断',
  Prescription: '处方',
  Account: '账户',
  Transaction: '交易',
  Loan: '贷款',
  Investment: '投资',
  Machine: '设备',
  Sensor: '传感器',
  'Work-Order': '工单',
  Part: '零件',
  'Quality-Check': '质检',
  Student: '学生',
  Course: '课程',
  Department: '院系',
  Faculty: '教师',
  Enrollment: '选课记录',
  Review: '评价',
  'Shopping-Cart': '购物车',
  Collateral: '抵押物',
  LoanPaymentSchedule: '还款计划',
  LoanServicer: '贷款服务机构',
  PaymentEvent: '还款事件',
  DelinquencyStatus: '逾期状态',
  Industry: '行业',
  Organization: '组织',
  Region: '区域',
  Country: '国家',
  Jurisdiction: '辖区',
  LoanType: '贷款类型',
  CollateralType: '抵押物类型',
  ConcentrationCategory: '集中度分类',
  Regulation: '监管规则',
  Threshold: '阈值',
  ExposureMeasure: '风险敞口指标',
  DepartmentNode: '部门',
  Employee: '员工',
  Position: '岗位',
  Assignment: '任职记录',
  Compensation: '薪酬',
  Location: '地点',
};

const RELATIONSHIP_MAP: Record<string, string> = {
  places: '下单',
  contains: '包含',
  processedAt: '处理于',
  sourcedFrom: '采购自',
  sentBy: '发送方',
  deliveredTo: '送达至',
  carries: '承运',
  has_cart: '拥有购物车',
  includes: '包括',
  writes: '撰写',
  reviews: '评价',
  has_appointment: '拥有预约',
  sees: '接诊',
  diagnosed_with: '诊断为',
  diagnoses: '诊断',
  treated_by: '治疗方式',
  prescribes: '开具处方',
  owns: '拥有',
  posts: '过账',
  appliesTo: '适用于',
  holds: '持有',
  reports: '上报',
  produces: '生产',
  has_part: '包含零件',
  inspects: '检查',
  enrolls: '选修',
  taughtBy: '授课教师',
  offeredBy: '开课院系',
  advises: '指导',
  securedBy: '由抵押物担保',
  repaidBySchedule: '按计划还款',
  servicedBy: '由机构服务',
  hasPaymentEvent: '包含还款事件',
  classifiedBy: '分类为',
  inCountry: '所在国家',
  inRegion: '所在区域',
  loanClassifiedAs: '贷款归类为',
  collateralClassifiedAs: '抵押物归类为',
  typicallySecuredBy: '通常由其担保',
  governedBy: '受规则约束',
  measuredBy: '由指标衡量',
};

const DESCRIPTION_MAP: Record<string, string> = {
  'A sample ontology representing a modern coffee shop chain with suppliers, products, stores, customers, and orders.':
    '一个示例本体，用于表示包含供应商、产品、门店、客户和订单的现代咖啡连锁业务。',
  'A person who purchases coffee products from our stores': '在门店购买咖啡产品的人。',
  'A customer purchase transaction at a store': '客户在门店发生的一笔购买交易。',
  'A coffee product or item available for sale': '可销售的咖啡产品或商品。',
  'A physical coffee shop location': '实体咖啡门店。',
  'A coffee bean or goods supplier partner': '咖啡豆或商品供应合作方。',
  'A delivery of goods from supplier to store': '从供应商送往门店的一批货物。',
  'A customer places one or more orders': '一个客户可以下一个或多个订单。',
  'An order contains one or more products': '一个订单包含一个或多个产品。',
  'An order is processed at a specific store': '一个订单在特定门店处理。',
  "A product's ingredients are sourced from a supplier": '产品原料来自某个供应商。',
  'A shipment is sent by a supplier': '发货单由供应商发出。',
  'A shipment is delivered to a store': '发货单送达某个门店。',
  'A shipment carries products': '发货单承运产品。',
  'Online retail business model with customers, products, and orders': '包含客户、产品和订单的在线零售业务模型。',
  'Patient care management with providers, appointments, and treatments': '包含医护人员、预约和治疗的患者照护管理模型。',
  'Financial services with accounts, transactions, and investments': '包含账户、交易和投资的金融服务模型。',
};

export function term(value: string | undefined): string {
  if (!value) return '';
  return TERM_MAP[value] ?? RELATIONSHIP_MAP[value] ?? value;
}

export function description(value: string | undefined): string {
  if (!value) return '';
  return DESCRIPTION_MAP[value] ?? value;
}

export function cardinality(value: Relationship['cardinality']): string {
  const labels: Record<Relationship['cardinality'], string> = {
    'one-to-one': '一对一',
    'one-to-many': '一对多',
    'many-to-one': '多对一',
    'many-to-many': '多对多',
  };
  return labels[value];
}

export function difficulty(value: 'beginner' | 'intermediate' | 'advanced'): string {
  return {
    beginner: '入门',
    intermediate: '进阶',
    advanced: '高级',
  }[value];
}

export function localizedOntology(ontology: Ontology): Ontology {
  return {
    ...ontology,
    name: term(ontology.name),
    description: description(ontology.description),
    entityTypes: ontology.entityTypes.map((entity) => ({
      ...entity,
      name: term(entity.name),
      description: description(entity.description),
      properties: entity.properties.map((property) => ({
        ...property,
        description: description(property.description),
      })),
    })),
    relationships: ontology.relationships.map((rel) => ({
      ...rel,
      name: term(rel.name),
      description: description(rel.description),
    })),
  };
}

const TITLE_REPLACEMENTS: Array<[RegExp, string]> = [
  [/Cosmic Coffee Company/g, '星际咖啡公司'],
  [/Cosmic Coffee/g, '星际咖啡'],
  [/E-Commerce Platform/g, '电商平台'],
  [/E-Commerce/g, '电商'],
  [/Healthcare System/g, '医疗健康系统'],
  [/Healthcare/g, '医疗健康'],
  [/Banking & Finance/g, '银行与金融'],
  [/Smart Manufacturing/g, '智能制造'],
  [/IQ Lab: Retail Supply Chain/g, 'IQ 实验：零售供应链'],
  [/IQ Lab Retail Supply Chain/g, 'IQ 实验：零售供应链'],
  [/Retail Supply Chain/g, '零售供应链'],
  [/Finance/g, '金融'],
  [/Manufacturing/g, '制造'],
  [/University System/g, '大学系统'],
  [/University/g, '大学'],
  [/Ontology Fundamentals/g, '本体基础'],
  [/FIBO Loans Lab/g, 'FIBO 贷款实验'],
  [/FIBO Risk Lab/g, 'FIBO 风险实验'],
  [/FIBO Risk Management Lab/g, 'FIBO 风险管理实验'],
  [/HR System/g, '人力资源系统'],
  [/Microsoft Fabric IQ Ontology Concepts/g, 'Microsoft Fabric IQ 本体概念'],
  [/Step (\d+)/g, '步骤 $1'],
  [/Scenario Overview/g, '场景概览'],
  [/Core Orders/g, '核心订单'],
  [/Adding Stores/g, '添加门店'],
  [/Complete Supply Chain/g, '完整供应链'],
  [/Core Commerce/g, '核心商业'],
  [/Order Details & Categories/g, '订单明细与分类'],
  [/Geography/g, '地理结构'],
  [/Fulfillment & Logistics/g, '履约与物流'],
  [/Inventory & Demand/g, '库存与需求'],
  [/Complete Model/g, '完整模型'],
  [/Buyer & Products/g, '买家与产品'],
  [/Core Marketplace/g, '核心市场'],
  [/Shopping Carts/g, '购物车'],
  [/Complete Platform/g, '完整平台'],
  [/Customer & Accounts/g, '客户与账户'],
  [/Customer Accounts/g, '客户账户'],
  [/Transactions/g, '交易'],
  [/Complete Banking Model/g, '完整银行模型'],
  [/Complete Banking/g, '完整银行模型'],
  [/Care Delivery/g, '照护交付'],
  [/Diagnoses/g, '诊断'],
  [/Complete Care Model/g, '完整照护模型'],
  [/Complete Care/g, '完整照护模型'],
  [/Factory Floor/g, '工厂现场'],
  [/Production Tracking/g, '生产跟踪'],
  [/Complete Factory Model/g, '完整工厂模型'],
  [/Organization Core/g, '组织核心'],
  [/Assignments/g, '任职分配'],
  [/Complete HR Model/g, '完整人力资源模型'],
  [/Academic Core/g, '学术核心'],
  [/Faculty/g, '教师'],
  [/Complete University Model/g, '完整大学模型'],
  [/Complete University/g, '完整大学模型'],
  [/What is an Ontology\?/g, '什么是本体？'],
  [/Understanding RDF and OWL/g, '理解 RDF 与 OWL'],
  [/Fabric IQ Ontology Concepts/g, 'Fabric IQ 本体概念'],
  [/Building Your First Ontology/g, '构建你的第一个本体'],
  [/Ontology Design Patterns/g, '本体设计模式'],
  [/Contributing to the Catalogue/g, '向目录贡献内容'],
  [/Core Loan Triad/g, '核心贷款三角'],
  [/Loan, Borrower, Lender/g, '贷款、借款人、贷款人'],
  [/Collateral and Schedules/g, '抵押物与还款计划'],
  [/Servicing and Payment History/g, '贷款服务与还款历史'],
  [/Risk and Classifiers/g, '风险与分类器'],
  [/Industry Classification/g, '行业分类'],
  [/Geographic Hierarchy/g, '地理层级'],
  [/Loan Classification/g, '贷款分类'],
  [/Regulatory Context/g, '监管上下文'],
  [/Smart 制造/g, '智能制造'],
  [/完整银行模型 Model/g, '完整银行模型'],
  [/完整照护模型 Model/g, '完整照护模型'],
  [/Complete 大学 Model/g, '完整大学模型'],
];

export function localizeTitle(value: string): string {
  return TITLE_REPLACEMENTS.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);
}

const SENTENCE_MAP: Record<string, string> = {
  'Meet the Cosmic Coffee Company — a modern coffee chain that needs an ontology to unify data across stores, suppliers, and orders.':
    '认识星际咖啡公司：一家现代咖啡连锁企业，需要用本体统一门店、供应商和订单数据。',
  'Define Customer, Order, and Product — the foundational entities of the coffee business — and connect them with relationships.':
    '定义 Customer、Order 和 Product 这三个咖啡业务基础实体，并用关系把它们连接起来。',
  'Introduce Store locations into the ontology and connect orders to their processing stores.':
    '把 Store 门店位置引入本体，并将订单连接到处理它们的门店。',
  'Add Supplier and Shipment to complete the Cosmic Coffee ontology — connecting sourcing, logistics, and retail.':
    '添加 Supplier 和 Shipment，补全星际咖啡本体，连接采购、物流和零售环节。',
  'Build a coffee shop chain ontology from scratch — customers, orders, products, stores, suppliers, and shipments.':
    '从零构建咖啡连锁本体，覆盖客户、订单、产品、门店、供应商和发货单。',
  'Meet the E-Commerce Platform — a marketplace that needs an ontology to connect buyers, products, carts, orders, and reviews.':
    '认识电商平台：一个需要用本体连接买家、产品、购物车、订单和评价的市场。',
  'Define Buyer, Product, and Order — the foundational entities that power any e-commerce platform.':
    '定义 Buyer、Product 和 Order，这些是支撑电商平台的基础实体。',
  'Add Shopping-Cart to model active shopping sessions and introduce the one-to-one relationship pattern.':
    '添加 Shopping-Cart 来建模活跃购物会话，并引入一对一关系模式。',
  'Add Review to close the buyer feedback loop and complete the e-commerce ontology.':
    '添加 Review，闭合买家反馈循环并完成电商本体。',
  'Model an online marketplace — buyers, products, shopping carts, orders, and customer reviews.':
    '建模在线市场，覆盖买家、产品、购物车、订单和客户评价。',
  "What is FIBO, where does it come from, and what we'll build in this lab.":
    '介绍 FIBO 的来源、用途，以及本实验将构建的内容。',
  'Model the foundational FIBO loan triangle — Loan, Borrower, and Lender — with properties and relationships.':
    '用属性和关系建模 FIBO 的基础贷款三角：Loan、Borrower 和 Lender。',
  "Add security agreements and repayment cadence using FIBO's collateral and payment schedule concepts.":
    '使用 FIBO 的抵押物和还款计划概念，添加担保协议与还款节奏。',
  'Extend the model with FIBO servicing organizations and auditable payment events.':
    '用 FIBO 贷款服务机构和可审计还款事件扩展模型。',
  'Add FIBO ownership and lien classifiers to support underwriting and collateral risk analysis.':
    '添加 FIBO 所有权和留置权分类器，支持承保与抵押风险分析。',
  'Build a FIBO-inspired loans ontology step by step — adapted from the EDM Council Financial Industry Business Ontology (FIBO) under the MIT License.':
    '逐步构建一个受 FIBO 启发的贷款本体，内容改编自 MIT 许可下的 EDM Council 金融行业业务本体（FIBO）。',
  "Why risk management needs ontologies, and what we'll build in this lab.":
    '说明风险管理为什么需要本体，以及本实验将构建的模型。',
  'Model the economic hierarchy — Sector, Subsector, and IndustryGroup with climate and cyclicality attributes.':
    '建模经济层级：Sector、Subsector 和带有气候敏感性、周期性属性的 IndustryGroup。',
  'Add regions, countries, and jurisdictions with disaster-zone flags for geographic concentration analysis.':
    '添加 Region、Country 和带灾害区域标记的 Jurisdiction，用于地理集中度分析。',
  'Add loan types with Basel risk weights, collateral categories, and OCC/FDIC concentration buckets.':
    '添加带 Basel 风险权重的 LoanType、抵押物类别以及 OCC/FDIC 集中度分桶。',
  'Complete the model with banking regulations, concentration limits, and cross-domain connections.':
    '用银行监管规则、集中度限制和跨领域连接补全模型。',
  'Build a FIBO-inspired risk management ontology step by step — covering industry classification, geographic risk, loan types, and regulatory compliance.':
    '逐步构建受 FIBO 启发的风险管理本体，覆盖行业分类、地理风险、贷款类型和监管合规。',
  'Meet the Banking & Finance scenario — why financial services need ontologies for customer, account, and product relationships.':
    '认识银行与金融场景：理解金融服务为什么需要本体来表达客户、账户和产品关系。',
  'Define Customer and Account — the banking foundation — with ownership relationships and financial properties.':
    '定义银行基础实体 Customer 和 Account，并加入所有权关系与金融属性。',
  'Add Transaction records to track every debit, credit, and transfer on an account.':
    '添加 Transaction 记录，跟踪账户上的每笔借记、贷记和转账。',
  'Add Loan and Investment to complete the banking ontology — connecting credit products and portfolio holdings.':
    '添加 Loan 和 Investment，补全银行本体并连接信贷产品与投资组合持仓。',
  'Model a financial services domain — customers, accounts, transactions, loans, and investment portfolios.':
    '建模金融服务领域，覆盖客户、账户、交易、贷款和投资组合。',
  'Meet the Healthcare System — a patient care platform that needs an ontology to connect patients, providers, diagnoses, and treatments.':
    '认识医疗健康系统：一个需要用本体连接患者、医护人员、诊断和治疗的患者照护平台。',
  'Define Patient, Provider, and Appointment — the core entities that power healthcare scheduling and care delivery.':
    '定义 Patient、Provider 和 Appointment，这些是医疗排班和照护交付的核心实体。',
  'Add Diagnosis to track medical conditions — connecting patients to their clinical findings and providers to their assessments.':
    '添加 Diagnosis 跟踪医学状况，将患者连接到临床发现，并将医护人员连接到评估结果。',
  'Add Prescription to complete the healthcare ontology — connecting diagnoses to treatments and closing the care cycle.':
    '添加 Prescription，连接诊断与治疗并闭合照护循环，完成医疗健康本体。',
  'Model a patient care system — patients, providers, appointments, diagnoses, and prescriptions.':
    '建模患者照护系统，覆盖患者、医护人员、预约、诊断和处方。',
  'Meet the HR System scenario and the cross-functional questions your ontology must answer.':
    '认识人力资源系统场景，以及本体需要回答的跨职能问题。',
  'Define Employee, Department, and Position to model core organizational structure.':
    '定义 Employee、Department 和 Position，建模核心组织结构。',
  'Add Assignment as a junction entity to model staffing history across employees, departments, and positions.':
    '添加 Assignment 作为连接实体，建模员工、部门和岗位之间的任职历史。',
  'Add PerformanceReview and apply the full HR ontology to real workforce analytics questions.':
    '添加 PerformanceReview，并把完整人力资源本体应用到真实员工分析问题中。',
  'Model an HR platform with employees, departments, positions, assignments, and performance reviews.':
    '建模人力资源平台，覆盖员工、部门、岗位、任职分配和绩效评价。',
  "Meet the retail supply chain scenario — why ontologies matter for multi-system retail data, and what we'll build in this lab.":
    '认识零售供应链场景：理解本体为什么对多系统零售数据重要，以及本实验将构建什么。',
  'Define Customer, Order, and Product — the three foundational entities of any retail ontology — and connect them with relationships.':
    '定义 Customer、Order 和 Product 这三个零售本体基础实体，并用关系连接它们。',
  'Add OrderLine as a linking entity between Order and Product, and introduce ProductCategory for grouping.':
    '添加 OrderLine 作为 Order 与 Product 之间的连接实体，并引入 ProductCategory 进行分组。',
  'Model Region and Store to add geographic structure — where orders are fulfilled and where stores are located.':
    '建模 Region 和 Store，加入地理结构，表达订单履约地点和门店位置。',
  'Add Shipment, Carrier, and Warehouse to model the delivery pipeline — how orders move from warehouse to customer.':
    '添加 Shipment、Carrier 和 Warehouse，建模订单从仓库到客户的配送链路。',
  'Add Inventory, Forecast, and DemandSignal to track stock levels and predict future demand across warehouses and regions.':
    '添加 Inventory、Forecast 和 DemandSignal，跨仓库与区域跟踪库存并预测未来需求。',
  'Add Promotion and Return to finish the full 15-entity retail supply chain ontology — then explore the complete graph.':
    '添加 Promotion 和 Return，完成包含 15 个实体的零售供应链本体，并探索完整图谱。',
  'Build a complete retail supply chain ontology step by step — from core commerce entities to fulfillment, inventory, and promotions.':
    '逐步构建完整零售供应链本体，从核心商业实体扩展到履约、库存和促销。',
  'Meet the Smart Manufacturing system — an IoT-enabled factory that needs an ontology to connect machines, sensors, production, and quality control.':
    '认识智能制造系统：一个需要用本体连接设备、传感器、生产和质量控制的 IoT 工厂。',
  'Define Machine and Sensor — the IoT foundation that monitors factory equipment in real time.':
    '定义 Machine 和 Sensor，这些是实时监控工厂设备的 IoT 基础实体。',
  "Add Work-Order and Part to track what's being produced — connecting machines to their manufacturing output.":
    '添加 Work-Order 和 Part，跟踪生产内容，并将设备连接到制造产出。',
  'Add Quality-Check to complete the manufacturing ontology — closing the loop from production to inspection.':
    '添加 Quality-Check，闭合从生产到检验的流程，完成制造本体。',
  'Model an IoT-enabled factory — machines, sensors, work orders, parts, and quality checks.':
    '建模 IoT 工厂，覆盖设备、传感器、工单、零件和质量检查。',
  'A beginner-friendly introduction to ontologies — what they are, why they matter, and how they help us model the real world as connected data.':
    '面向初学者介绍本体：它是什么、为什么重要，以及它如何帮助我们把现实世界建模为连接数据。',
  'Learn how ontologies are represented in RDF/OWL — the standard language for describing classes, properties, and relationships on the semantic web.':
    '学习本体如何用 RDF/OWL 表示，这是一套描述语义 Web 中类、属性和关系的标准语言。',
  'How Microsoft Fabric uses ontologies to power natural-language queries over structured data — entity types, identifier properties, relationships, and cardinality.':
    '了解 Microsoft Fabric 如何使用本体支持结构化数据上的自然语言查询，覆盖实体类型、标识属性、关系和基数。',
  'A step-by-step tutorial to create an ontology from scratch using the visual designer — add entities, define properties, connect with relationships, and export to RDF.':
    '通过可视化设计器从零创建本体的分步教程：添加实体、定义属性、建立关系并导出 RDF。',
  'Practical naming conventions, modelling patterns, and common anti-patterns to avoid when designing ontologies for data platforms.':
    '面向数据平台设计本体时可采用的实用命名规范、建模模式和应避免的常见反模式。',
  'How to share your ontology with the community — fork, add your RDF and metadata, submit a PR, and see it published in the catalogue.':
    '学习如何把本体分享给社区：fork 仓库、添加 RDF 和元数据、提交 PR，并在目录中发布。',
  'From first principles to hands-on design — everything you need to understand and build ontologies for Microsoft Fabric IQ.':
    '从基本原理到动手设计，系统学习为 Microsoft Fabric IQ 理解和构建本体所需的内容。',
  'Meet the University System — an academic institution that needs an ontology to connect students, courses, faculty, and departments.':
    '认识大学系统：一个需要用本体连接学生、课程、教师和院系的学术机构。',
  'Define Student, Course, and Enrollment — the junction entity pattern that powers academic record-keeping.':
    '定义 Student、Course 和 Enrollment，学习支撑学术记录管理的连接实体模式。',
  'Add Professor to track who teaches what — connecting faculty to courses and students through teaching assignments.':
    '添加 Professor，跟踪谁教授什么课程，并通过教学任务连接教师、课程和学生。',
  'Add Department to complete the university ontology — organizing faculty, courses, and students into academic programs.':
    '添加 Department，按学术项目组织教师、课程和学生，完成大学本体。',
  'Model an academic institution — students, courses, enrollments, professors, and departments.':
    '建模学术机构，覆盖学生、课程、选课记录、教授和院系。',
};

export function localizeSentence(value: string): string {
  const exact = SENTENCE_MAP[value];
  if (exact) return exact;
  return localizeTitle(value)
    .replace(/Build/g, '构建')
    .replace(/Model/g, '建模')
    .replace(/Add/g, '添加')
    .replace(/Define/g, '定义')
    .replace(/Introduce/g, '引入')
    .replace(/Complete model with/g, '包含以下内容的完整模型：')
    .replace(/A sample ontology representing/g, '一个示例本体，用于表示')
    .replace(/Online retail with/g, '包含以下对象的在线零售业务：')
    .replace(/step by step/g, '逐步')
    .replace(/from scratch/g, '从零开始')
    .replace(/customers, orders, products, stores, suppliers, and shipments/g, '客户、订单、产品、门店、供应商和发货单')
    .replace(/buyers, products, shopping carts, orders, and customer reviews/g, '买家、产品、购物车、订单和客户评价')
    .replace(/patients, providers, appointments, diagnoses, and prescriptions/g, '患者、医护人员、预约、诊断和处方');
}

export function localizedCatalogueEntry(entry: CatalogueEntry): CatalogueEntry {
  return {
    ...entry,
    name: localizeTitle(entry.name),
    description: localizeSentence(entry.description),
    ontology: localizedOntology(entry.ontology),
  };
}

export function localizedLearnManifest(manifest: LearnManifest): LearnManifest {
  return {
    ...manifest,
    courses: manifest.courses.map((course) => ({
      ...course,
      title: localizeTitle(course.title),
      description: localizeSentence(course.description),
      articles: course.articles.map((article) => ({
        ...article,
        title: localizeTitle(article.title),
        description: localizeSentence(article.description),
        html: localizeLearnArticleHtml(course, article),
      })),
    })),
  };
}

function localizeLearnArticleHtml(course: LearnCourse, article: LearnArticle): string {
  return (
    LEARN_ARTICLE_HTML[`${course.slug}/${article.slug}`] ??
    LEARN_ARTICLE_HTML[article.slug] ??
    buildChineseArticleHtml(course, article)
  );
}

function buildChineseArticleHtml(course: LearnCourse, article: LearnArticle): string {
  const courseTitle = escapeHtml(localizeTitle(course.title));
  const articleTitle = escapeHtml(localizeTitle(article.title));
  const descriptionText = escapeHtml(localizeSentence(article.description));
  const articleKind = course.type === 'lab' ? '实验步骤' : '学习文章';
  const positionLabel = course.type === 'lab'
    ? article.order === 1 ? '实验概览' : `步骤 ${article.order - 1}`
    : `第 ${article.order} 篇`;
  const embed = article.embed
    ? `<p><ontology-embed id="${escapeHtml(article.embed)}" height="${article.order === 1 ? '420px' : '360px'}"></ontology-embed></p>
<p><em>上方图谱展示了本节对应的本体结构。点击节点查看实体属性，点击边查看关系和基数。</em></p>`
    : '';

  return `<h2>${positionLabel}：${articleTitle}</h2>
<p>本页属于「${courseTitle}」${articleKind}，主题是「${articleTitle}」。${descriptionText}</p>
<h2>学习目标</h2>
<ul>
<li>理解本节引入的业务概念，以及它们在完整本体中的位置。</li>
<li>识别应建模为实体类型的核心名词，并为每个实体选择稳定的标识属性。</li>
<li>用有业务含义的关系名称连接实体，并关注一对一、一对多、多对一或多对多等基数。</li>
<li>把本节模型放回完整图谱中，理解它如何支持自然语言查询和跨系统分析。</li>
</ul>
<h2>建模重点</h2>
<p>阅读或扩展这个模型时，先从用户会提问的业务对象开始，而不是从底层表结构开始。实体类型回答“有哪些事物”，属性回答“每个事物有哪些事实”，关系回答“这些事物如何连接”。</p>
<p>对于每个实体，都要确认至少有一个标识属性；对于每条关系，都要确认方向和基数符合业务含义。这样 Fabric IQ 或其他语义查询工具才能正确生成连接、分组和聚合。</p>
${embed}
<h2>实践检查清单</h2>
<ul>
<li>实体名称是否使用清晰、单数的业务术语。</li>
<li>属性类型是否能表达真实数据，例如 string、integer、decimal、date、datetime 或 boolean。</li>
<li>关系名称是否像动词短语，而不是含糊的 relatedTo。</li>
<li>基数是否符合真实业务规则，尤其是订单、明细、分类、组织层级和历史记录类关系。</li>
<li>模型是否只覆盖当前场景需要回答的问题，避免把每张内部表都机械地搬进本体。</li>
</ul>
<h2>关键要点</h2>
<ul>
<li>本体把分散数据整理成可理解的业务图谱。</li>
<li>标识属性、关系方向和基数会直接影响查询结果是否正确。</li>
<li>渐进式构建有助于先验证核心概念，再扩展到供应链、金融、医疗、制造或学术等复杂场景。</li>
</ul>
<div class="quiz-block" data-quiz="{&quot;question&quot;:&quot;在本节建模时，最应该优先确认什么？&quot;,&quot;options&quot;:[{&quot;text&quot;:&quot;每个实体是否有稳定的标识属性，以及关系方向和基数是否正确&quot;,&quot;correct&quot;:true},{&quot;text&quot;:&quot;图谱节点是否使用同一种颜色&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;所有内部数据库表是否都被完整复制&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;是否只保留字符串类型属性&quot;,&quot;correct&quot;:false}],&quot;explanation&quot;:&quot;标识属性、关系方向和基数决定了语义查询能否正确连接、计数和聚合，是本体建模的基础检查项。&quot;}"><p>❓ 在本节建模时，最应该优先确认什么？</p></div>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const LEARN_ARTICLE_HTML: Record<string, string> = {
  'what-is-an-ontology': `<h2>用图谱思考</h2>
<p>想象你正在描述一家咖啡店。你会谈到各种<strong>事物</strong>，比如门店、产品、客户、订单，也会谈到它们之间的<strong>连接</strong>：客户<em>下单</em>，订单<em>包含</em>产品，门店<em>销售</em>产品。</p>
<p><strong>本体</strong>就是用一种正式方式描述这些内容：某个领域中有哪些事物类型，以及它们彼此如何关联。它是数据的蓝图，不是数据本身，而是数据的<em>形状</em>。</p>
<h2>实体、属性和关系</h2>
<p>每个本体都由三个基本构件组成：</p>
<table>
<thead>
<tr><th>概念</th><th>含义</th><th>示例</th></tr>
</thead>
<tbody>
<tr><td><strong>实体类型</strong></td><td>一类事物</td><td><code>Customer</code>、<code>Product</code>、<code>Store</code></td></tr>
<tr><td><strong>属性</strong></td><td>关于实体的一项事实</td><td><code>Customer.name</code>、<code>Product.price</code></td></tr>
<tr><td><strong>关系</strong></td><td>实体之间的连接</td><td><code>Customer → places → Order</code></td></tr>
</tbody>
</table>
<p>属性有<strong>类型</strong>，例如文本、数字、日期、布尔值。每个实体还至少需要一个<strong>标识属性</strong>，例如客户 ID，用来唯一地区分每一个实例。</p>
<h2>为什么本体重要</h2>
<p>没有本体时，你的数据只是一堆表和列。有了本体后，系统就能理解“revenue”是按 <code>Store.city</code> 分组汇总的 <code>Order.totalAmount</code>，因为本体告诉它这些概念如何连接。</p>
<p>这正是<strong>语义数据模型</strong>的基础：你不用手写 SQL，而是用自然语言描述想要什么，系统再利用本体生成正确查询。</p>
<p><ontology-embed id="official/cosmic-coffee" height="400px"></ontology-embed></p>
<p><em>上面的星际咖啡公司本体建模了一家咖啡连锁店。点击任意节点可以查看属性，点击边可以查看关系详情。</em></p>
<h2>从概念到代码</h2>
<p>本体通常用 <strong>RDF/OWL</strong> 表示，这是一套基于 XML 的标准，用于描述类、属性和关系。不过你不需要手写 XML：像 <a href="#/designer">本体设计器</a> 这样的工具可以让你可视化构建本体，并导出有效的 RDF。</p>
<h2>关键要点</h2>
<ul>
<li>本体定义领域中的<strong>事物类型</strong>以及<strong>它们如何关联</strong></li>
<li>它是架构，不是数据：它描述数据的形状，而不是具体内容</li>
<li>它支持语义查询：用自然语言提问，得到结构化答案</li>
<li>标准格式是 <strong>RDF/OWL</strong>，但也可以使用 JSON 表示</li>
</ul>
<div class="quiz-block" data-quiz="{&quot;question&quot;:&quot;下面哪一项不是本体的基本构件？&quot;,&quot;options&quot;:[{&quot;text&quot;:&quot;实体类型&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;属性&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;SQL 查询&quot;,&quot;correct&quot;:true},{&quot;text&quot;:&quot;关系&quot;,&quot;correct&quot;:false}],&quot;explanation&quot;:&quot;本体由实体类型、属性和关系构成。SQL 查询是检索数据的方式，不属于本体定义本身。&quot;}"><p>❓ 下面哪一项不是本体的基本构件？</p></div>
<div class="quiz-block" data-quiz="{&quot;question&quot;:&quot;标识属性的作用是什么？&quot;,&quot;options&quot;:[{&quot;text&quot;:&quot;存储实体的颜色&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;唯一地区分每个实体实例&quot;,&quot;correct&quot;:true},{&quot;text&quot;:&quot;连接两个实体&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;定义数据格式&quot;,&quot;correct&quot;:false}],&quot;explanation&quot;:&quot;标识属性（例如客户 ID）可以在实体类型内唯一标识每个实例，让系统能够正确计数、分组和连接。&quot;}"><p>❓ 标识属性的作用是什么？</p></div>
<p>准备看看 RDF 在底层如何工作了吗？继续阅读下一篇文章。</p>`,

  'understanding-rdf-and-owl': `<h2>什么是 RDF？</h2>
<p><strong>RDF</strong>（Resource Description Framework，资源描述框架）是 W3C 标准，用来把信息描述成相互连接的资源图谱。RDF 中的一切都表示为<strong>三元组</strong>：主语 → 谓语 → 宾语。</p>
<pre><code>:Customer  rdf:type       owl:Class .
:name      rdf:type       owl:DatatypeProperty .
:name      rdfs:domain    :Customer .
:name      rdfs:range     xsd:string .
</code></pre>
<p>上面的三元组表示：“有一个名为 Customer 的类，它有一个名为 name 的属性，该属性是字符串。”</p>
<h2>OWL 基于 RDF 扩展</h2>
<p><strong>OWL</strong>（Web Ontology Language，Web 本体语言）在 RDF 之上增加了更丰富的建模能力，例如基数约束、类层级和逻辑公理。对本体设计来说，关键 OWL 构造包括：</p>
<table>
<thead><tr><th>OWL 概念</th><th>映射到</th><th>示例</th></tr></thead>
<tbody>
<tr><td><code>owl:Class</code></td><td>实体类型</td><td><code>Customer</code>、<code>Product</code></td></tr>
<tr><td><code>owl:DatatypeProperty</code></td><td>带原始值的属性</td><td><code>name</code>（string）、<code>price</code>（decimal）</td></tr>
<tr><td><code>owl:ObjectProperty</code></td><td>实体之间的关系</td><td><code>placedBy</code>（Order → Customer）</td></tr>
<tr><td><code>rdfs:domain</code> / <code>rdfs:range</code></td><td>属性属于哪个实体 / 属性类型</td><td><code>price</code> 属于 <code>Product</code>，类型是 <code>xsd:decimal</code></td></tr>
</tbody>
</table>
<h2>命名空间让含义保持明确</h2>
<p>RDF 中每个资源都有全局唯一的 <strong>URI</strong>。为了避免到处书写很长的 URI，RDF/XML 使用<strong>命名空间前缀</strong>：</p>
<pre><code class="language-xml">&lt;rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:owl="http://www.w3.org/2002/07/owl#"
         xmlns="https://mycompany.com/ontology/"&gt;
</code></pre>
<p><code>xmlns=</code> 默认命名空间意味着 <code>&lt;owl:Class rdf:about="Customer"&gt;</code> 实际上是 <code>https://mycompany.com/ontology/Customer</code>。</p>
<h2>阅读 RDF/OWL 文件</h2>
<p>下面是一个只有一个实体类型和一个属性的最小本体：</p>
<pre><code class="language-xml">&lt;rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
         xmlns:owl="http://www.w3.org/2002/07/owl#"
         xmlns:xsd="http://www.w3.org/2001/XMLSchema#"
         xmlns="https://example.com/shop/"&gt;

  &lt;!-- 实体类型：Product --&gt;
  &lt;owl:Class rdf:about="Product"&gt;
    &lt;rdfs:label&gt;Product&lt;/rdfs:label&gt;
  &lt;/owl:Class&gt;

  &lt;!-- 属性：productName（string，标识符） --&gt;
  &lt;owl:DatatypeProperty rdf:about="productName"&gt;
    &lt;rdfs:domain rdf:resource="Product"/&gt;
    &lt;rdfs:range rdf:resource="http://www.w3.org/2001/XMLSchema#string"/&gt;
    &lt;rdfs:label&gt;productName&lt;/rdfs:label&gt;
  &lt;/owl:DatatypeProperty&gt;
&lt;/rdf:RDF&gt;
</code></pre>
<p>本体游乐场可以直接导入这类文件，也可以让你可视化设计后再导出 RDF。</p>
<p><ontology-embed id="official/ecommerce" height="400px"></ontology-embed></p>
<p><em>电商本体展示了更丰富的示例：多个实体类型以及连接它们的对象属性。</em></p>
<h2>JSON 与 RDF：何时使用哪一种</h2>
<table>
<thead><tr><th></th><th>JSON</th><th>RDF/OWL</th></tr></thead>
<tbody>
<tr><td><strong>可读性</strong></td><td>容易阅读和编辑</td><td>冗长但精确</td></tr>
<tr><td><strong>工具支持</strong></td><td>任何文本编辑器</td><td>语义 Web 工具、SPARQL 端点</td></tr>
<tr><td><strong>互操作性</strong></td><td>应用特定</td><td>W3C 标准，通用理解</td></tr>
<tr><td><strong>最适合</strong></td><td>快速原型、应用配置</td><td>正式数据模型、跨系统集成</td></tr>
</tbody>
</table>
<p>本体游乐场支持两种格式：在可视化编辑器中设计，快速使用时导出 JSON，正式发布时导出 RDF/OWL。</p>
<h2>关键要点</h2>
<ul>
<li>RDF 用<strong>主语 → 谓语 → 宾语</strong>三元组表示知识</li>
<li>OWL 在 RDF 之上增加类、数据属性和对象属性</li>
<li>命名空间让 URI 简短且含义明确</li>
<li>游乐场可以导入和导出标准 RDF/OWL，不需要手写代码</li>
</ul>
<div class="quiz-block" data-quiz="{&quot;question&quot;:&quot;在 RDF 中，信息表示为：&quot;,&quot;options&quot;:[{&quot;text&quot;:&quot;带行和列的表&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;JSON 键值对&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;主语 → 谓语 → 宾语三元组&quot;,&quot;correct&quot;:true},{&quot;text&quot;:&quot;二进制数据流&quot;,&quot;correct&quot;:false}],&quot;explanation&quot;:&quot;RDF 使用三元组，也就是通过谓语把主语连接到宾语的三段式陈述，把信息描述为相互连接的资源图谱。&quot;}"><p>❓ 在 RDF 中，信息表示为：</p></div>
<div class="quiz-block" data-quiz="{&quot;question&quot;:&quot;owl:ObjectProperty 表示什么？&quot;,&quot;options&quot;:[{&quot;text&quot;:&quot;字符串等原始值属性&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;两个实体类型之间的关系&quot;,&quot;correct&quot;:true},{&quot;text&quot;:&quot;本体的命名空间&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;数据类型约束&quot;,&quot;correct&quot;:false}],&quot;explanation&quot;:&quot;在 OWL 中，ObjectProperty 定义两个类（实体类型）之间的关系，例如 placedBy 将 Order 连接到 Customer。DatatypeProperty 用于原始值。&quot;}"><p>❓ owl:ObjectProperty 表示什么？</p></div>`,

  'fabric-iq-ontology-concepts': `<h2>什么是 Fabric IQ？</h2>
<p><strong>Microsoft Fabric</strong> 是一个统一分析平台，整合了数据工程、数据科学、实时分析和商业智能。<strong>IQ</strong> 是 Fabric 的一项能力，让用户可以用<strong>自然语言</strong>提问，并从结构化数据中得到答案，无需编写 SQL。</p>
<p>关键材料是<strong>本体</strong>：对实体类型、属性和关系的正式描述。IQ 读取本体，理解数据形状，并把普通语言问题翻译成正确查询。</p>
<h2>IQ 如何使用本体</h2>
<p>当用户问“上个月按区域统计的总销售额是多少？”时，IQ 需要知道：</p>
<ol>
<li><strong>实体类型</strong>：<code>Order</code>、<code>Store</code>、<code>Region</code></li>
<li><strong>属性</strong>：<code>Order.totalAmount</code>、<code>Order.date</code>、<code>Store.region</code></li>
<li><strong>关系</strong>：<code>Order</code> → <code>placedAt</code> → <code>Store</code>，<code>Store</code> → <code>locatedIn</code> → <code>Region</code></li>
<li><strong>标识属性</strong>：哪些字段能唯一标识每个实体，例如 <code>Order.orderId</code></li>
</ol>
<p>本体提供这四类信息。没有本体，IQ 就无法区分“门店”和“产品”，也不知道它们该如何连接。</p>
<h2>实体类型</h2>
<p>实体类型是一类业务对象。在 Fabric IQ 中，每个实体类型：</p>
<ul>
<li>有<strong>名称</strong>和可选<strong>说明</strong></li>
<li>包含一个或多个<strong>属性</strong>（带类型的列）</li>
<li>必须至少有一个能唯一标识实例的<strong>标识属性</strong></li>
</ul>
<p>可以把它理解成表定义：<code>Customer(customerId, name, email, tier)</code>。</p>
<h2>属性和类型</h2>
<p>每个属性都有数据类型：</p>
<table>
<thead><tr><th>类型</th><th>说明</th><th>示例</th></tr></thead>
<tbody>
<tr><td><code>string</code></td><td>文本值</td><td>客户姓名、产品 SKU</td></tr>
<tr><td><code>integer</code></td><td>整数</td><td>数量、年份</td></tr>
<tr><td><code>decimal</code></td><td>小数</td><td>价格、评分</td></tr>
<tr><td><code>date</code></td><td>日历日期</td><td>订单日期、出生日期</td></tr>
<tr><td><code>datetime</code></td><td>带时间的日期</td><td>创建时间戳</td></tr>
<tr><td><code>boolean</code></td><td>真/假</td><td>是否有效、是否高级会员</td></tr>
</tbody>
</table>
<p><strong>标识属性</strong>（钥匙图标标记）非常关键：它告诉 IQ 如何正确计数、分组和连接实体。</p>
<h2>关系和基数</h2>
<p>关系连接实体类型。每条关系会指定：</p>
<ul>
<li><strong>源实体类型和目标实体类型</strong></li>
<li><strong>名称</strong>（动词，例如 places、contains、worksAt）</li>
<li><strong>基数</strong>：可以连接多少个实例</li>
</ul>
<table>
<thead><tr><th>基数</th><th>含义</th><th>示例</th></tr></thead>
<tbody>
<tr><td>一对一</td><td>每个 A 正好映射到一个 B</td><td><code>Employee</code> → <code>Badge</code></td></tr>
<tr><td>一对多</td><td>每个 A 映射到多个 B</td><td><code>Customer</code> → <code>Order</code></td></tr>
<tr><td>多对一</td><td>多个 A 映射到一个 B</td><td><code>Order</code> → <code>Store</code></td></tr>
<tr><td>多对多</td><td>多个 A 映射到多个 B</td><td><code>Student</code> → <code>Course</code></td></tr>
</tbody>
</table>
<p>IQ 使用基数生成正确聚合。<code>Customer</code> 与 <code>Order</code> 的一对多关系意味着“每个客户的订单数”是有效的，而“每个订单的客户数”通常应为 1。</p>
<p><ontology-embed id="official/ecommerce" height="400px"></ontology-embed></p>
<p><em>电商本体展示了适合 IQ 的模式：每个实体都有标识属性，列有明确类型，每条关系都有基数。</em></p>
<h2>面向 IQ 设计</h2>
<p>为 Fabric IQ 构建本体时，请遵循这些原则：</p>
<ol>
<li><strong>实体命名清晰</strong>：使用用户会说的业务术语，例如 Customer，而不是 tbl_cust</li>
<li><strong>添加说明</strong>：IQ 会用说明区分相似概念</li>
<li><strong>标记标识符</strong>：每个实体必须至少有一个标识属性</li>
<li><strong>设置基数</strong>：帮助 IQ 生成正确的 GROUP BY 和 JOIN 逻辑</li>
<li><strong>保持聚焦</strong>：建模用户会查询的概念，而不是每张内部表</li>
</ol>
<h2>关键要点</h2>
<ul>
<li>Fabric IQ 使用本体把自然语言问题翻译成 SQL</li>
<li>实体类型、属性、关系和基数是四个支柱</li>
<li>每个实体都需要标识属性，才能正确计数和连接</li>
<li>良好的命名和说明可以提升 IQ 问答准确性</li>
<li>使用 <a href="#/designer">本体设计器</a> 可视化创建适合 IQ 的本体</li>
</ul>
<div class="quiz-block" data-quiz="{&quot;question&quot;:&quot;为什么 Fabric IQ 中每个实体类型都需要标识属性？&quot;,&quot;options&quot;:[{&quot;text&quot;:&quot;让本体看起来更专业&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;告诉 IQ 如何正确计数、分组和连接实体&quot;,&quot;correct&quot;:true},{&quot;text&quot;:&quot;作为实体的显示名称&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;设置默认排序顺序&quot;,&quot;correct&quot;:false}],&quot;explanation&quot;:&quot;标识属性可以唯一地区分实体类型的实例。没有它，IQ 无法在翻译后的 SQL 中正确生成 COUNT、GROUP BY 或 JOIN 操作。&quot;}"><p>❓ 为什么 Fabric IQ 中每个实体类型都需要标识属性？</p></div>
<div class="quiz-block" data-quiz="{&quot;question&quot;:&quot;关系的基数会告诉 Fabric IQ 什么？&quot;,&quot;options&quot;:[{&quot;text&quot;:&quot;绘制关系时使用什么颜色&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;关系两侧可以连接多少个实例&quot;,&quot;correct&quot;:true},{&quot;text&quot;:&quot;关系是可选还是必需&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;实体应按什么顺序显示&quot;,&quot;correct&quot;:false}],&quot;explanation&quot;:&quot;基数（一对一、一对多、多对一、多对多）告诉 IQ 如何生成正确聚合和连接，例如知道一个客户有多个订单。&quot;}"><p>❓ 关系的基数会告诉 Fabric IQ 什么？</p></div>`,

  'building-your-first-ontology': `<h2>我们要构建什么</h2>
<p>在本教程中，你会创建一个简单的<strong>图书馆</strong>本体，包含三个实体类型：<code>Book</code>、<code>Author</code> 和 <code>Member</code>，并通过关系连接起来。完成后，你会得到一个可用于 Microsoft Fabric IQ 或其他语义工具的有效 RDF 文件。</p>
<h2>步骤 1：打开设计器</h2>
<p>点击顶部导航栏中的<strong>设计器</strong>按钮，或直接访问 <a href="#/designer">/#/designer</a>。你会看到一个空白画布：左侧是实体表单，右侧是实时图谱预览。</p>
<h2>步骤 2：创建实体类型</h2>
<p>使用<strong>+ 添加实体</strong>按钮添加 <code>Book</code>、<code>Author</code> 和 <code>Member</code>。为每个实体设置名称、图标、颜色，并添加标识属性，例如 <code>isbn</code>、<code>authorId</code>、<code>memberId</code>。其他属性可包括 <code>title</code>、<code>publishedYear</code>、<code>name</code>、<code>nationality</code> 和 <code>joinDate</code>。</p>
<p>每添加一个实体，图谱预览都会实时更新。</p>
<h2>步骤 3：添加关系</h2>
<p>切换到<strong>关系</strong>区域，添加 <code>writtenBy</code>（Book → Author，多对一）和 <code>borrowedBy</code>（Book → Member，多对多）。前者表示很多书可以共享同一位作者；后者表示一本书可以被多个会员借阅，一个会员也可以借多本书。</p>
<h2>步骤 4：校验</h2>
<p>点击工具栏中的<strong>校验</strong>按钮。如果配置正确，会看到“未发现问题”。否则请修复提示的问题：每个实体必须有标识属性，关系必须引用已存在的实体类型，不能有重复 ID。</p>
<h2>步骤 5：预览 RDF</h2>
<p>点击预览区域中的 <strong>RDF</strong> 标签，可以看到带语法高亮的实时 RDF/OWL 输出。这就是 Fabric IQ 等工具会消费的文件。</p>
<p><ontology-embed id="official/cosmic-coffee" height="400px"></ontology-embed></p>
<p><em>星际咖啡本体也是用同样流程构建的。你的图书馆本体会类似：实体是彩色节点，关系是有方向的边。</em></p>
<h2>步骤 6：导出</h2>
<ol>
<li><strong>下载 RDF</strong>：保存 <code>.rdf</code> 文件</li>
<li><strong>提交到目录</strong>：通过 PR 将本体贡献到社区目录</li>
<li><strong>复制 JSON</strong>：复制 JSON 表示，供应用使用</li>
</ol>
<h2>关键要点</h2>
<ul>
<li>设计器提供可视化、无代码的本体构建流程</li>
<li>每个实体都需要名称、属性和标识符</li>
<li>关系用名称和基数连接实体</li>
<li>实时图谱和 RDF 预览能即时反馈设计结果</li>
</ul>
<div class="quiz-block" data-quiz="{&quot;question&quot;:&quot;为什么 Book 和 Member 之间的 borrowedBy 关系设置为多对多？&quot;,&quot;options&quot;:[{&quot;text&quot;:&quot;一本书只能被借一次&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;每个会员一次只能借一本书&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;一本书可以在不同时间被很多会员借阅，一个会员也可以借很多本书&quot;,&quot;correct&quot;:true},{&quot;text&quot;:&quot;多对多是所有关系的默认基数&quot;,&quot;correct&quot;:false}],&quot;explanation&quot;:&quot;同一本书可以在不同时间被不同会员借阅，每个会员也可以同时借多本书，这种双向多重性使它成为多对多关系。&quot;}"><p>❓ 为什么 Book 和 Member 之间的 borrowedBy 关系设置为多对多？</p></div>`,

  'ontology-design-patterns': `<h2>按人的理解来命名</h2>
<p>命名是最重要的设计决策。实体类型和属性会同时被人和机器阅读，清晰名称能让自然语言查询更准确。</p>
<p><strong>推荐：</strong>实体类型使用单数名词（如 <code>Customer</code>），属性使用 camelCase（如 <code>totalAmount</code>），关系使用动词短语（如 <code>placedBy</code>）。</p>
<p><strong>避免：</strong>内部表名、过度缩写和过泛名称，例如 <code>tbl_cust_v2</code>、<code>qty</code>、<code>Thing</code>。</p>
<h2>一个实体，一个概念</h2>
<p>每个实体类型应该表示一个单一业务概念。如果一个 <code>Person</code> 同时包含 <code>salary</code>、<code>patientId</code>、<code>courseGrade</code> 和 <code>accountBalance</code>，通常说明 Employee、Patient、Student、Customer 等概念被混在了一起。</p>
<h2>谨慎选择标识符</h2>
<p>好的标识符应该唯一、稳定、有业务意义，例如图书的 <code>isbn</code>、用户的 <code>email</code>、订单的 <code>orderId</code>。尽量避免复合标识符，因为多数本体工具期望每个实体有一个清晰标识属性。</p>
<h2>建模关系，而不是外键</h2>
<p>关系型数据库使用外键连接表；本体使用有明确语义的命名关系。例如 <code>orders.customer_id → customers.id</code> 在本体中应表达为 <code>Order</code> → <code>placedBy</code> → <code>Customer</code>。</p>
<h2>正确设置基数</h2>
<p>错误基数会导致错误聚合。一个客户可以下多个订单是一对多；一个订单发生在一个门店是多对一；学生和课程通常是多对多。</p>
<p><ontology-embed id="official/healthcare" height="400px"></ontology-embed></p>
<p><em>医疗健康本体是学习基数的好例子：一个患者有多个预约，但每个预约只有一个医护人员。</em></p>
<h2>避免常见错误</h2>
<ul>
<li><strong>上帝实体</strong>：一个实体有太多无关属性，应拆分</li>
<li><strong>缺少标识符</strong>：无法正确计数或分组，应添加唯一标识属性</li>
<li><strong>关系名称含糊</strong>：避免 <code>relatedTo</code>，使用具体动词</li>
<li><strong>过度建模</strong>：不要把每张内部表都变成实体，应建模用户会查询的内容</li>
</ul>
<h2>关键要点</h2>
<ul>
<li>面向人命名：单数名词、camelCase、动词短语</li>
<li>一个实体表示一个概念</li>
<li>选择稳定、唯一、有意义的标识符</li>
<li>用命名关系表达语义，而不是只复制外键</li>
<li>正确设置基数以支持正确聚合</li>
</ul>
<div class="quiz-block" data-quiz="{&quot;question&quot;:&quot;一个 Person 实体包含 salary、patientId、courseGrade 和 accountBalance。应该应用什么设计模式？&quot;,&quot;options&quot;:[{&quot;text&quot;:&quot;添加一个标识属性&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;把所有属性合并到说明字段里&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;拆分成独立实体类型（Employee、Patient、Student、Customer）并建立关系&quot;,&quot;correct&quot;:true},{&quot;text&quot;:&quot;删除除一个属性外的所有属性&quot;,&quot;correct&quot;:false}],&quot;explanation&quot;:&quot;当一个实体累积了无关属性时，它会变成“上帝实体”。修复方式是把每个概念拆成自己的实体类型，并在需要时用关系连接。&quot;}"><p>❓ 一个 Person 实体包含 salary、patientId、courseGrade 和 accountBalance。应该应用什么设计模式？</p></div>`,

  'contributing-to-the-catalogue': `<h2>社区目录</h2>
<p>本体游乐场包含一个<a href="#/catalogue">本体目录</a>，既有项目团队维护的官方本体，也有社区贡献的本体。任何人都可以通过 pull request 提交自己的本体。</p>
<h2>两种贡献方式</h2>
<h3>方式 A：从设计器一键提交 PR</h3>
<ol>
<li>打开<a href="#/designer">设计器</a>并构建或加载本体</li>
<li>点击工具栏中的<strong>提交到目录</strong></li>
<li>填写名称、说明、分类和标签</li>
<li>使用 GitHub 登录</li>
<li>工具会自动 fork 仓库、创建分支、提交 RDF 和元数据，并打开 PR</li>
</ol>
<h3>方式 B：手动 PR</h3>
<p>你也可以 fork 仓库，在 <code>catalogue/community/&lt;your-github-username&gt;/&lt;ontology-slug&gt;/</code> 下添加 <code>ontology.rdf</code> 和 <code>metadata.json</code>。</p>
<h2>元数据格式</h2>
<pre><code class="language-json">{
  "name": "Library System",
  "description": "A public library with books, authors, members, and loans.",
  "icon": "📚",
  "category": "education",
  "tags": ["library", "books", "lending"],
  "author": "your-github-username"
}
</code></pre>
<p><code>name</code>、<code>description</code> 和 <code>category</code> 是必填字段；<code>icon</code>、<code>tags</code>、<code>author</code> 可选。</p>
<h2>校验规则</h2>
<ul>
<li>RDF/OWL 必须有效且可解析</li>
<li>序列化和反解析应保持等价</li>
<li>元数据必须符合 schema</li>
<li>目录名只能使用小写字母数字、连字符和下划线</li>
<li>出于安全考虑，不允许符号链接</li>
</ul>
<h2>合并后会发生什么？</h2>
<p>合并后，构建流水线会运行 <code>npm run catalogue:build</code>，把 RDF 编译到 <code>catalogue.json</code>，部署网站，并让你的本体出现在目录中，可用于嵌入、深链接和加载。</p>
<p><ontology-embed id="official/university" height="400px"></ontology-embed></p>
<p><em>大学系统本体是官方目录条目之一。社区贡献使用同样格式。</em></p>
<h2>关键要点</h2>
<ul>
<li>任何人都可以通过一键 PR 或手动 PR 贡献本体</li>
<li>每次提交都需要 RDF 文件和 <code>metadata.json</code></li>
<li>CI 会自动校验 RDF，请在审查前修复错误</li>
<li>合并后的本体会在部署后进入在线目录</li>
</ul>
<div class="quiz-block" data-quiz="{&quot;question&quot;:&quot;每个目录贡献必须包含哪两个文件？&quot;,&quot;options&quot;:[{&quot;text&quot;:&quot;ontology.json 和 README.md&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;schema.rdf 和 config.yaml&quot;,&quot;correct&quot;:false},{&quot;text&quot;:&quot;ontology.rdf 和 metadata.json&quot;,&quot;correct&quot;:true},{&quot;text&quot;:&quot;index.html 和 style.css&quot;,&quot;correct&quot;:false}],&quot;explanation&quot;:&quot;每个目录条目都需要 ontology.rdf 文件（RDF/OWL 本体）和 metadata.json 文件（用于目录列表的名称、说明、分类和标签）。&quot;}"><p>❓ 每个目录贡献必须包含哪两个文件？</p></div>`,
};
