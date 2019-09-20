const init = () => {
    store.dispatch({type: START});
    window.requestAnimationFrame(main);
}
  