
import Scanner from "./scanner";
import nestTokens from "./nestTokens"
export default function parseTemplateToTokens(templateStr) {
    let scanner = new Scanner(templateStr);
    let tokens = [];
    let words = '';
    while (!scanner.scanStop()) {
        // 收集模板标识符之前的片段，需去空格
        words = scanner.scanUtil('{{');
        if (words !== '') {
            let res_words = ''; // 去空格后的片段
            let isInJJH = false; // 判断是否在<>内，在<>内保留空格
            for (let i = 0; i < words.length; i++) {
                if (words[i] === '<') {
                    isInJJH = true;
                } else if (words[i] === '>') {
                    isInJJH = false;
                }
                if (/\s/.test(words[i])) {
                    if (isInJJH) {
                        res_words += ' ';
                    }
                } else {
                    res_words += words[i];
                }
            }
            tokens.push(['text', res_words]);
        }
        // 跳过模板标识符
        scanner.scan('{{');
        // 收集模板标识符内的片段，并以不同符号开头分类
        words = scanner.scanUtil('}}');
        if (words !== '') {
            switch (words[0]) {
                case '#':
                    tokens.push(['#', words.substring(1)]);
                    break;
                case '/':
                    tokens.push(['/', words.substring(1)]);
                    break;
                default:
                    tokens.push(['name', words]);
            }
        }
        // 跳过模板标识符
        scanner.scan('}}');
    }
    return nestTokens(tokens);
}