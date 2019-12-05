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
  display: -webkit-box;
  line-clamp: ${props => props.max};
  -webkit-line-clamp: ${props => props.max};
  -webkit-box-orient: vertical;
  word-break: break-all;
  white-space: pre-wrap;
  overflow: hidden;
`;
const ClampText = props => {
    const { max, title, text, className = '', children, style } = props, rest = __rest(props, ["max", "title", "text", "className", "children", "style"]);
    const clamp = Math.max(1, max || 1);
    return (react_1.default.createElement(Container, Object.assign({ max: clamp, title: title || text, className: className, style: style }, rest), children || title || text));
};
ClampText.displayName = 'ClampText';
exports.default = ClampText;
//# sourceMappingURL=ClampText.js.map