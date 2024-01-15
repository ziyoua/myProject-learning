import lookup from "./lookup";
import renderTemplate from "./renderTemplate";
export default function parseArray(data, token) {
    const arrData = lookup(data, token[1]);
    let renderStr = '';
    for (let i = 0; i < arrData.length; i++) {
        renderStr += renderTemplate({ ...arrData[i], '.': arrData[i] }, token[2])
    }
    return renderStr;
}
