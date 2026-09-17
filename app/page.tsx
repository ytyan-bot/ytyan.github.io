'use client';

import { useEffect, useState } from 'react';

type Lang = 'en' | 'zh';
type ImagePreview = {
  alt: string;
  src: string;
  title: string;
};

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
    publicationsTitle: 'Research',
    publicationGroups: [{ status: 'accepted', label: 'Accepted Publications' }, { status: 'submitted', label: 'Under Submission' }],
    educationTitle: 'Education',
    footer: 'Last updated 2026-09-17 · Designed for ytyan.github.io',
    interests: [
      'Large language models and intelligent agents',
      'Brain-computer interfaces and EEG analysis',
    ],
    publications: [
      {
        title:
          'Metric-Aware Test-Time Adaptation for Cross-Subject Multimodal Epileptiform-Discharge Detection',
        authors: '',
        venue: 'ACM MM 2026',
        status: 'accepted',
        role: 'First Author',
        image: '/assets/acmmm-framework.png?v=20260826d',
        alt: 'Framework figure for metric-aware test-time adaptation',
        links: [
          { label: 'PDF', href: '/papers/acmmm-2026-metric-aware-tta.pdf' },
        ],
        summary:
          "Project source: Motivated by an interest in BCI, entered the NeuroMM-2026 Multimodal Epileptiform-Discharge Detection Challenge as an individual participant. Independently designed the algorithms, implemented the proposed methods, and conducted experimental validation.",
        highlights: [
          "Overview: A label-free test-time adaptation framework for cross-patient EEG-video epileptiform-discharge detection, correcting detection rankings and subtype posteriors with model weights frozen.",
          "Contributions: (1) JMTR addresses the inability of order-preserving calibration to improve AUPRC. Standardized, scale-balanced relative band-power and DINOv2 video features form a joint kNN graph; a single anchored update blends original scores with neighborhood averages to re-rank predictions while bounding deviation from the original outputs. (2) DGC measures drift through the L1 distance between predicted target proportions and the training prior, gating between prior alignment via iterative proportional fitting and neighborhood smoothing in log-probability space. Larger drift reduces source-prior constraints and preserves the target class distribution.",
          "Results: Third place in both NeuroMM-2026 binary and five-class tracks; AUPRC improved from 0.9781 to 0.9937 and five-class weighted-F1 from 0.7772 to 0.7891.",
        ],
      },
      {
        title:
          'PsyEvo: Test-Time Personalization and Self-Evolution for Multi-Session Counseling',
        authors: '',
        venue: 'ICLR 2027',
        status: 'submitted',
        role: 'Co-first Author',
        image: '/assets/psyevo-test-time-learning.png?v=20260917b',
        alt: 'PsyEvo test-time learning: within-session counseling and between-session HBSP, population LiPO, and SOCA updates',
        links: [],
        summary:
          "Overview: For multi-session counseling, a frozen base model combines personalized counseling-skill selection with cross-client response-strategy learning, learning which intervention suits each person and how to respond more effectively.",
        highlights: [
          "Contributions: (1) HBSP combines shared state-skill values with client-specific posteriors for skill selection through posterior sampling, updating individual values from client outcomes along realized sessions. (2) LiPO aggregates cross-client candidate-response rankings to update a shared lightweight adapter between sessions. (3) SOCA uses relative comparison and consistency checking to address compressed self-scores, using candidate preferences for response optimization and discounted ordinal credit along realized trajectories for skill learning, while distinguishing response quality from client outcomes. Subsequent clients benefit from improvements to the shared policy while retaining their own skill biases.",
          "Results: PsyEvo achieves SOTA on PsychEval and MusPsy for multi-session counseling, with an overall score of 7.675 and a mean working-alliance score of 4.5850. SOCA achieves SOTA on SummEval for summary-quality evaluation, with a mean Spearman correlation of 0.508.",
        ],
      },
      {
        title:
          'Reparameterizing Mamba via Frequency-Induced Topological Conduction for Medical Image Segmentation under Clinical Acquisition Heterogeneity',
        authors: '',
        venue: 'AAAI 2027',
        status: 'submitted',
        role: 'Second Author',
        image: '/assets/topocmamba-preview.png?v=20260826c',
        alt: 'TopoCMamba paper preview',
        links: [],
        summary:
          "Overview: Unseen-domain medical image segmentation under distribution shifts caused by heterogeneous clinical acquisition, focusing on state mixing when Mamba scans cross anatomical boundaries.",
        highlights: [
          "Contributions: Contributed to the Frequency-Topology Conductance Field (FTCF) and Conductance-Gated State Scan (CGSS), combining low-frequency structure and high-frequency boundary information to strengthen within-structure propagation and suppress cross-boundary mixing. Joint modeling of regions, boundaries, and local affinities compensates for structural detail lost during decoding.",
          "Results: Evaluated on 15 datasets across six medical imaging modalities, improving boundary delineation and structural integrity under heterogeneous acquisition settings while maintaining favorable computational efficiency.",
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
    publicationsTitle: '科研成果',
    publicationGroups: [{ status: 'accepted', label: '已录用论文' }, { status: 'submitted', label: '在投论文' }],
    educationTitle: '教育经历',
    footer: '最近更新 2026-09-17 · Designed for ytyan.github.io',
    interests: [
      '大语言模型与智能体',
      '脑机接口与 EEG 信号分析',
    ],
    publications: [
      {
        title:
          '面向跨受试者多模态癫痫样放电检测的指标感知测试时自适应 / Metric-Aware Test-Time Adaptation for Cross-Subject Multimodal Epileptiform-Discharge Detection',
        authors: '',
        venue: 'ACM MM 2026',
        status: 'accepted',
        role: '第一作者',
        image: '/assets/acmmm-framework.png?v=20260826d',
        alt: '指标感知测试时自适应方法框架图',
        links: [
          { label: 'PDF', href: '/papers/acmmm-2026-metric-aware-tta.pdf' },
        ],
        summary:
          "课题来源：出于对 BCI 的兴趣，以个人身份参加 NeuroMM-2026 多模态癫痫样放电检测挑战赛，独立完成算法设计、创新方法实现与实验验证。",
        highlights: [
          "内容概述：面向跨患者 EEG-视频癫痫样放电检测，设计无需目标标签、不更新模型权重的测试时自适应框架，分别校正检测排序与亚型分类后验。",
          "创新点：1. JMTR：针对保序校准无法改善 AUPRC 的问题，将相对频带功率与 DINOv2 视频特征标准化、尺度平衡后构建联合 kNN 图；融合原始分数与邻域均值，进行单步重排序，限制校正偏离原始预测的幅度。2. DGC：以目标预测分布与训练先验的 L1 距离衡量漂移，在迭代比例拟合的先验对齐与 log 概率空间近邻平滑之间门控加权，漂移较大时减少先验约束、保留目标类别分布。",
          "效果：NeuroMM-2026 二分类和五分类赛道均获第三名；AUPRC 由 0.9781 提升至 0.9937，五分类 weighted-F1 由 0.7772 提升至 0.7891。",
        ],
      },
      {
        title:
          'PsyEvo：面向多会谈心理咨询的测试时个性化与自进化 Agent / PsyEvo: Test-Time Personalization and Self-Evolution for Multi-Session Counseling',
        authors: '',
        venue: 'ICLR 2027',
        status: 'submitted',
        role: '共同第一作者',
        image: '/assets/psyevo-test-time-learning.png?v=20260917b',
        alt: 'PsyEvo 测试时学习：会谈内咨询与会谈间 HBSP、群体 LiPO、SOCA 更新',
        links: [],
        summary:
          "内容概述：面向多会谈心理咨询，在冻结基础模型上结合个体咨询技能选择与跨来访者的回应策略学习，使 Agent 在持续交互中学习“对这个人选择什么干预”与“如何更好地回应”。",
        highlights: [
          "创新点：1. HBSP：结合共享状态—技能价值与来访者专属后验，通过后验采样选择技能，依据已发生会谈中的来访者结果更新个体价值。2. LiPO：汇集跨来访者的候选回复排序，在会谈间更新共享轻量适配器。3. SOCA：通过相对比较与一致性核验缓解自评分数压缩，将候选偏好用于回应优化，将真实轨迹上的折扣序数信用用于技能学习，区分回复质量与来访者结果两类信号。后续来访者可受益于共享策略的持续改进，同时保留各自独立的技能偏置。",
          "效果：PsyEvo 在 PsychEval 和 MusPsy 多会谈心理咨询任务上达到 SOTA，综合均分和工作同盟均分分别为 7.675、4.5850；SOCA 在 SummEval 摘要质量评估任务上达到 SOTA，平均 Spearman 相关系数为 0.508。",
        ],
      },
      {
        title:
          'TopoCMamba：面向临床采集异质性的医学图像分割 / Reparameterizing Mamba via Frequency-Induced Topological Conduction for Medical Image Segmentation under Clinical Acquisition Heterogeneity',
        authors: '',
        venue: 'AAAI 2027',
        status: 'submitted',
        role: '第二作者',
        image: '/assets/topocmamba-preview.png?v=20260826c',
        alt: 'TopoCMamba 论文预览图',
        links: [],
        summary:
          "内容概述：针对临床采集异质性引起的跨域分布偏移，研究未见域医学图像分割，重点改善 Mamba 扫描跨越解剖边界时的状态混合问题。",
        highlights: [
          "创新点：参与设计频率—拓扑传导场（FTCF）与传导门控状态扫描（CGSS），结合低频结构与高频边界信息调节状态转移，增强结构内传播、抑制跨边界混合；通过区域、边界和局部亲和性联合建模，补偿解码中的结构细节损失。",
          "效果：在 15 个数据集、6 种医学影像模态上验证，改善异质采集条件下的边界勾画与结构完整性，并保持较好的计算效率。",
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
  const [preview, setPreview] = useState<ImagePreview | null>(null);
  const t = copy[lang];

  useEffect(() => {
    if (!preview) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreview(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [preview]);

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
              {t.publicationGroups.map((group) => (
                <div className="publication-group" key={group.status}>
                  <h4 className="publication-group-title">{group.label}</h4>
                  {t.publications.filter((paper) => paper.status === group.status).map((paper) => (
                <article className="publication" key={paper.title}>
                  <div className="thumb-wrap">
                    <button
                      aria-label={`Open image: ${paper.title}`}
                      className="image-button"
                      onClick={() =>
                        setPreview({
                          alt: paper.alt,
                          src: localHref(paper.image),
                          title: paper.title,
                        })
                      }
                      type="button"
                    >
                      <img src={localHref(paper.image)} alt={paper.alt} />
                    </button>
                  </div>
                  <div>
                    <div className="pub-meta">
                      <span>{paper.venue}{lang === 'zh'
                        ? `（${paper.role}，${paper.status === 'accepted' ? '已录用' : '在投'}）`
                        : ` (${paper.role}, ${paper.status === 'accepted' ? 'Accepted' : 'Under Review'})`}</span>
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

      {preview ? (
        <div
          aria-modal="true"
          className="image-modal"
          onClick={() => setPreview(null)}
          role="dialog"
        >
          <button
            aria-label="Close image preview"
            className="modal-close"
            onClick={() => setPreview(null)}
            type="button"
          >
            ×
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={preview.src} alt={preview.alt} />
            <figcaption>{preview.title}</figcaption>
          </figure>
        </div>
      ) : null}
    </main>
  );
}
