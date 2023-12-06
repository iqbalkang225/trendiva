import each from "lodash/each";
import GSAP from "gsap";
import Title from "animations/Title";

export default class Page {
  constructor({ id, element, elements }) {
    this.id = id;
    this.selector = element;
    this.selectorChildren = {
      animationTitles: '[data-animation="title"]',
      ...elements,
    };
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    each(this.selectorChildren, (selector, key) => {
      
      if ( selector instanceof window.HTMLElement || selector instanceof window.NodeList || Array.isArray(selector) ) 
      {
        this.elements[key] = selector;
      } 
      
      else 
      {
        this.elements[key] = document.querySelectorAll(selector);
        if (this.elements[key].length === 0) return (this.elements[key] = null);
        if (this.elements[key].length === 1) return (this.elements[key] = document.querySelector(selector));
      }

    });
  }

  createAnimations() {
     this.titles = new Title()
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
