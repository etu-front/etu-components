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
const styled_components_1 = __importDefault(require("styled-components"));
const Container = styled_components_1.default.div `
  align-items: stretch;
  justify-content: flex-start;
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-direction: column;
`;
const View = props => {
    const { className = '', children, align, justify, column = false, wrap = false, row = false, radius, height, background, color, flex, width, style } = props, rest = __rest(props, ["className", "children", "align", "justify", "column", "wrap", "row", "radius", "height", "background", "color", "flex", "width", "style"]);
    let customStyle = {};
    if (row) {
        customStyle.flexDirection = 'row';
        customStyle.alignItems = 'flex-start';
    }
    if (column) {
        customStyle.flexDirection = 'column';
    }
    if (align) {
        customStyle.alignItems = align;
    }
    if (justify) {
        customStyle.justifyContent = justify;
    }
    if (wrap) {
        customStyle.flexWrap = 'wrap';
    }
    if (flex) {
        customStyle.flex = flex;
    }
    if (typeof width !== 'undefined') {
        customStyle.width = width;
    }
    if (typeof height !== 'undefined') {
        customStyle.height = height;
    }
    if (background) {
        customStyle.background = background;
    }
    if (typeof color !== 'undefined') {
        customStyle.color = color;
    }
    if (typeof radius !== 'undefined') {
        customStyle.borderRadius = radius;
    }
    if (style) {
        customStyle = Object.assign(Object.assign({}, customStyle), style);
    }
    return (react_1.default.createElement(Container, Object.assign({ className: className, style: Object.keys(customStyle).length ? customStyle : undefined }, rest), children));
};
View.displayName = 'View';
View.Center = (_a) => {
    var { children } = _a, rest = __rest(_a, ["children"]);
    return react_1.default.createElement(View, Object.assign({}, rest, { align: "center", justify: "center" }), children);
};
View.Center.displayName = 'View.Center';
exports.default = View;
//# sourceMappingURL=View.js.map