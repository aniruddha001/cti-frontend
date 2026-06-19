// components/blocks/LeftRightSection.tsx

interface LeftRightProps {
  attrs: {
    sectiontitle?: string
    headingStyle?: {
      fontSize?: number
      color?: string
      fontWeight?: number
    }
  }
}

export default function LeftRightSection({ attrs }: LeftRightProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2
          style={{
            fontSize: attrs.headingStyle?.fontSize,
            color: attrs.headingStyle?.color,
            fontWeight: attrs.headingStyle?.fontWeight,
          }}
        >
          {attrs.sectiontitle}
        </h2>
      </div>
    </section>
  )
}