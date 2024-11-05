import type { PaletteDto } from '../../../dtos/palette.dto';

export default defineCachedEventHandler(async (event): Promise<PaletteDto> => {
  const params = await modules.palette.validation.getInputParams(event);

  let userId: string | undefined;

  /** @description if they are authed we should add userId so we can link their likes */
  try {
    const auth = await modules.auth.service.verify(event);
    userId = auth.userId;
  } catch {}

  const response = await modules.palette.service.getById(params.id, userId);

  return response;
}, { maxAge: 60 * 60 });
