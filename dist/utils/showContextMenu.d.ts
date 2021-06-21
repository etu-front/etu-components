import React from 'react';
declare const showContextMenu: (options: {
    target: HTMLElement;
    x: number;
    y: number;
    component: React.ReactNode;
    className?: string;
    offset?: number;
}) => () => void;
export default showContextMenu;
