# 归档：图片链路质量提升与依赖治理

日期：2026-05-30
语系：cn

## 目标

完善当前项目已有功能，优先围绕已实现的图片管理和展示能力做质量提升；同步建立可重复的依赖治理基础并处理第一批安全问题。本阶段不推进视频、文档管理、Flutter 等新功能。

## 关联待办

TODO-0006, TODO-0007, TODO-0008, TODO-0009, TODO-0010, TODO-0011, TODO-0012, TODO-0013, TODO-0014

## 计划

1. 建立依赖治理基线，形成统一锁文件和 workspace 管理方式。
2. 基于可重复依赖图处理低破坏面的安全漏洞。
3. 修复图片管理和 H5 展示链路中的确定性问题。
4. 处理服务端配置安全、图片上传健壮性和前端体验问题。
5. 建立最小验证体系，记录后续验证入口和已知限制。

## 完成内容

- TODO-0006：建立 pnpm workspace 基线，新增根 `package.json`、`pnpm-workspace.yaml`、`.npmrc` 和统一 `pnpm-lock.yaml`。
- TODO-0010：完成前端依赖安全升级第一批，将两个前端的 `axios` 升级到 `^1.16.1`，并将 `vue` / `vue-template-compiler` 对齐到 `2.7.16`；同时修复 H5 PostCSS 构建兼容问题。
- TODO-0007：修复管理端删除图片接口，删除后返回统一成功响应和数据库删除行数。
- TODO-0008：修复编辑图片时原图、缩略图和上传图片 ID 不同步更新的问题。
- TODO-0009：修复新增多张图片时未等待所有数据库写入完成的问题，改为等待全部写入后返回实际数量。
- TODO-0011：外置服务端敏感配置和环境差异配置，支持通过环境变量覆盖数据库连接、上传目录、文件访问地址、服务端端口和本地文件服务端口；数据库密码不再保留明文默认值。
- TODO-0012：增强图片上传链路健壮性，写文件前确保目录存在，并统一捕获图片处理和文件系统错误。
- TODO-0013：修复前端 loading、分页、登录校验、图片查看边界等体验问题，并移除图片管理调试输出。
- TODO-0014：建立最小验证体系，新增根目录 `verify` 系列脚本和 `docs/verification.md`。

## 验证

- `pnpm install --lockfile-only --frozen-lockfile` 通过。
- `pnpm audit --prod` 初始发现 40 个生产依赖漏洞；TODO-0010 后降至 15 个，剩余漏洞进入 TODO-0016。
- `pnpm --filter ./web-admin build` 通过，有构建体积 warning；第一批依赖升级时曾有既有 `no-console` warning。
- `pnpm --filter ./web-h5 build` 通过，有构建体积 warning。
- `node --check server/src/controller/admin/image.js` 通过。
- `node --check server/src/controller/common/upload.js` 通过。
- `node --check server/src/config/env.js server/src/config/adapter.js server/src/config/define.js server/src/config/config.js server/src/config/config.production.js` 通过。
- `sh -n server/script/file-server.sh` 通过。
- `pnpm install` 通过，pnpm 提示若要允许依赖构建脚本需运行 `pnpm approve-builds`。
- `pnpm run verify` 通过。
- `git diff --check` 通过。

## 决策

- 本阶段只完善已有图片管理和展示能力，不推进视频、文档管理、Flutter 等新功能。
- pnpm workspace 基线采用 `node-linker=hoisted`，优先兼容 ThinkJS 3、Vue CLI 3/4 等老工具链。
- 依赖安全升级第一批优先处理低破坏面的前端依赖；服务端 `sharp/tar` 和 ThinkJS 间接依赖风险单独进入后续评估。
- 服务端数据库密码不再提供明文默认值，本地或部署启动时需要通过 `BABYLIFE_DB_PASSWORD` 注入。

## 后续事项

- TODO-0016：继续评估并处理服务端剩余生产依赖漏洞，重点是 `sharp/tar`、ThinkJS 间接依赖 `validator/ms/uuid`，以及 Vue 2 low 漏洞的风险说明。
- TODO-0004：补充各端使用说明和项目文档。
- TODO-0015：TypeScript 渐进迁移仅作为研究项，不进入当前实施主线，除非用户明确要求。
