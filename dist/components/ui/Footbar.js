"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FootButton = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const Footbar = styled_components_1.default.div `
  text-align: center;
  position: fixed;
  bottom: 0;
  padding: 12px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom) / 2);
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
  background: ${props => props.background || 'transparent'};
  @media(min-width:${props => props.maxWidth || '680px'}) {
    left: calc((100vw - ${props => props.maxWidth || '680px'}) / 2);
    max-width: ${props => props.maxWidth || '680px'};
  }
`;
exports.default = Footbar;
exports.FootButton = styled_components_1.default.a `
  display: block;
  margin: 10px auto;
  width: ${({ width = 160 }) => { if (typeof width !== 'number')
    return width; return `${width}px`; }};
  height: 44px;
  border-radius: 22px;
  box-shadow: 0 3px 5px ${props => props.shadow || "var(--primary-lighter-color)"};
  @media (prefers-color-scheme: dark) {
    box-shadow: none;
  }
  border: none;
  color: white;
  text-align: center;
  font-size: 18px;
  line-height: 44px;
  background: linear-gradient(
    251deg,
    ${props => props.color2 || "var(--primary-light-color)"} 0%,
    ${props => props.color1 || "var(--primary-color)"} 100%
  );
  &:active,
  &:hover {
    color: #eee;
    background: linear-gradient(
      251deg,
      ${props => props.color2 || "var(--primary-color)"} 0%,
      ${props => props.color1 || "var(--primary-light-color)"} 100%
    );
  }
`;
//# sourceMappingURL=Footbar.js.map