// 这个是本项目自定义的unocss预设，整合进官方的默认预设
import { definePreset } from 'unocss'

export default definePreset((options?: any) => {
    return {
        name: 'zapt-preset',
        rules: [
            // ['f-1',{margin: '0.3rem'}], //静态规则
            // [/^m-(\d+)$/, (match: any) => ({ margin: `${+match[1] * 10}px` })], //动态规则，match表示匹配到的内容

        ],
        variants: [
            // https://unocss.nodejs.cn/config/variants 变体
            //换句话说是，这里是一些变体规则，比如hover、focus、active等
        ],
        // it supports most of the configuration you could have in the root config
    }
})