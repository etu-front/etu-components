"use strict";
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
const styled_components_1 = __importDefault(require("styled-components"));
const useTitle_1 = require("../../utils/useTitle");
const Container = styled_components_1.default.div `
  min-height: 100vh;
  padding-bottom: env(safe-area-inset-bottom);
`;
const Page = ({ backgroundColor = 'white', paddingBottom, resetScroll, style, className, children, title }) => {
    react_1.useEffect(() => {
        if (!resetScroll)
            return;
        window.scrollTo(0, 0);
    });
    return (react_1.default.createElement(Container, { style: Object.assign(Object.assign({}, style), { backgroundColor, paddingBottom }), className: className },
        typeof title !== 'undefined' && react_1.default.createElement(useTitle_1.DocumentTitle, { title: title }),
        children));
};
exports.default = Page;
//# sourceMappingURL=Page.js.map