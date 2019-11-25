import { FC } from 'react';
import { BaseProps } from './types';
interface IProps {
    max?: number;
    /**标题，当组件无 children 时，title 就为原文字 */
    title?: string;
    text?: string;
}
declare const ClampText: FC<IProps & BaseProps>;
export default ClampText;
