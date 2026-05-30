# 归档：服务端生产依赖漏洞治理

日期：2026-05-30
语系：cn

## 目标

执行 TODO-0016：评估并处理服务端剩余生产依赖漏洞，重点关注 `sharp/tar`、ThinkJS 间接依赖 `validator/ms/uuid`，以及 Vue 2 low 漏洞的风险说明。

## 关联待办

TODO-0016

## 计划

1. 复核 `pnpm run audit:prod` 输出，确认剩余漏洞、严重度和依赖路径。
2. 检查 `server/` 生产依赖版本和 `pnpm-lock.yaml` 中的实际解析版本。
3. 评估 `sharp` 升级对 Node 运行时、构建脚本和部署环境的影响。
4. 评估 ThinkJS 间接依赖 `validator/ms/uuid` 是否适合通过 pnpm overrides 降低风险。
5. 说明 Vue 2 low 漏洞的剩余风险和解决边界，避免把框架大版本迁移混入当前修复。
6. 实施低破坏面处理并运行最小验证。

## 完成内容

- 将 `server` 的 `sharp` 从 `^0.23.1` 升级到 `^0.32.6`，移除旧 `sharp>tar` 漏洞链路。
- 将服务端 Node.js 运行时下限从 `>=6.0.0` 调整为 `>=14.15.0`，匹配 `sharp@0.32.6` 的要求。
- 在根 `package.json` 增加定向 `pnpm.overrides`：
  - `think-validator>validator` -> `13.15.22`
  - `think-helper>ms` -> `2.1.3`
  - `think-ms>ms` -> `2.1.3`
  - `think-helper>uuid` -> `11.1.1`
- 刷新 `pnpm-lock.yaml`，确认服务端高/中风险生产依赖漏洞已清理。
- 更新 `docs/project-facts.md` 和 `docs/verification.md`，记录审计状态、Node 下限、overrides 策略、Vue 2 low 漏洞边界和 Sharp 构建脚本注意事项。

## 验证

- `pnpm run audit:prod`：处理前剩余 15 个生产漏洞，严重度为 8 high、6 moderate、1 low。
- `pnpm install --lockfile-only` 通过，刷新 `pnpm-lock.yaml`。
- `pnpm run audit:prod`：处理后仅剩 Vue 2 low 漏洞；命令因该剩余漏洞返回非 0。
- `pnpm audit --prod --audit-level moderate` 通过，确认生产依赖 high/moderate 漏洞已清零。
- `pnpm install` 通过；pnpm 提示若要允许依赖构建脚本需运行 `pnpm approve-builds`。
- `pnpm run verify` 通过；管理端和 H5 端构建均仅剩体积 warning。
- `git diff --check` 通过。

## 决策

- `sharp@0.32.6` 是满足安全修复且相对低破坏面的版本；暂不升级到更高版本以避免额外抬高 Node 运行时要求。
- ThinkJS 间接依赖采用定向 `pnpm.overrides`，避免全局覆盖 `validator/ms/uuid` 影响无关依赖。
- Vue 2 low 漏洞需要 Vue 3 大版本迁移才能消除；本阶段只记录风险说明，不推进框架迁移。
- pnpm v10 默认忽略部分依赖构建脚本；真实运行图片上传链路前，需要按环境确认 `pnpm approve-builds`。

## 后续事项

- TODO-0004：补充各端使用说明和项目文档，尤其是运行环境、Node/pnpm 版本、环境变量、`pnpm approve-builds`、验证命令和安全审计说明。
- TODO-0015：TypeScript 渐进迁移继续保持研究项，不进入当前实施主线，除非用户明确要求。
