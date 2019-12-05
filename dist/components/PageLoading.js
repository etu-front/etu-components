"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Loading_1 = __importDefault(require("./ui/Loading"));
const Container = styled_components_1.default.div `
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
const PageLoading = ({ children, size = 10, className, colors }) => (react_1.default.createElement(Container, { className: className }, children || react_1.default.createElement(Loading_1.default, { size: size, colors: colors })));
exports.default = PageLoading;
//# sourceMappingURL=PageLoading.js.map