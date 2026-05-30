# 当前进度

最后更新：2026-05-30
语系：cn

本文档只追踪当前正在推进的阶段。已完成阶段应作为独立文件归档到 `docs/archive/`。

## 当前目标

执行 TODO-0016：评估并处理服务端剩余生产依赖漏洞，重点关注 `sharp/tar`、ThinkJS 间接依赖 `validator/ms/uuid`，以及 Vue 2 low 漏洞的风险说明。

## 关联待办

TODO-0016

## 当前计划

1. 复核当前 `pnpm run audit:prod` 输出，确认剩余漏洞、严重度和依赖路径。
2. 检查 `server/` 生产依赖版本和 `pnpm-lock.yaml` 中的实际解析版本。
3. 评估 `sharp` 升级对 Node 运行时、构建脚本和部署环境的影响。
4. 评估 ThinkJS 间接依赖 `validator/ms/uuid` 是否适合通过 pnpm overrides 降低风险，或需要记录接受风险。
5. 说明 Vue 2 low 漏洞的剩余风险和解决边界，避免把框架大版本迁移混入当前修复。
6. 如存在低破坏面可处理项，实施后运行最小验证；无法低风险处理的事项写入文档和 backlog 备注。

## 任务拆解

| 任务 | 状态 | 备注 |
| --- | --- | --- |
| 复核生产依赖审计结果 | done | `pnpm run audit:prod` 从 15 个漏洞复核开始，处理后仅剩 Vue 2 low 漏洞。 |
| 分析服务端依赖路径 | done | 已确认 `sharp/tar`、`think-validator>validator`、`think-helper>ms/uuid`、`think-ms>ms` 路径。 |
| 制定处理策略 | done | `sharp` 采用直接升级；ThinkJS 间接依赖采用定向 `pnpm.overrides`；Vue 2 low 记录为框架迁移边界。 |
| 实施低风险处理 | done | 已升级 `sharp`，并定向覆盖 `validator/ms/uuid` 修复版本。 |
| 验证并记录结果 | done | `pnpm run verify` 通过；`pnpm audit --prod --audit-level moderate` 通过。 |

## 状态

done

## 决策记录

- 2026-05-30：上一阶段已完成并归档；后续如继续本轮方向，优先从 `docs/backlog.md` 选择 TODO-0016。
- 2026-05-30：开始 TODO-0016，本阶段只处理依赖安全评估与低风险治理，不引入新功能。
- 2026-05-30：`sharp@0.32.6` 要求 Node.js `>=14.15.0`，因此同步更新服务端 `engines.node`。
- 2026-05-30：Vue 2 low 漏洞需要 Vue 3 大版本迁移才能消除，本阶段仅记录风险说明，不推进框架迁移。

## 阻塞项

暂无。

## 验证

- 2026-05-30：归档开始前确认工作区干净，且对应提交记录存在。
- 2026-05-30：执行 `pnpm run audit:prod`，处理前剩余 15 个生产漏洞，严重度为 8 high、6 moderate、1 low。
- 2026-05-30：执行 `pnpm install --lockfile-only` 通过，刷新 `pnpm-lock.yaml`。
- 2026-05-30：执行 `pnpm run audit:prod`，处理后仅剩 Vue 2 low 漏洞；命令因该剩余漏洞返回非 0。
- 2026-05-30：执行 `pnpm audit --prod --audit-level moderate` 通过，确认生产依赖 high/moderate 漏洞已清零。
- 2026-05-30：执行 `pnpm install` 通过，pnpm 提示若要允许依赖构建脚本需运行 `pnpm approve-builds`。
- 2026-05-30：执行 `pnpm run verify` 通过；管理端和 H5 端构建均仅剩体积 warning。

## 下一步

TODO-0016 已完成但未归档；等待用户体验确认或明确归档指令。
