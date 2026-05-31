# 当前进度

最后更新：2026-05-30
语系：cn

本文档只追踪当前正在推进的阶段。已完成阶段应作为独立文件归档到 `docs/archive/`。

## 当前目标

执行 TODO-0005 第一批 P0 返修：修复管理端 HTTP 封装在 errno=201/202 时不 reject 导致保存按钮 loading 可能卡住的问题，并复核 Todo 1 的失败恢复链路。

## 关联待办

- `TODO-0005`（状态：doing）

## 当前计划

1. 修改 `web-admin/src/assets/js/http.js`（已完成）：errno=201/202 在提示和跳转后 reject，并避免 `requestMode1/2` 因 `res` 为空而挂起。
2. 复核 `web-admin/src/views/file/image/ImageAdd.vue`（已完成）：新增/编辑失败路径会恢复 `okBtnLoading=false`。
3. 清理 `web-admin/dist/` 未跟踪构建产物（已完成，verify 后再次清理）。
4. 执行验证：`pnpm run verify:web-admin`、`git diff --check`（已完成）。

## 任务拆解

1. `http.js`
- 201/202 分支保持现有提示与跳转行为后 `Promise.reject`（已完成）。
- 兜底防止 `res` 为 `undefined` 时请求 Promise 永久 pending（已完成）。
- 成功格式保持 `resolve(res.data.data)`（已保持）。
2. `ImageAdd.vue`
- 只复核失败恢复逻辑，不改接口路径与字段结构（已完成）。
3. 产物清理
- 确认 `web-admin/dist/` 为未跟踪构建输出后移除，不提交产物目录（已完成）。
4. 范围约束
- 不执行 Todo 4、Todo 5、Todo 6、Todo 7。
- 不删除物理图片文件，不清理上传记录，不改数据库结构。

## 状态

doing（第一批 P0 返修已完成，等待用户确认）

## 决策记录

- 2026-05-30：本轮只执行 TODO-0005 第一批 P0（Todo 1~3），其余 Todo 延后。
- 2026-05-30：`server/src/controller/admin/image.js` 无需改动；仅通过 logic 层补强校验即可满足本批目标。
- 2026-05-30：根据核验结论补做返修：`http.js` 需在 errno=201/202 时显式 reject，确保页面 `.catch()` 可恢复 loading。
- 2026-05-30：`verify:web-admin` 会重新生成 `web-admin/dist/`，本轮按未跟踪构建产物清理，不纳入提交。

## 阻塞项

暂无。

## 验证

- 2026-05-30：`pnpm run verify:server` 通过。
- 2026-05-30：`pnpm run verify:web-admin` 通过（存在既有构建产物体积 warning，不阻断）。
- 2026-05-30：`git diff --check` 通过。
- 2026-05-30：返修后再次执行 `pnpm run verify:web-admin` 通过（存在既有构建产物体积 warning，不阻断）。
- 2026-05-30：返修后再次执行 `git diff --check` 通过。

## 下一步

完成返修验证并记录结果；在用户体验确认前不归档。
