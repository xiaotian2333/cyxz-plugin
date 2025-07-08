// 插件作者 xiaotian2333
// 开源地址 https://github.com/xiaotian2333/cyxz-plugin

import { one_get } from "../lib/main.js"

/** 生成随机数
 * @param {int} sum - 生成随机数的上限，默认为10
 * @returns {int} 生成的随机整数
 */
function random(sum = 10) {
    return Math.trunc(Math.random() * sum) + 1;
}

/** 返回要发送的聊天记录
 * @param {string} url 要请求的页面
 * @param {int} user_id 发送消息的用户ID
 * @returns {Promise<Array>} 返回一个包含图片信息的数组，每个元素包含图片的src属性、原文链接和标题
 */
async function main(url = 'https://dimtown.com/vipcos', user_id) {
    const img_data = await one_get(url)
    let msgList = []

    msgList.push({
        user_id: user_id,
        nickname: '标题',
        message: img_data[2]
    })
    msgList.push({
        user_id: user_id,
        nickname: '原文链接',
        message: img_data[1]
    })

    // 将图片塞进聊天记录
    for (const item of img_data[0]) {
        msgList.push({
            user_id: user_id,
            nickname: '图片',
            message: segment.image(item.src)
        });
    }

    return msgList
}

export class dimtown extends plugin {
    constructor() {
        super({
            name: '次元小镇',
            dsc: '随机获取一组COS图',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: /^#?(次元|小镇|次元小镇|cy|xz|cyxz)?cos$/,
                    fnc: 'cos'
                },
                {
                    reg: /^#?(次元|小镇|次元小镇|cy|xz|cyxz)?(pixiv|p站|P站|二次元)$/,
                    fnc: 'pixiv'
                },
                {
                    reg: /^#?(次元|小镇|次元小镇|cy|xz|cyxz)?私服$/,
                    fnc: 'sifu'
                },
                {
                    reg: /^#?(次元|小镇|次元小镇|cy|xz|cyxz)?jk$/,
                    fnc: 'jk'
                },
            ]
        })
    }

    async cos(e) {
        e.reply(await Bot.makeForwardMsg(await main(`https://dimtown.com/vipcos/page/${random(296)}`, e.user_id)))
    }

    async pixiv(e) {
        e.reply(await Bot.makeForwardMsg(await main(`https://dimtown.com/pixiv-illustration/page/${random(58)}`, e.user_id)))
    }

    async sifu(e) {
        e.reply(await Bot.makeForwardMsg(await main(`https://dimtown.com/sifu/page/${random(55)}`, e.user_id)))
    }

    async jk(e) {
        e.reply(await Bot.makeForwardMsg(await main(`https://dimtown.com/jk/page/${random(8)}`, e.user_id)))
    }
}