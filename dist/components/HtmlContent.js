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
exports.Container = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const lodash_1 = __importDefault(require("lodash"));
exports.Container = styled_components_1.default.div `
  h1 { font-size: 1.5em; }
  h2 { font-size: 1.3em; }
  h3 { font-size: 1.2em; }
  h4, h5 { font-size: 1.1em; }
  h1, h2, h3, h4 {
    line-height: 150%;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    &:first-child {
      margin-top: 0;
    }
  }
  p {
    line-height: 200%;
    text-align: justify;
  }
  p:empty {
    height: 1em;
  }
  p > img + br:last-child {
    display: none;
  }
  p > img:only-child {
    margin: 0.5em 0;
    display: block;
  }
  p > img {
    margin: 0.5em 0;
  }
  img {
    max-width: 100%;
  }
  table.table-bordered {
    border-collapse: collapse;
    padding: 8px;
    width: 100%;
  }
  table.table.table-bordered th,
  table.table.table-bordered td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  ul, ol {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1em;
    list-style-position: inside;
    padding-left: 0.5em;
  }
  ul {
    list-style-type: disc;
    ul {
      list-style-type: circle;
    }
    ul, ol {
      padding-left: 1.5em;
    }
  }
  ol {
    list-style-type: decimal;
    ul, ol {
      padding-left: 1.5em;
    }
  }
  li {
    line-height: 200%;
  }
`;
const HtmlContent = props => {
    const { className, style, html = '', useStyle = true, evalScript = true, scriptClassName = 'MagnetScript', imagePreview = true } = props;
    const contentRef = react_1.useRef(null);
    react_1.default.useEffect(() => {
        var _a;
        if (!html)
            return;
        // 执行脚本
        if (evalScript) {
            const doms = document.querySelectorAll(`.${scriptClassName}`);
            if (doms.length > 0) {
                doms.forEach(dom => {
                    const script = dom.innerHTML;
                    if (!script)
                        return;
                    try {
                        // eslint-disable-next-line no-eval
                        window.eval(script);
                    }
                    catch (_a) {
                        //
                    }
                });
            }
        }
        if (!imagePreview)
            return;
        // 绑定图片点击事件
        const imageTags = (_a = contentRef.current) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('img');
        if (!(imageTags === null || imageTags === void 0 ? void 0 : imageTags.length))
            return;
        lodash_1.default.filter(imageTags, image => {
            if (!image.src || image.src.endsWith('.svg'))
                return false;
            if (lodash_1.default.get(image.parentNode, 'tagName') === 'A')
                return false;
            if (lodash_1.default.get(image.parentNode, 'parentNode.tagName') === 'A')
                return false;
            return true;
        }).map((image, index) => {
            image.setAttribute('data-index', index.toString());
            image.classList.add('has-preview');
            return { url: image.src, image };
        });
    }, []);
    const Comp = useStyle ? exports.Container : 'div';
    return react_1.default.createElement(Comp, { ref: contentRef, className: className, style: style, dangerouslySetInnerHTML: { __html: html } });
};
exports.default = HtmlContent;
//# sourceMappingURL=HtmlContent.js.map