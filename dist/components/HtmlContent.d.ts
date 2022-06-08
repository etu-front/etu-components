import { FC } from 'react';
import { BaseProps } from './types';
export declare const Container: import("styled-components").StyledComponent<"div", any, {}, never>;
interface IProps extends BaseProps {
    html?: string;
    scriptClassName?: string;
    /** 图片点击预览 */
    imagePreview?: boolean;
    /** 是否执行script */
    evalScript?: boolean;
    /** 是否执行style */
    useStyle?: boolean;
}
declare const HtmlContent: FC<IProps>;
export default HtmlContent;
