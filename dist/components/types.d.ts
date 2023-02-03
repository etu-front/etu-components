import { MouseEvent, ReactNode, CSSProperties } from 'react';
export declare type MouseHandler<T = undefined> = T extends HTMLElement ? (evt: MouseEvent<T>) => any : () => any;
export interface BaseProps {
    className?: string;
    id?: string;
    children?: ReactNode | ReactNode[] | JSX.Element;
    style?: CSSProperties;
    onClick?: MouseHandler | MouseHandler<HTMLElement>;
}
