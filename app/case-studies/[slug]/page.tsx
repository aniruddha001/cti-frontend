import { getAllCaseStudySlugs, getCaseStudyBySlug } from '@/lib/api/case-study'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { parseBlocks } from '@/lib/utils/blocks'
import { notFound } from 'next/navigation'

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs()
  console.log('All slugs:', slugs)
  return slugs.map((slug) => ({ slug }))
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>  // ← Promise
}) {
  const { slug } = await params  // ← await first
  const caseStudy = await getCaseStudyBySlug(slug)

  if (!caseStudy) notFound()

  const blocks = parseBlocks(caseStudy.blocksData)

  return (
    <main>
      <BlockRenderer blocks={blocks} />
    </main>
  )
}