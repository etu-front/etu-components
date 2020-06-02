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
    cancelText?: string;
}
declare const ActionSheet: FC<IProps>;
export declare const showActionSheet: (options: Pick<IProps, "onCancel" | "maskClosable" | "actions" | "cancelText">) => () => void;
export default ActionSheet;
