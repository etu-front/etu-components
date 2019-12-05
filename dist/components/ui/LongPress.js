"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
function useLongPress(callback = () => { }, ms = 300) {
    const [startLongPress, setStartLongPress] = react_2.useState(false);
    const [timerId, setTimer] = react_2.useState(0);
    react_2.useEffect(() => {
        if (startLongPress) {
            setTimer(setTimeout(callback, ms));
        }
        else {
            clearTimeout(timerId);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [startLongPress, callback, ms]);
    return {
        onMouseDown: () => setStartLongPress(true),
        onMouseUp: () => setStartLongPress(false),
        onMouseLeave: () => setStartLongPress(false),
        onTouchStart: () => setStartLongPress(true),
        onTouchEnd: () => setStartLongPress(false)
    };
}
function LongPress({ children, callback, ms }) {
    const longPressEvents = useLongPress(callback, ms);
    return react_1.default.createElement("span", Object.assign({ style: { display: 'block' } }, longPressEvents), children);
}
exports.default = LongPress;
//# sourceMappingURL=LongPress.js.map