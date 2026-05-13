# Ontology Playground（预览版）☕

> 说明：本项目使用 AI 辅助编码开发。

**[在线体验 &#x2192; microsoft.github.io/Ontology-Playground](https://microsoft.github.io/Ontology-Playground/)**

[![Ontology Playground 截图](public/og-image.png)](https://microsoft.github.io/Ontology-Playground/)

这是一个免费、开源的 Web 应用，用于学习本体和 **Microsoft Fabric IQ**。你可以探索预置本体，在可视化编辑器中设计自己的本体，导出 RDF/XML，并分享交互式图谱。整个应用是完全静态站点，不依赖后端服务。

![Microsoft Fabric](https://img.shields.io/badge/Microsoft-Fabric-0078D4?style=flat-square&logo=microsoft)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 功能特性

### 交互式图谱探索

基于 Cytoscape.js 的图谱视图，可将任意本体渲染为交互式节点和边图。支持平移、缩放、点击节点查看属性，并可通过实时搜索栏筛选实体和关系。

### 本体目录

内置官方和社区贡献的本体库，覆盖六个领域（零售、电商、医疗健康、金融、制造、教育）。你可以按分类浏览，按名称或标签搜索，一键加载任意本体，并查看其 RDF 源码。每个本体都有可分享的深链接，例如 `/#/catalogue/official/cosmic-coffee`。

### 可视化本体设计器

全屏分栏编辑器，可从零创建本体，也可编辑已有本体。支持添加带图标、颜色和类型化属性的实体类型；定义带基数的关系；并在右侧实时预览随编辑更新的图谱。包含 50 步撤销/重做、实时校验，以及 RDF/XML 或 JSON 导出。

### RDF 导入与导出

完整支持 RDF/XML 往返转换，包括 OWL 类、数据类型属性、对象属性和基数。可导入 `.rdf` / `.owl` 文件，导出为 Microsoft Fabric IQ 期望的格式，并通过自动化往返测试验证保真度。

### 一键提交目录 PR

使用 GitHub 登录（设备码流程）后，可直接从设计器把本体提交到社区目录。应用会自动 fork 仓库、创建分支、提交 RDF 和元数据，并打开 pull request。

### 可嵌入组件

提供自包含 JavaScript 文件 `ontology-embed.js`，只需一个 `<script>` 标签即可在任意网页上渲染交互式本体查看器。支持深色/浅色主题、多种加载方式（目录 ID、URL、内联 base64）和点击查看详情。详见 [嵌入指南](docs/embed-guide.md)。

### 本体学院

结构化学习中心（`/#/learn`），包含 **9 门课程**，覆盖概念学习路径和动手实验：

- **本体基础**：6 篇文章，覆盖核心概念（什么是本体？→ RDF/OWL → Fabric IQ → 构建你的第一个本体 → 设计模式 → 贡献内容）。
- **7 条领域学习路径**：星际咖啡、电商、金融、医疗健康、制造、大学和人力资源系统。每条路径包含 4 篇循序渐进的文章，逐步构建本体，并通过实时嵌入图谱展示每一阶段新增的实体。
- **IQ 实验：零售供应链**：7 步动手实验，从零构建一个包含 15 个实体的本体（通过 6 个渐进式目录条目从 3 个实体扩展到 15 个实体）。

每篇文章都支持**演示模式**（按 `##` 标题切分为幻灯片），并包含带即时反馈的**交互式测验**。本体嵌入会从目录加载实时图谱，并可选显示差异高亮。

### 任务系统

五个渐进式任务，通过多步骤说明、提示、进度条和成就徽章，引导用户理解本体概念。

### 自然语言查询 Playground

输入自然语言问题（例如 “Which customers placed orders?”），即可查看它们如何映射到本体实体和关系。这是 Fabric IQ 的 NL2Ontology 能力预览。

### 命令面板与键盘快捷键

在任意位置按 `⌘K` / `Ctrl+K` 打开可搜索的命令面板。无需离开键盘即可跳转到目录、设计器、本体学院、导入/导出、帮助等页面。按 `?` 可快速打开帮助。命令面板支持方向键和 Enter 导航。

### 起步模板

设计器提供五个领域模板（零售、医疗健康、金融、IoT、教育），新用户无需面对空白页。每个模板都会创建 3 个带属性的实体和 2 条关系，可直接继续自定义。

### 交互式新手引导

首次访问者会看到 5 步引导，通过聚光灯遮罩依次突出页头、图谱、任务、检查器和设计器。可关闭，并可选择“不再显示”，该选项会保存到 `localStorage`。

### 深链接与 URL 路由

基于客户端 hash 的路由，每个页面都有可分享 URL：

| 路由 | 页面 |
|------|------|
| `/#/` | 首页（默认本体） |
| `/#/catalogue` | 本体图库 |
| `/#/catalogue/<source>/<slug>` | 指定本体（例如 `/#/catalogue/official/cosmic-coffee`） |
| `/#/designer` | 可视化设计器 |
| `/#/designer/<source>/<slug>` | 加载目录本体的设计器（例如 `/#/designer/official/cosmic-coffee`） |
| `/#/learn` | 本体学院课程目录 |
| `/#/learn/<course>` | 课程详情和文章列表 |
| `/#/learn/<course>/<article>` | 文章视图（含演示模式） |

## 官方本体

| 领域 | 本体 | 实体 | 关系 |
|------|------|------|------|
| 零售 | 星际咖啡公司 | 6 | 7 |
| 电商 | 在线零售 | 5 | 6 |
| 医疗健康 | 临床系统 | 5 | 6 |
| 金融 | 银行与金融 | 5 | 6 |
| 制造 | 工业 4.0 | 5 | 5 |
| 教育 | 大学系统 | 5 | 6 |

## 快速开始

### 前置条件

- Node.js 18+
- npm 9+

### 安装

```bash
cd Ontology-Playground
npm install
```

### 开发

```bash
npm run dev
```

访问 http://localhost:5173

### 生产构建

```bash
npm run build
```

构建流水线会编译目录、编译学习内容 Markdown、执行类型检查、打包应用，并构建嵌入组件。输出目录为 `build/`。

### 运行测试

```bash
npm test            # 单次运行
npm run test:watch  # 监听模式
```

## 部署

### Azure Static Web Apps（主要方式）

仓库内置 GitHub Actions 工作流，会在每次 push 到 `main` 时部署到 Azure SWA。

1. 在 Azure Portal 创建 Static Web App
2. 连接你的 GitHub 仓库
3. 复制部署 token，并添加为 GitHub secret：`AZURE_STATIC_WEB_APPS_API_TOKEN_GREEN_PLANT_0BB1D2910`
4. push 到 `main`，`.github/workflows/azure-static-web-apps-green-plant-0bb1d2910.yml` 会处理后续部署
5. pull request 会自动创建 PR 预览环境

### GitHub Pages（适合 fork）

另有独立工作流可部署到 GitHub Pages，适合 fork 仓库使用：

1. Fork 本仓库
2. 进入 **Settings → Pages → Source**，选择 **GitHub Actions**
3. push 到 `main`，`.github/workflows/deploy-ghpages.yml` 会构建并部署到 `https://<username>.github.io/<repo-name>/`

GitHub Pages 构建期间会自动将 `VITE_BASE_PATH` 环境变量设置为 `/<repo-name>/`，确保资源路径正确解析。

### 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `VITE_ENABLE_AI_BUILDER` | `false` | 启用 Azure OpenAI 本体构建器 |
| `VITE_ENABLE_LEGACY_FORMATS` | `false` | 启用 JSON/YAML/CSV 导入导出格式 |
| `VITE_BASE_PATH` | `/` | 应用基础路径（GitHub Pages 会自动设置） |
| `VITE_GITHUB_CLIENT_ID` | *空* | 用于一键目录 PR 的 GitHub OAuth App client ID（见[配置指南](docs/github-oauth-setup.md)） |
| `VITE_GITHUB_OAUTH_BASE` | *空* | GitHub Pages 部署使用的外部 OAuth 代理 URL（例如 Cloudflare Worker URL） |

## 项目结构

```text
Ontology-Playground/
├── src/
│   ├── components/       # React 组件（图谱、设计器、弹窗、学习页面）
│   ├── data/             # 本体模型、查询引擎、任务定义
│   ├── lib/              # 路由、RDF 解析/序列化、目录辅助函数
│   ├── store/            # Zustand store（应用状态、设计器状态）
│   ├── styles/           # CSS（受 Microsoft Fluent 启发的深色/浅色主题）
│   └── types/            # TypeScript 类型定义
├── catalogue/            # 官方和社区本体 RDF 文件
├── content/learn/        # 课程目录，包含 Markdown 文章、测验和元数据
├── scripts/              # 构建期编译器（目录、学习内容）
├── api/                  # Azure Functions 后端（可选，用于 AI builder）
├── docs/                 # 指南和文档
├── public/               # 静态资源（编译后的 catalogue.json、learn.json）
└── .github/workflows/    # CI/CD（Azure SWA + GitHub Pages）
```

## 文档

| 指南 | 说明 |
|------|------|
| [本体创作指南](docs/authoring-guide.md) | 如何创建适合 Playground 使用的本体：逐字段参考、最佳实践和分步演练 |
| [贡献本体：从设计到 GitHub](docs/contributing-ontology-from-design-to-github.md) | 端到端贡献流程：设计、RDF 导出、元数据、本地校验和 pull request |
| [Playground 功能演示指南](docs/playground-features-demo-guide.md) | 展示核心 Playground 能力并关联 Fabric IQ 与 Real-Time Intelligence 的分步演示脚本 |
| [本体学院演示指南](docs/ontology-school-demo-guide.md) | 面向课程、嵌入图谱、测验、演示模式和学习流程的现场演示计划 |
| [嵌入指南](docs/embed-guide.md) | 如何在任意网页中嵌入交互式本体组件 |
| [GitHub OAuth 配置](docs/github-oauth-setup.md) | 如何为一键目录 PR 配置 GitHub OAuth |
| [嵌入安全](docs/embed-security.md) | 可嵌入组件的安全模型 |
| [学习内容指南](docs/learn-content-guide.md) | 如何为本体学院编写课程、文章、测验和本体嵌入 |
| [本体学院审核流程](docs/ontology-school-review-workflow.md) | 学院课程内容的人工审核与批准流程 |

## AI Agent 快速开始

本仓库包含 Copilot 自定义文件，帮助 AI agent 稳定完成以下任务：

- 将客户 RDF/OWL 导入为目录可用格式
- 生成渐进式本体学院模块
- 将课程内容纳入人工审核流程

包含的资源：

- 技能：
   - `.github/skills/ontology-catalog-import/`：将外部/客户 RDF/OWL 导入为目录格式
   - `.github/skills/ontology-school-path-generator/`：生成渐进式本体学院模块
   - `.github/skills/community-ontology-contribution/`：按正确目录结构、元数据和校验规则，在 `catalogue/community/` 下添加贡献者本体
- RDF 接收说明：
   - `.github/instructions/rdf-intake.instructions.md`
- 可复用提示词：
   - `.github/prompts/import-rdf-to-catalog.prompt.md`
   - `.github/prompts/generate-ontology-school-module.prompt.md`

合并前建议执行以下校验：

```bash
npm run qa:tutorial-content
npm run build
```

## 技术栈

- **React 19** + TypeScript 5
- **Cytoscape.js**：图谱可视化（fcose layout）
- **Zustand**：状态管理
- **Vite**：构建工具
- **Framer Motion**：动画
- **Lucide Icons**：图标库
- **marked**：Markdown 编译（构建期）

## 了解更多

- [Microsoft Fabric IQ 本体文档](https://learn.microsoft.com/en-us/fabric/iq/ontology/overview)
- [Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/)

## 许可证

MIT

## 商标声明

本项目可能包含项目、产品或服务的商标或徽标。Microsoft 商标或徽标的授权使用必须遵循 Microsoft Trademark & Brand Guidelines。在本项目的修改版本中使用 Microsoft 商标或徽标时，不得造成混淆，也不得暗示 Microsoft 赞助。任何第三方商标或徽标的使用均受对应第三方政策约束。
