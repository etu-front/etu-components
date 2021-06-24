import React, { FC } from 'react';
import { BaseProps } from '../types';
export declare type BaseIconType = "appstore" | "rocket" | "heart" | "star" | "unorderedlist" | "pause" | "heart-fill" | "lock-fill" | "star-fill" | "caret-down" | "backward" | "caret-up" | "caret-right" | "caret-left" | "forward" | "step-backward" | "step-forward" | "plus" | "setting" | "user" | "team" | "setting-fill" | "appstoreadd" | "search" | "close" | "wechat" | "alipay" | "left-circle" | "down-circle" | "minus-circle" | "plus-circle" | "play-circle" | "right-circle" | "up-circle" | "right" | "left" | "up" | "down" | "doubleleft" | "doubleright" | "exclaimination" | "info" | "ellipsis" | "check-circle" | "close-circle" | "info-circle" | "question-circle" | "warning-circle" | "sync" | "reload" | "check" | "check-circle-fill" | "close-circle-fill" | "info-circle-fill" | "question-circle-fill" | "warning-circle-fill" | "loading" | "swap" | 'checkbox-square' | 'border' | 'checkbox-fill';
interface IconProps extends BaseProps {
    prefix?: string;
    /** 图片地址 */
    src?: string;
    type?: BaseIconType | string;
    /** 尺寸 */
    size?: number;
    /** 颜色 */
    color?: string;
    /** 是否旋转 */
    spin?: boolean;
}
export interface CustomIconOptions {
    scriptUrl: string;
    prefix: string;
}
export declare function createFromIconfont<T = {
    type?: BaseIconType;
}>(options: CustomIconOptions): React.FC<IconProps & T>;
declare const Icon: FC<IconProps & {
    type?: BaseIconType;
}>;
export default Icon;
