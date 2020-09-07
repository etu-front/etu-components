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
const Icon_1 = __importDefault(require("./Icon"));
const color_1 = require("../../utils/color");
const Container = styled_components_1.default.button `
  border-radius: 4px;
  font-size: 14px;
  padding: 0 15px;
  height: 36px;
  line-height: 1.5;
  border: 1px solid #d9d9d9;
  font-weight: 400;
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
  display: inline-block;
  text-shadow: 0 -1px 0 rgba(0,0,0,0.12);
  color: ${THEME.primaryColor};
  &.btn-block {
    display: block;
    width: 100%;
  }
  &.btn-xsmall {
    height: 21px;
    padding: 0 5px;
    font-size: 12px;
  }
  &.btn-small {
    height: 24px;
    padding: 0 10px;
  }
  &.btn-large {
    height: 42px;
    padding: 0 20px;
    font-size: 16px;
  }
  &.btn-xlarge {
    height: 48px;
    padding: 0 24px;
    font-size: 18px;
  }
  &.btn-outline, &:focus, &:hover {
    color: ${THEME.primaryColor};
    background-color: #fff;
    border-color: ${THEME.primaryColor};
  }

  &:disabled {
    cursor: not-allowed;
    color: #ffffffcc !important;
    background-color: #f9f9f9 !important;
    border-color: #f9f9f9 !important;
    &.btn-link {
      color: #bbbbbb !important;
      background-color: transparent !important;
      border-color: transparent !important;
    }
  }

  &.btn-primary {
    color: #fff;
    background-color: ${THEME.primaryColor};
    border-color: ${THEME.primaryColor};
    &:hover {
      background-color: ${color_1.lighten(THEME.primaryColor, 0.1)};
      border-color: ${color_1.lighten(THEME.primaryColor, 0.1)};
    }
    &:disabled {
      background-color: ${color_1.lighten(THEME.primaryColor, 0.2)} !important;
      border-color: ${color_1.lighten(THEME.primaryColor, 0.2)} !important;
    }
  }
  &.btn-danger {
    color: #fff;
    background-color: ${THEME.dangerColor};
    border-color: ${THEME.dangerColor};
    &:hover {
      background-color: ${color_1.lighten(THEME.dangerColor, 0.1)};
      border-color: ${color_1.lighten(THEME.dangerColor, 0.1)};
    }
    &:disabled {
      color: #fff;
      background-color: ${color_1.lighten(THEME.dangerColor, 0.2)} !important;
      border-color: ${color_1.lighten(THEME.dangerColor, 0.2)} !important;
    }
  }
  &.btn-success {
    color: #fff;
    background-color: ${THEME.successColor};
    border-color: ${THEME.successColor};
    &:hover {
      background-color: ${color_1.lighten(THEME.successColor, 0.1)};
      border-color: ${color_1.lighten(THEME.successColor, 0.1)};
    }
  }
  &.btn-info {
    color: #fff;
    background-color: ${THEME.infoColor};
    border-color: ${THEME.infoColor};
    &:hover {
      background-color: ${color_1.lighten(THEME.infoColor, 0.1)};
      border-color: ${color_1.lighten(THEME.infoColor, 0.1)};
    }
  }
  &.btn-link {
    color: ${THEME.primaryColor};
    background-color: transparent;
    border-color: transparent;
    &:hover {
      color: ${color_1.lighten(THEME.primaryColor, 0.1)};
    }
  }
  > i.icon {
    display: inline-block;
    line-height: 1;
  }
  > i.icon + span {
    margin-left: 6px;
  }
`;
const Button = props => {
    const { children, block, className = '', htmlType = 'button', type = 'default', size = 'default', icon, loading, loadingText, shape } = props, rest = __rest(props, ["children", "block", "className", "htmlType", "type", "size", "icon", "loading", "loadingText", "shape"]);
    const classNames = [
        className,
        type !== 'default' ? `btn-${type}` : '',
        size !== 'default' ? `btn-${size}` : '',
        block ? 'btn-block' : '',
        shape === 'circle' ? 'round-circle' : '',
        shape === 'square' ? 'round-0' : ''
    ].filter(Boolean).join(' ');
    const getIcon = () => {
        if (loading)
            return react_1.default.createElement(Icon_1.default, { type: "loading", spin: true, className: "t-muted" });
        if (!icon)
            return null;
        if (typeof icon === 'string') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            return react_1.default.createElement(Icon_1.default, { type: icon });
        }
        return react_1.default.createElement("i", { className: "icon" }, icon);
    };
    return (react_1.default.createElement(Container, Object.assign({ className: classNames, type: htmlType, disabled: loading }, rest),
        getIcon(),
        react_1.default.createElement("span", null, loading ? (loadingText || children) : children)));
};
exports.default = Button;
//# sourceMappingURL=Button.js.map