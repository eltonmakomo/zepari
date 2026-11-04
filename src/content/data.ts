import type { Article, EventItem, MediaItem, Partner, Person, Publication, Theme } from "./types";
import { liveArticles, liveEvents, livePublications, liveVideos } from "./live";
import comesaLogo from "@/assets/partners/comesa.png.asset.json";
import faoLogo from "@/assets/partners/fao.png.asset.json";
import undpLogo from "@/assets/partners/undp.png.asset.json";
import imcLogo from "@/assets/partners/imc.png.asset.json";
import afdbLogo from "@/assets/partners/afdb.png.asset.json";
import acbfLogo from "@/assets/partners/acbf.png.asset.json";

export const site = {
  name: "ZEPARI",
  full: "Zimbabwe Economic Policy Analysis and Research Institute",
  founded: 2003,
  address: "55 Mull Road, Belvedere, Harare, Zimbabwe",
  phones: ["+263 242 778423", "+263 242 785926-7", "+263 242 711451"],
  emails: ["administration@zepari.co.zw", "chigumirag@zepari.co.zw"],
  webmail: "https://login.microsoftonline.com",
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
  { slug: "gibson-chigumira", name: "Dr. Gibson Chigumira", role: "Executive Director", group: "team", photo: "/__l5e/assets-v1/1cea19eb-8336-4061-b346-c3ab4a9da628/chigumira.png", bio: "Gibson Chigumira has extensive experience in research, including coordinating research studies, editing publications and developing data bases, having been at the helm of the institution since it started operating in 2004. Dr. G. Chigumira has also done work in his individual capacity for civil society organizations such as NANGO, Action AID and ZIMCOD.", themes: ["macro", "trade"] },
  { slug: "ngosi-shumba", name: "Ngosi Shumba", role: "Finance and Administration Manager", group: "team", photo: "/__l5e/assets-v1/0b18ebb2-5bcd-488d-8d5e-be0e7eead76f/shumba.png", bio: "Ngosi Shumba holds a Bachelor of Accountancy Honours Degree from the University of Zimbabwe (UZ). He is also an Associate member of the Chartered Institute of Secretaries and Administrators (CIS) and holds an MBA in Finance from the University of Wales. He has extensive experience in auditing, accounting and finance." },
  { slug: "erinah-chipumho", name: "Erinah Chipumho", role: "Senior Research Fellow", group: "team", photo: "/__l5e/assets-v1/3339f42d-7433-4ad4-8583-ad551ac02e55/erinah.png", bio: "Erinah Chipumho is an Economist with more than 10 years of experience in economic policy research. She joined ZEPARU in January 2005 as a Research Fellow and rose to the post of Senior Research Fellow in February 2011. She holds a Bachelors and a Master’s degree in Economics obtained from the University of Zimbabwe.", themes: ["macro", "governance"] },
  { slug: "evangelista-mudzonga", name: "Evangelista Mudzonga", role: "Senior Research Fellow", group: "team", photo: "/__l5e/assets-v1/2d0aaa59-2db1-448a-a567-1a8c0421577c/madzonga.png", bio: "Evangelista Mudzonga holds an MBA, MSc Economics and BSc Economics Degrees. She has over 11 years of national, regional and international trade policy analysis, trade negotiations and trade policy implementation experience, particularly on SADC, COMESA and EAC regions.", themes: ["trade", "macro"] },
  { slug: "esnath-nyamunga", name: "Esnath Nyamunga", role: "Finance and Administration Assistant", group: "team", photo: "/__l5e/assets-v1/f6e42b35-38ee-44e0-a04b-03cca5d9c3d2/eSNATH_GIMP2.png", bio: "Supports finance and administrative functions at ZEPARI." },
  { slug: "jesimen-chipika", name: "Dr. Jesimen Chipika", role: "Chairperson", affiliation: "Reserve Bank of Zimbabwe, Deputy Governor", group: "board", photo: "/__l5e/assets-v1/96b37d34-c7f5-43d3-a473-127ab112e539/jesimen-chipika.png", bio: "Chairperson of the ZEPARI Board of Trustees." },
  { slug: "isaac-kwesu", name: "Dr. Isaac Kwesu", role: "Trustee", affiliation: "Chamber of Mines", group: "board", photo: "/__l5e/assets-v1/96cd66e6-98a8-4482-b77f-9cec7386c58b/kwesu.png", bio: "Trustee representing the Chamber of Mines." },
  { slug: "gibson-chigumira-board", name: "Dr. Gibson Chigumira", role: "Executive Director (Ex Officio)", affiliation: "ZEPARI", group: "board", photo: "/__l5e/assets-v1/e4b5a73b-f180-474d-b703-00833dea20e8/chigumira_0.png", bio: "Ex-officio trustee." },
  { slug: "cornelius-dube", name: "Dr. Cornelius Dube", role: "Trustee", affiliation: "Confederation of Zimbabwe Industries (CZI)", group: "board", photo: "/__l5e/assets-v1/75a6e0be-3e2d-4348-9240-70cdb99d64fd/Dube_3.png", bio: "Trustee representing the Confederation of Zimbabwe Industries." },
];

// Existing links keep their short slugs; all document content and access come from the live source.
const publicationSlugs: Record<string, string> = {
  "a-diagnosis-of-structural-transformation-in-zimbabwe-trends-challenges": "structural-transformation-zimbabwe",
  "banking-industry-competition-efficiency-and-stability-in-zimbabwe": "banking-competition-efficiency-stability",
  "the-multi-dimensional-risk-of-stunting-amongst-children-under-five-yea": "multi-dimensional-risk-stunting",
  "multidimensional-poverty-in-zimbabwe-a-gender-perspective-2": "multidimensional-poverty-gender",
  "resilience-capacity-food-consumption-and-socio-economic-status-in-zimb-2": "resilience-capacity-food-consumption",
  "energy-and-poverty-the-efficacy-of-electricity-subsidy-in-alleviating-2": "energy-and-poverty-electricity-subsidy",
  "do-remittances-and-or-public-transfers-matter-for-agricultural-investm-2": "remittances-agricultural-investment",
  "remittances-consumption-patterns-and-household-investment-the-case-of-2": "remittances-consumption-household-investment",
  "do-agricultural-free-seed-input-support-schemes-reduce-food-insecurity": "free-seed-input-schemes",
  "towards-successful-implementation-of-devolution-in-zimbabwe": "towards-successful-devolution",
};

const featuredPublicationSlugs = new Set([
  "structural-transformation-zimbabwe",
  "banking-competition-efficiency-stability",
]);

const curatedEvents: EventItem[] = [
  { slug: "nds2-structural-transformation-dialogue", title: "Structural Transformation under NDS2: A High-Level Policy Dialogue", date: "2026-11-19", format: "Policy Dialogue", location: "Rainbow Towers, Harare", themes: ["macro", "trade"], summary: "Launch and discussion of ZEPARI's diagnosis of structural transformation with government, private sector and development partners.", agenda: [{ time: "08:30", item: "Registration" }, { time: "09:00", item: "Opening remarks" }, { time: "09:30", item: "Presentation of key findings" }, { time: "11:00", item: "Panel: Industrial policy for NDS2" }, { time: "12:30", item: "Closing & lunch" }], relatedPublication: "structural-transformation-zimbabwe" },
  { slug: "banking-study-webinar", title: "Webinar: Credit, Competition and Stability in Zimbabwe's Banks", date: "2026-12-04", format: "Webinar", location: "Online (Zoom)", themes: ["finance"], summary: "Researchers discuss the findings of the banking industry study with bankers and regulators.", relatedPublication: "banking-competition-efficiency-stability" },
  { slug: "economic-policy-management-training", title: "Economic Policy Management Short Course for Government Economists", date: "2027-01-26", endDate: "2027-01-30", format: "Training", location: "ZEPARI, Belvedere, Harare", themes: ["macro", "governance"], summary: "Tailor-made training in economic policy management for economists in ministries dealing with economic issues." },
  { slug: "afcfta-technical-validation-workshop", title: "Technical Validation Workshop: Zimbabwe's Readiness, Opportunities & Trade Challenges", date: "2026-08-14", format: "Workshop", location: "Harare", themes: ["trade"], summary: "Stakeholder validation of ZEPARI's AfCFTA readiness study.", video: "Omr0c6ZWSAU" },
  { slug: "devolution-policy-dialogue", title: "Towards Successful Implementation of Devolution in Zimbabwe Policy Dialogue", date: "2020-02-20", format: "Policy Dialogue", location: "Harare", themes: ["governance"], summary: "Policy dialogue on the key success factors for implementing devolution in Zimbabwe.", relatedPublication: "towards-successful-devolution" },
];

export const media: MediaItem[] = [
  ...liveVideos,
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

/** Every archive row is an actual live document, including separate brief/study editions. */
export const publications: Publication[] = livePublications.map((publication) => {
  const slug = publicationSlugs[publication.slug] ?? publication.slug;
  return { ...publication, slug, featured: featuredPublicationSlugs.has(slug) };
});

// Preserve existing article links while retaining the original live text, authors and access.
const slugMap: Record<string, string> = {
  "safe-sound-and-still-short-credit-dilemma-heart-zimbabwes-banking-sector": "safe-sound-still-short-of-credit",
  "us454-billion-imperative-unlocking-infrastructure-drive-industrial-competitiveness": "us454-billion-imperative",
  "jobs-paradox-why-zimbabwes-economic-growth-isnt-translating-better-income": "jobs-paradox",
};
const articlePublications: Record<string, string> = {
  "safe-sound-still-short-of-credit": "banking-competition-efficiency-stability",
  "jobs-paradox": "structural-transformation-zimbabwe",
};
export const articles: Article[] = liveArticles.map((article) => {
  const slug = slugMap[article.slug] ?? article.slug;
  return { ...article, slug, relatedPublication: articlePublications[slug] };
});

export const events: EventItem[] = [...curatedEvents, ...liveEvents];
