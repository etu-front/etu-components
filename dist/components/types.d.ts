import { CSSProperties, MouseEvent } from 'react';
export interface BaseProps {
    className?: string;
    style?: CSSProperties;
    onClick?: (e?: MouseEvent<HTMLElement>) => any;
}
