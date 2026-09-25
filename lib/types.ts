export type SanityImageRef = { _type: string; asset: { _ref: string } }

export type Stat = { value: number; suffix: string; label: string }

export type NavChild = { title: string; href: string; desc?: string }
export type NavItem = { title: string; href: string; children?: NavChild[] }
export type FooterColumn = { heading: string; links: { title: string; href: string }[] }

export type SiteSettings = {
  companyName: string
  phone: string
  phoneHref: string
  whatsapp: string
  whatsappMessage: string
  email: string
  address: string
  stats: Stat[]
  mission: string
  vision: string
  foundedYear: number
  story: string[]
  values: { title: string; desc: string }[]
  assessmentFormUrl: string | null
  notificationEmail: string | null
  headerLogo?: SanityImageRef
  footerLogo?: SanityImageRef
  iconLogo?: SanityImageRef
  logo?: SanityImageRef
  logoDark?: SanityImageRef
  mainNav?: NavItem[]
  footerNav?: FooterColumn[]
  gtmId?: string | null
  ga4Id?: string | null
  seoTitle?: string | null
  seoDescription?: string | null
  seoImage?: SanityImageRef | null
}

export type Country = {
  slug: string
  name: string
  flag: string
  tagline: string
  universityCount: number | string
  order?: number
}

export type CountryDetail = Country & {
  seoTitle?: string | null
  seoDescription?: string | null
  overview?: string
  whyStudyHere?: string[]
  topUniversities?: { name: string; ranking: string; city: string }[]
  intakes?: string
  averageCost?: string
  visaInfo?: string
  workRights?: string
  popularCourses?: string[]
}

export type Service = {
  serviceId: string
  icon: string
  title: string
  shortDesc: string
  longDesc?: string
  features?: string[]
  order?: number
}

export type Blog = {
  slug: string
  title: string
  category: string
  readingTime: number
  publishedDate?: string
}

export type BlogDetail = Blog & {
  seoTitle?: string | null
  seoDescription?: string | null
  body: unknown[]
  author: { name: string; role: string } | null
  heroImage?: string
  publishedDate?: string
}

export type SuccessStory = {
  name: string
  university: string
  countryName: string
  course: string
  scholarship: string
  year: number
  quote: string
}

export type TeamMember = {
  name: string
  role: string
  experience: string
  specialisation: string
  countries: string
  bio?: string
  order?: number
}

export type Event = {
  title: string
  date: string
  city: string
  mode: string
  spots: string
}

export type University = {
  name: string
  countryName: string
  ranking: string
  type: string
  city: string
}

export type Faq = {
  question: string
  answer: string
}

export type Resource = {
  title: string
  type: string
  description: string
  url?: string
}

export type Step = {
  title: string
  shortDesc: string
  longDesc?: string
  order: number
}

export type CaseStudy = {
  title: string
  slug: string
  studentName: string
  university: string
  countryName: string
  course: string
  level: string
  scholarshipValue?: string
  year: number
  challenge: string
  approach: string
  outcome: string
  quote?: string
  photo?: SanityImageRef
  featured?: boolean
}

export type Acceptance = {
  studentName: string
  university: string
  countryName: string
  course: string
  level: string
  scholarship?: string
  year: number
  photo?: SanityImageRef
}
