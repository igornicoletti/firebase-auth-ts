// src/common/components/helmet/HelmetWrapper.tsx

import { Helmet } from 'react-helmet-async'

import {
  mergeMeta,
  SEO_METADATA_EN,
  type HelmetWrapperProps
} from '@/common/components/helmet'

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
