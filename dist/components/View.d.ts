import React, { FC, HTMLAttributes } from 'react';
type Align = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'space-between' | 'space-around';
interface IProps extends HTMLAttributes<HTMLElement> {
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
interface IProps {
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
    hide?: boolean;
}
type ViewComponent = FC<IProps>;
declare const View: ViewComponent & {
    Center: FC<IProps>;
};
export default View;
