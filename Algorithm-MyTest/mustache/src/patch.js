import vnode from './vnode.js';
import createElement from './createElement.js';
import patchVnode from './patchVnode.js';
import isSameNode from './isSameNode.js';

// 判断第一个参数是否为虚拟dom，不是就转换为虚拟dom
// 判断是否为同一个节点，是就比较同一个节点，不是直接删除旧节点，添加新节点
export default function patch(oldVnode, newVnode) {
    if (!oldVnode.sel) {
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
    }
    if (isSameNode(oldVnode, newVnode)) {
        patchVnode(oldVnode, newVnode)
    } else {
        let newVnodeEle = createElement(newVnode);
        if (oldVnode.elm.parentNode && newVnodeEle) {
            oldVnode.elm.parentNode.insertBefore(newVnodeEle, oldVnode.elm);
            oldVnode.elm.parentNode.removeChild(oldVnode.elm);
        }
    }
};

