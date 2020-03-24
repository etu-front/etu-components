import { FC } from 'react';
import { BaseIconType } from './Icon';
import { BaseProps } from '../types';
interface IconProps extends BaseProps {
    iconClassName?: string;
    /** 图片地址 */
    src?: string;
    type?: BaseIconType;
    /** 尺寸 */
    size?: number;
    /** 内部图标尺寸 */
    iconSize?: number;
    /** 背景颜色 */
    color?: string;
    /** 图标颜色 */
    iconColor?: string;
    /** 是否旋转 */
    spin?: boolean;
}
declare const CircleIcon: FC<IconProps>;
export default CircleIcon;
