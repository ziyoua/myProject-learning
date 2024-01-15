export default function isSameNode(oldVnode, newVnode) {
    return oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key;
}
