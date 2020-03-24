"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Loading_1 = __importDefault(require("./Loading"));
const Container = styled_components_1.default.div `
  position: relative;
  min-height: 200px;
`;
const Inner = styled_components_1.default.div `
  color: ${THEME.primaryColor};
  font-size: 16px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(255,255,255,0.4);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Spin = props => {
    const { spinning = false, tip = '', children, colors, className, style } = props;
    if (!spinning)
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    return (react_1.default.createElement(Container, { style: style, className: className },
        children,
        react_1.default.createElement(Inner, null,
            react_1.default.createElement(Loading_1.default, { size: 10, colors: colors || [THEME.primaryColor, THEME.dangerColor] }),
            tip)));
};
exports.default = Spin;
//# sourceMappingURL=Spin.js.map