import React, { FC } from 'react';
import { BaseProps } from '../types';
interface IProps extends BaseProps {
    text: string;
    /** 毫秒 */
    delay?: number;
    copyChildren?: React.ReactNode;
    copiedText?: string;
    onCopy?: Function;
}
declare const CopyText: FC<IProps>;
export default CopyText;
