"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const View_1 = __importDefault(require("../View"));
const Line = ({ height = 10, color, className, style }) => react_1.default.createElement(View_1.default, { className: className, style: style, height: height, background: color });
exports.default = Line;
//# sourceMappingURL=Line.js.map