// src/common/components/helmet/utils.ts

import type { SeoMeta } from '@/common/components/helmet'

export const mergeMeta = (
  defaultMeta?: SeoMeta,
  customMeta?: SeoMeta
): SeoMeta | undefined => {
  if (!defaultMeta && !customMeta) return undefined

  const merged = { ...defaultMeta, ...customMeta }

  if (!merged.title || !merged.description) {
    return undefined
  }

  return merged as SeoMeta
}
