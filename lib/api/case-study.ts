// lib/api/case-study.ts

import { wpGraphQL } from '@/lib/graphql/client'
import {
  GET_ALL_CASE_STUDIES,
  GET_ALL_CASE_STUDY_SLUGS,
  GET_CASE_STUDY_BY_SLUG
} from '@/lib/graphql/queries/case-study.queries'
import { CaseStudy, CaseStudyData } from '@/types/case-study'

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const data = await wpGraphQL<CaseStudyData>(
      GET_ALL_CASE_STUDIES,
      {},
      3600
    )
    return data.caseStudies.nodes
  } catch (error) {
    console.error('Failed to fetch case studies:', error)
    return []
  }
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  try {
    const data = await wpGraphQL<CaseStudyData>(
      GET_ALL_CASE_STUDY_SLUGS,
      {},
      3600
    )
    return data.caseStudies.nodes.map((node) => node.slug)
  } catch (error) {
    console.error('Failed to fetch slugs:', error)
    return []
  }
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  try {
    const data = await wpGraphQL<{ caseStudy: CaseStudy }>(
      GET_CASE_STUDY_BY_SLUG,
      { slug },
      3600
    )
    return data.caseStudy
  } catch (error) {
    console.error('Failed to fetch case study:', error)
    return null
  }
}