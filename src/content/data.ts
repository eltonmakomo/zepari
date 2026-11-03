import type { Article, EventItem, MediaItem, Partner, Person, Publication, Theme } from "./types";
import { liveArticles, liveEvents, livePublications, liveVideos } from "./live";
import comesaLogo from "@/assets/partners/comesa.png.asset.json";
import faoLogo from "@/assets/partners/fao.png.asset.json";
import undpLogo from "@/assets/partners/undp.png.asset.json";
import imcLogo from "@/assets/partners/imc.png.asset.json";
import afdbLogo from "@/assets/partners/afdb.png.asset.json";
import acbfLogo from "@/assets/partners/acbf.png.asset.json";

const F = "https://zepari.co.zw/sites/default/files";

export const site = {
  name: "ZEPARI",
  full: "Zimbabwe Economic Policy Analysis and Research Institute",
  founded: 2003,
  address: "55 Mull Road, Belvedere, Harare, Zimbabwe",
  phones: ["+263 242 778423", "+263 242 785926-7", "+263 242 711451"],
  emails: ["administration@zepari.co.zw", "chigumirag@zepari.co.zw"],
  social: {
    linkedin: "https://www.linkedin.com/search/results/all/?keywords=ZEPARI",
    x: "https://twitter.com/ZEPARU1",
    facebook: "https://www.facebook.com/ZEPARU.page/",
    youtube: "https://www.youtube.com/channel/UC8WmKZtPhz0KViTggTMdsxw",
  },
};

export const themes: Theme[] = [
  { id: "macro", name: "Macroeconomic Stability & Growth", short: "Macroeconomy", description: "Monetary and fiscal policy, currency reform, inflation dynamics and the structural transformation of Zimbabwe's economy towards Vision 2030.", questions: ["How can currency stability be sustained?", "Is growth translating into jobs and incomes?", "What drives structural transformation?"] },
  { id: "finance", name: "Banking, Finance & Investment", short: "Finance", description: "Competition, efficiency and stability in the banking sector, access to credit, capital markets and information for the investing public.", questions: ["Why is private-sector credit so scarce?", "How competitive is Zimbabwe's banking industry?"] },
  { id: "trade", name: "Trade, Industry & Competitiveness", short: "Trade & Industry", description: "AfCFTA readiness, regional value chains, infrastructure bottlenecks and industrial competitiveness.", questions: ["Is Zimbabwe ready for the AfCFTA?", "What does infrastructure cost industry?"] },
  { id: "poverty", name: "Poverty, Gender & Social Protection", short: "Poverty & Gender", description: "Multidimensional poverty, gender, child nutrition, remittances and the effectiveness of public transfers.", questions: ["Who is left behind?", "Do public transfers reduce deprivation?"] },
  { id: "agriculture", name: "Agriculture & Food Security", short: "Agriculture", description: "Input support schemes, household resilience, food consumption and rural investment.", questions: ["Do free-input schemes reduce food insecurity?", "What builds household resilience?"] },
  { id: "governance", name: "Devolution & Public Sector Governance", short: "Governance", description: "Devolution, public finance management and institutional capacity for evidence-based policy.", questions: ["What makes devolution succeed?", "How can public resources be better allocated?"] },
  { id: "energy", name: "Energy & Infrastructure", short: "Energy", description: "Electricity subsidies, energy poverty and the infrastructure investment gap.", questions: ["Are electricity subsidies pro-poor?"] },
];

export const people: Person[] = [
  { slug: "gibson-chigumira", name: "Dr. Gibson Chigumira", role: "Executive Director", group: "team", photo: `${F}/2018-03/chigumira.jpg`, bio: "Gibson Chigumira has extensive experience in research, including coordinating research studies, editing publications and developing data bases, having been at the helm of the institution since it started operating in 2004. Dr. G. Chigumira has also done work in his individual capacity for civil society organizations such as NANGO, Action AID and ZIMCOD.", themes: ["macro", "trade"] },
  { slug: "ngosi-shumba", name: "Ngosi Shumba", role: "Finance and Administration Manager", group: "team", photo: `${F}/2018-03/shumba.jpg`, bio: "Ngosi Shumba holds a Bachelor of Accountancy Honours Degree from the University of Zimbabwe (UZ). He is also an Associate member of the Chartered Institute of Secretaries and Administrators (CIS) and holds an MBA in Finance from the University of Wales. He has extensive experience in auditing, accounting and finance." },
  { slug: "erinah-chipumho", name: "Erinah Chipumho", role: "Senior Research Fellow", group: "team", photo: `${F}/2018-03/erinah.jpg`, bio: "Erinah Chipumho is an Economist with more than 10 years of experience in economic policy research. She joined ZEPARU in January 2005 as a Research Fellow and rose to the post of Senior Research Fellow in February 2011. She holds a Bachelors and a Master’s degree in Economics obtained from the University of Zimbabwe.", themes: ["macro", "governance"] },
  { slug: "evangelista-mudzonga", name: "Evangelista Mudzonga", role: "Senior Research Fellow", group: "team", photo: `${F}/2018-03/madzonga.jpg`, bio: "Evangelista Mudzonga holds an MBA, MSc Economics and BSc Economics Degrees. She has over 11 years of national, regional and international trade policy analysis, trade negotiations and trade policy implementation experience, particularly on SADC, COMESA and EAC regions.", themes: ["trade", "macro"] },
  { slug: "esnath-nyamunga", name: "Esnath Nyamunga", role: "Finance and Administration Assistant", group: "team", photo: `${F}/2026-07/eSNATH%20GIMP2.jpeg`, bio: "Supports finance and administrative functions at ZEPARI." },
  { slug: "jesimen-chipika", name: "Dr. Jesimen Chipika", role: "Chairperson", affiliation: "Reserve Bank of Zimbabwe, Deputy Governor", group: "board", photo: `${F}/2018-03/jesimen-chipika.jpg`, bio: "Chairperson of the ZEPARI Board of Trustees." },
  { slug: "isaac-kwesu", name: "Dr. Isaac Kwesu", role: "Trustee", affiliation: "Chamber of Mines", group: "board", photo: `${F}/2018-03/kwesu.jpg`, bio: "Trustee representing the Chamber of Mines." },
  { slug: "gibson-chigumira-board", name: "Dr. Gibson Chigumira", role: "Executive Director (Ex Officio)", affiliation: "ZEPARI", group: "board", photo: `${F}/2018-03/chigumira_0.jpg`, bio: "Ex-officio trustee." },
  { slug: "cornelius-dube", name: "Dr. Cornelius Dube", role: "Trustee", affiliation: "Confederation of Zimbabwe Industries (CZI)", group: "board", photo: `${F}/2023-01/Dube%203.jpg`, bio: "Trustee representing the Confederation of Zimbabwe Industries." },
];

const curatedPublications: Publication[] = [
  {
    slug: "structural-transformation-zimbabwe",
    title: "A Diagnosis of Structural Transformation in Zimbabwe: Trends, Challenges, and Opportunities",
    type: "Research Study", date: "2026-10-01", featured: true, pages: 148,
    authors: ["gibson-chigumira", "Philton Makena", "Wellington Matsika", "evangelista-mudzonga", "Elisha Mavodyo"],
    themes: ["macro", "trade"],
    cover: `${F}/2026-10/IMG_8425.PNG`,
    abstract: "The study provides a detailed diagnosis of Zimbabwe's economic structural changes from 1991 to 2023. Anchored in national development frameworks including Vision 2030, NDS1, and NDS2, as well as regional initiatives (AU Agenda 2063, AfCFTA) and global benchmarks (UN SDGs 8, 9 & 12), the paper evaluates how productive resources, labour and capital have reallocated across agriculture, industry, and services.",
    keyFindings: ["Labour has shifted out of agriculture largely into low-productivity informal services rather than manufacturing.", "Manufacturing's share of GDP has contracted substantially since the early 1990s.", "Capital accumulation has been uneven and concentrated in extractive sectors."],
    recommendations: ["Prioritise productivity-enhancing reallocation towards manufacturing and agro-processing.", "Align industrial policy with AfCFTA value-chain opportunities.", "Strengthen data systems to monitor transformation under NDS2."],
    access: { mode: "paid", priceUSD: 25, tiers: [{ id: "individual", label: "Individual", priceUSD: 25, note: "Personal licence, PDF download" }, { id: "institution", label: "Institutional", priceUSD: 120, note: "Up to 25 staff, citation rights" }] },
  },
  {
    slug: "banking-competition-efficiency-stability",
    title: "Banking Industry Competition, Efficiency and Stability in Zimbabwe",
    type: "Research Study", date: "2026-10-13", featured: true, pages: 96,
    authors: ["gibson-chigumira", "erinah-chipumho"], themes: ["finance"],
    abstract: "Zimbabwe's banks are well capitalised and liquid, yet private-sector credit remains among the lowest in the region. This study examines market structure, cost efficiency and stability to explain why a 'safe and sound' banking system still fails to finance productive investment.",
    keyFindings: ["The sector is moderately concentrated, with the top five banks holding the majority of deposits.", "High capital buffers coexist with very low loan-to-deposit ratios.", "Currency uncertainty is the dominant constraint on long-term lending."],
    recommendations: ["Deepen the collateral registry and credit-reference infrastructure.", "Provide a predictable monetary framework to support longer tenors.", "Encourage competition through digital-banking licensing."],
    access: { mode: "paid", priceUSD: 15 },
  },
  {
    slug: "afcfta-readiness-zimbabwe",
    title: "Zimbabwe's Readiness, Opportunities and Trade Challenges under the AfCFTA",
    type: "Report", date: "2026-08-20", pages: 72, authors: ["evangelista-mudzonga", "gibson-chigumira"], themes: ["trade"],
    abstract: "Technical report validated with stakeholders at a ZEPARI workshop, assessing firm-level readiness and sectoral opportunities for Zimbabwe under the African Continental Free Trade Area.",
    keyFindings: ["Awareness of AfCFTA rules of origin among SMEs remains low.", "Infrastructure and logistics costs erode price competitiveness."], recommendations: ["Establish an AfCFTA business help-desk.", "Prioritise trade-facilitation reforms at border posts."],
    access: { mode: "free" },
  },
  { slug: "multi-dimensional-risk-stunting", title: "The Multi Dimensional Risk of Stunting Amongst Children Under Five Years in Zimbabwe", type: "Policy Brief", date: "2022-02-28", authors: ["ZEPARI Research Team"], themes: ["poverty"], publicFile: `${F}/2022-03/Multi%20Dimensional%20Risk%20of%20stunting%20amongst%20children%20under%205yrs%20in%20Zim.pdf`, abstract: "Examines the household, maternal and community factors associated with stunting among children under five in Zimbabwe.", keyFindings: ["Stunting risk is shaped by overlapping deprivations rather than income alone."], recommendations: ["Integrate nutrition, water and sanitation interventions."], access: { mode: "free" } },
  { slug: "multidimensional-poverty-gender", title: "Multidimensional Poverty in Zimbabwe: A Gender Perspective", type: "Policy Brief", date: "2022-02-28", authors: ["Benhura, M.", "Mhariwa, F."], themes: ["poverty"], cover: `${F}/2022-03/multidimensional%20poverty%20and%20gender.jpg`, publicFile: `${F}/2022-03/Gender%20and%20Multidimensional%20Poverty.pdf`, abstract: "Analyses how multidimensional poverty differs between male- and female-headed households in Zimbabwe.", keyFindings: ["Female-headed households face higher deprivation intensity."], recommendations: ["Gender-responsive targeting of social protection."], access: { mode: "free" } },
  { slug: "resilience-capacity-food-consumption", title: "Resilience Capacity, Food Consumption and Socio-Economic Status in Zimbabwe", type: "Policy Brief", date: "2022-02-28", authors: ["ZEPARI Research Team"], themes: ["agriculture", "poverty"], publicFile: `${F}/2022-03/Resilience%20%20capacity%20food%20consumption%20and%20socieconomic%20status%20in%20Zim.pdf`, abstract: "Investigates the relationship between household resilience capacity, food consumption and socio-economic status.", keyFindings: ["Asset ownership and access to services strongly predict resilience."], recommendations: ["Invest in rural services that build adaptive capacity."], access: { mode: "free" } },
  { slug: "energy-and-poverty-electricity-subsidy", title: "Energy and Poverty: The Efficacy of Electricity Subsidy in Alleviating Poverty in Zimbabwe", type: "Policy Brief", date: "2022-01-31", authors: ["ZEPARI Research Team"], themes: ["energy", "poverty"], publicFile: `${F}/2022-03/Energy%20and%20Poverty.pdf`, abstract: "Assesses whether electricity subsidies reach poor households and reduce poverty.", keyFindings: ["Subsidies disproportionately benefit connected, better-off households."], recommendations: ["Shift to targeted lifeline tariffs."], access: { mode: "free" } },
  { slug: "remittances-agricultural-investment", title: "Do Remittances and/or Public Transfers Matter for Agricultural Investments and Food Security Outcomes amongst Rural Households in Zimbabwe", type: "Policy Brief", date: "2022-02-28", authors: ["ZEPARI Research Team"], themes: ["agriculture", "poverty"], publicFile: `${F}/2022-03/Remittances%20and%20Agricultural%20investments%20and%20Outcomes.pdf`, abstract: "Explores whether remittances and public transfers are channelled into agricultural investment and improve food security.", keyFindings: ["Remittances are associated with higher input use."], recommendations: ["Lower remittance costs and link transfers to productive investment."], access: { mode: "free" } },
  { slug: "remittances-consumption-household-investment", title: "Remittances, Consumption Patterns and Household Investment: The Case of Zimbabwe", type: "Policy Brief", date: "2022-01-31", authors: ["ZEPARI Research Team"], themes: ["poverty", "finance"], publicFile: `${F}/2022-03/Remittances%2C%20consumption%20patterns%20and%20household%20investment.pdf`, abstract: "Examines how remittance-receiving households allocate spending between consumption and investment.", keyFindings: ["Remittances raise education and housing expenditure."], recommendations: ["Develop diaspora investment instruments."], access: { mode: "free" } },
  { slug: "free-seed-input-schemes", title: "Do Agricultural Free Seed Input Support Schemes Reduce Food Insecurity and Poverty in Rural Zimbabwe?", type: "Policy Brief", date: "2022-01-31", authors: ["ZEPARI Research Team"], themes: ["agriculture"], publicFile: `${F}/2022-03/Do%20Agricultural%20free%20seed%20input%20support%20scheme%20reduce%20food%20insecurity.pdf`, abstract: "Evaluates the food security and poverty impacts of free seed input support schemes.", keyFindings: ["Impacts depend on timeliness and complementary inputs."], recommendations: ["Improve targeting and delivery timing."], access: { mode: "free" } },
  { slug: "towards-successful-devolution", title: "Towards Successful Implementation of Devolution in Zimbabwe", type: "Policy Brief", date: "2020-03-31", authors: ["ZEPARI Research Team"], themes: ["governance"], publicFile: `${F}/2020-04/Towards%20Successful%20Implementation%20of%20Devolution%20in%20Zimbabwe%20-%20WEB.pdf`, abstract: "This policy brief summarises the key outcomes and recommendations of the policy dialogue on the key success factors for implementing devolution in Zimbabwe.", keyFindings: ["Clear fiscal transfer rules are central to devolution success."], recommendations: ["Legislate an intergovernmental fiscal framework.", "Build local-authority capacity."], access: { mode: "free" } },
  { slug: "economic-barometer-q3-2026", title: "Zimbabwe Economic Barometer — Q3 2026", type: "Economic Barometer", date: "2026-09-30", pages: 28, authors: ["erinah-chipumho"], themes: ["macro", "finance"], abstract: "Quarterly assessment of macroeconomic indicators, exchange-rate developments, inflation and sectoral performance, designed for investors and policymakers.", keyFindings: ["Inflation moderated over the quarter.", "Mining and agriculture led growth."], recommendations: ["Maintain fiscal discipline ahead of the 2027 budget."], access: { mode: "paid", priceUSD: 10 } },
  { slug: "working-paper-informality-jobs", title: "Informality and the Jobs Gap in Zimbabwe", type: "Working Paper", date: "2026-07-15", pages: 41, authors: ["evangelista-mudzonga"], themes: ["macro", "poverty"], abstract: "Working paper analysing why recent growth has not translated into formal employment and better incomes.", keyFindings: ["Most net job creation is informal and low-wage."], recommendations: ["Reduce the cost of formalisation for small firms."], access: { mode: "free" } },
];

const curatedArticles: Article[] = [
  { slug: "safe-sound-still-short-of-credit", title: "Safe, sound and still short of credit: the dilemma at the heart of Zimbabwe's banking sector", kind: "News", date: "2026-10-13", author: "ZEPARI", themes: ["finance"], image: `${F}/2026-10/Gemini_Generated_Image_49by0649by0649by.jpeg`, excerpt: "The Banking Industry Competition, Efficiency and Stability in Zimbabwe study finds a sector that is stable yet lending too little to the productive economy.", body: ["The Banking Industry Competition, Efficiency and Stability in Zimbabwe study by the Zimbabwe Economic Policy Analysis and Research Institute examines a paradox: Zimbabwe's banks are well capitalised and liquid, yet credit to the private sector remains thin.", "The study argues that the constraint is less about bank soundness and more about the macroeconomic environment — particularly currency uncertainty — and weaknesses in credit infrastructure.", "Recommendations include strengthening the collateral registry, providing a predictable monetary framework, and fostering competition through digital banking."], relatedPublication: "banking-competition-efficiency-stability", access: { mode: "free" } },
  { slug: "us454-billion-imperative", title: "The US$45.4 Billion Imperative: Unlocking Infrastructure to Drive Industrial Competitiveness", kind: "Explainer", date: "2026-09-17", author: "ZEPARI", themes: ["trade", "energy"], image: `${F}/2026-09/download_0.png`, excerpt: "Physical infrastructure constraints represent one of several bottlenecks to regional competitiveness for Zimbabwean businesses.", body: ["Physical infrastructure constraints represent one of several bottlenecks to regional competitiveness for Zimbabwean businesses.", "Closing the infrastructure gap — estimated at US$45.4 billion — requires blended finance, public-private partnerships and a credible project pipeline.", "Energy reliability and transport logistics are the most binding constraints identified by manufacturers."], relatedPublication: "afcfta-readiness-zimbabwe", access: { mode: "free" } },
  { slug: "jobs-paradox", title: "The Jobs Paradox: Why Zimbabwe's Economic Growth isn't translating into Better Income", kind: "Commentary", date: "2026-09-11", author: "evangelista-mudzonga", themes: ["macro", "poverty"], image: `${F}/2026-09/Zimbabwe%20economic%20insight%20banner%20infographic_0.png`, excerpt: "After years of navigating currency instability and external shocks, Zimbabwe's macroeconomic figures are painting a more positive picture — but households are not yet feeling it.", body: ["After years of navigating currency instability and external economic shocks, Zimbabwe's macroeconomic figures are painting a more positive picture.", "Yet the gains have not translated into better jobs and incomes. Most new employment is informal, low-productivity and poorly paid.", "Structural transformation — moving workers into higher-productivity activities — is the missing link."], relatedPublication: "working-paper-informality-jobs", access: { mode: "free" } },
  { slug: "inside-structural-transformation", title: "Inside the numbers: three decades of structural change, explained", kind: "Explainer", date: "2026-10-05", author: "gibson-chigumira", themes: ["macro", "trade"], excerpt: "A guided tour through the data behind ZEPARI's landmark diagnosis of structural transformation, from 1991 to 2023.", body: ["Between 1991 and 2023 Zimbabwe's economy changed shape dramatically — but not in the direction most development strategies envisaged.", "This explainer walks through the sectoral employment and value-added data in ZEPARI's diagnostic study.", "Subscribers who purchase this explainer receive the full annotated chart pack and underlying dataset notes, including decomposition of productivity growth into within-sector and structural-change components."], relatedPublication: "structural-transformation-zimbabwe", access: { mode: "paid", priceUSD: 5 } },
  { slug: "devolution-what-works", title: "Devolution: what makes it work?", kind: "Blog", date: "2026-06-02", author: "erinah-chipumho", themes: ["governance"], excerpt: "Lessons from ZEPARI's policy dialogue on devolution and what they mean for provincial councils today.", body: ["Devolution remains one of the most consequential governance reforms in Zimbabwe's constitution.", "ZEPARI's dialogue identified predictable fiscal transfers, local capacity and citizen participation as the three pillars of success."], relatedPublication: "towards-successful-devolution", access: { mode: "free" } },
];

const curatedEvents: EventItem[] = [
  { slug: "nds2-structural-transformation-dialogue", title: "Structural Transformation under NDS2: A High-Level Policy Dialogue", date: "2026-11-19", format: "Policy Dialogue", location: "Rainbow Towers, Harare", themes: ["macro", "trade"], summary: "Launch and discussion of ZEPARI's diagnosis of structural transformation with government, private sector and development partners.", agenda: [{ time: "08:30", item: "Registration" }, { time: "09:00", item: "Opening remarks" }, { time: "09:30", item: "Presentation of key findings" }, { time: "11:00", item: "Panel: Industrial policy for NDS2" }, { time: "12:30", item: "Closing & lunch" }], relatedPublication: "structural-transformation-zimbabwe" },
  { slug: "banking-study-webinar", title: "Webinar: Credit, Competition and Stability in Zimbabwe's Banks", date: "2026-12-04", format: "Webinar", location: "Online (Zoom)", themes: ["finance"], summary: "Researchers discuss the findings of the banking industry study with bankers and regulators.", relatedPublication: "banking-competition-efficiency-stability" },
  { slug: "economic-policy-management-training", title: "Economic Policy Management Short Course for Government Economists", date: "2027-01-26", endDate: "2027-01-30", format: "Training", location: "ZEPARI, Belvedere, Harare", themes: ["macro", "governance"], summary: "Tailor-made training in economic policy management for economists in ministries dealing with economic issues." },
  { slug: "afcfta-technical-validation-workshop", title: "Technical Validation Workshop: Zimbabwe's Readiness, Opportunities & Trade Challenges", date: "2026-08-14", format: "Workshop", location: "Harare", themes: ["trade"], summary: "Stakeholder validation of ZEPARI's AfCFTA readiness study.", video: "Omr0c6ZWSAU", relatedPublication: "afcfta-readiness-zimbabwe" },
  { slug: "devolution-policy-dialogue", title: "Towards Successful Implementation of Devolution in Zimbabwe Policy Dialogue", date: "2020-02-20", format: "Policy Dialogue", location: "Harare", themes: ["governance"], summary: "Policy dialogue on the key success factors for implementing devolution in Zimbabwe.", relatedPublication: "towards-successful-devolution" },
];

export const media: MediaItem[] = [
  ...liveVideos,
  { id: "p1", kind: "Podcast", title: "Policy in Plain Terms, Ep. 4 — The jobs paradox", date: "2026-09-20", url: site.social.youtube, description: "Why growth hasn't meant better incomes, in 25 minutes.", themes: ["macro"] },
  { id: "p2", kind: "Podcast", title: "Policy in Plain Terms, Ep. 3 — Banks that won't lend", date: "2026-08-10", url: site.social.youtube, description: "Unpacking credit scarcity in a stable banking sector.", themes: ["finance"] },
];

export const partners: Partner[] = [
  { name: "COMESA", logo: comesaLogo.url, url: "https://www.comesa.int/" },
  { name: "Food and Agriculture Organization of the United Nations", logo: faoLogo.url, url: "https://www.fao.org/" },
  { name: "United Nations Development Programme", logo: undpLogo.url, url: "https://www.undp.org/zimbabwe" },
  { name: "IMC-BEEP", logo: imcLogo.url },
  { name: "African Development Bank", logo: afdbLogo.url, url: "https://www.afdb.org/" },
  { name: "African Capacity Building Foundation", logo: acbfLogo.url, url: "https://www.acbf-pact.org/" },
];

export const impactStats = [
  { value: "2003", label: "Established by Deed of Trust" },
  { value: "200+", label: "Studies, briefs & reports" },
  { value: "1,500+", label: "Government economists trained" },
  { value: "60+", label: "Policy dialogues convened" },
];

const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, "");
const curatedTitles = new Set(curatedPublications.map((p) => norm(p.title)));

/** Curated records (with richer metadata/paid settings) first, then everything imported from the live site. */
export const publications: Publication[] = [
  ...curatedPublications.map((p) => {
    const live = livePublications.find((l) => norm(l.title) === norm(p.title));
    const cover = p.cover ?? live?.cover;
    return cover ? { ...p, cover } : p;
  }),
  ...livePublications.filter((l) => !curatedTitles.has(norm(l.title))),
];

// Live articles keep the slugs already linked from the site; curated metadata (themes, related study) is merged in.
const slugMap: Record<string, string> = {
  "safe-sound-and-still-short-credit-dilemma-heart-zimbabwes-banking-sector": "safe-sound-still-short-of-credit",
  "us454-billion-imperative-unlocking-infrastructure-drive-industrial-competitiveness": "us454-billion-imperative",
  "jobs-paradox-why-zimbabwes-economic-growth-isnt-translating-better-income": "jobs-paradox",
};
export const articles: Article[] = [
  ...liveArticles.map((a) => {
    const slug = slugMap[a.slug] ?? a.slug;
    const c = curatedArticles.find((x) => x.slug === slug);
    return { ...a, slug, ...(c ? { kind: c.kind, themes: c.themes, relatedPublication: c.relatedPublication, author: c.author } : {}) };
  }),
  ...curatedArticles.filter((c) => c.access.mode === "paid"),
];

export const events: EventItem[] = [...curatedEvents, ...liveEvents];
