import { FC, ReactElement, ReactNode } from 'react';
import { BaseProps } from '../types';
interface ModalProps {
    title?: string;
    width?: number | string;
    visible?: boolean;
    mask?: boolean;
    maskClosable?: boolean;
    maskOpacity?: number;
    zIndex?: number;
    closable?: boolean;
    className?: BaseProps['className'];
    style?: BaseProps['style'];
    /** modal body 内边距 */
    padding?: number | string;
    onOk?: Function;
    onCancel?: Function;
    onDestroy?: Function;
    onClose?: Function;
    header?: ReactNode;
    footer?: ReactNode;
    okText?: ReactNode;
    loadingText?: ReactNode;
    showOkBtn?: boolean;
    okBtnProps?: any;
    cancelText?: ReactNode;
    showCancelBtn?: boolean;
    cancelBtnProps?: any;
    bodyClassName?: string;
}
declare type ModalComponent = FC<ModalProps> & {
    show: (options: ModalOptions) => Function;
    confirm: (options: ModalOptions) => Function;
    info: (options: ModalOptions) => Function;
};
declare const Modal: ModalComponent;
interface ModalOptions extends ModalProps {
    message?: string | ReactElement;
}
export default Modal;
