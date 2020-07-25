import { VNode } from "../types/vnode";


/**
 *
 *
 * @param {*} children
 * @returns
 */
function parseChildren(children: any) {
  return (children || []).flatMap(x => {
    if (typeof x === "string") {
      return new VNode(x, {}, [], 'text');
    } else if (Array.isArray(x)) {
      return parseChildren(x);
    }
    
    return x;
  });
}

/**
 *
 *
 * @export
 * @param {string} component
 * @param {*} [attrs={}]
 * @param {*} children
 * @returns {VNode}
 */
export function h(component: string, attrs = {}, ...children): VNode {
  const node = new VNode(component, attrs, parseChildren(children))
  return node;
}
