"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/ban-ts-ignore */
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
function testHook(runHook, flushEffects = true) {
    const HookWrapper = () => {
        const output = runHook();
        // @ts-ignore
        return react_1.default.createElement("span", { output: output });
    };
    const wrapper = flushEffects ? enzyme_1.mount(react_1.default.createElement(HookWrapper, null)) : enzyme_1.shallow(react_1.default.createElement(HookWrapper, null));
    // @ts-ignore
    return wrapper.find('span').props().output;
}
exports.default = testHook;
//# sourceMappingURL=testHook.js.map