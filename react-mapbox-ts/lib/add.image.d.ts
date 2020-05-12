/// <reference types="react" />
import { ImageRef } from './types';
interface Props {
    name: string;
    image: ImageRef;
    options?: {
        pixelRatio?: number;
        sdf?: boolean;
    };
    children?: any;
}
declare const AddImage: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<ImageRef>>;
export default AddImage;
