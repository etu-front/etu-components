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
const react_1 = __importStar(require("react"));
const react_copy_to_clipboard_1 = __importDefault(require("react-copy-to-clipboard"));
const Button_1 = __importDefault(require("./Button"));
const CopyText = ({ text, delay = 2000, className, children, copiedText = 'copied', onCopy, copyChildren }) => {
    const [copied, setCopied] = (0, react_1.useState)(false);
    const handleCopy = () => {
        setCopied(true);
        if (onCopy)
            onCopy();
        setTimeout(() => setCopied(false), delay);
    };
    return (react_1.default.createElement(react_copy_to_clipboard_1.default, { text: text, onCopy: handleCopy, className: className }, copied
        ? copyChildren || react_1.default.createElement("span", { style: { color: '#50b127' } }, copiedText)
        : children || (react_1.default.createElement(Button_1.default, { size: "small", type: "primary" }, "\u590D\u5236"))));
};
exports.default = CopyText;
//# sourceMappingURL=CopyText.js.map