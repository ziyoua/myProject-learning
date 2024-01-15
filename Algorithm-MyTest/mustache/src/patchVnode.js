
import updateChildren from "./updateChildren";

// 判断是否为同一个对象，相同直接返回，不同进行下一步
// 判断新节点是否有text，有替换，没有进行下一步
// 判断旧节点是否有children，没有就删除旧文本，插入新children,有比较子节点
export default function patchVnode(oldVnode, newVnode) {
    if (oldVnode === newVnode) return;
    // 有没有可能text和children同时存在
    if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
        // 只有文本
        if (newVnode.text !== oldVnode.text) {
            oldVnode.elm.innerText = newVnode.text;
        }
    } else {
        // 没有文本只有子节点
        if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
            updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
        } else {
            oldVnode.elm.innerText = '';
            for (let i = 0; i < newVnode.children.length; i++) {
                let dom = createElement(newVnode.children[i]);
                oldVnode.elm.appendChild(dom);
            }
        }
    }
};

