import React from 'react';
import { ImageRef } from './types';
interface Props {
    name: string;
    url: string;
    options?: {
        pixelRatio?: number;
        sdf?: boolean;
    };
    children?: any;
}
declare const LoadImage: React.ForwardRefExoticComponent<Props & React.RefAttributes<ImageRef>>;
export default LoadImage;
