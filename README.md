# PNPM Monorepo 示例

这是一个使用 PNPM 管理的 monorepo 项目，包含一个 Portal 主应用和两个子模块（DLF 和 ACRSA）。

## 项目结构

```
├── apps/
│   └── portal/                 # Portal 主应用
│       ├── src/
│       │   ├── index.ts       # 主入口文件
│       │   └── portal.test.ts # 测试文件
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   ├── dlf/                   # DLF (数据层框架) 子模块
│   │   ├── src/
│   │   │   ├── index.ts      # DLF 服务实现
│   │   │   └── dlf.test.ts   # 测试文件
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── acrsa/                 # ACRSA (高级内容识别和情感分析) 子模块
│       ├── src/
│       │   ├── index.ts      # ACRSA 服务实现
│       │   └── acrsa.test.ts # 测试文件
│       ├── package.json
│       └── tsconfig.json
├── package.json               # 根 package.json
├── pnpm-workspace.yaml       # PNPM workspace 配置
└── README.md
```

## 模块说明

### Portal 主应用
- **功能**: 作为主要的 Web 应用程序，集成 DLF 和 ACRSA 服务
- **端口**: 3000
- **技术栈**: Express.js + TypeScript
- **API 端点**:
  - `GET /health` - 健康检查
  - `GET /api/dlf/data` - 获取 DLF 数据
  - `GET /api/acrsa/analyze` - 文本分析
  - `GET /api/combined` - 组合服务

### DLF (Data Layer Framework)
- **功能**: 数据层框架，提供数据管理和查询功能
- **特性**:
  - 数据 CRUD 操作
  - 查询过滤和排序
  - 数据统计分析
  - 支持元数据

### ACRSA (Advanced Content Recognition and Sentiment Analysis)
- **功能**: 高级内容识别和情感分析
- **特性**:
  - 情感分析
  - 关键词提取
  - 实体识别
  - 文本相似度比较
  - 多语言支持

## 快速开始

### 安装依赖
```bash
# 安装所有依赖
pnpm install
```

### 构建项目
```bash
# 构建所有包
pnpm build

# 构建特定包
pnpm --filter @monorepo/dlf build
pnpm --filter @monorepo/acrsa build
pnpm --filter @monorepo/portal build
```

### 运行开发服务器
```bash
# 启动 Portal 应用
pnpm --filter @monorepo/portal dev

# 或者并行启动所有开发服务器
pnpm dev
```

### 运行测试
```bash
# 运行所有测试
pnpm test

# 运行特定包的测试
pnpm --filter @monorepo/dlf test
```

## 开发指南

### 添加新依赖

为特定包添加依赖：
```bash
# 为 Portal 添加依赖
pnpm --filter @monorepo/portal add express

# 为 DLF 添加开发依赖
pnpm --filter @monorepo/dlf add -D jest
```

为根目录添加共享依赖：
```bash
pnpm add -w typescript
```

### 包间依赖

子模块之间可以相互依赖，使用 `workspace:*` 协议：
```json
{
  "dependencies": {
    "@monorepo/dlf": "workspace:*",
    "@monorepo/acrsa": "workspace:*"
  }
}
```

### 脚本命令

- `pnpm dev` - 启动所有开发服务器
- `pnpm build` - 构建所有包
- `pnpm test` - 运行所有测试
- `pnpm lint` - 运行代码检查
- `pnpm clean` - 清理构建文件

## API 使用示例

### 获取 DLF 数据
```bash
curl http://localhost:3000/api/dlf/data
```

### 文本情感分析
```bash
curl "http://localhost:3000/api/acrsa/analyze?input=这个产品很棒！"
```

### 组合服务
```bash
curl http://localhost:3000/api/combined
```

## 技术栈

- **包管理器**: PNPM
- **语言**: TypeScript
- **Web 框架**: Express.js
- **测试框架**: Jest
- **代码检查**: ESLint
- **自然语言处理**: Natural

## 许可证

MIT