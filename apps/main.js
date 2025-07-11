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
async function main(url = 'https://dimtown.com/vipcos', user_id = 8000000) {
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
            message: await segment.image(item.src)
        });
    }

    return msgList
}

export class dimtown extends plugin {
    constructor() {
        super({
            name: '次元小镇',
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
                    reg: /^#?(次元|小镇|次元小镇|cy|xz|cyxz)?(jk|JK)$/,
                    fnc: 'jk'
                },
                {
                    reg: /^#?(次元|小镇|次元小镇|cy|xz|cyxz)?汉服$/,
                    fnc: 'hanfu'
                },
                {
                    reg: /^#?(次元|小镇|次元小镇|cy|xz|cyxz)?(lolita|洛丽塔)$/,
                    fnc: 'lolita'
                },
                {
                    reg: /^#?(次元|小镇|次元小镇|cy|xz|cyxz)?头像$/,
                    fnc: 'miaotx'
                },
                {
                    reg: /^#?(次元|小镇|次元小镇|cy|xz|cyxz)?(手机|电脑|平板)?壁纸$/,
                    fnc: 'bizhi'
                },

                // 以下是测试指令
                {
                    reg: /^#(次元|小镇|次元小镇|cy|xz|cyxz)(测试|test)/,
                    fnc: 'test',
                    permission: 'master'
                }
            ]
        })
    }

    async cos(e) {
        e.reply(await Bot.makeForwardMsg(await main(`https://dimtown.com/cosplay/page/${random(296)}`, e.user_id)))
        return true
    }

    async pixiv(e) {
        e.reply(await Bot.makeForwardMsg(await main(`https://dimtown.com/pixiv-illustration/page/${random(58)}`, e.user_id)))
        return true
    }

    async sifu(e) {
        e.reply(await Bot.makeForwardMsg(await main(`https://dimtown.com/sifu/page/${random(55)}`, e.user_id)))
        return true
    }

    async jk(e) {
        e.reply(await Bot.makeForwardMsg(await main(`https://dimtown.com/jk/page/${random(8)}`, e.user_id)))
        return true
    }

    async hanfu(e) {
        e.reply(await Bot.makeForwardMsg(await main(`https://dimtown.com/hanfu/page/${random(4)}`, e.user_id)))
        return true
    }

    async lolita(e) {
        e.reply(await Bot.makeForwardMsg(await main(`https://dimtown.com/lolita/page/${random(12)}`, e.user_id)))
        return true
    }

    async miaotx(e) {
        e.reply(await Bot.makeForwardMsg(await main(`https://dimtown.com/miaotx/page/${random(13)}`, e.user_id)))
        return true
    }

    async bizhi(e) {
        const msg = e.msg
        let url, maxPage

        if (msg.includes('手机')) {
            url = 'https://dimtown.com/acg-wallpaper/page/'
            maxPage = 50
        } else if (msg.includes('电脑') || msg.includes('平板')) {
            url = 'https://dimtown.com/pc-wallpaper/page/'
            maxPage = 14
        } else {
            url = 'https://dimtown.com/bizhi/page/'
            maxPage = 63
        }

        const pageUrl = `${url}${random(maxPage)}`
        const forwardMsg = await Bot.makeForwardMsg(await main(pageUrl, e.user_id))
        e.reply(forwardMsg)
        return true
    }

    // 这个是测试用的
    async test(e) {
        let msg = e.msg
        msg = msg.replace(/#(次元|小镇|次元小镇|cy|xz|cyxz)(测试|test)/, '')
        logger.info(msg)
        e.reply(await Bot.makeForwardMsg(await main(msg, e.user_id)))
        return true
    }
}