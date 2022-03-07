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
exports.hideToast = exports.showToast = void 0;
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const styled_components_1 = __importDefault(require("styled-components"));
const _1 = require(".");
const Background = styled_components_1.default.div `
  &.mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    top: 0;
    left: 0;
  }
`;
const Container = styled_components_1.default.div `
  position: fixed;
  will-change: transform;
  color: #fff;
  border-radius: 4px;
  padding: 10px 20px;
  min-width: 100px;
  max-width: 240px;
  line-height: 1.4;
  text-align: center;
  word-wrap: break-word;
  word-break: break-word;
  background-color: rgba(0,0,0,.75);
  z-index: 1000;
  .toastIcon {
    display: block;
    margin: 10px auto;
    text-align: center;
    color: #ffffffbb;
  }
  &.toast-center {
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  &.toast-top {
    left: 50%;
    top: 72px;
    transform: translate(-50%, 0);
  }
  &.toast-bottom {
    top: auto;
    left: 50%;
    bottom: 72px;
    transform: translate(-50%, 0);
  }
  &.toast-top_right {
    top: 1em;
    right: 1em;
  }
  &.toast-top_bottom {
    right: 1em;
    bottom: 1em;
  }
`;
const Toast = ({ icon, position = 'center', mask = true, onClick, style, children }) => {
    let iconElement;
    if (icon) {
        if (icon === 'loading') {
            iconElement = react_1.default.createElement(_1.Icon, { type: "loading", spin: true, size: 36, className: "toastIcon" });
        }
        else if (typeof icon === 'string') {
            iconElement = react_1.default.createElement(_1.Icon, { type: `${icon}-circle-fill`, size: 36, className: "toastIcon" });
        }
    }
    return (react_1.default.createElement(Background, { className: mask ? 'mask' : '' },
        react_1.default.createElement(Container, { className: typeof position === 'string' ? `toast-${position}` : '', onClick: onClick, style: typeof position === 'number' ? Object.assign({ transform: 'translate(-50%, 0)', top: position }, style) : style },
            iconElement || icon,
            children)));
};
const DESTROY_POOL = {};
/**
 * 显示 Toast
 * @param options Options
 * @returns toast destroy 函数
 */
const showToast = (options) => {
    const { title, duration = 3000 } = options, rest = __rest(options, ["title", "duration"]);
    const domContainer = document.createElement('div');
    document.body.appendChild(domContainer);
    const key = Date.now() + '_' + Math.floor(Math.random() * 100000);
    const destroy = () => {
        delete DESTROY_POOL[key];
        react_dom_1.default.unmountComponentAtNode(domContainer);
        if (domContainer.parentNode) {
            domContainer.parentNode.removeChild(domContainer);
        }
    };
    DESTROY_POOL[key] = destroy;
    react_dom_1.default.render(react_1.default.createElement(Toast, Object.assign({}, rest), title), domContainer);
    if (duration > 0) {
        setTimeout(destroy, Math.max(500, duration));
    }
    return destroy;
};
exports.showToast = showToast;
const hideToast = () => {
    for (const k in DESTROY_POOL) {
        if (typeof DESTROY_POOL[k] === 'function') {
            DESTROY_POOL[k]();
        }
    }
};
exports.hideToast = hideToast;
// Toast Helper functions
Toast.show = (title, opts) => exports.showToast(Object.assign({ title }, opts));
Toast.hide = exports.hideToast;
Toast.loading = (title, opts) => exports.showToast(Object.assign({ title, icon: 'loading', duration: 0, mask: true }, opts));
Toast.fail = (title, opts) => exports.showToast(Object.assign({ title, icon: 'close', mask: false }, opts));
Toast.info = (title, opts) => exports.showToast(Object.assign({ title, icon: 'info', mask: false }, opts));
Toast.info = (title, opts) => exports.showToast(Object.assign({ title, icon: 'info', mask: false }, opts));
Toast.success = (title, opts) => exports.showToast(Object.assign({ title, icon: 'check', mask: false }, opts));
exports.default = Toast;
//# sourceMappingURL=Toast.js.map