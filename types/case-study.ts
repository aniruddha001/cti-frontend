// types/case-study.ts

export interface BlockData {
  blockName: string
  attrs: Record<string, unknown>
}

export interface FeaturedImage {
  node: {
    sourceUrl: string
    altText: string
  }
}

export interface CaseStudy {
  id: string
  title: string
  slug: string
  date: string
  excerpt: string
  featuredImage: FeaturedImage | null
  blocksData: string[]
}

export interface CaseStudyData {
  caseStudies: {
    nodes: CaseStudy[]
  }
}