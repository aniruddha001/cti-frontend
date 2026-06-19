import { Button } from "@/components/ui/button";

interface Button {
  text: string
  url: string
  target: boolean
  backgroundColor: string
  textColor: string
  ariaLabel: string
  rel: string
}

interface Media {
  url: string
}

interface HeadingStyle {
  fontSize: number
  color: string
  lineHeight: number
  fontWeight: number
  letterSpacing: number
  textAlign: string
  textTransform: string
}

interface subtitleStyle {
  fontSize: number
  color: string
  lineHeight: number
  fontWeight: number
  letterSpacing: number
  textAlign: string
  textTransform: string
}

interface HeroBannerProps {
  attrs: {
    heading?: string
    sectiondescription?: string
    buttons?: Button[]
    headingStyle?: HeadingStyle
    subtitleStyle?: subtitleStyle
    media?: Media
  }
}

export default function HeroBannerSection({ attrs }: HeroBannerProps) {

  return (
    <section className="bg-cover bg-center h-[50vh] flex items-center justify-center" style={attrs.media?.url ? { backgroundImage: `url(${attrs.media.url})` } : undefined}>
      <div className="container text-center mx-auto px-4">
        <h1 className="font-bold" style={{ color: attrs.headingStyle?.color, fontSize: attrs.headingStyle?.fontSize, }}>{attrs.heading}</h1>
        <h1 style={{ color: attrs.subtitleStyle?.color, fontSize: attrs.subtitleStyle?.fontSize, }}>{attrs.sectiondescription}</h1>
        <div className="mt-6 flex gap-4 justify-center">
          {attrs.buttons?.map((button, index) => (
            <a key={index} href={button.url}>
              <Button className="cursor-pointer" key={index} style={{ backgroundColor: button.backgroundColor, color: button.textColor, }}>
                {button.text}
              </Button>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}