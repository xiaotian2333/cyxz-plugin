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
                    reg: /^#?(次元|小镇|次元小镇|cy|xz|cyxz)?(手机|电脑|平板|汽车|游戏|动漫|风景)?壁纸$/,
                    fnc: 'bizhi'
                },
                {
                    reg: /^#?(次元|小镇|次元小镇|cy|xz|cyxz)?插画$/,
                    fnc: 'illustration'
                },
                {
                    reg: /^#?(次元|小镇|次元小镇|cy|xz|cyxz)?(图集|画册|图集画册)$/,
                    fnc: 'tujihuace'
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
        const url_list = [
            `https://dimtown.com/cosplay/page/${random(296)}`,
            `https://mikagogo.com/cosplay/page/${random(143)}`
        ]
        const url = url_list[random(url_list.length - 1) - 1]
        e.reply(await Bot.makeForwardMsg(await main(url, e.user_id)))
        return true
    }

    async pixiv(e) {
        const url_list = [
            `https://dimtown.com/pixiv-illustration/page/${random(58)}`,
            `https://mikagogo.com/pixiv-illustration/page/${random(30)}`
        ]
        const url = url_list[random(url_list.length - 1) - 1]
        e.reply(await Bot.makeForwardMsg(await main(url, e.user_id)))
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
        let url_list = []

        if (msg.includes('手机')) {
            url_list.push(`https://dimtown.com/acg-wallpaper/page/${random(50)}`)
            url_list.push(`https://mikagogo.com/acg-wallpaper/page/${random(34)}`)
            url_list.push(`https://yiimii.com/m-wallpaper/page/${random(10)}`)
        } else if (msg.includes('电脑') || msg.includes('平板')) {
            url_list.push(`https://dimtown.com/pc-wallpaper/page/${random(14)}`)
            url_list.push(`https://mikagogo.com/pc-wallpaper/page/${random(2)}`)
            url_list.push(`https://yiimii.com/pc-wallpaper/page/${random(8)}`)
        } else if (msg.includes('汽车')) {
            url_list.push(`https://yiimii.com/car-wallpaper/page/${random(1)}`)
        } else if (msg.includes('游戏')) {
            url_list.push(`https://yiimii.com/game-wallpaper/page/${random(8)}`)
            url_list.push(`https://yiimii.com/tag/ys-wallpaper/page/${random(2)}`)
            url_list.push(`https://yiimii.com/tag/sr/page/${random(2)}`)
            url_list.push(`https://yiimii.com/tag/bilandangan/page/${random(2)}`)
        } else if (msg.includes('动漫')) {
            url_list.push(`https://yiimii.com/anime-wallpaper/page/${random(4)}`)
            url_list.push(`https://mikagogo.com/acg-wallpaper/page/${random(34)}`)
            url_list.push(`https://dimtown.com/bizhi/page/${random(63)}`)
        } else if (msg.includes('风景')) {
            url_list.push(`https://yiimii.com/fengjing-wallpaper/page/${random(2)}`)
        } else {
            url_list.push(`https://dimtown.com/bizhi/page/${random(63)}`)
            url_list.push(`https://yiimii.com/meinv-wallpaper/page/${random(2)}`)
            url_list.push(`https://yiimii.com/fengjing-wallpaper/page/${random(2)}`)
        }
        
        const url = url_list[random(url_list.length - 1) - 1]
        logger.info(`合并为${url_list}\n\n输出为${url}`)
        const forwardMsg = await Bot.makeForwardMsg(await main(url, e.user_id))
        e.reply(forwardMsg)
        return true
    }

    async illustration(e) {
        e.reply(await Bot.makeForwardMsg(await main(`https://dimtown.com/illustration/page/${random(34)}`, e.user_id)))
        return true
    }

    async tujihuace(e) {
        e.reply(await Bot.makeForwardMsg(await main(`https://dimtown.com/tujihuace/page/${random(2)}`, e.user_id)))
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