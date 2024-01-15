// parseArray，处理数组，结合renderTemplate实现递归，如下所示：
// 得到整体数据data中这个数组要使用的部分，结果字符串。
// 遍历v数组，v一定是数组。注意，下面这个循环可能是整个包中最难思考的一个循环。
// 它是遍历数据，而不是遍历tokens。数组中的数据有几条，就要遍历几条。这里要补一个“.”属性，然后拼接。
import lookup from './lookup.js'
import renderTemplate from './renderTemplate.js'

export default function parseArray(dataObj, token) {
    const list = lookup(dataObj, token[1]);
    let resultStr = '';
    for (let i = 0; i < list.length; i++) {
        resultStr += renderTemplate(token[2], { ...list[i], '.': list[i] });
    }
    return resultStr;
}




















