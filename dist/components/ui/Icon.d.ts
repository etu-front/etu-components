import React, { FC } from 'react';
import { BaseProps } from '../types';
export declare type BaseIconType = "ellipsis" | "info" | "exclaimination" | "doubleright" | "doubleleft" | "down" | "up" | "left" | "right" | "up-circle" | "right-circle" | "play-circle" | "plus-circle" | "minus-circle" | "down-circle" | "left-circle" | "loading" | "warning-circle-fill" | "question-circle-fill" | "info-circle-fill" | "close-circle-fill" | "check-circle-fill" | "check" | "reload" | "sync" | "warning-circle" | "question-circle" | "info-circle" | "close-circle" | "check-circle";
interface IconProps extends BaseProps {
    prefix?: string;
    /** 图片地址 */
    src?: string;
    type?: string | BaseIconType;
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
    type?: string | BaseIconType;
}>(options: CustomIconOptions): React.FC<IconProps & T>;
declare const Icon: FC<IconProps & {
    type?: string | BaseIconType;
}>;
export default Icon;
