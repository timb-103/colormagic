import type { CountPaletteDto } from '../../../dtos/palette.dto';

/** @description cache this endpoint so it only updates every 5 minutes */
export default defineCachedEventHandler(async (): Promise<CountPaletteDto> => {
  const response = await modules.palette.service.count();

  return {
    count: response
  };
}, {
  maxAge: 60 * 60
});
