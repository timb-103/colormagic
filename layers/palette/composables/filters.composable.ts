import uniqBy from 'lodash/uniqBy';

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
  const tagString = tags.join('-');
  const existingFilter = filters.find(filter => tagString.includes(filter.id));

  if (existingFilter !== undefined) {
    return tagString.replace(existingFilter.id, id);
  }
  if (tags.length === 0) {
    return id;
  }

  return `${tagString}-${id}`;
}

/** @description used for the color filter which allows multiple of the same filter */
function mapToPathMultiple(id: string, tags: string[], filters: PaletteFilter[]): string {
  const tagString = tags.join('-');
  const tagsCount = tags.filter(v => filters.some(x => x.id === v)).length;

  if (tagsCount === 1 && tags[0] === id) {
    return id;
  }
  if (tagsCount === 5) {
    return tags.filter(v => v !== id).join('-');
  }
  if (tags.includes(id)) {
    return tags.filter(v => v !== id).join('-');
  }
  if (tags.length === 0) {
    return id;
  }

  return `${tagString}-${id}`;
}

function mapToLabel(path: string, filters: PaletteFilter[], locale: string): string {
  const tags = path.split('-');
  const value: string[] = [];
  let currentTag = '';

  for (const tag of tags) {
    currentTag = currentTag.length > 0 ? `${currentTag}-${tag}` : tag;

    const filter = filters.find(v => v.id === currentTag);
    if (filter !== undefined) {
      value.push(filter.label[getLocale(locale)]);
      currentTag = '';
    }
  }

  if (currentTag.length > 0) {
    value.push(currentTag);
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

  const colorOptions = computed<PaletteFilterOption[]>(() => {
    const values = colorFilters.map(v => ({
      label: v.label[getLocale(locale.value)],
      fullLabel: mapToLabel(mapToPathMultiple(v.id, tags, colorFilters), allFilters, locale.value),
      id: v.id,
      to: localePath(`/palette/explore/${mapToPathMultiple(v.id, tags, colorFilters)}`)
    }));

    return uniqBy(values, 'to');
  });

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
