# 当前进度

最后更新：2026-05-30
语系：cn

本文档只追踪当前正在推进的阶段。已完成阶段应作为独立文件归档到 `docs/archive/`。

## 当前目标

执行 TODO-0004：补充各端使用说明和项目文档，让 README 反映当前 pnpm workspace、运行环境、配置项、验证命令和安全审计状态。

## 关联待办

TODO-0004

## 当前计划

1. 盘点根 README、`server/README.md`、`web-admin/README.md`、`web-h5/README.md` 的现状和缺口。
2. 补充根 README，说明项目结构、当前功能边界、pnpm workspace、统一安装、验证和安全审计入口。
3. 补充服务端 README，说明 Node/pnpm 要求、环境变量、启动命令、上传目录、Sharp 构建脚本和部署注意事项。
4. 补充管理端和 H5 README，说明安装、启动、构建、接口环境切换和当前限制。
5. 检查文档链接、命令和事实是否与 `docs/project-facts.md` 保持一致。

## 任务拆解

| 任务 | 状态 | 备注 |
| --- | --- | --- |
| 盘点现有 README | done | 已阅读四份 README 和关键配置。 |
| 补充根 README | done | 已覆盖项目结构、workspace、验证和安全审计。 |
| 补充服务端 README | done | 已覆盖环境变量、启动、Sharp 和部署注意事项。 |
| 补充管理端 README | done | 已覆盖开发、构建和接口地址。 |
| 补充 H5 README | done | 已覆盖开发、构建、接口地址和照片墙说明。 |
| 验证并记录结果 | done | `git diff --check` 通过；旧占位说明和不存在的 `npm run test` 说明已清理。 |

## 状态

done

## 决策记录

- 2026-05-30：开始 TODO-0004，本阶段只补充已有项目使用说明，不推进视频、文档管理、Flutter 或 TypeScript 迁移。
- 2026-05-30：管理端 README 不再保留 `npm run test` 说明，因为 `web-admin/package.json` 当前未定义 `test` 脚本。

## 阻塞项

暂无。

## 验证

- 2026-05-30：执行 `git diff --check` 通过。
- 2026-05-30：执行 README 旧占位说明扫描，未发现 `npm run test`、旧“后面会陆续补充”等残留。
- 2026-05-30：执行 README 关键路径检查，`server/README.md`、`web-admin/README.md`、`web-h5/README.md`、`docs/verification.md`、`server/script/file-server.sh` 均存在。

## 下一步

TODO-0004 已完成但未归档；等待用户体验确认或明确归档指令。
