// 内部是文本，直接赋值
// 内部是子节点，递归创建子节点

export default function createElement(vnode) {
    let dom = document.createElement(vnode.sel);
    if (vnode.text !== undefined && (vnode.children === undefined || vnode.children.length === 0)) {
        dom.innerText = vnode.text;
    } else if (vnode.children !== undefined && vnode.children.length > 0) {
        for (let i = 0; i < vnode.children.length; i++) {
            let childDom = createElement(vnode.children[i]);
            dom.appendChild(childDom);
        }
    }
    vnode.elm = dom;
    return dom;
};

