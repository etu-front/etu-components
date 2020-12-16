"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
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
    background: rgba(0, 0, 0, 0.2);
  }
`;
const ModalContainer = styled_components_1.default.div `
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: ${props => props.width || '300px'};
  min-height: 150px;
  background: white;
  border-radius: 5px;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
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
  line-height: 50px;
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
  max-height: calc(100vh - 44px - 44px);
  overflow: auto;
`;
const ModalFooter = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  button:not(:first-child) {
    border-left: 1px solid #f0f0f0;
  }
  .ok, .cancel {
    flex: 1;
    height: 44px;
    line-height: 42px;
    font-size: 16px;
    padding: 0;
    border:none;
    border-top: 1px solid #f0f0f0;
    outline: none;
    border-radius: 0;
  }
  .ok {
    color: ${THEME.primaryColor};
    background-color: #fff;
    &:hover, &:active {
      background-color: #f3f3f3;
      color: ${THEME.primaryColor};
    }
  }
  .cancel {
    background-color: #fff;
    color: #aaaaaa;
    &:hover, &:active {
      background-color: #f3f3f3;
      color: #999;
    }
  }
`;
const Modal = props => {
    const { title = '', visible = false, onOk, onCancel, onDestroy, closable = true, mask = true, maskClosable = true, showCancelBtn, showOkBtn, header, footer } = props;
    const [loading, setLoading] = react_1.useState(false);
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
        if (onCancel) {
            onCancel();
        }
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
        if (footer)
            return footer;
        const buttons = [];
        if (showCancelBtn) {
            buttons.push(react_1.default.createElement(Button_1.default, Object.assign({ key: "cancel", className: "cancel", onClick: handleCancel }, (props.cancelBtnProps || {})), props.cancelText || '取消'));
        }
        if (showOkBtn) {
            buttons.push(react_1.default.createElement(Button_1.default, Object.assign({ key: "ok", className: "ok", onClick: handleOk }, (props.okBtnProps || {}), { loading: loading, loadingText: props.loadingText }), props.okText || '确定'));
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
    return (react_1.default.createElement(Wrap, { className: props.className, style: { zIndex: props.zIndex } },
        mask && react_1.default.createElement("div", { className: "mask", onClick: () => maskClosable && handleCancel() }),
        react_1.default.createElement(ModalContainer, { width: props.width, style: props.style },
            closable && react_1.default.createElement("span", { className: "close", onClick: handleCancel }, "\u00D7"),
            renderTitle(),
            react_1.default.createElement(ModalBody, { className: props.bodyClassName, style: { padding: getPadding() } }, props.children),
            react_1.default.createElement(ModalFooter, null, renderFooter()))));
};
const showModal = (node) => {
    const dom = document.createElement('div');
    document.body.appendChild(dom);
    // eslint-disable-next-line prefer-const
    let unListen;
    const history = history_1.createBrowserHistory();
    const destroy = () => {
        if (typeof unListen === 'function')
            unListen();
        if (!dom)
            return;
        react_dom_1.default.unmountComponentAtNode(dom);
        dom.remove();
    };
    unListen = history.listen(destroy);
    react_dom_1.default.render(react_1.default.cloneElement(node, { onDestroy: destroy }), dom);
    return destroy;
};
const show = (options) => showModal(react_1.default.createElement(Modal, Object.assign({}, options, { visible: true }), options.message));
const confirm = (options) => showModal(react_1.default.createElement(Modal, Object.assign({ showOkBtn: true, showCancelBtn: true, closable: false, maskClosable: false }, options, { visible: true }), options.message));
const info = (options) => showModal(react_1.default.createElement(Modal, Object.assign({ showOkBtn: true, okText: "\u77E5\u9053\u4E86", maskClosable: false, closable: false }, options, { visible: true }), options.message));
Modal.show = show;
Modal.confirm = confirm;
Modal.info = info;
exports.default = Modal;
//# sourceMappingURL=Modal.js.map