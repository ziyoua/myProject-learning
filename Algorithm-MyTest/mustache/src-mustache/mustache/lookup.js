// lookup，功能是可以在dataObj对象中，寻找用连续点符号的keyName属性，如下所示：
// 看看keyName中有没有点符号，但是不能是.本身。如果有点符号，那么拆开。
// 设置一个临时变量，这个临时变量用于周转，一层一层找下去。每找一层，就把它设置为新的临时变量。
// 如果这里面没有点符号，就返回。
export default function lookup(dataObj, keyName) {
    if (keyName.indexOf('.') == -1 || keyName == '.') {
        return dataObj[keyName]
    }
    const tempFun = parsePath(keyName)
    return tempFun(dataObj)
}

function parsePath(expression) {
    const segments = expression.split('.')
    return (obj) => {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}
