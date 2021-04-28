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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
require("jest-styled-components");
const NProgress_1 = __importStar(require("../components/NProgress"));
const testHook_1 = __importDefault(require("./testHook"));
test('NProgress Component', () => {
    expect(NProgress_1.default.displayName).toEqual('NProgress');
    const value = testHook_1.default(() => NProgress_1.useNProgress('https://bing.com', false, 'red'), false);
    expect(value).toMatchSnapshot();
    expect(value.props).toHaveProperty('primaryColor', 'red');
});
test('NProgress 基本', () => {
    const component = react_test_renderer_1.default.create(react_1.default.createElement(NProgress_1.default, { loading: false, url: "https://bing.com" }));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toBeNull();
    if (!tree)
        return;
});
test('NProgress 基本2', () => {
    const component = react_test_renderer_1.default.create(react_1.default.createElement(NProgress_1.default, { loading: true, url: "https://bing.com" }));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toBeNull();
    if (!tree)
        return;
});
test('NProgress 基本3', () => __awaiter(void 0, void 0, void 0, function* () {
    const data = { url: "https://bing.com" };
    const component = react_test_renderer_1.default.create(react_1.default.createElement(NProgress_1.default, { loading: false, options: { speed: 300, showSpinner: true }, url: data.url }));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toBeNull();
}));
//# sourceMappingURL=NProgress.test.js.map