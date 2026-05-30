# 文件管理系统全栈

这是一个以图片管理和照片墙展示为核心的全栈项目。当前仓库包含 ThinkJS 服务端、Vue 2 管理端和 Vue 2 H5 照片墙。

## 项目结构

| 目录 | 说明 |
| --- | --- |
| `server/` | 服务端，基于 ThinkJS，提供管理端和 H5 端接口。 |
| `web-admin/` | 管理端，基于 Vue 2 和 View Design，用于登录、上传和管理图片。 |
| `web-h5/` | H5 端，基于 Vue 2 和 Vant，用于展示照片墙。 |
| `docs/` | 项目事实、当前进度、待办和阶段归档。 |

## 当前功能

- 图片上传，支持 GIF / JPG / PNG。
- 管理端图片新增、编辑、展示状态管理、删除和列表筛选。
- H5 照片墙分页展示已标记为展示状态的图片。
- 服务端数据库、上传目录、文件访问地址等配置支持通过环境变量覆盖。
- 统一 pnpm workspace 和 `pnpm-lock.yaml` 管理依赖。

暂不包含视频管理、文档管理、Flutter 前端或 TypeScript 迁移。这些事项仍在待办或研究阶段。

## 环境要求

- Node.js：服务端依赖 `sharp@0.32.6`，要求 Node.js `>=14.15.0`。
- pnpm：根 `package.json` 声明 `>=10 <11`。
- MySQL：服务端默认使用数据库 `db_babylife`，表前缀 `admin_`。
- 本地图片文件服务：开发环境默认使用 `live-server` 监听 `11000` 端口。

## 安装

在仓库根目录执行：

```sh
pnpm install
```

pnpm v10 可能提示部分依赖构建脚本被忽略。若需要真实运行图片上传链路中的 Sharp 原生模块，请按当前环境确认并执行：

```sh
pnpm approve-builds
```

## 常用命令

```sh
pnpm run verify
pnpm run audit:prod
pnpm audit --prod --audit-level moderate
pnpm --filter server start
pnpm --filter web-front serve
pnpm --filter web-h5 serve
```

说明：

- `pnpm run verify` 会校验锁文件、服务端关键文件语法，并构建管理端和 H5 端。
- `pnpm run audit:prod` 当前仍会因 Vue 2 自身 low 漏洞返回非 0。
- `pnpm audit --prod --audit-level moderate` 用于确认生产依赖 high/moderate 漏洞是否清零，当前应通过。

## 各端说明

- 服务端说明见 [server/README.md](server/README.md)。
- 管理端说明见 [web-admin/README.md](web-admin/README.md)。
- H5 端说明见 [web-h5/README.md](web-h5/README.md)。

## 当前已知限制

- 仓库未包含 SQL schema、数据库迁移文件或初始管理员账号说明。
- 管理端和 H5 端构建存在资源体积 warning。
- 当前尚未建立真实数据库和上传接口的自动化 smoke test。
- Vue 2 low 漏洞需要通过 Vue 3 大版本迁移才能消除，当前仅记录风险说明。
