import React, { ReactNode } from 'react';
import { BaseProps } from './types';
import { BaseIconType } from './ui/Icon';
interface Props extends BaseProps {
    /** 自定义Icon 当使用时，会忽略其他 Icon属性 */
    icon?: ReactNode;
    iconType?: BaseIconType;
    iconSize?: number;
    iconClassName?: string;
    iconColor?: string;
    title?: ReactNode;
    message?: ReactNode;
    /** 显示刷新按钮或刷新按钮文字 */
    hasRefresh?: boolean | string;
    /** 显示后退按钮或后退按钮文字 */
    hasBack?: boolean | string;
    backHandler?: Function;
}
declare const Result: React.FC<Props>;
export default Result;
