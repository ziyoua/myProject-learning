
export default class Scanner {
    // 传入模板字符串，构建扫描器初始值：模板字符串、指针位置、剩余未扫描字符串
    constructor(templateStr) {
        this.templateStr = templateStr;
        this.pos = 0;
        this.tail = templateStr;
    }
    // 跳过模板标识符
    scan(tag) {
        if (this.tail.indexOf(tag) === 0) {
            this.pos += tag.length;
            this.tail = this.templateStr.substring(this.pos);
        }
    }
    // 收集剩余未扫描字符串中，模板标识符之前的片段
    scanUtil(tag) {
        const start_pos = this.pos;
        while (!this.scanStop() && this.tail.indexOf(tag) !== 0) {
            this.pos++;
            this.tail = this.tail.substring(1);
        }
        return this.templateStr.substring(start_pos, this.pos);
    }
    // 判断字符串是否扫描完毕
    scanStop() {
        return this.pos === this.templateStr.length;
    }

}
