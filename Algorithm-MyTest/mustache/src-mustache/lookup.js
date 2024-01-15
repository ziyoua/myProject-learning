export default function lookup(data, key) {
    // 需区分单层变量和多层变量
    if (key.indexOf('.') === -1 || key === '.') {
        return data[key];
    } else {
        const keyArr = key.split('.');
        let temp = data;
        for (let i = 0; i < keyArr.length; i++) {
            temp = temp[keyArr[i]]
        }
        return temp;
    }

}

