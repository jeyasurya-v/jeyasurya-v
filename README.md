<a href="https://jeyasurya.pages.dev">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/banner-dark.svg">
    <img alt="Jeyasurya V - Software Engineer. I build multi-tenant platforms, enterprise integrations and production AI systems." src="./assets/banner-light.svg" width="100%">
  </picture>
</a>

<p>
  <a href="https://jeyasurya.pages.dev"><img alt="Portfolio" src="https://img.shields.io/badge/Portfolio-jeyasurya.pages.dev-e2481c?style=flat-square"></a>
  <a href="https://www.linkedin.com/in/jeyasurya-velmurugan/"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-jeyasurya--velmurugan-16150f?style=flat-square&logo=linkedin&logoColor=white"></a>
  <a href="mailto:jeyasuryavelmurugan09@gmail.com"><img alt="Email" src="https://img.shields.io/badge/Email-jeyasuryavelmurugan09%40gmail.com-16150f?style=flat-square&logo=gmail&logoColor=white"></a>
  <img alt="Open to remote, onsite and relocation" src="https://img.shields.io/badge/Open_to-remote%2C%20onsite%20%26%20relocation-55524a?style=flat-square">
</p>

Full-stack engineer at **Tacbot.ai**, building a multi-tenant SaaS case-management platform for enterprise IT operations. I like the parts of a system where correctness is hard: tenants that must never see each other's data, two systems of record that must agree, and AI that has to be cheap, grounded and observable.

### What I've built

- **LLM/SLM orchestration** - routes every AI use case between a self-hosted small model (llama.cpp on Kubernetes) and Claude on AWS Bedrock, with permission-gated fallback and per-call metering. **~40% lower inference cost.**
- **Per-tenant vector search** - Milvus collections per tenant, structure-aware chunking of cases, alerts and inventory, and cross-encoder reranking behind AI search, summaries and RCA timelines.
- **Enterprise integrations** - bi-directional ServiceNow sync without update loops, NetBox inventory with live schema discovery, and email-to-case over IMAP and Microsoft Graph.
- **Quality at platform scale** - a 53-spec Playwright suite that provisions its own tenants and runs business-critical workflows every day.

### Case studies

Architecture write-ups with interactive 3D models - problem, constraints, decisions and trade-offs.

| | System | What it shows |
|---|---|---|
| **01** | [Enterprise AI Platform](https://jeyasurya.pages.dev/work/enterprise-ai-platform/) | LLM orchestrator, self-hosted SLM, per-tenant RAG |
| **02** | [Enterprise Integrations & Quality](https://jeyasurya.pages.dev/work/enterprise-integrations/) | ServiceNow and NetBox sync, loop prevention, daily E2E |
| **03** | [MindFrame](https://jeyasurya.pages.dev/work/mindframe/) | AI video pipeline - Gemini plan, ElevenLabs voice, Remotion render |
| **04** | [Soulbound](https://jeyasurya.pages.dev/work/soulbound/) | Self-hosted AI companion with governed long-term memory |
| **05** | [Cadence](https://jeyasurya.pages.dev/work/cadence/) | Spaced-repetition study OS with Postgres RLS and MCP |
| **06** | [SpeakUp](https://jeyasurya.pages.dev/work/speakup/) | Offline-first Flutter reader with transactional outbox sync |
| **07** | [Prelude](https://jeyasurya.pages.dev/work/prelude/) | Multi-tenant wedding SaaS with token-based guest access |

Most personal projects are private; source is available on request.

### Toolbox

**Languages** Go · TypeScript · Python · Dart<br>
**Backend** Gin · FastAPI · Node.js · Django · PostgreSQL · Redis · Milvus<br>
**AI** AWS Bedrock · LlamaIndex · llama.cpp · Gemini · ElevenLabs · RAG · MCP · OpenLIT<br>
**Frontend & mobile** React · Next.js · Flutter<br>
**Cloud & quality** AWS · Docker · Kubernetes · GitHub Actions · Playwright

---

<sub>Previously at Clar Technologies - Software Engineer, then Software Development Engineer, building blockchain supply-chain finance and AI-assisted annotation tooling.</sub>
