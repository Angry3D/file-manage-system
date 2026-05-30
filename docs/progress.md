# 当前进度

最后更新：2026-05-30
语系：cn

本文档只追踪当前正在推进的阶段。已完成阶段应作为独立文件归档到 `docs/archive/`。

## 当前目标

完善当前项目已有功能，优先围绕已实现的图片管理和展示能力做质量提升；本阶段不推进视频、文档、Flutter 等新功能迭代。

## 关联待办

TODO-0005, TODO-0013

## 当前计划

1. 先完成依赖治理基线，建立 pnpm workspace 和统一锁文件。
2. 基于可重复依赖图处理 GitHub 安全漏洞提示，优先低破坏面依赖。
3. 修复图片管理/展示已有核心链路中的确定性问题。
4. 处理配置安全、上传健壮性和前端体验问题。
5. 建立最小验证体系，并记录验证结果。

## 任务拆解

| 任务 | 状态 | 备注 |
| --- | --- | --- |
| 盘点已有图片管理/展示链路 | done | 已覆盖 `server/`、`web-admin/`、`web-h5/`，客观事实已补充到 `docs/project-facts.md`。 |
| 确认本阶段具体修复点 | done | 用户已确认落盘；优化集合已写入 `docs/backlog.md` 的 TODO-0006 至 TODO-0015。 |
| 建立依赖治理基线 | done | 已引入 pnpm workspace、根 package、hoisted 配置和统一锁文件。 |
| 实施依赖安全升级第一批 | done | 已升级两个前端的 axios，显式对齐 Vue 2 最终补丁线，并修复 H5 PostCSS 构建兼容问题。 |
| 修复管理端删除图片接口响应 | done | `deleteAction` 删除后返回 `this.success(count)`，其中 `count` 为数据库删除行数。 |
| 修复编辑图片字段同步 | done | 替换图片时前端提交 `image_thumb` 和 `image_id`，服务端同步更新原图、缩略图和上传图片 ID。 |
| 修复新增多图写入等待 | done | `addAction` 使用 `Promise.all` 等待所有图片记录写入完成后返回实际写入数量。 |
| 外置服务端敏感和环境差异配置 | done | 已支持环境变量覆盖数据库连接、上传目录、文件访问地址、服务端端口和本地文件服务端口；数据库密码不再保留明文默认值。 |
| 增强图片上传链路健壮性 | done | 写文件前会创建目标目录，并统一捕获图片处理和文件系统错误后返回业务错误。 |
| 修复前端已有体验和状态问题 | done | 已修复登录校验、表格 loading、H5 分页、图片查看边界行为，并移除图片管理调试输出。 |
| 实施修复或完善 | pending | 遵循现有项目风格。 |
| 验证并记录结果 | pending | 使用项目已有命令或手工验证。 |

## 状态

planned

## 决策记录

- 2026-05-30：用户明确 `TODO-0001` 到 `TODO-0003` 暂缓，本次核心目标是完善已有功能，而不是做新功能迭代。
- 2026-05-30：针对 TS、pnpm、GitHub 安全漏洞提示的疑问，确认本轮优先建立依赖治理基线并处理依赖安全与已有功能问题；TypeScript 仅作为后续研究项，不进入本轮实施主线。
- 2026-05-30：pnpm workspace 基线采用 `node-linker=hoisted`，优先兼容 ThinkJS 3、Vue CLI 3/4 等老工具链，再逐步做依赖安全升级。
- 2026-05-30：TODO-0006 已提交为 `341c391 chore: add pnpm workspace dependency baseline`，随后进入 TODO-0010。
- 2026-05-30：TODO-0010 第一批安全升级聚焦两个前端，暂不在同一批次升级服务端 `sharp` 或 ThinkJS 间接依赖，避免把服务端运行时约束变化混入低破坏面升级。
- 2026-05-30：TODO-0010 已提交为 `1f015a3 chore: upgrade frontend security dependencies`，随后进入 TODO-0007。
- 2026-05-30：TODO-0007 已提交为 `cdc4286 fix: return success response after image delete`，随后进入 TODO-0008。
- 2026-05-30：TODO-0008 已提交为 `e9d8b32 fix: sync image thumbnail fields on edit`，随后进入 TODO-0009。
- 2026-05-30：TODO-0009 已提交为 `0a62c86 fix: wait for all image inserts before success`，随后进入 TODO-0011。
- 2026-05-30：服务端数据库密码不再保留明文默认值，后续本地或部署启动需要通过 `BABYLIFE_DB_PASSWORD` 注入非空密码。
- 2026-05-30：TODO-0011 已提交为 `e76abd7 chore: externalize server environment config`，随后进入 TODO-0012。
- 2026-05-30：TODO-0012 已提交为 `4ab45e4 fix: harden image upload processing`，随后进入 TODO-0013。

## 阻塞项

暂无。

## 验证

- 2026-05-30：已完成项目通读和静态盘点。已完成阶段见 `docs/archive/README.md`。
- 2026-05-30：执行 `pnpm install --lockfile-only` 成功生成统一 `pnpm-lock.yaml`；执行 `pnpm install --lockfile-only --frozen-lockfile` 通过。
- 2026-05-30：执行 `pnpm audit --prod` 建立安全审计基线，发现生产依赖漏洞 40 个，严重度为 17 high、21 moderate、2 low；命令因发现漏洞返回非 0，后续进入 TODO-0010 处理。
- 2026-05-30：TODO-0010 后执行 `pnpm install --lockfile-only --frozen-lockfile` 通过。
- 2026-05-30：TODO-0010 后执行 `pnpm audit --prod`，生产依赖漏洞降至 15 个，严重度为 8 high、6 moderate、1 low；命令因剩余漏洞返回非 0。
- 2026-05-30：执行 `pnpm --filter ./web-admin build` 通过，有既有 `no-console` 和体积 warning。
- 2026-05-30：执行 `pnpm --filter ./web-h5 build` 通过，有体积 warning。
- 2026-05-30：TODO-0007 执行 `node --check server/src/controller/admin/image.js` 通过。
- 2026-05-30：TODO-0007 执行 `git diff --check` 通过。
- 2026-05-30：TODO-0008 执行 `node --check server/src/controller/admin/image.js` 通过。
- 2026-05-30：TODO-0008 执行 `pnpm --filter ./web-admin build` 通过，有既有 `no-console` 和体积 warning。
- 2026-05-30：TODO-0008 执行 `git diff --check` 通过。
- 2026-05-30：TODO-0009 执行 `node --check server/src/controller/admin/image.js` 通过。
- 2026-05-30：TODO-0009 执行 `git diff --check` 通过。
- 2026-05-30：TODO-0011 执行 `node --check` 校验 `server/src/config/env.js`、`adapter.js`、`define.js`、`config.js`、`config.production.js` 均通过。
- 2026-05-30：TODO-0011 执行 `sh -n server/script/file-server.sh` 通过。
- 2026-05-30：TODO-0012 执行 `node --check server/src/controller/common/upload.js` 通过。
- 2026-05-30：TODO-0012 执行 `git diff --check` 通过。
- 2026-05-30：TODO-0012 尚未做真实上传 smoke test；当前环境没有运行中的数据库和接口服务，后续可在 TODO-0014 补充接口级验证。
- 2026-05-30：TODO-0013 执行 `pnpm --filter ./web-admin build` 通过，仅剩体积 warning。
- 2026-05-30：TODO-0013 执行 `pnpm --filter ./web-h5 build` 通过，有体积 warning。
- 2026-05-30：TODO-0013 执行 `git diff --check` 通过。

## 下一步

继续处理 TODO-0014，建立最小验证体系。
