// parseTemplateToTokens，将模板字符串变为tokens数组，如下所示：
// 创建扫描器，让扫描器工作，收集开始标记出现之前的文字。尝试写一下去掉空格，智能判断是普通文字的空格，还是标签中的空格。标签中的空格不能去掉，比如<div class="box">不能去掉class前面的空格。空白字符串，判断是否在标签里。如果这项不是空格，拼接上。如果这项是空格，只有当它在标签内的时候，才拼接上。存起来，去掉空格。过双大括号。
// 收集开始标记出现之前的文字。这个words就是{{}}中间的东西。判断一下首字符。存起来，从下标为1的项开始存，因为下标为0的项是#。存起来，从下标为1的项开始存，因为下标为0的项是/。存起来。过双大括号。
// 返回折叠收集的tokens。
import Scanner from './scanner.js';
import nestTokens from './nestTokens.js';

export default function parseTemplateToTokens(templateStr) {
    var scanner = new Scanner(templateStr);
    var tokens = [];
    var words; // 收集的被模板字符串符号分割的文字片段
    while (!scanner.eos()) {
        words = scanner.scanUtil('{{');
        // 收集'{{'前去空格后的token
        if (words !== '') {
            let isInJJH = false; // 判断是否在标签内
            let res_word = '';
            for (let i = 0; i < words.length; i++) {
                let temp_word = words[i];
                if (temp_word === '<') {
                    isInJJH = true; // 进标签
                } else if (temp_word === '>') {
                    isInJJH = false; // 出标签
                }
                // \s 是指空白，包括空格、换行、Tab 缩进等所有的空白，而 \S 刚好相反
                // 空白在标签内就加一个空格，不在就去掉，不做操作;非空白直接累加
                if (/\s/.test(temp_word)) {
                    if (isInJJH) {
                        res_word += ' ';
                    }
                } else {
                    res_word += words[i];
                }
            }
            tokens.push(['text', res_word]);
        }
        // 跳过符号
        scanner.scan('{{');
        // 收集模板中的token
        words = scanner.scanUtil('}}');
        if (words !== '') {
            if (words.indexOf('#') === 0) {
                tokens.push(['#', words.substring(1)]);
            } else if (words.indexOf('/') === 0) {
                tokens.push(['/', words.substring(1)]);
            } else {
                tokens.push(['name', words]);
            }
        }
        // 跳过符号
        scanner.scan('}}');
    }
    return nestTokens(tokens)
}
