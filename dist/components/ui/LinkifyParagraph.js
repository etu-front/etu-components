"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const LINK_REGEX = /(https?:\/\/[^\s]+)/gi;
const LINE_BREAK = /(\n|\r\n|\r)/g;
const LinkifyParagraph = react_1.default.memo(props => {
    const lineBreakParse = (str) => {
        const strs = str
            .replace(/ /g, '\u00a0')
            .split(LINE_BREAK)
            .filter(text => !!text);
        return strs.map((part, idx) => react_1.default.createElement(react_1.default.Fragment, { key: idx }, LINE_BREAK.test(part) ? react_1.default.createElement("br", null) : part));
    };
    const parts = props.str.split(LINK_REGEX).filter(text => text !== '');
    const { linkColor = '#2432e2' } = props;
    return (react_1.default.createElement("div", { className: props.className }, parts.map((part, idx) => {
        if (part.startsWith('http')) {
            return (react_1.default.createElement("a", { target: props.target || '_blank', key: idx, href: part, style: { color: linkColor } }, part));
        }
        return lineBreakParse(part);
    })));
});
exports.default = LinkifyParagraph;
//# sourceMappingURL=LinkifyParagraph.js.map