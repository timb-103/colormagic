interface ShadesSeoParams {
  tags?: string[]
  title?: string
  description?: string
}

export function useShadesSeo(params: ShadesSeoParams): { title: string, description: string, tagsTranslated: string[] } {
  const { t } = useI18n();

  const tagsTranslated = params.tags?.map(v => t(`colors.${v}`)) ?? [];

  const title = t('shade.title', {
    color: tagsTranslated.join(' ')
  });

  const description = t('shade.seoDescription', {
    color: tagsTranslated.join(' ').toLowerCase()
  });

  useSeoMeta({
    title: `${params.title ?? title} - ColorMagic`,
    description: params.description ?? description,
    ogTitle: `${params.title ?? title} - ColorMagic`,
    ogDescription: params.description ?? description,
    ogImageUrl: `${useRuntimeConfig().public.siteUrl}/img/og.png`
  });

  return {
    title: params.title ?? title,
    description: params.description ?? description,
    tagsTranslated
  };
}
