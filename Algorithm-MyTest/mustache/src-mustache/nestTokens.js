export default function nestTokens(tokens) {
    // 定义折叠后的tokens、栈、收集器，收集器最初指向nestedTokens
    let nestedTokens = [];
    let sections = [];
    let collector = nestedTokens;
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token[0]) {
            // '#'开头代表进入循环，当前层入栈，收集器指向最新入栈层
            case '#':
                collector.push(token);
                sections.push(token);
                collector = token[2] = [];
                break;
            // '/'开头代表当前层循环结束，当前层出栈，收集器指向最新入栈层
            case '/':
                sections.pop();
                collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens;
                break;
            default:
                collector.push(token);
        }
    }
    return nestedTokens;
}