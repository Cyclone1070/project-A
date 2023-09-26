export interface Rect {
    tag?: string;
    id?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
}
export interface Ellipse {
    tag?: string;
    id?: string;
    cx?: number;
    cy?: number;
    rx?: number;
    ry?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
}
interface SingleFinalSvg extends Rect, Ellipse {
    id?: string;
    highlight?: string;
}
export interface FinalSvg extends Array<SingleFinalSvg> {}
