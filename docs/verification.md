# 验证说明

最后更新：2026-05-30
语系：cn

本文档记录当前阶段可重复执行的最小验证体系。

## 准备

在仓库根目录执行：

```sh
pnpm install
```

## 常用验证

```sh
pnpm run verify
```

该命令会依次执行：

1. `pnpm run verify:lock`：校验 `pnpm-lock.yaml` 与 workspace 配置一致。
2. `pnpm run verify:server`：校验服务端关键配置、控制器和文件服务脚本语法。
3. `pnpm run verify:web-admin`：构建管理端。
4. `pnpm run verify:web-h5`：构建 H5 端。

## 分项验证

- `pnpm run verify:lock`
- `pnpm run verify:server`
- `pnpm run verify:web-admin`
- `pnpm run verify:web-h5`

## 安全审计

```sh
pnpm run audit:prod
```

当前生产依赖仅剩 Vue 2 自身 low 漏洞，`pnpm run audit:prod` 仍会返回非 0。该漏洞需要通过 Vue 3 大版本迁移才能消除，不纳入当前低破坏面治理。

如需验证 moderate 及以上生产依赖漏洞是否清零，可以执行：

```sh
pnpm audit --prod --audit-level moderate
```

当前该命令应返回 0。

## 当前已知限制

- 管理端和 H5 端构建仍存在资源体积 warning。
- 当前尚未建立数据库和真实上传接口的自动化 smoke test。
- 服务端完整 `test` 脚本依赖历史测试环境，本轮仅沉淀关键文件语法检查。
- pnpm v10 默认忽略部分依赖构建脚本；如需真实运行图片上传链路中的 Sharp 原生模块，应按环境执行并确认 `pnpm approve-builds`。
