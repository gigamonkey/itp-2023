/*
 * Get or create a single element. If the query is in the form of a tag, e.g.
 * '<p>' it creates an element of that type. Otherwise it queries the document
 * using the argument as a selector.
 */
const $ = (q) => {
  let m;
  if (m = q.match(/^<(\w+)>$/)) {
    return document.createElement(m[1]);
  } else {
    return document.querySelector(q);
  }
};

/*
 * Get all elements matching selector.
 */
const $$ = (q) => document.querySelectorAll(q);

/*
 * Create a text node.
 */
const text = (t) => document.createTextNode(t);

/*
 * Create an element or elements from literal HTML. If the HTML specifies just
 * one element it is returned. Otherwise returns an array of elements.
 */
const html = (html) => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  const children = [...t.content.children];
  return children.length == 1 ? children[0] : children;
};
