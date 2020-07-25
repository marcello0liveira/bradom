import { VNode } from '../types/vnode';
import { zip } from '../utils/array';

type PatchType = ($Element) => $Element | undefined;

export default class VTree {  
  private $node: $Element;
  private vNode: VNode;

  /**
   * Creates an instance of VTree.
   * @param {VNode} vNode
   * @memberof VTree
   */
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
   * @param {VNode} newVNode
   * @returns {PatchType}
   * @memberof VTree
   */
  public diffSelf (newVNode: VNode): PatchType {
    return this.diff(this.vNode, newVNode)
  }

  /**
   *
   *
   * @param {VNode} oldVNode
   * @param {VNode} newVNode
   * @returns {PatchType}
   * @memberof VTree
   */
  private diff (oldVNode: VNode, newVNode: VNode): PatchType {
    if (newVNode === undefined) {
      return ($node: $Element): undefined => {
        $node.remove();
        return undefined;
      };
    }

    if (oldVNode.type === 'text' || newVNode.type === 'text') {
      if (oldVNode !== newVNode) {
        return ($node: $Element) : $Element => {
          const $newNode = this.render(newVNode);
          $node.replaceWith($newNode);
          return $newNode;
        };
      } else {
        return ($node: $Element): $Element => $node;
      }
    }

    if (oldVNode.component !== newVNode.component) {
      return ($node: $Element): $Element => {
        const $newNode = this.render(newVNode);
        $node.replaceWith($newNode);
        return $newNode;
      };
    }

    const patchAttrs = this.diffAttrs(oldVNode.attrs, newVNode.attrs);
    
    const patchChildren = this.diffChildren(oldVNode.children, newVNode.children);

    return ($node: $Element): $Element => {
      patchAttrs($node);
      patchChildren($node);
      return $node;
    };
  }

  /**
   *
   *
   * @private
   * @param {*} oldVChildren
   * @param {*} newVChildren
   * @returns
   * @memberof VTree
   */
  private diffChildren(oldVChildren: Array<VNode>, newVChildren: Array<VNode>) {
    const childPatches: Array<PatchType> = [];
    oldVChildren.forEach((oldVChild, i) => {
      childPatches.push(this.diff(oldVChild, newVChildren[i]));
    });

    const additionalPatches : Array<PatchType> = [];
    for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
      additionalPatches.push(($node: $Element): $Element => {
        $node.appendChild(this.render(additionalVChild));
        return $node;
      });
    }

    return ($parent: $Element): $Element => {
      for (const [patch, $child] of zip(childPatches, ($parent.childNodes as any))) {
        patch($child);
      }

      for (const patch of additionalPatches) {
        patch($parent);
      }
      return $parent;
    };
  }

  /**
   *
   *
   * @private
   * @param {*} [oldAttrs={}]
   * @param {*} [newAttrs={}]
   * @returns
   * @memberof VTree
   */
  private diffAttrs (oldAttrs = {}, newAttrs = {}) {
    const patches : Array<PatchType> = [];

    for (const [k, v] of Object.entries(newAttrs)) {
      patches.push(($node: HTMLElement): $Element => {
        $node.setAttribute(k, (v as any));
        return $node;
      });
    }

    for (const k in oldAttrs) {
      if (!(k in newAttrs)) {
        patches.push(($node: HTMLElement): $Element => {
          $node.removeAttribute(k);
          return $node;
        });
      }
    }

    return ($node: $Element): $Element => {
      for (const patch of patches) {
        patch($node);
      }
      return $node;
    };
  }


  /**
   *
   *
   * @returns {$Element}
   * @memberof VTree
   */
  public toHTMLDOM(): $Element {
    return this.$node;
  }

  /**
   *
   *
   * @param {*} $newNode
   * @memberof VTree
   */
  public updateHTMLDOM($newNode: $Element): $Element {
    this.$node = $newNode;
    return this.$node;
  }

  /**
   *
   *
   * @param {VNode} newVNode
   * @returns {VNode}
   * @memberof VTree
   */
  public updateVNode(newVNode: VNode): VNode {
    this.vNode = newVNode;
    return this.vNode;
  }
}

