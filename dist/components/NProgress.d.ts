import React from 'react';
import { NProgressOptions } from 'nprogress';
export declare const useNProgress: (url: string, loading: boolean, primaryColor?: string, options?: Partial<NProgressOptions>) => JSX.Element;
interface NProgressProps {
    url: string;
    loading: boolean;
    primaryColor?: string;
    options?: Partial<NProgressOptions>;
}
declare const NProgress: React.FC<NProgressProps>;
export default NProgress;
