import { getCtiOptions } from '@/lib/api/cti-settings-option'
import Image from 'next/image'

const Logos = async () => {
  const options = await getCtiOptions()

  if (!options?.logoPrimary?.url) {
    return null
  }

  return (
    <Image
      src={options.logoPrimary.url}
      alt={options.logoPrimary.alt || 'CTI Logo'}
      width={options.logoPrimary.displayWidth || 120}
      height={options.logoPrimary.displayHeight || 80}
      priority
    />
  )
}

export default Logos