
// 字符串 aaacbbbbccccccccccddd 找出连续重复最多的字符并输出次数
function maxRepeat(str) {
    if (str.length < 2) {
        console.log(str.length);
        return;
    }
    let cur = str[0];
    let count = 1;
    let max = 1;
    let cur_str = cur;
    let max_str = cur;
    for (let i = 1; i < str.length; i++) {
        if (str[i] === cur) {
            count++;
            cur_str = cur;
        } else {
            cur = str[i];
            count = 1;
        }
        if (count > max) {
            max = count;
            max_str = cur_str;
        }
    }
    console.log(max_str, max)
}

// function maxRepeat(str) {
//     if (str.length < 2) {
//         console.log(str, str.length);
//         return
//     }
//     let start = 0;
//     let end = 0;
//     let max = 0;
//     let max_str = '';
//     while (start < str.length - 1) {
//         if (str[end] !== str[start]) {
//             console.log(str[start], str[end])
//             if (max < (end - start)) {
//                 max = end - start;
//                 max_str = str[start];
//             }
//             start = end;
//         }
//         end++;
//     }
//     console.log(max_str, max)
// }


// var areas = ['周庄', '南京', '莫干山', '安吉', '绍兴', '无锡', '乌镇', '龙井村', '杭州', '千岛湖']
// function getAplace() {
//     return areas[Math.floor(Math.random() * areas.length)]
// }
// var result = []
// for (let i = 0; i < areas.length * 100; i++) {
//     result.push(getAplace())
// }
// function smartMax(array) {
//     var resultObj = {}
//     for (let i = 0; i < array.length; i++) {
//         const item = array[i]
//         if (item in resultObj) {
//             resultObj[item]++
//         } else {
//             resultObj[item] = 1
//         }
//     }
//     console.log(resultObj)
//     var max = 0
//     var resultPlace = ''
//     for (const key in resultObj) {
//         if (max < resultObj[key]) {
//             resultPlace = key
//             max = resultObj[key]
//         }
//     }
//     console.log('最可能去的地方是', resultPlace, '选到的次数是', max)
// }
// smartMax(result)



// 斐波那契数列 1 1 2 3 5 8 13 21 34 55

function fib(n) {
    return n <= 2 ? 1 : fib(n - 1) + fib(n - 2);
}

// var obj = {};
// function fib(n) {
//     if (!obj[n]) {
//         obj[n] = n == 1 || n == 2 ? 1 : fib(n - 1) + fib(n - 2);
//     }
//     return obj[n];
// }

// function fib(n) {
//     var arr = [];
//     var i = 0;
//     while (i < n) {
//         i < 2 ? arr.push(1) : arr.push(arr[i - 1] + arr[i - 2]);
//         i++;
//     }
//     console.log(arr);
// }

// 数组 [1,2,3,[4,5]]
// 输出 
// [
//     { value: 1 },
//     { value: 2 },
//     { value: 3 },
//     {
//         children: [
//             { value: 4 },
//             { value: 5 }
//         ]
//     }
// ]
var arr = [1, 2, 3, [4, [5, [6, 7]], 8], 9]
function arrParseToObj(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result[i] = { children: [] };
            result[i].children = arrParseToObj(arr[i]);
        } else if (typeof arr[i] == 'number') {
            result[i] = { value: arr[i] };
        }
    }
    return result;
}

var arr = [1, 2, 3, [4, [5, [6, 7]], 8], 9]
function arrParseToObj(item) {
    if (typeof item == 'number') {
        return { value: item }
    } else if (Array.isArray(item)) {
        return item.map(_item => arrParseToObj(_item))
    }
}
console.log(arrParseToObj(arr))


// 3[1[a]2[b]] => abbabbabb
var str = '2[10[kl]1[-]]';
function parse(str) {
    let tail = str;
    let words = '';
    const stack_num = [];
    const stack_str = [];
    const regNum = /^(\d+)\[/; // 匹配数字
    const regStr = /^(\w+)\]/; // 匹配内容
    while (tail.length > 0) {
        if (regNum.test(tail)) {
            words = tail.match(regNum)[0];
            stack_num.push(words.substring(0, words.length - 1));
            stack_str.push('');
            tail = tail.substring(words.length);
        } else if (regStr.test(tail)) {
            words = tail.match(regStr)[0];
            stack_str[stack_str.length - 1] = words.substring(0, words.length - 1);
            tail = tail.substring(words.length - 1);
        } else if (tail.indexOf(']') === 0) {
            let popNum = stack_num.pop();
            let popStr = stack_str.pop();
            if (stack_str.length === 0) {
                stack_str.push(popStr.repeat(popNum));
            } else {
                stack_str[stack_str.length - 1] += popStr.repeat(popNum);
            }
            tail = tail.substring(1);
        }
    }
    return stack_str[0];
}
parse(str);


var templateStr = `<div class="aa bb cc" id="myId">
    <ul>
        <li>AAA<li/>
        <li>BBB<li/>
        <li>CCC<li/>
    <ul/>
<div/>`

var ast = {
    tag: 'div',
    attrs: [{ name: 'class', value: 'aa bb cc' }, { name: 'id', value: 'myId' }],
    children: [
        {
            tag: 'ul',
            attrs: [],
            children: [
                {
                    tag: 'li',
                    attrs: [],
                    children: [
                        { text: 'AAA', type: 3 },
                        { text: 'BBB', type: 3 },
                        { text: 'CCC', type: 3 },
                    ]
                }
            ]
        }
    ]
}
