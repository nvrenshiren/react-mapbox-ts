import React from 'react';
import { MapContextAction } from './context';
export declare function withMap<T>(Component: React.ComponentType<T & MapContextAction>): (props: T) => JSX.Element;
