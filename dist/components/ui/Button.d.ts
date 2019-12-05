import { FC, ReactNode } from 'react';
import { BaseIconType } from './Icon';
import { BaseProps } from '../types';
export declare type ButtonSize = 'xsmall' | 'small' | 'default' | 'large' | 'xlarge';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'success' | 'link' | 'info';
export interface ButtonProps extends BaseProps {
    htmlType?: 'submit' | 'reset' | 'button';
    type?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    block?: boolean;
    icon?: string | BaseIconType | ReactNode;
    loading?: boolean;
    loadingText?: ReactNode;
    shape?: 'round' | 'square' | 'circle';
}
declare const Button: FC<ButtonProps>;
export default Button;
