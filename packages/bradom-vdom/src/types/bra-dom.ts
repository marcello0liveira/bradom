import Component from "./component";

class BraDOM {
  public mount(element: string, component: Component): void {
    const $el = document.querySelector(element);
    $el?.replaceWith(component.connect());
  }
}

const bradom = new BraDOM();

export default bradom;