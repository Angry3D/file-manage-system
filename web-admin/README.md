# web-admin

管理端基于 Vue 2 和 View Design，用于登录、上传图片、管理图片信息、控制展示状态和删除图片。

## 环境要求

- Node.js 建议与仓库根环境保持一致。
- pnpm `>=10 <11`

推荐在仓库根目录统一安装依赖：

```sh
pnpm install
```

## 开发

在仓库根目录执行：

```sh
pnpm --filter web-front serve
```

该命令会设置 `BUILD_ENV=development`，接口基础地址为：

```text
http://localhost:20000/
```

请先启动服务端，并确认管理端可以访问服务端端口。

## 构建

```sh
pnpm --filter web-front build
```

生产构建会设置 `BUILD_ENV=production`，接口基础地址为：

```text
http://babyapi.relaxcoder.top/
```

接口地址定义在 `src/assets/js/env.js`。

## 校验

```sh
pnpm --filter web-front lint
pnpm run verify:web-admin
```

当前 `web-admin/package.json` 未定义 `test` 脚本。

## 当前功能

- 管理员登录。
- 图片上传。
- 图片新增和编辑。
- 图片列表筛选。
- 展示状态管理。
- 图片删除。

`src/views/file/video/VideoManage.vue` 和 `src/views/system/AccountManage.vue` 目前仍是占位页面，不属于当前已完成功能。

## 注意事项

- 登录 token 存储在 `localStorage.adminToken`。
- 请求会通过 header `token` 传给服务端。
- 图片上传依赖服务端文件配置和 Sharp 处理链路。
- 构建时可能出现资源体积 warning，当前属于已知限制。
