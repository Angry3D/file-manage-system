# TODO-0005 图片管理与展示质量提升 粗粒度 Plan

## 1. 需求理解

TODO-0005 是方向性事项：继续完善当前项目已有功能，优先围绕已实现的图片管理和展示能力做质量提升。本轮不推进视频、文档管理、Flutter、Vue 3 迁移或 TypeScript 主线迁移。

本次规划要求重新审视此前提出的候选任务，从真实性、必要性、可行性三个维度分析，并重新排列优先级，形成后续可执行的计划。

## 2. 目标效果

- 后续执行时能优先处理真实存在、用户价值明确、实现风险可控的问题。
- 避免把缺少证据的猜测、破坏性数据治理、框架迁移或新功能扩展混入 TODO-0005。
- 为后续执行 AI 提供明确的文件范围、暂停条件、验收标准和验证方式。

## 3. 可能涉及的代码范围

| 文件 / 模块 | 作用 | 与需求的关系 | 是否已确认 |
|---|---|---|---|
| `server/src/controller/admin/image.js` | 管理端图片新增、列表、详情、编辑、批量编辑、状态、删除接口 | 图片管理主链路 | 是 |
| `server/src/logic/admin/image.js` | 管理端图片接口参数校验和查询参数解析 | 参数质量和错误反馈 | 是 |
| `server/src/controller/common/upload.js` | 图片上传、Sharp 处理、缩略图、上传记录写入 | 上传链路健壮性 | 是 |
| `server/src/controller/front/image.js` | H5 照片墙列表接口 | 展示链路 | 是 |
| `server/src/logic/front/image.js` | H5 照片墙查询参数解析 | 展示筛选 | 是 |
| `web-admin/src/views/file/image/ImageAdd.vue` | 管理端新增/编辑图片页面 | 上传后保存、按钮 loading、错误提示 | 是 |
| `web-admin/src/views/file/image/ImageManage.vue` | 管理端图片列表和批量操作 | 删除、状态、批量编辑、预览入口 | 是 |
| `web-admin/src/components/XUpload.vue` | 管理端上传组件 | 上传失败处理和响应解析 | 是 |
| `web-admin/src/components/ImageView.vue` | 管理端图片查看器 | 图片预览体验 | 是 |
| `web-h5/src/views/photo/Photo.vue` | H5 照片墙页面 | 图片展示、预览、空/失败体验 | 是 |
| `web-h5/src/components/XList.vue` | H5 分页列表组件 | 加载、错误、完成状态 | 是 |
| `docs/verification.md` | 验证说明 | 后续验证入口 | 是 |
| 数据库 schema / 初始数据 | 表结构和账号信息 | 真实 smoke test 的前提 | 否，仓库未发现 |

## 4. 粗粒度实现思路

1. 先处理无需外部数据库即可确认的真实前端/服务端问题。
2. 对需要数据库 schema、线上数据或破坏性行为决策的问题，只产出验证清单或待确认项。
3. 优先小范围、低破坏面的修复，例如参数校验、错误提示、loading 复位、上传失败处理。
4. 将删除物理文件、清理上传记录、Vue 3 迁移、自动化接口测试等高风险或依赖外部信息的事项延后。

## 5. 风险点

- 仓库没有 SQL schema 或迁移文件，接口级自动化 smoke test 缺少真实数据前提。
- 图片删除和旧文件清理可能误删用户资产，不能在未确认策略时直接实现。
- `sharp` 原生模块运行依赖 `pnpm approve-builds` 和目标机器环境，纯构建验证不能完全覆盖真实上传。
- Vue 2 low 漏洞需要 Vue 3 大版本迁移，超出 TODO-0005 当前范围。

## 6. 待确认问题

- 数据库表结构、字段约束、初始管理员账号是否可以补充到仓库文档。
- 图片删除时是否只删除 `admin_image` 记录，还是也需要处理 `admin_upload_image` 和物理文件。
- 替换图片后旧上传记录是否允许保留为历史资产，还是需要标记/清理。
- 是否有可用于 smoke test 的本地测试数据库。

## 7. 下一轮需要重点细化的内容

- 对候选任务做真实性、必要性、可行性评分。
- 重新排列优先级。
- 形成可执行 Todo 文档，并明确哪些事项必须等待用户确认。

# TODO-0005 图片管理与展示质量提升 细化 Plan

## 1. 对粗粒度 Plan 的复核结论

复核后，原先“先补真实运行前置资料和 smoke test”的方向仍然有价值，但不应排在所有代码修复之前。原因是当前代码中已经存在无需外部数据库即可确认的低风险问题：

- `web-admin/src/views/file/image/ImageAdd.vue` 编辑模式中存在 `this.$$Message.error` 拼写错误。
- `ImageAdd.vue` 保存请求缺少失败后的 loading 复位。
- `server/src/logic/admin/image.js` 的 `setAction` 没有校验 `image_thumb` 和 `image_id`，但控制器会写入这些字段。
- `addAction` 只校验 `images` 是数组，没有校验数组元素是否包含 `url`、`url_thumb`、`id`。
- `web-admin/src/components/XUpload.vue` 缺少通用上传失败处理，仅处理部分业务错误码。

因此，新的优先级应先做真实、必要、可行性都高的小修复，再做需要外部条件的运行清单和数据治理评估。

## 2. 已确认的相关文件

| 文件路径 | 作用 | 是否需要修改 | 修改原因 |
|---|---|---|---|
| `web-admin/src/views/file/image/ImageAdd.vue` | 新增/编辑图片页面 | 是 | 存在真实拼写错误和 loading 不复位风险 |
| `web-admin/src/components/XUpload.vue` | 上传组件 | 是 | 缺少网络/服务端异常的通用失败处理 |
| `server/src/logic/admin/image.js` | 管理端图片接口参数校验 | 是 | 校验与控制器写入字段不完全一致 |
| `server/src/controller/admin/image.js` | 图片管理接口 | 可能 | 若校验调整后需同步处理空结果或非法 ID |
| `web-h5/src/views/photo/Photo.vue` | H5 照片墙 | 可能 | 空状态、图片失败占位属于体验提升 |
| `web-h5/src/components/XList.vue` | H5 列表组件 | 可能 | 错误状态和 reset 防御可改善 |
| `docs/verification.md` | 验证说明 | 可能 | 若新增 smoke test 或人工验证清单，需要同步记录 |
| `docs/runtime-checklist.md` | 运行清单 | 新增可能 | 用于记录真实运行前提和手工 smoke test |

## 3. 已确认的相关组件 / 函数 / 状态 / 接口

| 名称 | 所在文件 | 当前作用 | 与需求的关系 | 是否需要修改 |
|---|---|---|---|---|
| `onOk` | `web-admin/src/views/file/image/ImageAdd.vue` | 新增/编辑提交 | 保存失败 loading 和错误提示风险 | 是 |
| `onSuccess` | `web-admin/src/components/XUpload.vue` | 上传成功响应处理 | 只处理 201/202，缺少通用失败处理 | 是 |
| `addAction` logic | `server/src/logic/admin/image.js` | 校验新增图片参数 | 未校验图片数组元素字段 | 是 |
| `setAction` logic | `server/src/logic/admin/image.js` | 校验编辑图片参数 | 未校验 `image_thumb`、`image_id` | 是 |
| `deleteAction` | `server/src/controller/admin/image.js` | 删除图片记录 | 不处理上传记录/物理文件，需策略确认 | 暂不直接改 |
| `processImage` | `server/src/controller/common/upload.js` | 处理上传图片和缩略图 | 真实运行依赖 Sharp 构建脚本和上传目录权限 | 暂不直接改 |
| `requestList` | `web-h5/src/components/XList.vue` | H5 分页请求 | 缺少显式错误展示 | 可能 |
| `Photo` empty/error UI | `web-h5/src/views/photo/Photo.vue` | 照片墙展示 | 当前无明确空状态和图片失败兜底 | 可能 |

## 4. 详细实现方案

### 4.1 真实性、必要性、可行性评分

| 候选任务 | 真实性 | 必要性 | 可行性 | 结论 |
|---|---|---|---|---|
| 修复 `ImageAdd.vue` 的 `this.$$Message.error` 和保存失败 loading 不复位 | 高 | 高 | 高 | P0，优先执行 |
| 补强服务端图片参数校验 | 高 | 高 | 高 | P0，优先执行 |
| 补强上传组件失败处理 | 高 | 高 | 高 | P0，优先执行 |
| 补真实运行 smoke checklist | 高 | 高 | 高 | P1，先文档化，不阻塞 P0 小修 |
| H5 空状态、图片加载失败兜底 | 高 | 中 | 高 | P2，体验提升 |
| 图片删除时清理上传记录或物理文件 | 高 | 中 | 低 | P3，必须先确认策略 |
| 自动化接口 smoke test | 高 | 高 | 低 | P3，依赖 schema 和测试数据库 |
| Vue 3 / TypeScript 迁移 | 高 | 低 | 低 | 不纳入 TODO-0005 当前阶段 |

### 4.2 重新排列后的优先级

1. P0：管理端保存链路错误处理修复。
2. P0：服务端图片新增/编辑参数校验补强。
3. P0：上传组件通用失败处理补强。
4. P1：真实运行前置条件和 smoke test 清单。
5. P2：H5 照片墙空状态和图片加载失败兜底。
6. P3：图片资产生命周期策略评估。
7. P3：接口级自动化 smoke test 评估。

## 5. 数据流 / 状态流说明

管理端新增图片：

```text
ImageAdd.vue -> XUpload.vue -> /common/upload/image -> upload_image 表
ImageAdd.vue -> /admin/image/add -> image 表 -> ImageManage.vue 刷新列表
```

管理端编辑图片：

```text
ImageAdd.vue 获取详情 -> 可替换图片 -> /admin/image/set -> 更新 image/image_thumb/image_id/status/place/note
```

H5 展示：

```text
Photo.vue -> XList.vue -> /front/image/getList -> status=1 图片 -> 瀑布流展示 -> 图片预览
```

上传链路：

```text
XUpload.vue -> common/upload/image -> Sharp 生成原图和缩略图 -> Define.fileHost + 相对路径
```

## 6. 兼容性与影响范围

- P0 修复主要影响管理端图片新增/编辑和上传失败表现，不改变接口路径和数据库结构。
- 服务端参数校验可能让历史上带缺失字段的请求失败，这是期望行为；需要前端保持提交字段完整。
- H5 空状态和图片失败兜底只影响展示体验，不改变接口协议。
- 图片资产清理涉及用户数据，不应在未确认策略时自动执行。

## 7. 修正的错误假设

- “先补 smoke test 清单”不是唯一最高优先级。代码中存在更容易验证的真实 P0 小问题，应先处理。
- “删除图片时同步删除物理文件”不能直接作为修复项，因为可能误删仍被其他记录引用的文件。
- “自动化 smoke test”当前不可直接落地，因为仓库没有 SQL schema、迁移文件或测试数据库配置。

## 8. 仍需确认的问题

- 是否允许新增 `docs/runtime-checklist.md` 作为人工 smoke test 清单。
- 是否确认图片删除策略：仅删业务图片记录、同时删上传记录、还是延迟清理孤儿文件。
- 是否能提供测试数据库 schema 和初始管理员账号，用于后续接口级自动化验证。
