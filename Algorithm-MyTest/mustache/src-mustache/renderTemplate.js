import lookup from "./lookup";
import parseArray from "./parseArray";
export default function renderTemplate(data, tokens) {
    let renderStr = '';
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (token[0] === 'text') {
            renderStr += token[1];
        } else if (token[0] === 'name') {
            renderStr += lookup(data, token[1]);
        } else if (token[0] === '#') {
            renderStr += parseArray(data, token);
        }
    }
    return renderStr;
}