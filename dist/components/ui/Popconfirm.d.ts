import React from 'react';
import { ModalOptions } from './Modal';
declare type Position = 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight';
interface IProps extends Omit<ModalOptions, 'showOkBtn' | 'showCancelBtn' | 'closable'> {
    position?: Position;
    offset?: number;
    onOk: () => void;
    children: JSX.Element;
}
declare const Popconfirm: React.NamedExoticComponent<IProps>;
export default Popconfirm;
