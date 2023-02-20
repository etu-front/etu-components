import React from 'react';
import { Colors } from './ui/Loading';
interface Props {
    size?: number;
    className?: string;
    colors?: Colors;
    children?: any;
}
declare const PageLoading: React.FC<Props>;
export default PageLoading;
