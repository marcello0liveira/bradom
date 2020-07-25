import { VNode } from './vnode'

export default class VTree {  
  private $node: $Element;
  private vNode: VNode;

  constructor(vNode: VNode) {
    this.vNode = vNode;
    this.$node = this.render(vNode);
  }

  /**
   *
   *
   * @private
   * @param {VNode} vNode
   * @returns {$Element}
   * @memberof VTree
   */
  private render(vNode: VNode): $Element {
    if (vNode.type === "text") {
      return document.createTextNode(vNode.component);
    }

    return this.renderEl(vNode);
  }
  
  /**
   *
   *
   * @private
   * @param {VNode} vNode
   * @returns {$Element}
   * @memberof VTree
   */
  private renderEl(vNode: VNode): $Element {
    const { component, attrs, children } = vNode;

    const $el = document.createElement(component);
  
    for (const [k, v] of Object.entries(attrs)) {
      if (k.match(/^on/)) {
        $el.addEventListener(k.toLowerCase().replace(/^on/, ""), v);
      } else {
        $el.setAttribute(k, v);
      }
    }
  
    for (const child of children) {
      const toRender = this.render(child);
      if (toRender instanceof Array) {
        toRender.forEach(el => $el.appendChild(el));
      } else {
        $el.appendChild(this.render(child));
      }
    }
  
    return $el;
  }

  /**
   *
   *
   * @param {string} element
   * @memberof VTree
   */
  public mount(element: string): void {
    const $el = document.querySelector(element);
    $el?.replaceWith(this.$node);
  }
}