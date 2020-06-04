import { FC } from 'react';
import { MouseHandler } from '../types';
export interface IAction {
    onClick: Function;
    text: string;
}
interface IProps {
    visible?: boolean;
    maskClosable?: boolean;
    actions: IAction[];
    onCancel?: MouseHandler;
    itemClassName?: string;
    cancelText?: string;
}
declare const ActionSheet: FC<IProps>;
export declare const showActionSheet: (options: Pick<IProps, "onCancel" | "maskClosable" | "actions" | "itemClassName" | "cancelText">) => () => void;
export default ActionSheet;
