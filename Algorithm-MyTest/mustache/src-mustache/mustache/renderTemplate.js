// renderTemplate，函数的功能是让tokens数组变为dom字符串，如下所示：
// 结果字符串，遍历tokens，看类型，拼起来。
// 如果是name类型，那么就直接使用它的值，当然要用lookup。因为防止这里是“a.b.c”有逗号的形式。
import lookup from './lookup.js'
import parseArray from './parseArray.js'
export default function renderTemplate(tokens, dataObj) {
    let resultStr = '';
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (token[0] === 'text') {
            resultStr += token[1];
        } else if (token[0] === 'name') {
            resultStr += lookup(dataObj, token[1]);
        } else if (token[0] === '#') {
            resultStr += parseArray(dataObj, token);
        }
    }
    return resultStr;
}
