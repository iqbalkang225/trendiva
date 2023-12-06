import each from "lodash/each";

import EventEmitter from "events";

export default class Component extends EventEmitter {
  constructor({ element, elements }) {
    super();

    this.selector = element;
    this.selectorChildren = elements;

    this.create();
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    each(this.selectorChildren, (selector, key) => {
      if (
        selector instanceof window.HTMLElement ||
        selector instanceof window.NodeList ||
        Array.isArray(selector)
      ) {
        this.elements[key] = selector;
      } else {
        this.elements[key] = document.querySelectorAll(selector);

        if (this.elements[key].length === 0) return (this.elements[key] = null);
        if (this.elements[key].length === 1)
          return (this.elements[key] = document.querySelector(selector));
      }
    });
  }
}
