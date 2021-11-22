"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const LineText = styled_components_1.default.div `
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${({ width }) => width ? (typeof width === 'number' ? `${width}px` : width) : '100%'};
  &::before,
  &::after {
    content: '';
    display: block;
    height: 1px;
    position: absolute;
    width: ${props => props.lineWidth || 44}px;
    top: 50%;
    background: ${props => props.lineColor || '#d8d8d8'};
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
  i.icon {
    width: 38px;
  }
`;
exports.default = LineText;
//# sourceMappingURL=LineText.js.map