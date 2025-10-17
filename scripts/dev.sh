#!/bin/bash

# 开发脚本 - 启动所有服务

echo "🚀 启动 PNPM Monorepo 开发环境..."

# 检查 pnpm 是否安装
if ! command -v pnpm &> /dev/null; then
    echo "❌ PNPM 未安装，请先安装 PNPM"
    echo "npm install -g pnpm"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
pnpm install

# 构建子模块
echo "🔨 构建子模块..."
pnpm --filter @monorepo/dlf build
pnpm --filter @monorepo/acrsa build

# 启动 Portal 应用
echo "🌐 启动 Portal 应用..."
pnpm --filter @monorepo/portal dev