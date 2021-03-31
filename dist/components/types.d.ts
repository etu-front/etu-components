import { MouseEvent, CSSProperties } from 'react';
export declare type MouseHandler = (e?: MouseEvent<HTMLElement | undefined>) => any;
export interface BaseProps {
    className?: string;
    id?: string;
    style?: CSSProperties;
    onClick?: MouseHandler;
}
