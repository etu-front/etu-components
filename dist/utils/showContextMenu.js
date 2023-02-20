"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const showContextMenu = (options) => {
    const { target, className = '', offset = 1 } = options;
    const dom = document.createElement('div');
    dom.style.position = 'fixed';
    dom.className = className;
    dom.style.visibility = 'hidden';
    dom.style['z-index'] = 999;
    document.body.append(dom);
    const root = client_1.createRoot(dom);
    root.render(react_1.default.createElement("span", null, options.component));
    let x = options.x + offset;
    let y = options.y + offset;
    const rect = target.getBoundingClientRect();
    if (options.x + offset + dom.offsetWidth > rect.left + rect.width) {
        x = Math.max(0, options.x - dom.offsetWidth - offset);
    }
    if (options.y + offset + dom.offsetHeight > rect.top + rect.height) {
        y = Math.max(0, options.y - dom.offsetHeight - offset);
    }
    dom.style.left = `${x}px`;
    dom.style.top = `${y}px`;
    dom.style.visibility = 'visible';
    let timer = 0;
    const clearTimer = () => window.clearTimeout(timer);
    const destory = () => {
        clearTimeout(timer);
        dom.removeEventListener('mouseenter', clearTimer);
        dom.removeEventListener('mouseleave', destory);
        root.unmount();
        dom.remove();
    };
    const startTimer = () => window.setTimeout(destory, 1000);
    timer = startTimer();
    dom.addEventListener('mouseenter', clearTimer);
    dom.addEventListener('mouseleave', destory);
    return destory;
};
exports.default = showContextMenu;
//# sourceMappingURL=showContextMenu.js.map