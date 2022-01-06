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
const Button_1 = __importDefault(require("./Button"));
const Modal_1 = __importDefault(require("./Modal"));
const View_1 = __importDefault(require("../View"));
const getPosition = (rect, container, position = 'topLeft', offset = 5) => {
    const pos = { left: rect.x, top: rect.y };
    if (position === 'topLeft' || position === 'topRight') {
        pos.top = Math.max(0, rect.y - container.offsetHeight - offset);
    }
    if (position === 'bottomLeft' || position === 'bottomRight') {
        pos.top = Math.max(0, rect.bottom + offset);
    }
    if (position === 'bottomRight' || position === 'topRight') {
        pos.left = Math.max(0, rect.x + rect.width - container.offsetWidth);
    }
    if (position === 'topLeft' || position === 'bottomLeft') {
        pos.left = Math.max(0, rect.x);
    }
    return pos;
};
const Message = props => {
    const { message, btnProps, cancelBtnProps, cancelText = '取消', okBtnProps, okText = '确定', onOk, showCancelBtn = true, onCancel } = props;
    const [loading, setLoading] = react_1.default.useState(false);
    const handelOk = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            yield onOk();
        }
        finally {
            setLoading(false);
        }
        onCancel && onCancel();
    });
    return (react_1.default.createElement(View_1.default, null,
        message || '确认？',
        react_1.default.createElement(View_1.default, { row: true, justify: "flex-end", className: "m-t-10" },
            showCancelBtn && (react_1.default.createElement(Button_1.default, Object.assign({ size: "small", type: "default", onClick: () => onCancel && onCancel(), className: "m-r-15" }, btnProps, cancelBtnProps), cancelText)),
            react_1.default.createElement(Button_1.default, Object.assign({ size: "small", type: "primary", loading: loading, onClick: handelOk }, btnProps, okBtnProps), okText))));
};
const Popconfirm = react_1.default.memo(props => {
    const { children, position, offset, animation = true } = props, rest = __rest(props, ["children", "position", "offset", "animation"]);
    const handleClick = (e) => {
        const rect = e.currentTarget.children[0].getBoundingClientRect();
        const destory = Modal_1.default.show(Object.assign(Object.assign({ modalClassName: 'shadow-xl', bodyClassName: 'p-a-15', maskClosable: false }, rest), { onShow: container => {
                const pos = getPosition(rect, container, position, offset);
                // eslint-disable-next-line no-param-reassign
                container.style.left = `${pos.left}px`;
                // eslint-disable-next-line no-param-reassign
                container.style.top = `${pos.top}px`;
                // eslint-disable-next-line no-param-reassign
                container.style.opacity = '1';
            }, closable: false, showCancelBtn: false, showOkBtn: false, animation: false, message: react_1.default.createElement(Message, Object.assign({}, props, { onCancel: () => destory() })), style: Object.assign(Object.assign({}, rest.style), { opacity: 0, transition: animation ? 'opacity 200ms' : 'none', transform: 'none' }) }));
    };
    return (react_1.default.createElement("span", { onClick: handleClick }, children));
});
Popconfirm.displayName = 'Popconfirm';
exports.default = Popconfirm;
//# sourceMappingURL=Popconfirm.js.map