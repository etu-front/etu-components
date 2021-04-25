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
  color: ${props => props.theme.primaryColor};
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
    color: ${props => props.theme.primaryColor};
    background-color: #fff;
    border-color: ${props => props.theme.primaryColor};
  }

  &:disabled {
    cursor: not-allowed;
    color: #ffffffcc !important;
    &.btn-link {
      color: #bbbbbb !important;
      background-color: transparent !important;
      border-color: transparent !important;
    }
  }

  &.btn-primary {
    color: #fff;
    background-color: ${props => props.theme.primaryColor};
    border-color: ${props => props.theme.primaryColor};
    &:hover {
      background-color: ${props => color_1.lighten(props.theme.primaryColor, 0.1)};
      border-color: ${props => color_1.lighten(props.theme.primaryColor, 0.1)};
    }
    &:disabled {
      background-color: ${props => color_1.lighten(props.theme.primaryColor, 0.2)} !important;
      border-color: ${props => color_1.lighten(props.theme.primaryColor, 0.2)} !important;
    }
  }
  &.btn-danger {
    color: #fff;
    background-color: ${props => props.theme.dangerColor};
    border-color: ${props => props.theme.dangerColor};
    &:hover {
      background-color: ${props => color_1.lighten(props.theme.dangerColor, 0.1)};
      border-color: ${props => color_1.lighten(props.theme.dangerColor, 0.1)};
    }
    &:disabled {
      background-color: ${props => color_1.lighten(props.theme.dangerColor, 0.2)} !important;
      border-color: ${props => color_1.lighten(props.theme.dangerColor, 0.2)} !important;
    }
  }
  &.btn-success {
    color: #fff;
    background-color: ${props => props.theme.successColor};
    border-color: ${props => props.theme.successColor};
    &:hover {
      background-color: ${props => color_1.lighten(props.theme.successColor, 0.1)};
      border-color: ${props => color_1.lighten(props.theme.successColor, 0.1)};
    }
    &:disabled {
      background-color: ${props => color_1.lighten(props.theme.successColor, 0.2)} !important;
      border-color: ${props => color_1.lighten(props.theme.successColor, 0.2)} !important;
    }
  }
  &.btn-info {
    color: #fff;
    background-color: ${props => props.theme.infoColor};
    border-color: ${props => props.theme.infoColor};
    &:hover {
      background-color: ${props => color_1.lighten(props.theme.infoColor, 0.1)};
      border-color: ${props => color_1.lighten(props.theme.infoColor, 0.1)};
    }
    &:disabled {
      background-color: ${props => color_1.lighten(props.theme.infoColor, 0.2)} !important;
      border-color: ${props => color_1.lighten(props.theme.infoColor, 0.2)} !important;
    }
  }
  &.btn-link {
    color: ${props => props.theme.primaryColor};
    background-color: transparent;
    border-color: transparent;
    &:hover {
      color: ${props => color_1.lighten(props.theme.primaryColor, 0.1)};
    }
    &:disabled {
      background-color: transparent;
      border-color: transparent;
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
    const { children, block, className = '', htmlType = 'button', type = 'default', size = 'default', icon, loading, loadingText, shape = 'round', style = {} } = props, rest = __rest(props, ["children", "block", "className", "htmlType", "type", "size", "icon", "loading", "loadingText", "shape", "style"]);
    const classNames = [
        className,
        type !== 'default' ? `btn-${type}` : '',
        size !== 'default' ? `btn-${size}` : '',
        block ? 'btn-block' : ''
    ].filter(Boolean).join(' ');
    if (shape === 'circle') {
        style.borderRadius = '50%';
    }
    else if (shape === 'square') {
        style.borderRadius = 0;
    }
    else if (shape === 'pill') {
        style.borderRadius = 500;
    }
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
    return (react_1.default.createElement(Container, Object.assign({ className: classNames, type: htmlType, disabled: loading, style: style }, rest),
        getIcon(),
        react_1.default.createElement("span", null, loading ? (loadingText || children) : children)));
};
exports.default = Button;
//# sourceMappingURL=Button.js.map