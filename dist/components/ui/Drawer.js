"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const classnames_1 = __importDefault(require("classnames"));
const history_1 = require("history");
const styled_components_1 = __importDefault(require("styled-components"));
const Icon_1 = __importDefault(require("./Icon"));
const View_1 = __importDefault(require("../View"));
const Main = styled_components_1.default.div `
  z-index: 1;
  position: relative;
`;
const Mask = styled_components_1.default.div `
  position: fixed;
  background: #00000073;
  transition: opacity 300ms;
  transition-timing-function: cubic-bezier(.7,.3,.1,1);
  opacity: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  &.opened {
    opacity: ${props => props.opacity || 0.3};
  }
`;
const Container = styled_components_1.default(View_1.default) `
  --boxshaow-color: rgb(0 0 0 / 15%);
  position: fixed;
  background-color: white;
  color: #474747;
  transition-timing-function: cubic-bezier(.7,.3,.1,1);
  transition-duration: 300ms;
  &.left, &.right {
    top: 0;
    bottom: 0;
  }
  &.top, &.bottom {
    left: 0;
    right: 0;
  }
  &.right {
    transition-property: right;
    right: -100%;
    box-shadow: -2px 0 8px var(--boxshaow-color);
    &.opened {right: 0;}
  }
  &.left {
    transition-property: left;
    left: -100%;
    box-shadow: 2px 0 8px var(--boxshaow-color);
    &.opened {left: 0;}
  }
  &.top {
    transition-property: top;
    top: -100%;
    box-shadow: 0 2px 8px var(--boxshaow-color);
    &.opened {top: 0;}
  }
  &.bottom {
    transition-property: bottom;
    bottom: -100%;
    box-shadow: 0 -2px 8px var(--boxshaow-color);
    &.opened {bottom: 0;}
  }
  .drawer-title {
    padding: 8px 16px;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
  }
  .drawer-close {
    position: absolute;
    right: 12px;
    top: 10px;
    color: #666;
    font-size: 18px;
    cursor: pointer;
    z-index: 1;
  }
  &.left {
    .drawer-title {
      flex-direction: row-reverse !important;
    }
    .drawer-close {
      left: 12px;
      right: auto;
    }
  }
  .drawer-body {
    padding: 10px 16px;
    flex: 1;
    overflow: auto;
  }
  @media (prefers-color-scheme: dark) {
    --boxshaow-color: #000d;
    .drawer-title {
      color: white;
      border-bottom: 1px solid #555;
    }
    .drawer-body {
      color: white;
    }
    .drawer-close {color: white;}
  }
`;
const Drawer = props => {
    const { visible, mask = true, closable = true, maskClosable = true, maskOpacity, onClose, onDestroy, animation = true, width = 375, height = 400, position = 'right', children } = props;
    const [opened, setOpened] = react_1.default.useState(!animation);
    const handleClose = () => setOpened(false);
    const unmount = () => {
        if (opened)
            return;
        if (onClose)
            onClose();
        if (onDestroy)
            onDestroy();
    };
    react_1.default.useEffect(() => {
        if (!animation)
            return;
        if (visible) {
            if (!opened)
                setTimeout(() => setOpened(true), 100);
        }
        else if (opened)
            setTimeout(() => setOpened(false), 100);
    }, [visible, animation]);
    if (!visible)
        return null;
    const size = { width, height };
    if (position === 'left' || position === 'right')
        delete size.height;
    if (position === 'top' || position === 'bottom')
        delete size.width;
    return (react_1.default.createElement(Main, { onTransitionEnd: unmount },
        mask &&
            react_1.default.createElement(Mask, { opacity: maskOpacity, className: classnames_1.default({ opened }), onClick: maskClosable ? handleClose : undefined }),
        react_1.default.createElement(Container, Object.assign({ className: classnames_1.default(position, 'bg-lightest', { opened }) }, size),
            props.title &&
                react_1.default.createElement(View_1.default, { className: classnames_1.default('drawer-title', { 'p-r-35': closable && position !== 'left' }), row: true, align: "center", justify: props.extra ? 'space-between' : 'flex-start' },
                    props.title,
                    props.extra),
            closable && react_1.default.createElement(Icon_1.default, { type: "close", className: "drawer-close", onClick: handleClose }),
            react_1.default.createElement(View_1.default, { className: classnames_1.default('drawer-body', props.className) }, children))));
};
Drawer.show = options => {
    const { body } = options, rest = __rest(options, ["body"]);
    const dom = document.createElement('div');
    document.body.appendChild(dom);
    // eslint-disable-next-line prefer-const
    let unListen;
    const history = history_1.createBrowserHistory();
    const destroy = () => {
        if (typeof unListen === 'function')
            unListen();
        if (!dom)
            return;
        react_dom_1.default.unmountComponentAtNode(dom);
        dom.remove();
    };
    unListen = history.listen(destroy);
    // const node = <
    react_dom_1.default.render(react_1.default.createElement(Drawer, Object.assign({}, rest, { visible: true, onDestroy: destroy }), body), dom);
    return destroy;
};
Drawer.openUrl = (url, options) => Drawer.show(Object.assign(Object.assign({ width: 375, className: 'p-a-0' }, options), { body: (react_1.default.createElement("iframe", { title: typeof (options === null || options === void 0 ? void 0 : options.title) === 'string' ? options.title : 'iframe', src: url, height: "100%", width: "100%", frameBorder: "none", scrolling: "auto" })) }));
Drawer.displayName = 'Drawer';
exports.default = Drawer;
//# sourceMappingURL=Drawer.js.map