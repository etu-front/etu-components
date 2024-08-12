import { FC, ReactNode } from 'react';
import { BaseProps } from '../types';
type Position = 'top' | 'center' | 'bottom' | 'top_right' | 'bottom_right' | number;
type ToastIcon = 'warning' | 'info' | 'check' | 'close' | 'loading';
interface ToastProps extends BaseProps {
    /** 字符串 或 ReactNode */
    title?: string | ReactNode;
    /** 图标类型 */
    icon?: ToastIcon;
    /** 位置 */
    position?: Position;
    /** 遮罩 默认为true */
    mask?: boolean;
}
/** showToast 选项 */
interface Options extends ToastProps {
    /** 显示毫秒数，默认 3000 毫秒，当为 0 或 负数时， 持久存在 */
    duration?: number;
}
type ToastFunction = (title: string, opts?: Options) => void;
type ToastComponent = FC<ToastProps> & {
    show: ToastFunction;
    hide: () => void;
    loading: ToastFunction;
    fail: ToastFunction;
    info: ToastFunction;
    success: ToastFunction;
};
declare const Toast: ToastComponent;
/**
 * 显示 Toast
 * @param options Options
 * @returns toast destroy 函数
 */
export declare const showToast: (options: Options) => () => void;
export declare const hideToast: () => void;
export default Toast;
