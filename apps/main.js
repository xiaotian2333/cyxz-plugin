// 插件作者 xiaotian2333
// 开源地址 https://github.com/xiaotian2333/cyxz-plugin

import { one_get } from "../lib/main.js"


// 生成数字随机整数函数
function getRandomInt(min, max) {
    min = Math.ceil(min)  // 向上取整
    max = Math.floor(max) // 向下取整
    return Math.floor(Math.random() * (max - min + 1)) + min // 含max，含min
}

export class nb extends plugin {
    constructor() {
        super({
            name: '次元小镇',
            dsc: '随机获取一组COS图',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: /^#?(次元小镇|cyxz)?cos$/,
                    fnc: 'cos'
                }
            ]
        })
    }

    async cos(e) {
        const img_data = await one_get()
        let msgList = []

        msgList.push({
            user_id: this.e.user_id,
            nickname: '标题',
            message: img_data[2]
        })
        msgList.push({
            user_id: this.e.user_id,
            nickname: '原文链接',
            message: img_data[1]
        })

        // 将图片塞进聊天记录
        for (const item of img_data[0]) {
            msgList.push({
                user_id: this.e.user_id,
                nickname: '图片',
                message: segment.image(item.src)
            });
        }

        e.reply(await Bot.makeForwardMsg(msgList))
        return true
    }
}