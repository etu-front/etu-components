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
const Button_1 = __importDefault(require("./Button"));
const Modal_1 = __importDefault(require("./Modal"));
const View_1 = __importDefault(require("../View"));
const getPosition = (rect, container, position = 'topLeft', offset = 5) => {
    console.log(rect);
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
const Popconfirm = react_1.default.memo(props => {
    const { children, position, offset, message, okBtnProps, cancelBtnProps } = props, rest = __rest(props, ["children", "position", "offset", "message", "okBtnProps", "cancelBtnProps"]);
    const handleClick = (e) => {
        const rect = e.currentTarget.children[0].getBoundingClientRect();
        const destory = Modal_1.default.show(Object.assign(Object.assign({ bodyClassName: 'p-a-15', message: (react_1.default.createElement(View_1.default, null,
                message || '确认？',
                react_1.default.createElement(View_1.default, { row: true, justify: "flex-end" },
                    !rest.maskClosable &&
                        react_1.default.createElement(Button_1.default, Object.assign({ size: "small", type: "default", onClick: () => destory(), className: "m-r-15" }, cancelBtnProps), "\u53D6\u6D88"),
                    react_1.default.createElement(Button_1.default, Object.assign({ size: "small", type: "primary", onClick: () => { rest.onOk(); destory(); } }, okBtnProps), "\u786E\u5B9A")))), closable: false, maskClosable: false, onShow: container => {
                const pos = getPosition(rect, container, position, offset);
                // eslint-disable-next-line no-param-reassign
                container.style.left = `${pos.left}px`;
                // eslint-disable-next-line no-param-reassign
                container.style.top = `${pos.top}px`;
                // eslint-disable-next-line no-param-reassign
                container.style.opacity = '1';
            } }, rest), { animation: false, showOkBtn: false, showCancelBtn: false, style: Object.assign(Object.assign({}, rest.style), { opacity: 0, transition: 'opacity 200ms', transform: 'none' }) }));
    };
    return (react_1.default.createElement("span", { onClick: handleClick }, children));
});
Popconfirm.displayName = 'Popconfirm';
exports.default = Popconfirm;
//# sourceMappingURL=Popconfirm.js.map