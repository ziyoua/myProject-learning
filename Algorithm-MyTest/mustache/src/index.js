import h from "./h";
import patch from "./patch";
const container = document.getElementById('content');
var vnode1 = h('ul', {}, [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
])
var vnode2 = h('ul', {}, [
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'K' }, 'K'),
    h('li', { key: 'H' }, 'H'),
    h('li', { key: 'E' }, 'E'),
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'G' }, 'G'),
    h('li', { key: 'F' }, 'F'),
])
patch(container, vnode1)
const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
    patch(vnode1, vnode2);
})