// app/work/page.tsx
import { Section, Container, Prose } from "@/components/craft";
import { getAllCaseStudies } from '@/lib/api/case-study'
import CaseStudyCard from '@/components/sections/CaseStudyCard'

export default function caseStudy() {
  return (
    <Section>
      <Container>
        <WorkPage />
      </Container>
    </Section>
  );
}

const WorkPage = async () => {
  const caseStudies = await getAllCaseStudies()
  
  return (

    <main className="space-y-8">
        <Prose><h2>Case Study</h2></Prose>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} data={study} />
        ))}
      </div>
    </main>
  )
}