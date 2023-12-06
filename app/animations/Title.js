// import GSAP from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import each from 'lodash/each'
// import { split } from "utils/text";

// GSAP.registerPlugin(ScrollTrigger)

// import Component from "classes/Component";

// export default class Title extends Component {
//   constructor() {
//     super({
//         elements: {
//           titles: '[data-animation="title"]',
//         }
//       })

//     this.elements.headingSpans = []

//     each(this.elements.titles, title => {
//       this.elements.headingSpans.push(title.querySelectorAll('span'))

//     })


//     this.animation()
//   }

//   splitText() {
//     each(this.elements.titles, title => {
//       split({element: title, expression: '<br>'})
//     })

//     each(this.elements.titles, title => {
//       split({element: title, expression: '<br>'})
//     })
//   }

//   animation() {
//     each(this.elements.titles, (title, index) => {
//       GSAP.from(this.elements.headingSpans[index], { y: 100, autoAlpha: 0, stagger: 0.05, scrollTrigger: { trigger: title,start: 'top 50%',toggleActions: "restart none none reverse", markers: true }})
//     })
//   }



// }


import GSAP from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import each from 'lodash/each'
import { split } from "utils/text";

GSAP.registerPlugin(ScrollTrigger)

import Component from "classes/Component";

export default class Title extends Component {
  constructor() {
    super({
        elements: {
          titles: '[data-animation="title"]',
        }
      })

    this.splitText()

    this.elements.headingSpans = []

    each(this.elements.titles, title => {
      this.elements.headingSpans.push(title.querySelectorAll('span'))
    })


    this.animation()
  }

  splitText() {
    each(this.elements.titles, title => {
      split({element: title, expression: '<br>'})
    })

    each(this.elements.titles, title => {
      split({element: title, expression: '<br>'})
    })
  }

  animation() {
    each(this.elements.titles, (title, index) => {
      GSAP.from(this.elements.headingSpans[index], { y: 100, autoAlpha: 0, stagger: 0.05, scrollTrigger: { trigger: title,start: 'top 50%',toggleActions: "restart none none reverse", markers: true }})
    })
  }



}