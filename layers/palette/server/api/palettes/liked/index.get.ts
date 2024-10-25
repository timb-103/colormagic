import type { ListPaletteDto } from '../../../dtos/palette.dto';

export default defineEventHandler(async (event): Promise<ListPaletteDto> => {
  const { userId } = await modules.auth.service.verify(event);

  const query = await modules.palette.validation.getListInputQuery(event);

  /** @descritpion as its a get request we must parse some numbers */
  const page = parseInt(query.page);
  const size = parseInt(query.size ?? '20');

  const response = await modules.palette.service.listLiked(userId, page, size);

  return response;
});
