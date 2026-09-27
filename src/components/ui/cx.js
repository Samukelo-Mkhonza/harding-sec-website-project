/** Joins truthy class names. */
const cx = (...classes) => classes.filter(Boolean).join(' ');

export default cx;
