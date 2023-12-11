import GSAP from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import each from "lodash/each";

import { split } from "utils/text";

GSAP.registerPlugin(ScrollTrigger);

import Component from "classes/Component";

export default class Paragraphs extends Component {
  constructor() {
    super({
      elements: {
        paragraphs: '[data-animation="paragraph"]',
      },
    });

    this.splitText();
    this.attachAnimations();
  }

  attachAnimations() {
    each(this.elements.paragraphs, (paragraph) => {
      const paragraphSpans = paragraph.querySelectorAll("span");
      each(paragraphSpans, (span) => this.animation(span));
    });
  }

  animation(span) {
    GSAP.from(span, {
      y: 100,
      autoAlpha: 0,
      scrollTrigger: {
        trigger: span,
        start: "top 100%",
        toggleActions: "restart none none reverse",
        scroller: "[data-scroll-container]",
      },
    });
  }

  splitText() {
    each(this.elements.paragraphs, (title) => {
      split({ element: title, expression: "<br>" });
    });
  }
}
