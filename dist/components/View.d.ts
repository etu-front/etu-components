import { FC } from 'react';
import { BaseProps } from './types';
declare type Align = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'space-between' | 'space-around';
interface IProps extends BaseProps {
    flex?: number | string;
    align?: Align;
    justify?: Align;
    row?: boolean;
    column?: boolean;
    wrap?: boolean;
    radius?: number | string;
    height?: number | string;
    background?: string;
    color?: string;
    width?: number | string;
}
declare type ViewComponent = FC<IProps>;
declare const View: ViewComponent & {
    Center: ViewComponent;
};
export default View;
