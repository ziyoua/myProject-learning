// Scanner，扫描器类，如下所示：
// constructor时将模板字符串写到实例身上，指定指针，尾巴，一开始就是模板字符串原文。
// scan时功能弱，就是走过指定内容，没有返回值。tag有多长，比如{{长度是2，就让指针后移多少位。尾巴也要变，改变尾巴为从当前指// 针这个字符开始，到最后的全部字符。
// scanUtil时让指针进行扫描，直到遇见指定内容结束，并且能够返回结束之前路过的文字。记录一下执行本方法的时候pos的值。当尾巴// 的开头不是stopTag的时候，就说明还没有扫描到stopTag，写&&很有必要，因为防止找不到，那么寻找到最后也要停止下来。改变尾巴为// 从当前指针这个字符开始，到最后的全部字符。
// eos时指针是否已经到头，返回布尔值。
export default class Scanner {
    // 设置模板字符串、指针、尾巴初始值
    constructor(templateStr) {
        this.templateStr = templateStr;
        this.pos = 0;
        this.tail = templateStr;
    }
    // 后移指针；改变尾巴
    scan(tag) {
        if (this.tail.indexOf(tag) === 0) {
            this.pos += tag.length;
            this.tail = this.tail.substring(tag.length);
        }
    }
    // 扫描至指定内容停止，并返回扫描的内容；指针后移；改变尾巴
    scanUtil(stopTag) {
        const start_pos = this.pos;
        while (!this.eos() && this.tail.indexOf(stopTag) !== 0) {
            this.pos++;
            this.tail = this.tail.substring(1);
        }
        return this.templateStr.substring(start_pos, this.pos);
    }
    // 判断指针是否到达末位
    eos() {
        return this.pos === this.templateStr.length;
    }
}
