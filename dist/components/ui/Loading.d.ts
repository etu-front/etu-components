import { FC } from "react";
export declare type Colors = [string, string] | undefined;
interface LoadingStyles {
    /** 方块尺寸 */
    size: number;
    /** 圆角 */
    radius: number;
    /** 动画时间 */
    duration: number;
    /** 颜色设置，[primaryColor, secondaryColor] */
    colors: Colors;
    children?: any;
}
export declare const FilterDiv: FC<LoadingStyles>;
declare const Loading: FC<Partial<LoadingStyles>>;
export default Loading;
