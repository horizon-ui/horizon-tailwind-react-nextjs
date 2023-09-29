import { ComponentType, Element } from 'react';

export interface IRoute {
  path?: string;
  name?: string;
  layout?: string;
  exact?: boolean;
  component?: ComponentType | (() => JSX.Element);
  icon?: ComponentType | string | Element | JSX.Element;
  secondary?: boolean;
  collapse?: boolean;
  items?: RoutesType[];
}
interface RoutesType {
  name: string;
  layout: string;
  component: JSX.Element;
  icon: JSX.Element | string;
  path: string;
  secondary?: boolean;
}
