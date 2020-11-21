const containsElement = (mainArr, el) => mainArr.filter((v) => v.code === el.code).length > 0;
export default containsElement;
