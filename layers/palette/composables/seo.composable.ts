interface ExploreSeoParams {
  tags?: string[]
  title?: string
  description?: string
  ogImageUrl?: string
}

export function useExploreSeo(params: ExploreSeoParams): { title: string, description: string } {
  const { t } = useI18n();

  const tagsTranslated = params.tags?.map(v => t(`colors.${v}`)) ?? [];

  const title = `${tagsTranslated.join(' ')} ${t('explore.colorPalettes')}`;

  const description = t('explore.seoDescription', { tag: tagsTranslated.join(' ').toLowerCase() });

  const ogImageUrl = `${useRuntimeConfig().public.siteUrl}/api/image/tag/${params.tags?.[0]}`;

  useSeoMeta({
    title: `${params.title ?? title} - ColorMagic`,
    description: params.description ?? description,
    ogTitle: `${params.title ?? title} - ColorMagic`,
    ogDescription: params.description ?? description,
    ogImageUrl: params.ogImageUrl ?? ogImageUrl
  });

  if (params.tags !== undefined && params.tags.length > 2) {
    useSeoMeta({
      robots: {
        noindex: true,
        nofollow: true
      }
    });
  }

  return {
    title: params.title ?? title,
    description: params.description ?? description
  };
}
