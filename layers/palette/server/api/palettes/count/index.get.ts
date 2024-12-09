import { type H3Event } from 'h3';
import type { CountPaletteDto } from '../../../dtos/palette.dto';

/** @description cache this endpoint so it only updates every 5 minutes */
export default defineCachedEventHandler(async (event): Promise<CountPaletteDto> => {
  const query = await modules.palette.validation.getCountInputQuery(event);
  const fromDate = query.fromDate !== undefined
    ? new Date(query.fromDate)
    : undefined;

  const response = await modules.palette.service.count(fromDate);

  return {
    count: response
  };
}, {
  maxAge: 60 * 5,
  getKey: async (event: H3Event) => {
    const query = await modules.palette.validation.getCountInputQuery(event);
    return query.fromDate ?? '';
  }
});
