"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const View_1 = __importDefault(require("./View"));
const ui_1 = require("./ui");
const handleReload = () => window.location.reload();
const Result = props => {
    const { title, message, children, icon, iconType = 'warning-circle-fill', iconSize = 48, iconColor, iconClassName, className, hasRefresh, hasBack, backHandler } = props;
    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        }
        else if (backHandler) {
            backHandler();
        }
    };
    return (react_1.default.createElement(View_1.default.Center, { className: className || 'p-t-50' },
        icon,
        iconType && !icon &&
            react_1.default.createElement(ui_1.Icon, { type: iconType, size: iconSize, color: iconColor, className: `block m-b-10 ${iconClassName || (!iconColor ? 't-gray' : '')}` }),
        title && react_1.default.createElement("h2", { className: "t-gray f20" }, title),
        react_1.default.createElement("span", { className: "f18 t-gray" }, children || message),
        react_1.default.createElement(View_1.default, { row: true },
            hasBack &&
                react_1.default.createElement(ui_1.Button, { type: "link", className: "m-t-20", onClick: handleBack, icon: "doubleleft" }, typeof hasBack === 'string' ? hasBack : '后退'),
            hasRefresh &&
                react_1.default.createElement(ui_1.Button, { type: "link", className: "m-t-20", onClick: handleReload, icon: "sync" }, typeof hasRefresh === 'string' ? hasRefresh : '刷新'))));
};
exports.default = Result;
//# sourceMappingURL=Result.js.map