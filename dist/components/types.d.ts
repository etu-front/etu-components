import React, { MouseEvent, CSSProperties } from 'react';
export declare type MouseHandler = (e?: MouseEvent<HTMLElement | undefined>) => any;
export interface BaseProps {
    className?: string;
    id?: string;
    children?: React.ReactNode;
    style?: CSSProperties;
    onClick?: MouseHandler;
}
