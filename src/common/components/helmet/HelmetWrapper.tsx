// src/common/components/helmet/HelmetWrapper.tsx

import { Helmet } from 'react-helmet-async'

import { SEO_METADATA_EN } from '@/common/components/helmet/constants'
import type { HelmetWrapperProps } from '@/common/components/helmet/types'
import { mergeMeta } from '@/common/components/helmet/utils'

export const HelmetWrapper = ({ pageKey, customMeta }: HelmetWrapperProps) => {
  const defaultMeta = pageKey ? SEO_METADATA_EN[pageKey] : undefined
  const meta = mergeMeta(defaultMeta, customMeta)

  if (!meta) return null

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
    </Helmet>
  )
}
