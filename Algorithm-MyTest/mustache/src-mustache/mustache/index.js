// index，全局提供SSG_TemplateEngine对象，如下所示：
// 渲染方法，调用parseTemplateToTokens函数，让模板字符串能够变为tokens数组。
// 调用renderTemplate函数，让tokens数组变为dom字符串。
import parseTemplateToTokens from './parseTemplateToTokens.js';
import renderTemplate from './renderTemplate.js';

window.TemplateEngine = {
    render(templateStr, data) {
        const tokens = parseTemplateToTokens(templateStr);
        const domStr = renderTemplate(tokens, data);
        return domStr;
    }
};