"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideActionSheet = exports.showActionSheet = void 0;
const react_1 = __importStar(require("react"));
const client_1 = require("react-dom/client");
const styled_components_1 = __importDefault(require("styled-components"));
const View_1 = __importDefault(require("../View"));
const history_1 = require("history");
const classnames_1 = __importDefault(require("classnames"));
const Container = (0, styled_components_1.default)(View_1.default) `
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  left: 0;
  top: 0;
  z-index: 999;
`;
const Mask = styled_components_1.default.div `
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgba(0,0,0,0.3);
`;
const Body = (0, styled_components_1.default)(View_1.default) `
  background: #ddd;
  z-index: 3;
  position: fixed;
  bottom: -200px;
  left: 50%;
  right: 0;
  transform: translate(-50%, 0);
  width: 100vw;
  transition: bottom 200ms;
  &.up {
    bottom: 0;
  }
  .item {
    background: white;
    border-top: 1px solid #ccc;
    padding: 12px;
    text-align: center;
    font-size: 16px;
    min-height: 48px;
    line-height: 48px;
    font-weight: 500;
    &:active {
      background: #eee;
    }
    &:last-child {
      border-top: none;
    }
  }
`;
const DESTROY_POOL = {};
const ActionSheet = props => {
    const { title, actions, visible, onCancel, maxWidth = 680, cancelText = '取消', mask = true, maskClosable = true } = props;
    const [up, setUp] = (0, react_1.useState)(false);
    const handleClose = () => {
        setUp(false);
        if (onCancel) {
            setTimeout(onCancel, 100);
        }
    };
    (0, react_1.useEffect)(() => {
        if (visible) {
            setTimeout(() => setUp(true), 100);
        }
        else {
            setTimeout(() => setUp(false), 100);
        }
    }, [visible]);
    if (!visible)
        return null;
    return (react_1.default.createElement(Container, { className: props.className },
        mask && react_1.default.createElement(Mask, { onClick: maskClosable ? handleClose : () => false }),
        react_1.default.createElement(Body, { className: (0, classnames_1.default)({ up }, props.bodyClassName), style: { maxWidth } },
            title,
            actions.map((act, index) => (react_1.default.createElement("div", { key: 'action-' + index, className: `item ${props.itemClassName || ''}`, onClick: act.onClick, style: props.itemStyle }, act.child || act.text))),
            cancelText &&
                react_1.default.createElement("div", { className: `item ${props.itemClassName || ''}`, style: props.itemStyle, onClick: handleClose }, cancelText))));
};
const showActionSheet = (options) => {
    const dom = document.createElement('div');
    document.body.appendChild(dom);
    // eslint-disable-next-line prefer-const
    let unListen;
    const key = Date.now() + '_' + Math.floor(Math.random() * 100000);
    const history = (0, history_1.createBrowserHistory)();
    const root = (0, client_1.createRoot)(dom);
    const destroy = () => {
        if (typeof unListen === 'function')
            unListen();
        if (options.onCancel) {
            options.onCancel();
        }
        if (!dom)
            return;
        root.unmount();
        dom.remove();
    };
    DESTROY_POOL[key] = destroy;
    unListen = history.listen(destroy);
    root.render(react_1.default.createElement(ActionSheet, Object.assign({ visible: true, onCancel: destroy }, options)));
    return destroy;
};
exports.showActionSheet = showActionSheet;
const hideActionSheet = () => {
    for (const k in DESTROY_POOL) {
        if (typeof DESTROY_POOL[k] === 'function') {
            DESTROY_POOL[k]();
        }
    }
};
exports.hideActionSheet = hideActionSheet;
exports.default = ActionSheet;
//# sourceMappingURL=ActionSheet.js.map