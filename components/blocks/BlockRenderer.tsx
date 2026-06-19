import blockRegistry from '@/lib/blocks/block-registry'
import { BlockData } from '@/types/case-study'

export default function BlockRenderer({ blocks }: { blocks: BlockData[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const BlockComponent = blockRegistry[block.blockName]

        if (!BlockComponent) return null

        return <BlockComponent key={index} attrs={block.attrs} />
      })}
    </>
  )
}