
import {
  trigger, transition, style, animate, keyframes
} from '@angular/animations';


export const fade = trigger('fade', [
  transition('void => *', [
    style({
      opacity: 0,
    }),
    animate(1050, style({

    }))
  ])
])

export const dropDown = trigger('dropDown', [
  transition('void => *', [
    style({
      transform: 'translateY(-100px)'
    }),
    animate(500, style({
    }))
  ])
])


export const linkDropDown = trigger('linkDropDown', [
  transition('void => *', [
    style({
      transform: 'translateY(-100px)'
    }),
    animate(500, keyframes([
      style({
        offset: 0.2,
        opacity: 0,
        transform: 'translateX(20px)'
      }),
      style({
        offset: 1,
        opacity: 1,
        transform: 'translateX(0px)'
      })
    ]))
  ])
])

