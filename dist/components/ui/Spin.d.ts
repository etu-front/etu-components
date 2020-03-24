import { CSSProperties, FC } from 'react';
import { Colors } from './Loading';
interface ISpin {
    className?: string;
    spinning?: boolean;
    style?: CSSProperties;
    tip?: string;
    colors?: Colors;
}
declare const Spin: FC<ISpin>;
export default Spin;
