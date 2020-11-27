import { FC } from 'react';
import { BaseProps } from '../types';
export interface PageProps {
    title?: string;
    backgroundColor?: string;
    paddingBottom?: number;
    resetScroll?: boolean;
}
declare const Page: FC<PageProps & BaseProps>;
export default Page;
