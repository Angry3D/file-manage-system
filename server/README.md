# server

服务端基于 ThinkJS，提供管理端和 H5 端使用的图片管理、图片上传和照片墙接口。

## 环境要求

- Node.js `>=14.15.0`
- pnpm `>=10 <11`
- MySQL
- 本地开发图片文件服务依赖 `live-server`

Node.js 下限来自 `sharp@0.32.6`。如果需要真实运行图片上传链路，请确认 `pnpm install` 后 Sharp 的构建脚本已在当前环境被允许执行；pnpm v10 可通过 `pnpm approve-builds` 处理。

## 安装

推荐在仓库根目录统一安装：

```sh
pnpm install
```

也可以只执行服务端脚本：

```sh
pnpm --filter server <script>
```

## 启动

开发启动：

```sh
pnpm --filter server start
```

该命令会启动 ThinkJS 开发入口，并通过 `server/script/file-server.sh` 启动本地静态文件服务。

生产入口：

```sh
pnpm --filter server serve
```

原始 npm 脚本仍可在 `server/` 目录下使用：

```sh
npm start
npm run serve
npm run lint
npm test
```

## 配置

服务端配置可以通过环境变量覆盖。

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `BABYLIFE_SERVER_PORT` | `20000` | API 服务端口。 |
| `BABYLIFE_DB_HOST` | `127.0.0.1` | MySQL 地址。 |
| `BABYLIFE_DB_PORT` | `3306` | MySQL 端口。 |
| `BABYLIFE_DB_NAME` | `db_babylife` | MySQL 数据库名。 |
| `BABYLIFE_DB_PREFIX` | `admin_` | MySQL 表前缀。 |
| `BABYLIFE_DB_USER` | `root` | MySQL 用户名。 |
| `BABYLIFE_DB_PASSWORD` | 空 | MySQL 密码。应通过环境变量注入，不要写入源码。 |
| `BABYLIFE_DB_ENCODING` | `utf8` | MySQL 连接 encoding。 |
| `BABYLIFE_DB_CHARSET` | `utf8mb4` | MySQL 连接 charset。 |
| `BABYLIFE_UPLOAD_DIR` | development: `/Users/relax/Documents/upload`; production: `/mnt/a/data/upload` | 图片上传存储目录。 |
| `BABYLIFE_FILE_HOST` | development: `http://127.0.0.1:11000/`; production: `http://file.relaxcoder.top/` | 图片访问地址前缀。 |
| `BABYLIFE_FILE_SERVER_PORT` | `11000` | 本地静态文件服务端口。 |

本地开发时，通常至少需要设置数据库密码：

```sh
export BABYLIFE_DB_PASSWORD="your-password"
```

## 图片上传

- 上传入口在 `server/src/controller/common/upload.js`。
- 非 GIF 图片会通过 Sharp 生成原图和缩略图。
- GIF 图片复用原图作为缩略图。
- 写文件前会自动创建目标目录。
- Sharp 或文件系统错误会返回统一上传失败业务错误。

## 验证

在仓库根目录执行：

```sh
pnpm run verify:server
```

完整验证：

```sh
pnpm run verify
```

生产依赖 high/moderate 审计：

```sh
pnpm audit --prod --audit-level moderate
```

`pnpm run audit:prod` 当前仍会因 Vue 2 自身 low 漏洞返回非 0。

## pm2 部署

生产环境可使用 pm2：

```sh
pm2 startOrReload pm2.json
```

部署前请确认：

- `pm2.json` 中的 `cwd` 与真实部署目录一致。
- 已设置 `BABYLIFE_DB_PASSWORD` 等必要环境变量。
- 上传目录存在且进程有读写权限。
- `BABYLIFE_FILE_HOST` 指向可公开访问的文件服务地址。
