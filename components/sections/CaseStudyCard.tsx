// components/sections/CaseStudyCard.tsx

import Link from 'next/link'
import Image from 'next/image'
import { CaseStudy } from '@/types/case-study'

export default function CaseStudyCard({ data }: { data: CaseStudy }) {
  if (!data.slug) return null
  
  return (
    <Link href={`/case-studies/${data.slug}`}>
      <div className="group border bg-accent/30 rounded-lg overflow-hidden flex flex-col hover:bg-accent/75 transition-all">

        {/* Thumbnail */}
        {data.featuredImage ? (
          <div className="relative h-48 w-full">
            <Image
              src={data.featuredImage.node.sourceUrl}
              alt={data.featuredImage.node.altText || data.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        ) : (
          <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {data.title}
          </h3>
          {data.excerpt && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: data.excerpt }}
            />
          )}
          <p className="text-xs text-gray-400 mt-2">
            {new Date(data.date).toLocaleDateString()}
          </p>
        </div>

      </div>
    </Link>
  )
}