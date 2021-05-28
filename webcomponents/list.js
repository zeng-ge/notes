class MyList extends HTMLElement{
  constructor() {
    super();
    this.init()
  }
  init() {
    this.attachShadow({ mode: 'open' })
    this.ul = document.createElement('div')
    this.shadowRoot.append(this.ul)
  }
  // 元素添加到DOM树时触发
  connectedCallback() {
    this.update()
  }
  // 元素被删除时触发
  disconnectedCallback() {}
  /**
   * 属性变化时触发，有属性时会发生在conencted之前
   */
  attributeChangedCallback() {}
  adoptedCallback(){} // 从一个document到另一个document时触发，如移动到别一个iframe
  update() {
    this.ul.innerHTML = `
      <li>a</li>
      <li>b</li>
    `
  }

}
window.customElements.define('my-list', MyList)