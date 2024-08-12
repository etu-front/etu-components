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
const classnames_1 = __importDefault(require("classnames"));
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

  &.btn-circle { border-radius: 50%; }
  &.btn-square { border-radius: 0; }
  &.btn-pill { border-radius: 500px; }

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
    font-size: 14px;
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

  &:focus, &:hover {
    filter: brightness(1.1);
  }
  &:disabled {
    filter: brightness(0.9);
    cursor: not-allowed;
    color: #bbb;
  }
  &, &.btn-default {
    color: #474747;
  }
  &.btn-default {
    background-color: white;
    border: 1px solid #d9d9d9;
  }
  &.btn-primary {
    color: #fff;
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    &.outline {
      color: var(--primary-color);
      border-color: var(--primary-color);
    }
  }
  &.btn-danger {
    color: #fff;
    background-color: var(--danger-color);
    border-color: var(--danger-color);
    &.outline {
      color: var(--danger-color);
      border-color: var(--danger-color);
    }
  }
  &.btn-success {
    color: #fff;
    background-color: var(--success-color);
    border-color: var(--success-color);
    &.outline {
      color: var(--success-color);
      border-color: var(--success-color);
    }
  }
  &.btn-info {
    color: #fff;
    background-color: var(--info-color);
    border-color: var(--info-color);
    &.outline {
      color: var(--info-color);
      border-color: var(--info-color);
    }
  }
  &.btn-warning {
    color: #fff;
    background-color: var(--warning-color);
    border-color: var(--warning-color);
    &.outline {
      color: var(--warning-color);
      border-color: var(--warning-color);
    }
  }
  &.btn-link {
    color: var(--primary-color);
    background-color: transparent;
    border-color: transparent;
  }

  > i.icon {
    display: inline-block;
    line-height: 1;
  }
  > i.icon + span {
    margin-left: 6px;
  }
  &.dashed {border-style: dashed;}
  &.outline { background-color: transparent;}
  &.btn-no-border { border-width: 0; }
`;
const Button = props => {
    const { children, block, dashed, outline, border = true, className = '', htmlType = 'button', type = 'default', size = 'default', shape = 'round', icon, loading, loadingText, disabled } = props, rest = __rest(props, ["children", "block", "dashed", "outline", "border", "className", "htmlType", "type", "size", "shape", "icon", "loading", "loadingText", "disabled"]);
    const classNames = (0, classnames_1.default)(className, [`btn-${type}`], {
        [`btn-${size}`]: size !== 'default',
        [`btn-${shape}`]: shape !== 'round',
        outline: outline || dashed,
        ['btn-block']: block,
        dashed,
        'btn-no-border': !border
    });
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
    return (react_1.default.createElement(Container, Object.assign({ className: classNames, type: htmlType, disabled: loading || disabled }, rest),
        getIcon(),
        react_1.default.createElement("span", null, loading ? (loadingText || children) : children)));
};
exports.default = Button;
//# sourceMappingURL=Button.js.map