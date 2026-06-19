// lib/utils/blocks.ts

import { BlockData } from '@/types/case-study'

export function parseBlocks(blocksData: string[]): BlockData[] {
  return blocksData
    .map((block) => {
      try {
        return JSON.parse(block) as BlockData
      } catch {
        return null
      }
    })
    .filter((block): block is BlockData => 
      block !== null && block.blockName !== ''
    )
}

export function getBlockByName(
  blocks: BlockData[],
  name: string
): BlockData | undefined {
  return blocks.find((block) => block.blockName === name)
}

export function getBlocksByName(
  blocks: BlockData[],
  name: string
): BlockData[] {
  return blocks.filter((block) => block.blockName === name)
}