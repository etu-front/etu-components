"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentTitle = void 0;
const react_1 = require("react");
/**
 * 设置 document.title
 * @param title
 * @param useReset 组件在 unmount 后 document.title 是否重置为上一次 title
 */
const useTitle = (title, useReset) => {
    react_1.useEffect(() => {
        let lastTitle = '';
        if (document.title !== title) {
            lastTitle = document.title;
            document.title = title;
        }
        return () => {
            if (useReset && lastTitle) {
                document.title = lastTitle;
            }
        };
    }, [title]);
};
const DocumentTitle = props => {
    useTitle(props.title, props.useReset);
    return props.children || null;
};
exports.DocumentTitle = DocumentTitle;
useTitle.DocumentTitle = exports.DocumentTitle;
exports.default = useTitle;
//# sourceMappingURL=useTitle.js.map