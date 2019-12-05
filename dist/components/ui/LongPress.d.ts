/// <reference types="react" />
interface ILongPressProps {
    children: any;
    callback: () => void;
    ms?: number;
}
export default function LongPress({ children, callback, ms }: ILongPressProps): JSX.Element;
export {};
