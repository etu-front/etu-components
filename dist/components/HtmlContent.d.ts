import { FC } from 'react';
import { BaseProps } from './types';
interface IProps extends BaseProps {
    html?: string;
    scriptClassName?: string;
    /** 图片点击预览 */
    imagePreview?: boolean;
    evalScript?: boolean;
}
declare const HtmlContent: FC<IProps>;
export default HtmlContent;
