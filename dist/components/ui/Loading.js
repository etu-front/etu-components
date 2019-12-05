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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.FilterDiv = (_a) => {
    var { size, duration, radius, colors } = _a, rest = __rest(_a, ["size", "duration", "radius", "colors"]);
    return react_1.default.createElement("div", Object.assign({}, rest));
};
const Container = styled_components_1.default(exports.FilterDiv) `
  position: relative;
  transform: translate(-50%, -50%);
  width: ${props => props.size * 1.5}px;
  height: ${props => props.size}px;
  @keyframes magnet-loading-opacity {
    0% {
      transform: translate(0 0);
      opacity: 1;
    }
    49.99% {
      opacity: 1;
      transform: translate(${props => props.size * 2}px, 0);
    }
    50% {
      opacity: 0;
      transform: translate(${props => props.size * 2}px, 0);
    }
    100% {
      opacity: 0;
      transform: translate(0, 0);
    }
  }
  @keyframes magnet-loading {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(${props => props.size * 2}px, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  &> div {
    position: absolute;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    border-radius: ${props => props.radius}px;
    top: 0;
    left: 0;
  }
  &> div:nth-child(1) {
    background: ${props => props.colors[0]};
  animation: magnet-loading ${props => props.duration}s linear infinite;
    animation-delay: -${props => props.duration / 2}s;
  }
  &> div:nth-child(2) {
    background: ${props => props.colors[1]};
    animation: magnet-loading ${props => props.duration}s linear infinite;
    animation-delay: 0s;
  }
  &> div:nth-child(3) {
    background: ${props => props.colors[0]};
    animation: magnet-loading-opacity ${props => props.duration}s linear infinite;
    animation-delay: -${props => props.duration / 2}s;
  }
`;
const Loading = ({ size = 20, duration = 1, radius = 8, colors = ['#3f3dd0', '#55a388'] }) => (react_1.default.createElement(Container, { size: size, duration: duration, radius: radius, colors: colors },
    react_1.default.createElement("div", null),
    react_1.default.createElement("div", null),
    react_1.default.createElement("div", null)));
exports.default = Loading;
//# sourceMappingURL=Loading.js.map