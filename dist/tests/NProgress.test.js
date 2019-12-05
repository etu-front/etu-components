"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
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
//# sourceMappingURL=NProgress.test.js.map