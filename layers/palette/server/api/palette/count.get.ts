import type { CountPaletteDto } from '../../dtos/palette.dto';

/** @description cache this endpoint so it only updates every 5 minutes */
export default defineCachedEventHandler(async (): Promise<CountPaletteDto> => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const response = await modules.palette.service.count(twentyFourHoursAgo);

  return {
    count: response
  };
}, { maxAge: 60 * 5 });
