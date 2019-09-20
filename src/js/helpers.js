const init = () => {
    store.dispatch({type: START});
    window.requestAnimationFrame(main);
}


let pointerX, pointerY;

document.body.onpointerdown = e => {
    pointerX = e.offsetX;
    pointerY = e.offsetY;
}

document.body.onpointermove = e => {
    const { player } = store.getState();
    const diffLeft = e.offsetX - pointerX;
    const diffUp = e.offsetY - pointerY;
    const vertical = Math.abs(diffLeft) < Math.abs(diffUp);
    
    if (vertical) {
        if (e.offsetY > pointerY) store.dispatch({type: SWIPEDOWN});
        else store.dispatch({type: SWIPEUP});
    } else {
        if (e.offsetX > pointerX) store.dispatch({type: SWIPERIGHT});
        else store.dispatch({type: SWIPELEFT});
    }
    
}
