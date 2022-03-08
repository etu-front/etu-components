import React, { FC, ReactElement, CSSProperties, ReactNode } from 'react';
import { ButtonProps } from './Button';
import { BaseProps } from '../types';
export interface ModalProps {
    title?: React.ReactNode;
    width?: number | string;
    visible?: boolean;
    shadow?: boolean;
    animation?: boolean;
    animationType?: 'scale' | 'default';
    mask?: boolean;
    maskClosable?: boolean;
    maskOpacity?: number;
    zIndex?: number;
    closable?: boolean;
    style?: BaseProps['style'];
    /** modal body 内边距 */
    padding?: number | string;
    onShow?: (modalBody: HTMLDivElement) => void;
    onOk?: Function;
    onCancel?: Function;
    onDestroy?: Function;
    header?: ReactNode;
    footer?: ReactNode;
    okText?: ReactNode;
    loadingText?: ReactNode;
    showOkBtn?: boolean;
    okBtnProps?: ButtonProps;
    cancelText?: ReactNode;
    showCancelBtn?: boolean;
    cancelBtnProps?: ButtonProps;
    className?: BaseProps['className'];
    modalClassName?: string;
    bodyClassName?: string;
    closeClassName?: string;
    closeStyle?: CSSProperties;
}
declare type ModalComponent = FC<ModalProps> & {
    show: (options: ModalOptions) => Function;
    confirm: (options: ModalOptions) => Function;
    info: (options: ModalOptions) => Function;
    danger: (options: ModalOptions) => Function;
};
declare const Modal: ModalComponent;
export interface ModalOptions extends Omit<ModalProps, 'onDestroy'> {
    message?: string | ReactElement;
}
export default Modal;
