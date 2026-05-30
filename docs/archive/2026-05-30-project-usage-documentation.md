# 归档：项目使用说明补充

日期：2026-05-30
语系：cn

## 目标

执行 TODO-0004：补充各端使用说明和项目文档，让 README 反映当前 pnpm workspace、运行环境、配置项、验证命令和安全审计状态。

## 关联待办

TODO-0004

## 计划

1. 盘点根 README、`server/README.md`、`web-admin/README.md`、`web-h5/README.md` 的现状和缺口。
2. 补充根 README，说明项目结构、当前功能边界、pnpm workspace、统一安装、验证和安全审计入口。
3. 补充服务端 README，说明 Node/pnpm 要求、环境变量、启动命令、上传目录、Sharp 构建脚本和部署注意事项。
4. 补充管理端和 H5 README，说明安装、启动、构建、接口环境切换和当前限制。
5. 检查文档链接、命令和事实是否与 `docs/project-facts.md` 保持一致。

## 完成内容

- 补充根 README：项目结构、当前功能、环境要求、安装、常用命令、各端说明和已知限制。
- 补充 `server/README.md`：Node.js/pnpm 要求、服务端启动、环境变量、图片上传链路、验证命令和 pm2 部署注意事项。
- 补充 `web-admin/README.md`：开发、构建、接口地址、当前功能和注意事项；移除不存在的 `npm run test` 说明。
- 补充 `web-h5/README.md`：开发、构建、接口地址、照片墙功能和注意事项。
- 更新 `docs/project-facts.md`，记录 README 已覆盖当前使用说明。

## 验证

- `git diff --check` 通过。
- README 旧占位说明扫描通过，未发现 `npm run test`、旧“后面会陆续补充”等残留。
- README 关键路径检查通过，`server/README.md`、`web-admin/README.md`、`web-h5/README.md`、`docs/verification.md`、`server/script/file-server.sh` 均存在。

## 决策

- 本阶段只补充已有项目使用说明，不推进视频、文档管理、Flutter 或 TypeScript 迁移。
- 管理端 README 不再保留 `npm run test` 说明，因为 `web-admin/package.json` 当前未定义 `test` 脚本。
- 文档明确 Vue 2 low 漏洞属于框架大版本迁移边界，当前仅记录风险说明。

## 后续事项

- TODO-0015：TypeScript 渐进迁移仍是研究项，不进入当前实施主线，除非用户明确要求。
- TODO-0005：继续作为方向性事项保留，用于约束后续只完善已有图片管理和展示能力，不扩展视频、文档管理或 Flutter 新功能。
