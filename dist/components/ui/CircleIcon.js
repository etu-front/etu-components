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
const View_1 = __importDefault(require("../View"));
const Icon_1 = __importDefault(require("./Icon"));
const Container = (0, styled_components_1.default)(View_1.default.Center) `
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;
const CircleIcon = props => {
    const { className, iconClassName, size = 42, iconSize = 20, src, type, color = '#EEEEEE', spin, iconColor, children } = props, rest = __rest(props, ["className", "iconClassName", "size", "iconSize", "src", "type", "color", "spin", "iconColor", "children"]);
    return (react_1.default.createElement(Container, Object.assign({ className: className, size: size, color: color }, rest), children ||
        react_1.default.createElement(Icon_1.default, { className: iconClassName, type: type, spin: spin, size: iconSize, src: src, color: iconColor })));
};
exports.default = CircleIcon;
//# sourceMappingURL=CircleIcon.js.map