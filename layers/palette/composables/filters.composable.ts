export interface PaletteFilterOption {
  label: string
  fullLabel?: string
  id: string
  to: string
}

export interface PaletteFilters {
  color: ComputedRef<PaletteFilterOption[]>
  style: ComputedRef<PaletteFilterOption[]>
  tone: ComputedRef<PaletteFilterOption[]>
  season: ComputedRef<PaletteFilterOption[]>
}

function mapToPath(id: string, tags: string[], filters: PaletteFilter[]): string {
  const pathTags = [...tags];
  const existingTagIndex = pathTags.findIndex(tag => filters.some(filter => filter.id === tag));

  if (existingTagIndex >= 0) {
    pathTags[existingTagIndex] = id;
  } else {
    pathTags.push(id);
  }

  return pathTags.join('-');
}

function mapToLabel(path: string, filters: PaletteFilter[], locale: string): string {
  const tags = path.split('-');
  const value = [];

  for (const tag of tags) {
    const filter = filters.find(v => v.id === tag);
    if (filter !== undefined) {
      value.push(filter.label[getLocale(locale)]);
    }
  }

  return value.join(' ');
}

export function usePaletteFilterOptions(tags: string[]): PaletteFilters {
  const { t } = useI18n();
  const { locale } = useI18n();
  const localePath = useLocalePath();

  const colorFilters = getPaletteColorFilter();
  const toneFilters = getPaletteToneFilter();
  const styleFilters = getPaletteStyleFilter();
  const seasonFilters = getPaletteSeasonFilter();

  const allFilters = [
    ...colorFilters,
    ...toneFilters,
    ...styleFilters,
    ...seasonFilters
  ];

  const colorOptions = computed<PaletteFilterOption[]>(() => [
    /** @description stupid hack for nuxt ui bug */
    {
      label: t('explore.color'),
      id: '',
      to: localePath('/palette/explore')
    },
    ...colorFilters.map(v => ({
      label: v.label[getLocale(locale.value)],
      fullLabel: mapToLabel(mapToPath(v.id, tags, colorFilters), allFilters, locale.value),
      id: v.id,
      to: localePath(`/palette/explore/${mapToPath(v.id, tags, colorFilters)}`)
    }))
  ]);

  const toneOptions = computed<PaletteFilterOption[]>(() => [
    /** @description stupid hack for nuxt ui bug */
    {
      label: t('explore.tone'),
      id: '',
      to: localePath('/palette/explore')
    },
    ...toneFilters.map(v => ({
      label: v.label[getLocale(locale.value)],
      fullLabel: mapToLabel(mapToPath(v.id, tags, toneFilters), allFilters, locale.value),
      id: v.id,
      to: localePath(`/palette/explore/${mapToPath(v.id, tags, toneFilters)}`)
    }))
  ]);

  const styleOptions = computed<PaletteFilterOption[]>(() => [
    /** @description stupid hack for nuxt ui bug */
    {
      label: t('explore.style'),
      id: '',
      to: localePath('/palette/explore')
    },
    ...styleFilters.map(v => ({
      label: v.label[getLocale(locale.value)],
      fullLabel: mapToLabel(mapToPath(v.id, tags, styleFilters), allFilters, locale.value),
      id: v.id,
      to: localePath(`/palette/explore/${mapToPath(v.id, tags, styleFilters)}`)
    }))
  ]);

  const seasonOptions = computed<PaletteFilterOption[]>(() => [
    /** @description stupid hack for nuxt ui bug */
    {
      label: t('explore.season'),
      id: '',
      to: localePath('/palette/explore')
    },
    ...seasonFilters.map(v => ({
      label: v.label[getLocale(locale.value)],
      fullLabel: mapToLabel(mapToPath(v.id, tags, seasonFilters), allFilters, locale.value),
      id: v.id,
      to: localePath(`/palette/explore/${mapToPath(v.id, tags, seasonFilters)}`)
    }))
  ]);

  return {
    color: colorOptions,
    tone: toneOptions,
    style: styleOptions,
    season: seasonOptions
  };
}
