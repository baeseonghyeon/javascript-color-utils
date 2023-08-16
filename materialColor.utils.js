import { hexToRgba, normalizeRGB, rgbToHex } from './color/color.utils';
import { keys } from './color/global.constants';
import { buildAccent, buildPalette } from './color/goldenPalettes';

export default class MaterialColor {
  constructor(color) {
    this.palette = {};
    this.color = color;

    this.makePalette();
  }

  makePalette() {
    const localObject = {};
    const Prefix = '';
    const Color = hexToRgba(this.color);

    const newPalette = buildPalette(normalizeRGB(Color)).map((u) =>
      rgbToHex(Math.round(u.red * 255), Math.round(u.green * 255), Math.round(u.blue * 255))
    );
    const newAccent = buildAccent(normalizeRGB(Color)).map((u) =>
      rgbToHex(Math.round(u.red * 255), Math.round(u.green * 255), Math.round(u.blue * 255))
    );
    newPalette.push(...newAccent);
    for (let i = 0; i < keys.length; i += 1) {
      const ckey = Prefix + keys[i];
      let colorObject = {};

      this[ckey] = newPalette[i];
      colorObject = newPalette[i];

      localObject[keys[i]] = colorObject;
    }
    return localObject;
  }
}
