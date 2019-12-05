"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-bitwise */
function getNumberByColor(color) {
    // hex 类型颜色
    if (color[0] === '#') {
        return parseInt(color.slice(1), 16);
    }
    const match = color.replace(/ /g, '').match(/rgb\((\d+),(\d+),(\d+)\)/);
    // 未匹配 返回原色
    if (!match)
        return false;
    return parseInt(`${Number(match[1]).toString(16)}${Number(match[2]).toString(16)}${Number(match[3]).toString(16)}`, 16);
}
function lightenDarkenColor(color, factor) {
    if (typeof factor === 'undefined')
        return color;
    const usePound = color[0] === '#';
    const num = getNumberByColor(color);
    if (typeof num === 'boolean')
        return color;
    let r = (num >> 16) + factor * 255;
    if (r > 255)
        r = 255;
    else if (r < 0)
        r = 0;
    let b = ((num >> 8) & 0x00FF) + factor * 255;
    if (b > 255)
        b = 255;
    else if (b < 0)
        b = 0;
    let g = (num & 0x0000FF) + factor * 255;
    if (g > 255)
        g = 255;
    else if (g < 0)
        g = 0;
    if (usePound)
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    return `rgb(${r},${g},${b})`;
}
exports.lighten = (color, factor) => lightenDarkenColor(color, Math.abs(factor));
exports.darken = (color, factor) => lightenDarkenColor(color, -Math.abs(factor));
/**
 * 反色
 * @param color #FFFFFF | rgb(255,255,255)
 */
exports.invert = (color) => {
    const num = getNumberByColor(color);
    if (typeof num === 'boolean')
        return color;
    const r = 255 - Math.min(255, Math.max(0, (num >> 16)));
    const b = 255 - Math.min(255, Math.max(0, ((num >> 8) & 0x00FF)));
    const g = 255 - Math.min(255, Math.max(0, (num & 0x0000FF)));
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
};
//# sourceMappingURL=color.js.map