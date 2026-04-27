# LMM.best

LLM 排行榜平台 - 数据来源：llmrank.cn，评分算法完全公开透明。

## 数据来源

- **llmrank.cn** — 主要数据源（无认证需求）
- **HuggingFace Open LLM Leaderboard** — 补充数据
- **Apify LLM Benchmarks** — 聚合多个排行榜

## 开发

```bash
bun install
bun run dev
bun run build
```

## API 集成

如需启用第三方 API 数据源，设置环境变量：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

- `APIFY_API_KEY` — 从 [Apify](https://apify.com) 获取
- `HF_TOKEN` — 从 [HuggingFace](https://huggingface.co/settings/tokens) 获取

## 部署

推送到 main 分支后自动部署到 GitHub Pages。

## 许可证

AGPL-3.0
