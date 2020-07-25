import { IDictionary } from './dictionary';
import { VNode } from './vnode';
import VTree from "./vtree";

export type IUpdateCallback = (key: string, prev: any, next: any) => void;

export default abstract class Component {
  abstract render(): VNode;

  private vTree;

  private propsHandler = {
    get: function(target, property): any {
      if (property in target) {
        return target[property];
      }
      console.warn(`${property} doesn't exist`);
      return undefined;
    },
    set: (target, property, value): any => {
      target[property] = value;
      this.update();
      return target;
    }
  };

  public props = new Proxy({} as IDictionary, this.propsHandler as any);

  /**
   *
   *
   * @private
   * @returns {void}
   * @memberof Component
   */
  private update(): void {
    const newVNode = this.render();
    const patch = this.vTree.diffSelf(newVNode);
    const $newNode = patch(this.vTree.toHTMLDOM());
    this.vTree.updateHTMLDOM($newNode);
    this.vTree.updateVNode(newVNode);

    return;
  }

  /**
   *
   *
   * @returns {$Element}
   * @memberof Component
   */
  connect(): $Element {
    if (!this.render) {
      return document.createTextNode('error');
    }

    this.vTree = new VTree(this.render());
    return this.vTree.toHTMLDOM();
  }
}
