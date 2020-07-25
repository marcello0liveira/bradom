import { IDictionary } from "./dictionary";

export class VNode {
  constructor(
    public component: string,
    public attrs: IDictionary,
    public children: Array<VNode>,
    public type?: string,

  ) {
    this.component = component || '';
    this.children = children || [];
    this.attrs = attrs || {};
    this.type = type || '';
  }
}