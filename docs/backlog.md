# 待办资源池

最后更新：2026-05-30
语系：cn

本文档是 `docs/progress.md` 的上游资源池，只存放尚未完成或仍需决策的候选事项、已确认待办、后续需求、问题修复、调研和优化项。

已完成事项不长期保留在本文档中。阶段完成并写入 `docs/archive/` 后，应从本文档移除，并在 `docs/archive/README.md` 的归档索引中登记。

## 编号规则

下一个待办 ID：TODO-0017

新增待办时使用上面的 ID，然后递增该值。不要依赖历史归档中的最大编号来推断下一个 ID。

## 状态值

- `candidate`：已发现或已提出，但尚未确认执行
- `todo`：已确认的后续事项
- `planned`：已进入当前或下一阶段计划
- `doing`：正在执行
- `blocked`：因缺少输入或外部条件暂时阻塞
- `done`：已完成，但尚未归档；归档后应从本文档移除

## 类型值

- `bug`
- `feature`
- `docs`
- `refactor`
- `chore`
- `research`
- `optimization`

## 当前待办

| ID | 状态 | 类型 | 事项 | 来源 | 证据 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| TODO-0001 | candidate | feature | 新增视频管理能力。 | `README.md` 后续计划 | 根 README 列出“新增视频管理”。 | 用户已明确本次暂缓；不要纳入当前阶段。 |
| TODO-0002 | candidate | feature | 新增文档管理和前端展现能力，覆盖 PDF / WORD / EXCEL / PPT / TXT。 | `README.md` 后续计划 | 根 README 列出“新增文档（PDF / WORD / EXCEL / PPT / TXT）的管理和前端的展现”。 | 用户已明确本次暂缓；不要纳入当前阶段。 |
| TODO-0003 | candidate | feature | 新增 Flutter 前端。 | `README.md` 后续计划 | 根 README 列出“前端新增 Flutter”。 | 用户已明确本次暂缓；不要纳入当前阶段。 |
| TODO-0004 | candidate | docs | 补充各端使用说明和项目文档。 | `README.md` 说明 | 根 README 写明“很多用法介绍没来得及写 README，后面会陆续补充”。 | 可优先补运行环境、启动命令、配置项和部署流程。 |
| TODO-0005 | planned | refactor | 完善当前项目已有功能，优先围绕已实现的图片管理和展示能力做质量提升。 | 用户明确本次任务目标 | 用户说明“本次任务的核心目标是完善当前项目的已有功能，而不是做新功能迭代”。 | 当前阶段目标；避免扩展到视频、文档、Flutter 等新功能。 |
| TODO-0006 | done | chore | P0 建立依赖治理基线：引入 pnpm workspace 和统一锁文件。 | 用户关于 pnpm 和安全漏洞的疑问；项目通读 | 仓库有 `server/`、`web-admin/`、`web-h5/` 三个 npm 子项目；此前没有 lockfile，`npm audit --json` 在三个子项目均因 `ENOLOCK` 失败；现已建立根 `package.json`、`pnpm-workspace.yaml`、`.npmrc` 和统一 `pnpm-lock.yaml`。 | 已完成基线建立，采用 `node-linker=hoisted` 兼容老工具链；等待用户确认或明确要求后再归档。 |
| TODO-0007 | todo | bug | P0 修复管理端删除图片接口无成功响应。 | 项目通读 | `server/src/controller/admin/image.js` 的 `deleteAction` 删除后没有返回 `this.success()`，管理端删除流程依赖 Promise 完成后刷新列表。 | 影响已有图片管理核心链路。 |
| TODO-0008 | todo | bug | P0 修复编辑图片时缩略图和上传图片 ID 不同步更新。 | 项目通读 | `web-admin/src/views/file/image/ImageAdd.vue` 编辑提交了 `image_thumb`，但 `server/src/controller/admin/image.js` 的 `setAction` 未更新 `image_thumb` 和 `image_id`。 | 替换图片后列表/H5 可能仍显示旧缩略图。 |
| TODO-0009 | todo | bug | P0 修复新增多张图片时未等待所有数据库写入完成。 | 项目通读 | `server/src/controller/admin/image.js` 的 `addAction` 使用 `params.images.forEach(async ...)` 后立即返回成功。 | 可能导致响应成功时图片记录尚未全部写入。 |
| TODO-0010 | done | optimization | P1 依赖安全升级第一批：优先低破坏面依赖。 | 用户关于 GitHub 安全漏洞提示的疑问；项目通读；公开安全信息 | `web-admin` 和 `web-h5` 已将 `axios` 升级到 `^1.16.1`，并将 `vue` / `vue-template-compiler` 对齐到 `2.7.16`；`web-h5` 固定 `@moohng/postcss-px2vw@1.0.2` 并显式指定 PostCSS 配置目录。 | 第一批已完成；`pnpm audit --prod` 从 40 个生产依赖漏洞降到 15 个，等待用户确认或明确要求后再归档。 |
| TODO-0011 | todo | chore | P1 服务端配置安全治理：外置敏感配置和环境差异配置。 | 项目通读 | `server/src/config/adapter.js` 存在明文数据库连接信息；`server/src/config/define.js` 和 `server/script/file-server.sh` 存在本机绝对路径和固定域名。 | 兼容现有本地启动方式，建议提供环境变量默认值或本地配置模板。 |
| TODO-0012 | todo | bug | P1 增强图片上传链路健壮性。 | 项目通读 | `server/src/controller/common/upload.js` 写文件前未确保目标目录存在，也没有统一捕获 Sharp 或文件系统错误。 | 首次部署、目录缺失或图片处理异常时应返回明确错误。 |
| TODO-0013 | todo | bug | P2 修复前端已有体验和状态问题。 | 项目通读 | `Login.vue` 的用户名表单 `prop` 拼写为 `accout`；`XTable.vue` 请求失败时 loading 可能不恢复；`web-h5/src/components/XList.vue` 存在 `defautl` 拼写和分页完成判断问题；`ImageView.vue` 边界提示与循环行为不一致。 | 可作为 P0/P1 完成后的集中小修。 |
| TODO-0014 | todo | chore | P2 建立最小验证体系，保证后续修复和依赖升级可验证。 | 项目通读；本地命令检查 | 现有脚本包含服务端 `test/lint`、前端 `lint/build`，但尚未确认当前环境可跑；`web-admin/README.md` 提到 `npm run test` 但 package 未定义测试脚本。 | 至少沉淀可执行的安装、lint、build、服务端 smoke test 或接口级验证流程。 |
| TODO-0015 | candidate | research | P3 TypeScript 渐进迁移评估，暂不作为本轮实施主线。 | 用户关于 TS 的疑问；项目通读 | 当前项目是 Vue 2 + ThinkJS 3 + 老 Vue CLI，多处依赖较旧；本轮目标是完善已有功能和依赖安全治理。 | 结论倾向暂缓；更适合在依赖安全稳定后，结合 Vue 3/Vite 或框架升级再评估。 |
| TODO-0016 | todo | chore | P1 依赖安全升级第二批：评估并处理服务端剩余生产依赖漏洞。 | TODO-0010 后续审计结果 | `pnpm audit --prod` 剩余 15 个生产依赖漏洞，主要路径为 `server>sharp`、`server>sharp>tar`、`server>thinkjs>think-validator>validator`、`server>think-cache>think-helper>ms/uuid`，另有 Vue 2 自身 low 漏洞需通过框架大版本升级才能消除。 | 需要单独评估 `sharp >=0.32.6` 对 Node 运行时和部署环境的影响；ThinkJS 间接依赖可能需要 overrides、框架升级或接受风险。 |

## 维护规则

- `backlog = 当前资源池`，不要把它当作长期历史文件。
- 已完成事项归档后，从本文档移除。
- 已放弃事项如果有决策价值，应写入归档；如果只是无效候选，直接移除。
- 需要查历史时，阅读 `docs/archive/README.md` 和对应归档文件。
- 新增事项应尽量标注来源和证据。不要在缺少用户确认或项目证据时，把推断事项提升为已确认工作。
