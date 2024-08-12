import React, { FC, ReactNode } from 'react';
import { BaseIconType } from './Icon';
export type ButtonSize = 'xsmall' | 'small' | 'default' | 'large' | 'xlarge';
export type ButtonType = 'primary' | 'default' | 'warning' | 'danger' | 'success' | 'link' | 'info';
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    htmlType?: 'submit' | 'reset' | 'button';
    border?: boolean;
    type?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    block?: boolean;
    dashed?: boolean;
    outline?: boolean;
    icon?: string | BaseIconType | ReactNode;
    /** 加载状态 */
    loading?: boolean;
    loadingText?: ReactNode;
    shape?: 'round' | 'square' | 'circle' | 'pill';
}
declare const Button: FC<ButtonProps>;
export default Button;
