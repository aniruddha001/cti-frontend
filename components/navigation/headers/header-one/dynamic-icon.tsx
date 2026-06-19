import { icons, type LucideProps } from "lucide-react"

interface Props extends LucideProps {
  name: string
}

// Converts "book-open" → "BookOpen" to match Lucide's export names
function toPascalCase(kebab: string): string {
  return kebab
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("")
}

export function DynamicIcon({ name, ...props }: Props) {
  const Icon = icons[toPascalCase(name) as keyof typeof icons]
  if (!Icon) return null
  return <Icon {...props} />
}
