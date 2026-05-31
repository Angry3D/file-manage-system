# web-h5

H5 端基于 Vue 2 和 Vant，用于展示照片墙。

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
pnpm --filter web-h5 dev
```

该命令会固定使用 `8081` 端口。

也可以使用历史启动脚本：

```sh
pnpm --filter web-h5 serve
```

该命令会设置 `BUILD_ENV=development`，接口基础地址为：

```text
http://localhost:20000/
```

请先启动服务端，并确认 H5 端可以访问服务端端口。

## 构建

```sh
pnpm --filter web-h5 build
```

生产构建会设置 `BUILD_ENV=production`，接口基础地址为：

```text
http://babyapi.relaxcoder.top/
```

接口地址定义在 `src/assets/js/env.js`。

## 校验

```sh
pnpm --filter web-h5 lint
pnpm run verify:web-h5
```

## 当前功能

- 请求展示状态为 `1` 的图片。
- 按 `created_time DESC` 分页展示照片墙。
- 支持列表分页加载状态。

`src/views/video/Video.vue` 当前提示“功能暂未开放”，视频功能不属于当前已完成功能。

## 注意事项

- H5 照片墙依赖服务端 `BABYLIFE_FILE_HOST` 返回可访问的图片地址。
- 构建时可能出现资源体积 warning，当前属于已知限制。
- Vue 2 自身 low 漏洞需要 Vue 3 大版本迁移才能消除，当前仅记录风险说明。
