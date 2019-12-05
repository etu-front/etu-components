import { FC } from 'react';
import { BaseProps } from '../types';
interface PageProps extends BaseProps {
    title?: string;
    backgroundColor?: string;
    paddingBottom?: number;
    resetScroll?: boolean;
}
declare const Page: FC<PageProps>;
export default Page;
