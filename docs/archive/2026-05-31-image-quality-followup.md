# 归档：图片管理与展示质量继续提升

日期：2026-05-31
语系：cn

## 目标

执行 TODO-0005：继续完善当前项目已有功能，优先围绕已实现的图片管理和展示能力做质量提升；不推进视频、文档管理、Flutter、Vue 3 或 TypeScript 主线迁移。

## 关联待办

TODO-0005

## 计划

1. 先重新分析 TODO-0005 候选任务的真实性、必要性、可行性，并沉淀后续执行计划。
2. 第一批执行 P0：修复管理端保存错误处理、服务端图片参数校验、上传失败处理。
3. 第二批执行 Todo 4/5：补真实运行 smoke checklist，增强 H5 照片墙空状态和图片失败兜底。
4. 第三批执行 Todo 6/7：只产出图片资产生命周期策略和接口级 smoke test 评估文档，不改业务代码。

## 完成内容

- 新增 `docs/plans/todo-0005-image-quality-plan.md` 和 `docs/plans/todo-0005-image-quality-implementation.md`，重新按真实性、必要性、可行性排列优先级。
- 修复管理端图片保存错误处理：
  - 修复 `this.$$Message.error` 拼写错误。
  - 保存失败时恢复 `okBtnLoading`。
  - 调整管理端 HTTP 封装，让 `errno=201/202` 业务错误 reject，避免请求 Promise 永久 pending。
- 补强服务端图片参数校验：
  - 新增图片时校验 `images` 元素中的 `url`、`url_thumb`、`id`。
  - 编辑图片时校验 `image_thumb`、`image_id`。
  - 收紧新增/编辑状态值为展示/隐藏枚举。
- 补强上传组件失败处理：
  - 增加上传失败事件处理。
  - 未知非成功响应返回通用错误提示。
  - 失败文件不会被误认为可提交图片。
- 新增 `docs/runtime-checklist.md`，记录本地真实运行前置条件、启动顺序、手工 smoke 步骤、预期结果和未覆盖项。
- 增强 H5 照片墙：
  - 增加空状态。
  - 增加请求失败状态和重试入口。
  - 增加图片加载失败兜底图。
  - 修复 `XList.reset()` 在缺省 `onGetdata` 时的重试报错风险。
- 新增 `docs/image-asset-lifecycle.md`，评估图片业务记录、上传记录和物理文件的生命周期策略，推荐短期保守保留、中期标记清理，暂不自动删除。
- 新增 `docs/api-smoke-test-plan.md`，评估接口级 smoke test 的前置条件、覆盖范围和分阶段落地路线，明确当前不新增无法运行的测试脚本。

## 验证

- `pnpm run verify:server` 通过。
- `pnpm run verify:web-admin` 通过；存在既有构建产物体积 warning，不阻断。
- `pnpm run verify:web-h5` 通过；存在既有构建产物体积 warning，不阻断。
- `git diff --check` 通过。
- 构建生成的 `web-admin/dist/`、`web-h5/dist/` 均未纳入提交。

## 决策

- TODO-0005 只做已有图片管理/展示能力质量提升，不扩展新业务能力。
- 图片物理文件和上传记录清理涉及用户资产风险，本阶段只做策略评估，不落地自动删除。
- 接口级 smoke test 缺少 SQL schema、初始管理员账号和测试数据库，本阶段只做评估和前置条件清单，不新增不可运行测试脚本。
- Vue 3 和 TypeScript 迁移仍不进入当前实施主线。

## 后续事项

- TODO-0015 仍作为 TypeScript 渐进迁移研究项保留，除非用户明确要求，否则不进入实施主线。
- TODO-0001、TODO-0002、TODO-0003 仍为用户已确认暂缓的候选新功能，不纳入当前阶段。
- 若后续要继续图片资产治理，应先确认数据库 schema、引用关系、备份/回滚和用户授权。
