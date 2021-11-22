import React from 'react';
interface IProps {
    str: string;
    target?: '_blank' | '_self';
    className?: string;
    linkColor?: string;
}
declare const LinkifyParagraph: React.FC<IProps>;
export default LinkifyParagraph;
