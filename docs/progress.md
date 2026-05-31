# 当前进度

最后更新：2026-05-31
语系：cn

本文档只追踪当前正在推进的阶段。已完成阶段应作为独立文件归档到 `docs/archive/`。

## 当前目标

执行 TODO-0018：增加本地开发一键启动方式。

## 关联待办

TODO-0018

## 当前计划

1. 将根 `dev` 脚本改为 pnpm workspace 并行编排：同时运行 `server`、`web-front`、`web-h5` 的 `dev` 脚本。
2. 给 `server`、`web-admin`、`web-h5` 分别补充跨平台 `dev` 脚本。
3. 用 Node 实现服务端开发入口，负责启动 ThinkJS API 和本地图片静态文件服务。
4. 移除 bash 根启动脚本，更新 README 和项目事实。
5. 执行轻量验证，确认脚本语法、JSON 和服务端关键文件通过。

## 任务拆解

| 任务 | 状态 | 备注 |
| --- | --- | --- |
| 替换根启动入口 | done | 已改为 pnpm workspace 并行执行。 |
| 补充各 workspace `dev` 脚本 | done | 已覆盖服务端、管理端、H5。 |
| 实现服务端开发入口 | done | 已用 Node 启动 API 和静态文件服务。 |
| 更新文档说明 | done | 已更新根 README、各端 README 和 `docs/project-facts.md`。 |
| 验证脚本 | done | 已执行 Node 语法、JSON、服务端和 diff 检查。 |

## 状态

done

## 决策记录

- 2026-05-31：TODO-0017 已完成并按用户明确要求归档。
- 2026-05-31：用户询问本地开发是否可以一键启动，决定新增根目录开发启动入口，不推进新业务功能。

## 阻塞项

暂无。

## 验证

- 2026-05-31：`node --check server/script/dev.js` 通过。
- 2026-05-31：`node -e "for (const f of ['package.json','server/package.json','web-admin/package.json','web-h5/package.json']) JSON.parse(require('fs').readFileSync(f,'utf8'))"` 通过。
- 2026-05-31：`pnpm run verify:server` 通过。
- 2026-05-31：`git diff --check` 通过。

## 下一步

等待用户确认是否将 TODO-0018 归档；如确认，则创建归档文件、更新归档索引、从 `docs/backlog.md` 移除 TODO-0018，并重置本文档。
