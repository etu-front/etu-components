import React from 'react';
import { BaseProps } from '../types';
interface IProps extends BaseProps {
    title?: JSX.Element | string;
    extra?: JSX.Element | string;
    mask?: boolean;
    maskClosable?: boolean;
    closable?: boolean;
    maskOpacity?: number;
    animation?: boolean;
    visible?: boolean;
    position?: 'left' | 'right' | 'top' | 'bottom';
    width?: number | string;
    height?: number | string;
    onClose?: () => void;
    onDestroy?: Function;
}
interface DrawerOption extends Omit<IProps, 'onDestroy' | 'visible'> {
    body: string | React.ReactElement;
}
declare type DrawerComponent = React.FC<IProps> & {
    /** 函数方式显示组件 */
    show: (options: DrawerOption) => () => void;
    /** iframe 内嵌方式打开 url */
    openUrl: (url: string, options?: Omit<DrawerOption, 'body'>) => () => void;
};
declare const Drawer: DrawerComponent;
export default Drawer;
