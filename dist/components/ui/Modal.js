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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const client_1 = require("react-dom/client");
const classnames_1 = __importDefault(require("classnames"));
const styled_components_1 = __importDefault(require("styled-components"));
const history_1 = require("history");
const Button_1 = __importDefault(require("./Button"));
const Wrap = styled_components_1.default.div `
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  color: #444444;
  z-index: 999;
  .mask {
    width: 100%;
    height: 100%;
    background-color: #000;
    transition: opacity 200ms;
    opacity: 0;
  }
`;
const ModalContainer = styled_components_1.default.div `
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 300px;
  min-height: 60px;
  background: white;
  border-radius: 5px;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  transition: all 200ms cubic-bezier(.5, .75, .75, 1.25);
  margin-top: 60px;
  opacity: 0;
  &.scale {
    transform: translate(-50%,-50%) scale(0.5);
    &.show {
      transform: translate(-50%,-50%) scale(1);
    }
  }
  &.show {
    margin-top: 0;
    opacity: 1;
  }
  &.shadow {
    box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
  }
  .close {
    color: #aaa;
    position: absolute;
    right: -14px;
    top: -8px;
    font-size: 26px;
    line-height: 42px;
    font-weight: bold;
    width: 42px;
    height: 42px;
    /* background: rgba(255,0,0,0.2); */
    padding-left: 5px;
    z-index: 1;
  }
  .close:hover {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;
const ModalTitle = styled_components_1.default.h4 `
  position: relative;
  font-size: 18px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  font-weight:normal;
  padding: 0 36px 10px 36px;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const ModalBody = styled_components_1.default.div `
  /* padding: 10px 20px; */
  flex: 1;
  font-size: 16px;
  overflow: auto;
`;
const ModalFooter = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  button {
    background-color: #fff;
  }
  button:not(:first-child) {
    border-left: 1px solid #f0f0f0;
  }
  .ok, .cancel {
    flex: 1;
    padding: 0;
    border:none;
    border-top: 1px solid #f0f0f0;
    outline: none;
    border-radius: 0;
  }
  .cancel {
    color: #aaa;
  }
`;
const Modal = props => {
    const { title = '', visible = false, onOk, onCancel, onDestroy, closable = true, mask = true, maskClosable = true, maskOpacity = 0.2, animation, animationType = 'default', showCancelBtn = !!props.cancelBtnProps, showOkBtn = !!props.okBtnProps, header, footer } = props;
    const bodyRef = react_1.useRef(null);
    const [loading, setLoading] = react_1.useState(false);
    const [up, setUp] = react_1.useState(!animation);
    react_1.useEffect(() => {
        if (!animation)
            return;
        if (visible) {
            if (!up)
                setTimeout(() => setUp(true), 100);
        }
        else {
            if (up)
                setTimeout(() => setUp(false), 100);
        }
    }, [visible, animation]);
    react_1.useEffect(() => {
        if (!props.onShow || !bodyRef.current)
            return;
        props.onShow(bodyRef.current);
    }, [props.onShow, bodyRef]);
    if (!visible)
        return null;
    const handleOk = () => __awaiter(void 0, void 0, void 0, function* () {
        if (onOk) {
            setLoading(true);
            try {
                yield onOk();
            }
            finally {
                setLoading(false);
            }
        }
        if (onCancel)
            onCancel();
        if (onDestroy)
            onDestroy();
    });
    const handleCancel = () => {
        if (onCancel)
            onCancel();
        if (onDestroy)
            onDestroy();
    };
    const renderTitle = () => {
        if (header)
            return header;
        if (title)
            return react_1.default.createElement(ModalTitle, { className: props.children ? '' : 'm-t-20' }, title);
        return null;
    };
    const renderFooter = () => {
        var _a;
        if (footer)
            return footer;
        const buttons = [];
        if (showCancelBtn) {
            buttons.push(react_1.default.createElement(Button_1.default, Object.assign({ key: "cancel", className: "cancel", type: "default", onClick: handleCancel }, (props.cancelBtnProps || {})), props.cancelText || '取消'));
        }
        if (showOkBtn) {
            buttons.push(react_1.default.createElement(Button_1.default, Object.assign({ key: "ok", type: "primary", onClick: handleOk }, props.okBtnProps, { className: classnames_1.default("ok", (_a = props.okBtnProps) === null || _a === void 0 ? void 0 : _a.className), loading: loading, loadingText: props.loadingText }), props.okText || '确定'));
        }
        return buttons;
    };
    const getPadding = () => {
        if (typeof props.padding !== 'undefined')
            return props.padding;
        if (header || title)
            return '10px 20px 20px 20px';
        return '20px';
    };
    const classes = [
        props.modalClassName,
        animationType,
        up ? 'show' : '',
        props.shadow ? 'shadow' : ''
    ].filter(Boolean).join(' ');
    return (react_1.default.createElement(Wrap, { className: props.className, style: { zIndex: props.zIndex } },
        mask &&
            react_1.default.createElement("div", { className: "mask", style: { opacity: up ? maskOpacity : 0 }, onClick: () => maskClosable && handleCancel() }),
        react_1.default.createElement(ModalContainer, { style: props.width ? Object.assign({ width: props.width }, props.style) : props.style, className: classes, ref: bodyRef },
            closable && (react_1.default.createElement("span", { className: "close " + (props.closeClassName || ''), style: props.closeStyle, onClick: handleCancel }, "\u00D7")),
            renderTitle(),
            props.children &&
                react_1.default.createElement(ModalBody, { className: props.bodyClassName, style: { padding: getPadding() } }, props.children),
            react_1.default.createElement(ModalFooter, null, renderFooter()))));
};
const showModal = (node) => {
    const dom = document.createElement('div');
    document.body.classList.add('noScroll');
    document.body.appendChild(dom);
    // eslint-disable-next-line prefer-const
    let unListen;
    const history = history_1.createBrowserHistory();
    const root = client_1.createRoot(dom);
    const destroy = () => {
        document.body.classList.remove('noScroll');
        if (typeof unListen === 'function')
            unListen();
        if (!dom)
            return;
        root.unmount();
        dom.remove();
    };
    unListen = history.listen(destroy);
    root.render(react_1.default.cloneElement(node, { onDestroy: destroy }));
    return destroy;
};
const show = (options) => showModal(react_1.default.createElement(Modal, Object.assign({}, options, { visible: true }), options.message));
const confirm = (options) => showModal(react_1.default.createElement(Modal, Object.assign({ showOkBtn: true, showCancelBtn: true, closable: false, maskClosable: false }, options, { visible: true }), options.message));
const info = (options) => showModal(react_1.default.createElement(Modal, Object.assign({ showOkBtn: true, okText: "\u77E5\u9053\u4E86", maskClosable: false, closable: false }, options, { visible: true }), options.message));
const danger = (options) => {
    var _a;
    return showModal(react_1.default.createElement(Modal, Object.assign({ showOkBtn: true, maskClosable: false, closable: false, showCancelBtn: true }, options, { okBtnProps: Object.assign(Object.assign({ type: 'danger' }, options.okBtnProps), { className: classnames_1.default('bg-danger', (_a = options.okBtnProps) === null || _a === void 0 ? void 0 : _a.className) }), visible: true }), options.message));
};
Modal.show = show;
Modal.confirm = confirm;
Modal.info = info;
Modal.danger = danger;
exports.default = Modal;
//# sourceMappingURL=Modal.js.map