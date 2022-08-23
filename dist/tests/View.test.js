"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
require("jest-styled-components");
const View_1 = __importDefault(require("../components/View"));
describe('View test', () => {
    it('View Component', () => {
        expect(View_1.default.displayName).toEqual('View');
        expect(View_1.default.Center.displayName).toEqual('View.Center');
    });
    it('View 基本', () => {
        const component = react_test_renderer_1.default.create(react_1.default.createElement(View_1.default, { column: true, hide: true }, "hello"));
        const tree = component.toJSON();
        expect(tree).not.toBeNull();
        if (!tree)
            return;
        expect(tree).toHaveStyleRule('align-items', 'stretch');
        expect(tree).toHaveStyleRule('flex-direction', 'column');
        expect(tree.props.style).toEqual({ "flexDirection": "column" });
        expect(tree.props.className).toContain('hide');
        expect(tree.children).toEqual(['hello']);
        expect(tree).toMatchSnapshot();
    });
    it('View 复杂样式', () => {
        const jsx = (react_1.default.createElement(View_1.default, { row: true, align: 'flex-end', flex: 1, width: 200, height: 100, wrap: true, justify: 'stretch', background: 'red', color: 'white', radius: 5, style: { lineHeight: '24px' } }, "good"));
        const component = react_test_renderer_1.default.create(jsx);
        const tree = component.toJSON();
        expect(tree).not.toBeNull();
        if (!tree)
            return;
        expect(tree.children).toEqual(['good']);
        const { style } = tree.props;
        expect(style).toHaveProperty('flexDirection', 'row');
        expect(style).toHaveProperty('alignItems', 'flex-end');
        expect(style).toHaveProperty('flexWrap', 'wrap');
        expect(style).toHaveProperty('justifyContent', 'stretch');
        expect(style).toHaveProperty('flex', 1);
        expect(style).toHaveProperty('width', 200);
        expect(style).toHaveProperty('height', 100);
        expect(style).toHaveProperty('background', 'red');
        expect(style).toHaveProperty('color', 'white');
        expect(style).toHaveProperty('borderRadius', 5);
        expect(style).toHaveProperty('lineHeight', '24px');
        expect(tree).toMatchSnapshot();
    });
    it('View 样式', () => {
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(View_1.default, { wrap: true, row: true, style: { margin: '0 -10px' } },
            react_1.default.createElement(View_1.default, { height: 100, flex: 1, background: "red" }),
            react_1.default.createElement(View_1.default, { height: 100, flex: 1, background: "green" }),
            react_1.default.createElement(View_1.default, { height: 100, flex: 1, background: "blue" }))).toJSON();
        expect(tree).not.toBeNull();
        if (!tree)
            return;
        expect(tree).toMatchSnapshot();
        const { style } = tree.props;
        expect(style).toHaveProperty('flexWrap', 'wrap');
        expect(style).toHaveProperty('flexDirection', 'row');
        expect(style).toHaveProperty('margin', '0 -10px');
    });
    it('View.Center 居中。。', () => {
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(View_1.default.Center, { height: 200 }, "Hello")).toJSON();
        expect(tree).not.toBeNull();
        if (!tree)
            return;
        expect(tree).toMatchSnapshot();
        const { style } = tree.props;
        expect(style).toHaveProperty('alignItems', 'center');
        expect(style).toHaveProperty('height', 200);
        expect(style).toHaveProperty('justifyContent', 'center');
    });
    it('View 非 div', () => {
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(View_1.default, { as: "a", style: { color: 'red' }, 
            // @ts-ignore
            href: "https://bing.com", className: "sdsd" }, "bing")).toJSON();
        expect(tree).not.toBeNull();
        if (!tree)
            return;
        expect(tree).toMatchSnapshot();
        expect(tree.type).toEqual('a');
        expect(tree.props.href).toEqual('https://bing.com');
    });
});
//# sourceMappingURL=View.test.js.map