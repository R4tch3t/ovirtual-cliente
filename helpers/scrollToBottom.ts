import {animateScroll} from 'react-scroll';

export const scrollToBottom = (id:any) => {
    const exist = document.getElementById(id)
    if(exist){
        animateScroll.scrollToBottom({containerId: id, duration: 0})
    }
}

export const scrollToBottomAnimated = (id:any) => {
    const exist = document.getElementById(id)
    if(exist){
        animateScroll.scrollToBottom({containerId: id, duration: 500})
    }
}

/*export const scrollToTopAnimated = (id:any) => {
    const exist = document.getElementById(id)
    if(exist){
        animateScroll.scrollToTop({containerId: id, duration: 500})
    }
}*/

