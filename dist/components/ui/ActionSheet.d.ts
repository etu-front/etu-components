import React, { FC, CSSProperties } from 'react';
import { MouseHandler } from '../types';
interface IAction {
    onClick: MouseHandler;
}
interface ITextAction extends IAction {
    text?: string;
}
interface IChildAction extends IAction {
    child?: React.ReactNode;
}
interface IProps {
    title?: React.ReactNode;
    visible?: boolean;
    mask?: boolean;
    maskClosable?: boolean;
    actions: (ITextAction | IChildAction)[];
    maxWidth?: number;
    onCancel?: MouseHandler;
    className?: string;
    bodyClassName?: string;
    itemClassName?: string;
    itemStyle?: CSSProperties;
    cancelText?: string;
}
declare const ActionSheet: FC<IProps>;
export declare const showActionSheet: (options: Omit<IProps, "visible">) => () => void;
export declare const hideActionSheet: () => void;
export default ActionSheet;
