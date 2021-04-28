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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNProgress = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = require("styled-components");
const nprogress_1 = __importDefault(require("nprogress"));
const GlobalStyle = styled_components_1.createGlobalStyle `
  #nprogress {
    pointer-events: none;
    .bar {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 1024;
      width: 100%;
      height: 2px;
      background: ${props => props.primaryColor};
    }
    .peg {
      position: absolute;
      right: 0;
      display: block;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${props => props.primaryColor},
        0 0 5px ${props => props.primaryColor};
      transform: rotate(3deg) translate(0, -4px);
      opacity: 1;
    }
  }
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-top-color: ${props => props.primaryColor};
    border-left-color: ${props => props.primaryColor};
    border-radius: 50%;

    -webkit-animation: nprogress-spinner 400ms linear infinite;
            animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }
  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @-webkit-keyframes nprogress-spinner {
    0%   { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes nprogress-spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const useNProgress = (url, loading, primaryColor = '', options = {}) => {
    const [last, setHref] = react_1.useState(url);
    react_1.useEffect(() => {
        nprogress_1.default.configure({ showSpinner: options.showSpinner, speed: options.speed || 200 });
    }, []);
    react_1.useEffect(() => {
        if (last === url)
            return;
        nprogress_1.default.start();
        if (!loading) {
            nprogress_1.default.done();
            setHref(url);
        }
    }, [url, loading]);
    return react_1.default.createElement(GlobalStyle, { primaryColor: primaryColor });
};
exports.useNProgress = useNProgress;
const NProgress = ({ url, loading, primaryColor, options = { showSpinner: false, speed: 200 } }) => exports.useNProgress(url, loading, primaryColor, options);
NProgress.displayName = 'NProgress';
exports.default = NProgress;
//# sourceMappingURL=NProgress.js.map