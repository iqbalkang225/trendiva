import GSAP from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import each from "lodash/each";

import { split } from "utils/text";

GSAP.registerPlugin(ScrollTrigger);

import Component from "classes/Component";

export default class Titles extends Component {
  constructor() {
    super({
      elements: {
        titles: '[data-animation="title"]',
      },
    });

    this.splitText();
    this.attachAnimations();
  }

  attachAnimations() {
    each(this.elements.titles, (title) => {
      const titleSpans = title.querySelectorAll("span");
      this.animation(titleSpans, title);
    });
  }

  animation(spans, title) {
    GSAP.from(spans, {
      y: 100,
      autoAlpha: 0,
      stagger: 0.05,
      scrollTrigger: {
        trigger: title,
        start: "top 60%",
        toggleActions: "restart none none reverse",
        scroller: "[data-scroll-container]",
      },
    });
  }

  splitText() {
    each(this.elements.titles, (title) => {
      split({ element: title, expression: "<br>" });
    });

    each(this.elements.titles, (title) => {
      split({ element: title, expression: "<br>" });
    });
  }
}
