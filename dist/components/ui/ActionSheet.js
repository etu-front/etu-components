"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const react_dom_1 = __importDefault(require("react-dom"));
const styled_components_1 = __importDefault(require("styled-components"));
const View_1 = __importDefault(require("../View"));
const history_1 = require("history");
const Container = styled_components_1.default(View_1.default) `
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
const Body = styled_components_1.default(View_1.default) `
  background: #ddd;
  z-index: 3;
  position: fixed;
  bottom: -200px;
  left: 0;
  right: 0;
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
    const { title, actions, visible, onCancel, cancelText = '取消', mask = true, maskClosable = true } = props;
    const [up, setUp] = react_1.useState(false);
    const handleClose = () => {
        setUp(false);
        if (onCancel) {
            setTimeout(onCancel, 100);
        }
    };
    react_1.useEffect(() => {
        if (visible) {
            setTimeout(() => setUp(true), 100);
        }
        else {
            setTimeout(() => setUp(false), 100);
        }
    }, [visible]);
    if (!visible)
        return null;
    return (react_1.default.createElement(Container, null,
        mask && react_1.default.createElement(Mask, { onClick: maskClosable ? handleClose : () => false }),
        react_1.default.createElement(Body, { className: up ? 'up' : '' },
            title,
            actions.map((act, index) => (react_1.default.createElement("div", { key: 'action-' + index, className: `item ${props.itemClassName || ''}`, onClick: () => act.onClick() }, act.child || act.text))),
            cancelText && react_1.default.createElement("div", { className: "item m-t-5", onClick: handleClose }, cancelText))));
};
const showActionSheet = (options) => {
    const dom = document.createElement('div');
    document.body.appendChild(dom);
    // eslint-disable-next-line prefer-const
    let unListen;
    const key = Date.now() + '_' + Math.floor(Math.random() * 100000);
    const history = history_1.createBrowserHistory();
    const destroy = () => {
        if (typeof unListen === 'function')
            unListen();
        if (options.onCancel) {
            options.onCancel();
        }
        if (!dom)
            return;
        react_dom_1.default.unmountComponentAtNode(dom);
        dom.remove();
    };
    DESTROY_POOL[key] = destroy;
    unListen = history.listen(destroy);
    react_dom_1.default.render(react_1.default.createElement(ActionSheet, Object.assign({ visible: true, onCancel: destroy }, options)), dom);
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