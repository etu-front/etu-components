import React, { FC } from 'react';
import { BaseProps } from '../types';
export declare type IconType = 'unorderedlist' | 'play' | 'pause' | 'calendar' | 'people' | 'learning' | 'back-home' | 'words' | 'quiz' | 'video' | 'my-course' | 'logo' | 'close' | 'loading' | 'reload' | 'home-fill' | 'heart' | 'home' | 'heart-fill' | 'warning-circle-fill' | 'play-circle-fill' | 'question-circle-fill' | 'plus-circle-fill' | 'right-circle-fill' | 'up-circle-fill' | 'info-circle-fill' | 'close-circle-fill' | 'minus-circle-fill' | 'down-circle-fill' | 'left-circle-fill' | 'check-circle-fill' | 'minus' | 'ellipsis' | 'check' | 'infomation' | 'exclaimination' | 'doubleright' | 'doubleleft' | 'down' | 'up' | 'left' | 'right' | 'verticalleft' | 'verticalright' | 'share' | 'team' | 'sync' | 'warning-circle' | 'up-circle' | 'right-circle' | 'question-circle' | 'play-circle' | 'plus-circle' | 'minus-circle' | 'down-circle' | 'left-circle' | 'info-circle' | 'close-circle' | 'check-circle';
interface IconProps extends BaseProps {
    prefix?: string;
    /** 图片地址 */
    src?: string;
    type?: string;
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
export declare function createFromIconfont<T = {}>(options: CustomIconOptions): FC<IconProps & T>;
declare const _default: React.FC<IconProps>;
export default _default;
