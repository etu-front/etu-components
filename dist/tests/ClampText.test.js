"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
require("jest-styled-components");
const enzyme_1 = require("enzyme");
const enzyme_adapter_react_18_1 = __importDefault(require("@cfaester/enzyme-adapter-react-18"));
(0, enzyme_1.configure)({ adapter: new enzyme_adapter_react_18_1.default() });
const ClampText_1 = __importDefault(require("../components/ClampText"));
test('ClampText Renders and Click', () => {
    const mMock = jest.fn().mockImplementationOnce(() => 'first').mockImplementationOnce(() => 'two');
    const w = (0, enzyme_1.mount)(react_1.default.createElement(ClampText_1.default, { max: 2, onClick: mMock }));
    expect(w.find('div')).not.toBeNull();
    w.simulate('click');
    expect(mMock.mock.calls[0][0]).toBeTruthy();
    expect(mMock.mock.calls[0][0].target.tagName).toBe('DIV');
    expect(mMock()).toBe('two');
});
test('ClampText Component', () => {
    expect(ClampText_1.default.displayName).toEqual('ClampText');
});
test('ClampText 基本', () => {
    const component = react_test_renderer_1.default.create(react_1.default.createElement(ClampText_1.default, null, "hello"));
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
    expect(tree).toMatchSnapshot();
    if (!tree)
        return;
    const { props } = tree;
    expect(props).toHaveProperty('max', 1);
    expect(props.style).toBeUndefined();
    expect(props.title).toBeUndefined();
    expect(tree.children).toEqual(['hello']);
});
test('ClampText 复杂', () => {
    const component = react_test_renderer_1.default.create(react_1.default.createElement(ClampText_1.default, { max: 2, text: "title", className: "cls", style: { lineHeight: 2 } }, "hello"));
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
    expect(tree).toMatchSnapshot();
    if (!tree)
        return;
    const { props } = tree;
    expect(props).toHaveProperty('max', 2);
    expect(tree).toHaveStyleRule('line-clamp', '2');
    expect(props).toHaveProperty('title', 'title');
    expect(props.className).toContain('cls');
    expect(props.style).toHaveProperty('lineHeight', 2);
    expect(tree.children).toEqual(['hello']);
});
test('ClampText 标题', () => {
    const component = react_test_renderer_1.default.create(react_1.default.createElement(ClampText_1.default, { max: 3, text: "title and children text" }));
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
    expect(tree).toMatchSnapshot();
    if (!tree)
        return;
    const { props } = tree;
    expect(tree).toHaveStyleRule('line-clamp', '3');
    expect(props).toHaveProperty('max', 3);
    expect(props).toHaveProperty('title', 'title and children text');
    expect(tree.children).toEqual(['title and children text']);
});
//# sourceMappingURL=ClampText.test.js.map