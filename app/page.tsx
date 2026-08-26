'use client';

import { useState } from 'react';

type Lang = 'en' | 'zh';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const localHref = (href: string) =>
  href.startsWith('/') ? `${basePath}${href}` : href;

const copy = {
  en: {
    role: 'M.S. Student · University of Science and Technology of China',
    nav: ['Bio', 'Publications', 'Education'],
    languageLabel: 'Language',
    eyebrow: 'Medical AI · BCI · Test-Time Adaptation',
    headline:
      'Building adaptive AI systems for patient-specific clinical signals and personalized human-centered interaction.',
    bio: "I am a master's student at the University of Science and Technology of China, with research interests in large language model agents and reliable medical AI under cross-subject and cross-domain distribution shifts. My current work includes personalized LLM agents, test-time adaptation, multimodal EEG-video analysis, and medical image segmentation.",
    researchInterests: 'Research Interests',
    publicationsTitle: 'Selected Publications',
    educationTitle: 'Education',
    footer: 'Last updated 2026-08 · Designed for ytyan.github.io',
    interests: [
      'Large language models and intelligent agents',
      'Brain-computer interfaces and EEG analysis',
    ],
    publications: [
      {
        title:
          'Metric-Aware Test-Time Adaptation for Cross-Subject Multimodal Epileptiform-Discharge Detection',
        authors: '',
        venue: 'ACM Multimedia, 2026',
        role: 'First Author',
        image: '/assets/acmmm-framework.png',
        alt: 'Framework figure for metric-aware test-time adaptation',
        links: [
          { label: 'PDF', href: '/papers/acmmm-2026-metric-aware-tta.pdf' },
          { label: 'DOI', href: 'https://doi.org/10.1145/3767308.3837696' },
        ],
        summary:
          'A label-free test-time adaptation framework for unseen-patient epileptiform-discharge detection. JMTR adapts ranking scores for AUPRC, while DGC calibrates subtype posteriors under patient-dependent prior shift.',
        highlights: [
          'NeuroMM-2026 Challenge: 3rd place in binary spike detection',
          'NeuroMM-2026 Challenge: 3rd place in five-class subtype classification',
          'Frozen backbone, no target labels, post-hoc adaptation',
        ],
      },
      {
        title:
          'Reparameterizing Mamba via Frequency-Induced Topological Conduction for Medical Image Segmentation under Clinical Acquisition Heterogeneity',
        authors: '',
        venue: 'AAAI submission',
        role: 'Second Author',
        image: '/assets/topocmamba-preview.png',
        alt: 'TopoCMamba paper preview',
        links: [],
        summary:
          'TopoCMamba regulates Mamba state propagation with frequency-induced topological conductance, improving anatomical boundary preservation and unseen-domain segmentation across heterogeneous clinical acquisition settings.',
        highlights: [
          'Frequency-Topology Conductance Field for structural and boundary cues',
          'Conductance-Gated State Scan to suppress cross-boundary state mixing',
          'Evaluated across 15 datasets and six medical imaging modalities',
        ],
      },
      {
        title:
          'LynciaPsyEvo: Enabling Inter-Session Self-Evolution for Personalized LLM Counseling',
        authors: '',
        venue: 'Research internship project, planned CHI submission',
        role: 'First Author',
        image: '/assets/compass-flow.png',
        alt: 'ComPass workflow diagram',
        links: [],
        summary:
          'A multi-session counseling agent that keeps the base LLM frozen while adapting therapeutic strategy for each client across sessions, improving personalization and longitudinal self-evolution.',
        highlights: [
          'Per-client counseling strategy adaptation',
          'PsychEval average score: 7.74 vs. 7.35 for PsychAgent 32B',
          'Shanda Group research internship',
        ],
      },
    ],
    education: [
      {
        school: 'University of Science and Technology of China',
        degree: 'M.S. in Software Engineering',
        time: '2024 - 2027',
      },
      {
        school: 'Southwest Jiaotong University',
        degree: 'B.E. in Artificial Intelligence',
        time: '2019 - 2023',
      },
    ],
  },
  zh: {
    role: '中国科学技术大学 · 软件工程硕士研究生',
    nav: ['简介', '论文', '教育'],
    languageLabel: '语言',
    eyebrow: '医疗人工智能 · 脑机接口 · 测试时自适应',
    headline: '面向个体差异，构建可在部署后持续适配的可靠智能系统。',
    bio: '我目前是中国科学技术大学软件工程硕士研究生，研究兴趣聚焦于大模型智能体，以及跨受试者、跨域分布偏移下的可靠医疗人工智能。近期工作包括个性化大语言模型智能体、测试时自适应、多模态 EEG-视频癫痫样放电检测与医学图像分割。',
    researchInterests: '研究兴趣',
    publicationsTitle: '代表论文',
    educationTitle: '教育经历',
    footer: '最近更新 2026-08 · Designed for ytyan.github.io',
    interests: [
      '大语言模型与智能体',
      '脑机接口与 EEG 信号分析',
    ],
    publications: [
      {
        title:
          '面向跨受试者多模态癫痫样放电检测的指标感知测试时自适应 / Metric-Aware Test-Time Adaptation for Cross-Subject Multimodal Epileptiform-Discharge Detection',
        authors: '',
        venue: 'ACM Multimedia, 2026',
        role: '第一作者',
        image: '/assets/acmmm-framework.png',
        alt: '指标感知测试时自适应方法框架图',
        links: [
          { label: 'PDF', href: '/papers/acmmm-2026-metric-aware-tta.pdf' },
          { label: 'DOI', href: 'https://doi.org/10.1145/3767308.3837696' },
        ],
        summary:
          '本文提出一个无标签测试时自适应框架，用于未见患者的癫痫样放电检测。JMTR 针对 AUPRC 调整样本排序，DGC 针对患者间类别先验偏移校正亚型后验概率。',
        highlights: [
          'NeuroMM-2026 竞赛：二分类棘波检测 Track 第三名',
          'NeuroMM-2026 竞赛：五类亚型分类 Track 第三名',
          '冻结 backbone，不使用目标域标签，后处理式测试时自适应',
        ],
      },
      {
        title:
          '面向临床采集异质性医学图像分割的频率诱导拓扑传导 Mamba 重参数化 / Reparameterizing Mamba via Frequency-Induced Topological Conduction for Medical Image Segmentation under Clinical Acquisition Heterogeneity',
        authors: '',
        venue: 'AAAI 投稿',
        role: '第二作者',
        image: '/assets/topocmamba-preview.png',
        alt: 'TopoCMamba 论文预览图',
        links: [],
        summary:
          'TopoCMamba 利用频率诱导的拓扑传导约束调节 Mamba 状态传播，在临床采集异质性下提升医学图像分割中的解剖边界保持和未见域泛化能力。',
        highlights: [
          'Frequency-Topology Conductance Field 建模结构与边界线索',
          'Conductance-Gated State Scan 抑制跨边界状态混合',
          '在 15 个数据集、6 种医学影像模态上进行验证',
        ],
      },
      {
        title:
          'LynciaPsyEvo：面向个性化 LLM 咨询的跨会谈自进化 / LynciaPsyEvo: Enabling Inter-Session Self-Evolution for Personalized LLM Counseling',
        authors: '',
        venue: '研究型实习项目，计划投稿 CHI',
        role: '第一作者',
        image: '/assets/compass-flow.png',
        alt: 'ComPass 工作流程图',
        links: [],
        summary:
          '该工作构建多会谈心理咨询 Agent，在冻结基座大模型的基础上，为每位来访者跨会谈适配咨询策略，实现个性化与纵向自进化。',
        highlights: [
          '逐来访者咨询策略适配',
          'PsychEval 平均分 7.74，高于 PsychAgent 32B 的 7.35',
          '盛大集团研究型实习项目',
        ],
      },
    ],
    education: [
      {
        school: '中国科学技术大学',
        degree: '软件工程硕士',
        time: '2024 - 2027',
      },
      {
        school: '西南交通大学',
        degree: '人工智能本科',
        time: '2019 - 2023',
      },
    ],
  },
} satisfies Record<Lang, unknown>;

export default function Home() {
  const [lang, setLang] = useState<Lang>('zh');
  const t = copy[lang];

  return (
    <main lang={lang}>
      <div className="site-shell">
        <aside className="profile">
          <div className="avatar" aria-label="Yuting Yan portrait">
            <img
              src={`${basePath}/assets/profile.png?v=20260826b`}
              alt="Yuting Yan"
            />
          </div>
          <h1>Yuting Yan</h1>
          <p className="hanzi">闫玉婷</p>
          <p className="role">{t.role}</p>
          <div className="contact-list">
            <a href="mailto:ytyan@mail.ustc.edu.cn">ytyan@mail.ustc.edu.cn</a>
          </div>
          <div className="language-switch" aria-label={t.languageLabel}>
            <button
              aria-pressed={lang === 'en'}
              className={lang === 'en' ? 'active' : ''}
              onClick={() => setLang('en')}
              type="button"
            >
              EN
            </button>
            <button
              aria-pressed={lang === 'zh'}
              className={lang === 'zh' ? 'active' : ''}
              onClick={() => setLang('zh')}
              type="button"
            >
              中文
            </button>
          </div>
          <nav aria-label="Homepage sections">
            <a href="#bio">{t.nav[0]}</a>
            <a href="#publications">{t.nav[1]}</a>
            <a href="#education">{t.nav[2]}</a>
          </nav>
        </aside>

        <div className="content">
          <section className="hero" id="bio">
            <p className="eyebrow">{t.eyebrow}</p>
            <h2>{t.headline}</h2>
            <p>{t.bio}</p>
          </section>

          <section className="section">
            <h3>{t.researchInterests}</h3>
            <ul className="plain-list">
              {t.interests.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="section" id="publications">
            <h3>{t.publicationsTitle}</h3>
            <div className="publication-list">
              {t.publications.map((paper) => (
                <article className="publication" key={paper.title}>
                  <div className="thumb-wrap">
                    <img src={localHref(paper.image)} alt={paper.alt} />
                  </div>
                  <div>
                    <div className="pub-meta">
                      <span>{paper.role}</span>
                      <span>{paper.venue}</span>
                    </div>
                    <h4>{paper.title}</h4>
                    {paper.authors ? (
                      <p className="authors">{paper.authors}</p>
                    ) : null}
                    <p>{paper.summary}</p>
                    <ul>
                      {paper.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {paper.links.length > 0 ? (
                      <div className="link-row">
                        {paper.links.map((link) => (
                          <a href={localHref(link.href)} key={link.href}>
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="education">
            <h3>{t.educationTitle}</h3>
            <div className="education-list">
              {t.education.map((item) => (
                <div className="education-item" key={item.school}>
                  <div>
                    <h4>{item.school}</h4>
                    <p>{item.degree}</p>
                  </div>
                  <span>{item.time}</span>
                </div>
              ))}
            </div>
          </section>

          <footer>{t.footer}</footer>
        </div>
      </div>
    </main>
  );
}
