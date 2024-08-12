import React from 'react';
import { ButtonProps } from './Button';
import { ModalOptions } from './Modal';
type Position = 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight';
interface IProps extends Omit<ModalOptions, 'showOkBtn' | 'closable'> {
    btnProps?: ButtonProps;
    position?: Position;
    offset?: number;
    onOk: () => void;
    children: JSX.Element;
}
declare const Popconfirm: React.NamedExoticComponent<IProps>;
export default Popconfirm;
