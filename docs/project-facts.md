# 项目事实

最后更新：2026-05-30
语系：cn

本文档记录相对稳定的项目事实。不要用它追踪当前任务，也不要把长期历史归档堆在这里。

## 已确认事实

- 识别到项目文件：README.md。
- 根 README 将仓库描述为“文件管理系统全栈”。
- 仓库包含三个主要子项目：`server/`、`web-admin/`、`web-h5/`。
- `server/` 是基于 ThinkJS 的服务端项目。
- `web-admin/` 是基于 Vue.js 和 iView/View Design 的管理端项目。
- `web-h5/` 是基于 Vue.js 和 Vant 的 H5 照片墙项目。
- 当前 README 记录已实现图片管理和展示功能，图片格式仅支持 GIF / JPG / PNG。
- `server/package.json` 定义了 `start`、`serve`、`test`、`lint`、`lint-fix` 脚本。
- `web-admin/package.json` 定义了 `serve`、`build`、`lint` 脚本。
- `web-h5/package.json` 定义了 `serve`、`build`、`lint` 脚本。
- 服务端开发和生产入口分别是 `server/development.js` 与 `server/production.js`，默认端口为 `20000`。
- 服务端 `server/src/config/router.js` 当前为空数组，接口路径依赖 ThinkJS 默认路由约定。
- 服务端数据库适配器使用 MySQL，`admin` 连接配置的数据库名为 `db_babylife`，表前缀为 `admin_`。
- 服务端文件配置中，开发环境上传目录为 `/Users/relax/Documents/upload`，生产环境上传目录为 `/mnt/a/data/upload`。
- 服务端文件访问地址中，开发环境为 `http://127.0.0.1:11000/`，生产环境为 `http://file.relaxcoder.top/`。
- `server/script/file-server.sh` 使用 `live-server --port=11000 --no-browser /Users/relax/Documents/upload` 启动本地文件服务。
- 图片上传接口在 `server/src/controller/common/upload.js` 中处理，非 GIF 图片会通过 Sharp 生成原图和缩略图，GIF 复用原图作为缩略图。
- 图片上传记录写入 `admin_upload_image` 语义的模型表，字段包含原文件名、相对路径、缩略图相对路径。
- 管理端图片记录写入 `admin_image` 语义的模型表，字段包含创建时间、展示状态、地点、备注、图片地址、缩略图地址和上传图片 ID。
- 管理端图片列表支持按创建时间范围、展示状态、地点、备注筛选。
- H5 照片墙只请求展示状态为 `1` 的图片，并按 `created_time DESC` 分页展示。
- 管理端接口基础地址由 `web-admin/src/assets/js/env.js` 根据 `BUILD_ENV` 切换：开发环境 `http://localhost:20000/`，生产环境 `http://babyapi.relaxcoder.top/`。
- H5 接口基础地址由 `web-h5/src/assets/js/env.js` 根据 `BUILD_ENV` 切换：开发环境 `http://localhost:20000/`，生产环境 `http://babyapi.relaxcoder.top/`。
- 管理端登录后将 token 写入 `localStorage.adminToken`，请求时通过 header token 传给服务端。
- 服务端 `Base` 控制器会校验管理端接口 token，并在请求结束后延长 token 过期时间。
- `web-admin/src/views/file/video/VideoManage.vue` 与 `web-admin/src/views/system/AccountManage.vue` 当前是占位页面。
- `web-h5/src/views/video/Video.vue` 当前提示“功能暂未开放”。
- 仓库没有发现 SQL schema 或数据库迁移文件。
- 仓库根 `.gitignore` 忽略 `package-lock.json`、`node_modules` 和 `server/runtime`。
- 2026-05-30 在 `server/`、`web-admin/`、`web-h5/` 分别执行 `npm audit --json` 均因缺少 lockfile 返回 `ENOLOCK`，当前无法用 npm 在本地生成稳定的安全审计结果。
- 2026-05-30 已建立 pnpm workspace 基线：根目录包含 `package.json`、`pnpm-workspace.yaml`、`.npmrc` 和统一 `pnpm-lock.yaml`。
- pnpm workspace 当前纳入 `server/`、`web-admin/`、`web-h5/` 三个子项目。
- 根 `package.json` 通过 `engines.pnpm` 声明 pnpm 版本范围为 `>=10 <11`，并提供递归 `build`、`lint`、`test` 脚本。
- 根 `.npmrc` 显式配置 `node-linker=hoisted` 和 `shared-workspace-lockfile=true`，用于兼容 ThinkJS 3、Vue CLI 3/4 等老工具链的依赖解析。
- 2026-05-30 执行 `pnpm install --lockfile-only --frozen-lockfile` 通过，统一锁文件与 workspace 配置一致。
- 2026-05-30 执行 `pnpm audit --prod` 后发现生产依赖漏洞 40 个，严重度为 17 high、21 moderate、2 low；高风险路径包括 `server>sharp`、`server>sharp>tar`、`server>thinkjs>think-validator>validator`、`web-admin>axios`、`web-h5>axios`。

## 推断事实

- 这是一个多子项目仓库；运行命令时通常需要进入对应子目录执行。
- 当前核心可用业务链路是：管理端登录 -> 图片上传 -> 图片新增/编辑/状态管理/删除 -> H5 照片墙展示。
- 当前项目更偏个人/家庭照片管理场景；部分配置包含本机路径和线上域名，部署前需要按环境确认。
- 当前依赖安全治理已有可重复锁文件基础；后续安全升级应基于 `pnpm-lock.yaml` 对比变更。

## 待确认事项

- `web-admin/README.md` 保留了 `npm run test` 说明，但 `web-admin/package.json` 未定义 `test` 脚本；是否需要补充测试脚本待确认。
- 数据库表结构、初始管理员账号、图片表和上传图片表的约束规则没有在仓库中记录，后续实现或验证前需要确认。
- `server/src/config/adapter.js` 中存在明文数据库连接信息；是否保留为本地私有项目写法，还是迁移到环境变量，需要确认。
- `TODO-0001` 到 `TODO-0003` 已由用户确认本次暂缓；本阶段优化范围不包含视频、文档管理或 Flutter 新功能。

## 证据来源

- `README.md` 的目录介绍、目前已实现功能和后续计划。
- `server/README.md` 的 ThinkJS、安装、启动和 pm2 部署说明。
- `server/package.json` 的 scripts、dependencies、devDependencies、engines。
- `web-admin/package.json` 的 scripts、dependencies、devDependencies。
- `web-h5/package.json` 的 scripts、dependencies、devDependencies。
- `server/src/config/config.js`、`server/src/config/config.production.js`、`server/src/config/adapter.js`、`server/src/config/define.js`。
- `server/src/controller/base.js`、`server/src/controller/common/upload.js`、`server/src/controller/admin/image.js`、`server/src/controller/front/image.js`。
- `server/src/logic/admin/image.js`、`server/src/logic/front/image.js`。
- `server/script/file-server.sh`、`server/nginx.conf`、`server/pm2.json`。
- `web-admin/src/assets/js/api.js`、`web-admin/src/assets/js/http.js`、`web-admin/src/assets/js/env.js`、`web-admin/src/router/file.js`。
- `web-admin/src/views/file/image/ImageManage.vue`、`web-admin/src/views/file/image/ImageAdd.vue`、`web-admin/src/components/XUpload.vue`、`web-admin/src/components/XTable.vue`。
- `web-h5/src/assets/js/api.js`、`web-h5/src/assets/js/http.js`、`web-h5/src/assets/js/env.js`、`web-h5/src/views/photo/Photo.vue`、`web-h5/src/components/XList.vue`。
- 2026-05-30 本地执行 `npm audit --json` 的命令结果。

## 重要文件

- `README.md`
- `package.json`
- `pnpm-workspace.yaml`
- `.npmrc`
- `pnpm-lock.yaml`
- `server/package.json`
- `server/README.md`
- `server/src/config/adapter.js`
- `server/src/config/define.js`
- `server/src/config/router.js`
- `server/src/controller/base.js`
- `server/src/controller/common/upload.js`
- `server/src/controller/admin/image.js`
- `server/src/controller/front/image.js`
- `server/src/logic/admin/image.js`
- `server/src/logic/front/image.js`
- `server/script/file-server.sh`
- `web-admin/package.json`
- `web-admin/README.md`
- `web-admin/src/assets/js/api.js`
- `web-admin/src/assets/js/http.js`
- `web-admin/src/assets/js/env.js`
- `web-admin/src/router/index.js`
- `web-admin/src/views/file/image/ImageManage.vue`
- `web-admin/src/views/file/image/ImageAdd.vue`
- `web-admin/src/components/XUpload.vue`
- `web-admin/src/components/XTable.vue`
- `web-h5/package.json`
- `web-h5/README.md`
- `web-h5/src/assets/js/api.js`
- `web-h5/src/assets/js/http.js`
- `web-h5/src/assets/js/env.js`
- `web-h5/src/router/index.js`
- `web-h5/src/views/photo/Photo.vue`
- `web-h5/src/components/XList.vue`

## 目录说明

- `server/`：ThinkJS 服务端。
- `web-admin/`：Vue 2 管理端。
- `web-h5/`：Vue 2 H5 端。
- `docs/`：AI 项目工作流文档。
- `docs/archive/`：已完成阶段归档目录。

## 常用命令

优先在根目录使用 pnpm workspace 命令；如需调试单个子项目，也可以进入对应子目录执行原有 npm scripts。

### 根目录

- `pnpm install`：按统一锁文件安装所有 workspace 依赖。
- `pnpm install --lockfile-only --frozen-lockfile`：校验 `pnpm-lock.yaml` 与 workspace 配置一致。
- `pnpm audit --prod`：审计生产依赖漏洞。
- `pnpm lint`：递归执行存在的 `lint` 脚本。
- `pnpm build`：递归执行存在的 `build` 脚本。
- `pnpm test`：递归执行存在的 `test` 脚本。
- `pnpm --filter server <script>`：只在服务端执行脚本。
- `pnpm --filter web-front <script>`：只在管理端执行脚本。
- `pnpm --filter web-h5 <script>`：只在 H5 端执行脚本。

### 服务端

- `npm install`
- `npm start`：开发启动，执行 `node development.js & ./script/file-server.sh`。
- `npm run serve`：生产入口启动，执行 `node production.js`。
- `npm test`：运行 `THINK_UNIT_TEST=1 nyc ava test/ && nyc report --reporter=html`。
- `npm run lint`：执行 `eslint src/`。
- `npm run lint-fix`：执行 `eslint --fix src/`。

### 管理端

- `npm install`
- `npm run serve`：开发启动，设置 `BUILD_ENV=development`。
- `npm run build`：生产构建，设置 `BUILD_ENV=production`。
- `npm run lint`

### H5 端

- `npm install`
- `npm run serve`：开发启动，设置 `BUILD_ENV=development`。
- `npm run build`：生产构建，设置 `BUILD_ENV=production`。
- `npm run lint`
