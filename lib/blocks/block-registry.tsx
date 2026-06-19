// lib/blocks/block-registry.ts

import HeroBannerSection from '@/components/blocks/HeroBannerSection'
import LeftRightSection from '@/components/blocks/LeftRightSection'

const blockRegistry: Record<string, React.ComponentType<any>> = {
  'custom-blocks/hero-banner-section' : HeroBannerSection,
  'custom-blocks/left-right-section'  : LeftRightSection,
}

export default blockRegistry