// 插件作者 xiaotian2333
// 开源地址 https://github.com/xiaotian2333/cyxz-plugin

import { get_Help_img } from '../lib/config.js'

export class dimtown extends plugin {
    constructor() {
        super({
            name: '次元小镇',
            dsc: '发送帮助图片',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: /^#?(次元|小镇|次元小镇|cy|xz|cyxz)?帮助$/,
                    fnc: 'help'
                }
            ]
        })
    }

    async help(e) {
        e.reply(segment.image(await get_Help_img()))
    }
}