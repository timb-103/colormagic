import path from 'path';
import { createCanvas, loadImage } from 'canvas';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const colorsString = query.colors as string ?? '';
  const colors = colorsString.split(':');
  const promptText = query.text as string ?? '';

  const width = 1200;
  const height = 630;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  /** @description add background color bars */
  colors.forEach((color, i) => {
    ctx.fillStyle = `#${color}`;
    ctx.fillRect((i * (width / colors.length)), 0, width / colors.length, height);
  });

  /** @description dar the rounded rectangle */
  const cardWidth = 480;
  const cardHeight = 200;
  const cardX = (width - cardWidth) / 2;
  const cardY = (height - cardHeight) / 2;

  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 24);
  ctx.fill();

  /** @description styles */
  ctx.font = 'bold 56px -apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, "Nimbus Sans L", Roboto, Noto, "Segoe UI", Arial, Helvetica, "Helvetica Neue", sans-serif';
  ctx.fillStyle = '#4E5460';
  ctx.textAlign = 'center';
  ctx.fillText(promptText, width / 2, height / 2 + 60);

  /** @description draw the logo */
  const logoPath = path.resolve('public/img/HorizontalLogo.svg');
  const logoImg = await loadImage(logoPath);
  ctx.drawImage(logoImg, width / 2 - 152, cardY + 40, 304, 48);

  setResponseHeader(event, 'Content-Type', 'image/png');

  return canvas.toBuffer('image/png');
});
