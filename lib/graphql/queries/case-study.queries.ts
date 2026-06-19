// lib/graphql/queries/case-study.queries.ts

export const GET_ALL_CASE_STUDIES = `
  query GetAllCaseStudies {
    caseStudies(first: 100) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`

export const GET_ALL_CASE_STUDY_SLUGS = `
  query GetAllCaseStudySlugs {
    caseStudies(first: 100) {
      nodes {
        slug
      }
    }
  }
`

export const GET_CASE_STUDY_BY_SLUG = `
  query GetCaseStudyBySlug($slug: ID!) {
    caseStudy(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      blocksData
    }
  }
`