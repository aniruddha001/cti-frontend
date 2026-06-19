import { wpGraphQL } from '@/lib/graphql/client'
import { GET_CTI_SETTINGS_OPTION } from '@/lib/graphql/queries/cti-settings-option.queries'
import { CtiOptions, CtiOptionsResponse } from '@/types/cti-settings-option'

export async function getCtiOptions(): Promise<CtiOptions | null> {
  try {
    const data = await wpGraphQL<CtiOptionsResponse>(
      GET_CTI_SETTINGS_OPTION,
      {},
      3600
    )

    return data.ctiOptions
  } catch (error) {
    console.error('Failed to fetch CTI options:', error)
    return null
  }
}