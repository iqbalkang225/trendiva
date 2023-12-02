import each from "lodash/each";
import GSAP from "gsap";

export default class Page {
  constructor({ id, element, elements }) {
    this.id = id;
    this.selector = element;
    this.selectorChildren = elements;
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

  show() {
    return new Promise((resolve) => {
      GSAP.from(this.element, { autoAlpha: 0, onComplete: resolve });
    });
  }

  hide() {
    return new Promise((resolve) => {
      GSAP.to(this.element, { autoAlpha: 0, onComplete: resolve });
    });
  }
}
