import GSAP from 'gsap'

import Component from 'classes/Component'

import { COLOR_BRIGHT_GRAY, COLOR_QUARTER_SPANISH_WHITE } from 'utils/colors'


export default class Navigation extends Component {
  constructor () {
    super({
      element: '#navigation',
      elements: {
        logo: '#logo',
        links: '#links',
        linkItems: '#links li'
      }
    })

    GSAP.set(this.elements.linkItems[1], {autoAlpha: 0})

  }

  onChange (template) {
    // console.log(template)
    if (template === 'about') {
      GSAP.set(this.element, {
        color: 'red'
      })
      GSAP.to(this.elements.linkItems[0], {autoAlpha: 0})
      GSAP.to(this.elements.linkItems[1], {autoAlpha: 1, delay: 0.5})
    }
    if (template === 'collections') {
      GSAP.to(this.element, {
        color: 'green'
      })
      GSAP.to(this.elements.linkItems[1], {autoAlpha: 0})
      GSAP.to(this.elements.linkItems[0], {autoAlpha: 1, delay: 0.5})
    }
    // if (template === 'about') {
    //   GSAP.set(this.element, {
    //     color: 'red'
    //   })

    //   GSAP.set(this.elements.linkItems[0], { autoAlpha: 1 })
    //   GSAP.set(this.elements.linkItems[1], { autoAlpha: 0 })
    // } else {
    //   GSAP.set(this.element, {
    //     color: COLOR_QUARTER_SPANISH_WHITE
    //   })

    //   GSAP.set(this.elements.linkItems[0], { autoAlpha: 0 })
    //   GSAP.set(this.elements.linkItems[1], { autoAlpha: 1 })
    // }
  }
}
