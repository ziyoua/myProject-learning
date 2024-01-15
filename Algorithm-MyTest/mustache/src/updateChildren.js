import patchVnode from './patchVnode.js';
import createElement from './createElement.js';
import isSameNode from './isSameNode.js';
import vnode from './vnode.js';

// 当新旧节点都有子节点时，比较子节点的差异并更新到父节点
export default function updateChildren(parentElm, oldCh, newCh) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let newEndIdx = newCh.length - 1;
    let oldStartVnode = oldCh[0];
    let newStartVnode = newCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndVnode = newCh[newEndIdx];
    let keyMap = {};
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
            oldStartVnode = oldCh[++oldStartIdx];
        } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
            oldEndVnode = oldCh[--oldEndIdx];
        } else if (isSameNode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode);
            // 旧前和新前命中：旧前指针++，新前指针++
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        } else if (isSameNode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode);
            // 旧后和新后命中：旧后指针--，新后指针--
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (isSameNode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode);
            // 旧前和新后命中：旧前节点插到旧后后，旧前指针++，新后指针--
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (isSameNode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode);
            // 旧后和新前命中：旧后节点插到旧前前，旧后指针--，新前指针++
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        } else {
            // 四种都没命中，将旧节点的key收集为一个映射对象
            // 新节点的key存在映射对象时：将对应的旧节点插到旧前前，原旧节点设置为undefined，新前指针++
            // 新节点的key不存在映射对象时：将新节点插到到旧前前，新前指针++
            if (!keyMap) {
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    let key = oldCh[i].key;
                    if (key) {
                        keyMap[key] = i;
                    }
                }
            }
            const targetIdx = keyMap[newStartVnode.key];
            if (targetIdx) {
                patchVnode(oldCh[targetIdx], newStartVnode);
                parentElm.insertBefore(oldCh[targetIdx].elm, oldStartVnode.elm);
                oldCh[targetIdx] = undefined;
            } else {
                parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
            }
            newStartVnode = newCh[++newStartIdx];
        }
    }
    if (oldStartIdx <= oldEndIdx) {
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm);
            }
        }
    } else if (newStartIdx <= newEndIdx) {
        let newNextVnode = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1] : null;
        let oldNextVnode = newNextVnode ? oldCh.find(item => item.key === newNextVnode.key) : null;
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            if (newCh[i]) {
                parentElm.insertBefore(createElement(newCh[i]), oldNextVnode ? oldNextVnode.elm : null);
            }
        }
    }
}
