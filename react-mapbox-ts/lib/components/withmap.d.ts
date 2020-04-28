import { MapContextAction } from './context';
import React from 'react';
export declare function withMap<T>(Component: React.ComponentType<T & MapContextAction>): (props: T) => JSX.Element;
declare type Props = {
    map: any;
};
declare const WithContent: React.FC<Props>;
export default WithContent;
