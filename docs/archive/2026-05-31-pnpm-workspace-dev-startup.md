# 归档：pnpm workspace 本地开发一键启动

日期：2026-05-31
语系：cn

## 目标

执行 TODO-0018：增加本地开发一键启动方式，并按用户要求改为 pnpm monorepo 内置并行启动方案。

## 关联待办

TODO-0018

## 计划

1. 将根 `dev` 脚本改为 pnpm workspace 并行编排。
2. 给 `server`、`web-admin`、`web-h5` 分别补充 `dev` 脚本。
3. 用 Node 实现服务端开发入口，负责启动 ThinkJS API 和本地图片静态文件服务。
4. 移除 bash 根启动脚本，避免 Windows 原生环境不兼容。
5. 更新 README、各端 README、项目事实和当前进度。
6. 执行轻量验证。

## 完成内容

- 根 `package.json` 新增 `dev` 脚本，使用 `pnpm --parallel --stream --filter server --filter web-front --filter web-h5 run dev` 并行启动各 workspace。
- `server/package.json` 新增 `dev` 脚本，入口为 `server/script/dev.js`。
- `web-admin/package.json` 新增 `dev` 脚本，固定开发端口为 `8080`。
- `web-h5/package.json` 新增 `dev` 脚本，固定开发端口为 `8081`。
- 新增 `server/script/dev.js`，用 Node 内置能力启动 API 服务和本地图片静态文件服务。
- 更新根 README、服务端 README、管理端 README、H5 README 和 `docs/project-facts.md`。

## 验证

- `node --check server/script/dev.js` 通过。
- 四个 `package.json` JSON 解析通过。
- `pnpm run verify:server` 通过。
- `git diff --check` 通过。

## 决策

- 使用 pnpm workspace 的 `--parallel --stream --filter ... run dev` 作为根目录一键启动编排方式。
- 不再使用根目录 bash 启动脚本，避免 Windows 原生环境兼容性问题。
- 服务端内部同时需要 API 和图片静态文件服务，因此由 `server/script/dev.js` 在 `server` workspace 内部处理。
- 本事项只改善本地开发体验，不推进视频、文档管理、Flutter 或 TypeScript 迁移。

## 后续事项

- 若需要更严格的跨平台验证，可分别在 Windows PowerShell、macOS、Linux 下执行一次 `pnpm run dev` 手工 smoke test。
- 后续建议优先补齐数据库 schema、初始管理员账号和真实环境 smoke test 前置资料。
