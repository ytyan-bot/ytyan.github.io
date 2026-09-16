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
    footer: 'Last updated 2026-09-16 · Designed for ytyan.github.io',
    interests: [
      'Large language models and intelligent agents',
      'Brain-computer interfaces and EEG analysis',
    ],
    publications: [
      {
        title:
          'Metric-Aware Test-Time Adaptation for Cross-Subject Multimodal Epileptiform-Discharge Detection',
        authors: '',
        venue: 'ACM MM 2026 · Accepted',
        status: 'accepted',
        role: 'First Author',
        image: '/assets/acmmm-framework.png?v=20260826d',
        alt: 'Framework figure for metric-aware test-time adaptation',
        links: [
          { label: 'PDF', href: '/papers/acmmm-2026-metric-aware-tta.pdf' },
        ],
        summary:
          'Project source: NeuroMM-2026 Multimodal Epileptiform-Discharge Detection Challenge (ACM Multimedia 2026); 3rd place in both binary spike detection and five-class subtype classification tracks.',
        highlights: [
          'Overview: EEG-video epileptiform-discharge detection under cross-patient distribution shift, using test-time adaptation with a frozen model and no target-patient labels.',
          'Contribution: JMTR builds a joint EEG-video nearest-neighbor graph to refine detection-score ranking, improving AUPRC from 0.9781 to 0.9937; DGC gates prior alignment according to patient-level class-distribution shift and calibrates subtype posteriors, improving F1 from 0.67 to 0.80.',
        ],
      },
      {
        title:
          'PsyEvo: Test-Time Personalization and Self-Evolution for Multi-Session Counseling',
        authors: '',
        venue: 'ICLR 2027, under submission',
        status: 'submitted',
        role: 'First Author',
        image: '/assets/psyevo-test-time-learning.png',
        alt: 'PsyEvo test-time learning: within-session counseling and between-session HBSP, population LiPO, and SOCA updates',
        links: [],
        summary:
          'Overview: For previously unseen clients, PsyEvo combines client-specific counseling-skill selection with cross-client response-strategy learning over a frozen base model, learning both which intervention suits each person and how to respond more effectively through continued interaction.',
        highlights: [
          'Contribution: (1) HBSP combines shared state-skill values with client-specific posteriors and selects counseling skills through posterior sampling. (2) LiPO aggregates cross-client preference experience and updates a shared lightweight adapter between sessions. (3) SOCA addresses compressed self-scores by constructing candidate preferences through relative comparison and consistency checking, then propagating discounted ordinal credit along realized session trajectories for response optimization and skill learning.',
          'Results: PsyEvo achieves SOTA on PsychEval and MusPsy for multi-session counseling, with an overall score of 7.675 and a mean working-alliance score of 4.5850. SOCA achieves SOTA on SummEval for summary-quality evaluation, with a mean Spearman correlation of 0.508.',
        ],
      },
      {
        title:
          'Reparameterizing Mamba via Frequency-Induced Topological Conduction for Medical Image Segmentation under Clinical Acquisition Heterogeneity',
        authors: '',
        venue: 'AAAI 2027, under submission',
        status: 'submitted',
        role: 'Second Author',
        image: '/assets/topocmamba-preview.png?v=20260826c',
        alt: 'TopoCMamba paper preview',
        links: [],
        summary:
          'Overview: TopoCMamba addresses cross-domain distribution shifts caused by variations in clinical acquisition and studies unseen-domain medical image segmentation, with an emphasis on stable anatomical-structure and boundary prediction.',
        highlights: [
          'Method: Contributed to the Frequency-Topology Conductance Field (FTCF) and Conductance-Gated State Scan (CGSS), injecting frequency structure and topological boundary information into Mamba state propagation to suppress cross-boundary feature mixing.',
          'Experiments: Evaluated on 15 datasets across six medical imaging modalities to assess boundary preservation and unseen-domain segmentation robustness under heterogeneous acquisition settings.',
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
    footer: '最近更新 2026-09-16 · Designed for ytyan.github.io',
    interests: [
      '大语言模型与智能体',
      '脑机接口与 EEG 信号分析',
    ],
    publications: [
      {
        title:
          '面向跨受试者多模态癫痫样放电检测的指标感知测试时自适应 / Metric-Aware Test-Time Adaptation for Cross-Subject Multimodal Epileptiform-Discharge Detection',
        authors: '',
        venue: 'ACM MM 2026 · 已录用',
        status: 'accepted',
        role: '第一作者',
        image: '/assets/acmmm-framework.png?v=20260826d',
        alt: '指标感知测试时自适应方法框架图',
        links: [
          { label: 'PDF', href: '/papers/acmmm-2026-metric-aware-tta.pdf' },
        ],
        summary:
          '课题来源：NeuroMM-2026 多模态癫痫样放电检测挑战赛（ACM Multimedia 2026），二分类棘波检测与五类亚型分类两个 track 均获第三名。',
        highlights: [
          '内容概述：基于 EEG 与视频检测癫痫样放电，针对跨患者分布偏移，在冻结模型、不使用目标患者标签的条件下进行测试时自适应。',
          '创新点：按评价指标选择适配对象：JMTR 构建 EEG-视频联合近邻图，修正检测分数排序，AUPRC 从 0.9781 提升至 0.9937；DGC 根据患者类别分布偏移门控先验对齐，校正亚型后验，F1 从 0.67 提升至 0.80。',
        ],
      },
      {
        title:
          'PsyEvo：面向多会谈心理咨询的测试时个性化与自进化 / PsyEvo: Test-Time Personalization and Self-Evolution for Multi-Session Counseling',
        authors: '',
        venue: 'ICLR 2027（在投）',
        status: 'submitted',
        role: '第一作者',
        image: '/assets/psyevo-test-time-learning.png',
        alt: 'PsyEvo 测试时学习：会谈内咨询与会谈间 HBSP、群体 LiPO、SOCA 更新',
        links: [],
        summary:
          '内容概述：面向此前未见的来访者，在冻结基础模型上结合个体咨询技能选择与跨来访者的回应策略学习，使 Agent 在持续交互中学习“对这个人选择什么干预”与“如何更好地回应”。',
        highlights: [
          '创新点：1. 个性化（HBSP）：结合共享状态—技能价值与来访者专属后验，通过后验采样选择咨询技能。2. 自进化（LiPO）：汇集跨来访者的偏好经验，在会谈间更新共享轻量适配器，改进回应策略。3. 信用分配（SOCA）：针对自评分数压缩，通过相对比较与一致性核验构造候选偏好，并沿已发生的会谈轨迹折扣传播序数信用，分别支持回应优化和技能学习。',
          '效果：多会谈心理咨询任务：PsyEvo 在 PsychEval 和 MusPsy 上达到 SOTA，综合均分和工作同盟均分分别为 7.675、4.5850。摘要质量评估任务：SOCA 在 SummEval 上达到 SOTA，平均 Spearman 相关系数为 0.508。',
        ],
      },
      {
        title:
          'TopoCMamba：面向临床采集异质性的医学图像分割 / Reparameterizing Mamba via Frequency-Induced Topological Conduction for Medical Image Segmentation under Clinical Acquisition Heterogeneity',
        authors: '',
        venue: 'AAAI 2027（在投）',
        status: 'submitted',
        role: '第二作者',
        image: '/assets/topocmamba-preview.png?v=20260826c',
        alt: 'TopoCMamba 论文预览图',
        links: [],
        summary:
          '内容概述：针对临床采集条件变化造成的跨域分布偏移，研究未见域医学图像分割，重点提升解剖结构与边界预测的稳定性。',
        highlights: [
          '方法：参与设计频率—拓扑传导场（FTCF）与传导门控状态扫描（CGSS），将频率结构和拓扑边界信息注入 Mamba 状态传播，抑制跨边界特征混合。',
          '实验：在 15 个数据集、6 种医学影像模态上进行验证，系统评估模型在异质采集条件下的边界保持能力与未见域分割鲁棒性。',
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
