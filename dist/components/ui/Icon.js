"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styled_components_1 = require("styled-components");
const ICON_FONT_URL = '//at.alicdn.com/t/font_1546788_f5xbump9uze.js';
const GloablStyle = styled_components_1.createGlobalStyle `
  .icon {
    display: inline-block;
    font-size: inherit;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  .icon svg, .icon img{
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .icon.spin {
    animation: rotate infinite 1000ms linear;
  }

  @keyframes rotate {
    0% { transform: rotate(0);}
    100% { transform: rotate(356.4deg);}
  }
`;
const IconComponent = (_a) => {
    var { className, type, prefix = 'icon', src, size, color, spin, children } = _a, rest = __rest(_a, ["className", "type", "prefix", "src", "size", "color", "spin", "children"]);
    let main = null;
    if (children) {
        main = children;
    }
    else if (src) {
        main = react_1.default.createElement("img", { src: src, alt: "\u56FE\u6807" });
    }
    else {
        main = (react_1.default.createElement("svg", { className: "icon", "aria-hidden": "true" },
            react_1.default.createElement("use", { xlinkHref: `#${prefix}-${type}` })));
    }
    const style = Object.assign({}, rest.style);
    if (color) {
        style.color = color;
    }
    if (size && size > 48) {
        style.fontSize = size;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(GloablStyle, null),
        react_1.default.createElement("i", Object.assign({ className: classnames_1.default('icon', className, { spin }, size && size <= 48 ? `f${size}` : 0) }, rest, { style: style }), main)));
};
const customCache = new Set();
function createFromIconfont(options) {
    const { scriptUrl, prefix } = options;
    if (typeof document !== 'undefined' &&
        typeof window !== 'undefined' &&
        typeof document.createElement === 'function' &&
        typeof scriptUrl === 'string' &&
        scriptUrl.length &&
        !customCache.has(scriptUrl)) {
        const script = document.createElement('script');
        script.setAttribute('src', scriptUrl);
        script.setAttribute('data-namespace', scriptUrl);
        customCache.add(scriptUrl);
        document.body.appendChild(script);
    }
    const IconFont = props => react_1.default.createElement(IconComponent, Object.assign({ prefix: prefix }, props));
    IconFont.displayName = 'Iconfont';
    return IconFont;
}
exports.createFromIconfont = createFromIconfont;
const Icon = createFromIconfont({ scriptUrl: ICON_FONT_URL, prefix: 'icon' });
exports.default = Icon;
//# sourceMappingURL=Icon.js.map