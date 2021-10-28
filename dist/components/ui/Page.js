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
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const useTitle_1 = require("../../utils/useTitle");
const Container = styled_components_1.default.div `
  min-height: 100vh;
  padding-bottom: env(safe-area-inset-bottom);
`;
const Page = ({ backgroundColor, paddingBottom, resetScroll, style, className, children, title }) => {
    react_1.useEffect(() => {
        if (!resetScroll)
            return;
        window.scrollTo(0, 0);
    }, [resetScroll]);
    return (react_1.default.createElement(Container, { style: Object.assign(Object.assign({}, style), { backgroundColor, paddingBottom }), className: className },
        typeof title !== 'undefined' && react_1.default.createElement(useTitle_1.DocumentTitle, { title: title }),
        children));
};
exports.default = Page;
//# sourceMappingURL=Page.js.map