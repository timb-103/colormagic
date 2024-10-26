import type { ListPaletteDto } from '../../dtos/palette.dto';

export default defineEventHandler(async (event): Promise<ListPaletteDto> => {
  const query = await modules.palette.validation.getListInputQuery(event);

  /** @descritpion as its a get request we must parse some numbers */
  const page = parseInt(query.page);
  const size = parseInt(query.size ?? '20');

  let userId: string | undefined;

  /** @description if they are authed we should add userId so we can link their likes */
  try {
    const auth = await modules.auth.service.verify(event);
    userId = auth.userId;
  } catch {}

  const response = await modules.palette.service.list(page, size, {
    tag: query.tag,
    userId,
    sortBy: query.sortBy
  });

  return response;
});
