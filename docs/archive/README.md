# 归档

最后更新：2026-05-31
语系：cn

本目录存放已完成阶段的记录。每个完成阶段使用一个独立 Markdown 文件，不要把所有历史持续追加到单个文件中。

## 命名规范

使用以下格式：

```text
YYYY-MM-DD-short-stage-name.md
```

示例：

```text
2026-05-29-ai-docs-bootstrap.md
2026-05-30-build-config-optimization.md
2026-06-02-seo-metadata-pass.md
```

## 归档模板

创建新的归档文件时，可以使用 skill assets 中的 `archive-entry.md.template`。

## 归档索引

| 日期 | 归档文件 | 关联待办 | 阶段 |
| --- | --- | --- | --- |
| 2026-05-30 | [2026-05-30-image-quality-dependency-governance.md](2026-05-30-image-quality-dependency-governance.md) | TODO-0006, TODO-0007, TODO-0008, TODO-0009, TODO-0010, TODO-0011, TODO-0012, TODO-0013, TODO-0014 | 图片链路质量提升与依赖治理 |
| 2026-05-30 | [2026-05-30-service-production-audit.md](2026-05-30-service-production-audit.md) | TODO-0016 | 服务端生产依赖漏洞治理 |
| 2026-05-30 | [2026-05-30-project-usage-documentation.md](2026-05-30-project-usage-documentation.md) | TODO-0004 | 项目使用说明补充 |
| 2026-05-31 | [2026-05-31-image-quality-followup.md](2026-05-31-image-quality-followup.md) | TODO-0005 | 图片管理与展示质量继续提升 |
| 2026-05-31 | [2026-05-31-final-verification-summary.md](2026-05-31-final-verification-summary.md) | TODO-0017 | 最终验证与阶段总结 |


## 工作流

阶段完成后：

1. 在本目录创建新的归档文件。
2. 写入目标、关联待办、计划、完成内容、验证、决策和后续事项。
3. 在本文件的归档索引中登记新归档。
4. 从 `docs/backlog.md` 移除已归档事项。
5. 更新 `docs/progress.md`，让它只反映下一阶段或当前空状态。
