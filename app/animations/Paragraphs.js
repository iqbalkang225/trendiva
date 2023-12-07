// import GSAP from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import each from 'lodash/each'

// import { split } from "utils/text";

// GSAP.registerPlugin(ScrollTrigger)

// import Component from "classes/Component";

// export default class Paragraphs extends Component {
//   constructor() {
//     super({
//         elements: {
//           paragraphs: '[data-animation="paragraph"]',
//         }
//       })

//     this.splitText();
//     console.log(this.elements.paragraphs)
//     // this.attachAnimations();

//   }

//   attachAnimations() {
//     each(this.elements.titles, title => {
//       const titleSpans = title.querySelectorAll('span')
//       this.animation(titleSpans, title)
//     })
//   }

//   animation(spans, title) {
//     GSAP.from(spans, { y: 100, autoAlpha: 0, stagger: 0.05, scrollTrigger: { trigger: title, start: 'top 60%', toggleActions: "restart none none reverse"}})
//   }

//   splitText() {
//     each(this.elements.titles, title => {
//       split({element: title, expression: '<br>'})
//     })

//     each(this.elements.titles, title => {
//       split({element: title, expression: '<br>'})
//     })
//   }
// }

import GSAP from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import each from 'lodash/each'

import { split } from "utils/text";

GSAP.registerPlugin(ScrollTrigger)

import Component from "classes/Component";

export default class Paragraphs extends Component {
  constructor() {
    super({
        elements: {
          paragraphs: '[data-animation="paragraph"]',
        }
      })

    this.splitText();
    this.attachAnimations();
  }

  attachAnimations() {
    each(this.elements.paragraphs, paragraph => {
      const paragraphSpans = paragraph.querySelectorAll('span')
      each(paragraphSpans, span => this.animation(span))
    })
  }

  animation(span) {
    GSAP.from(span, { y: 100, autoAlpha: 0, scrollTrigger: { trigger: span, start: 'top 100%', toggleActions: "restart none none reverse"}})
  }

  splitText() {
    each(this.elements.paragraphs, title => {
      split({element: title, expression: '<br>'})
    })
  }
}