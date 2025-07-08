import axios from 'axios';
import { load } from 'cheerio';

const User_Agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
const timeout = 10000; // 10秒超时

/** 获取指定网页中的所有链接
 * @param {string} url - 要下载的网页URL
 * @returns {Promise<Array>} - 返回一个包含链接信息的数组，每个元素包含href和title属性
 */
async function get_url(url) {
    try {
        // 发起网络请求获取HTML内容
        const response = await axios.get(url, {
            headers: {
                'User-Agent': User_Agent
            },
            timeout: timeout
        });

        // 使用cheerio解析HTML
        const $ = load(response.data);

        // 提取所有a标签的href和title属性
        const links = [];
        $('a[href][title]').each((index, element) => {
            const href = $(element).attr('href');
            const title = $(element).attr('title');

            if (href && title) {
                links.push({
                    href: href,
                    title: title,
                });
            }
        });

        /** 输出到日志
        console.log(`\n=== 提取到 ${links.length} 个链接 ===`);
        links.forEach((link, index) => {
            console.log(`\n[${index + 1}]`);
            console.log(`href: ${link.href}`);
            console.log(`title: ${link.title}`);
            console.log('---');
        });
        */
        return links;

    } catch (error) {
        console.error('提取链接时发生错误:', error.message);
        return [];
    }
}


/** 获取指定网页中的所有图片
 * @param {string} url - 要下载的网页URL
 * @returns {Promise<Array>} - 返回一个包含图片信息的数组，每个元素包含图片的src属性
 * @returns 
 */
async function get_img(url) {
    try {
        // 下载网页内容
        const response = await axios.get(url, {
            headers: {
                'User-Agent': User_Agent
            },
            timeout: timeout
        });

        // 使用cheerio解析HTML
        const $ = load(response.data);

        // 查找所有在<p>标签内的<img>标签
        const imageData = [];

        $('.content_left p img').each((index, element) => {
            const src = $(element).attr('src');
            // const alt = $(element).attr('alt');

            if (src) {
                imageData.push({
                    index: index + 1,
                    src: src,
                    // alt: alt || '无alt属性'
                });
            }
        });

        /** 输出结果到日志
        console.log('\n========== 提取结果 ==========');
        if (imageData.length === 0) {
            console.log('未找到任何图片');
        } else {
            console.log(`找到 ${imageData.length} 张图片:`);
            imageData.forEach(img => {
                console.log(`\n图片 ${img.index}:`);
                console.log(`  src: ${img.src}`);
                console.log(`  alt: ${img.alt}`);
            });
        }
        */

        return imageData;

    } catch (error) {
        console.error('错误发生:', error.message);
        if (error.response) {
            console.error(`HTTP错误状态码: ${error.response.status}`);
        }
        return [];
    }
}

/** 直接返回一个图片链接数组
 * @returns {Promise<Array>} - 返回一个包含图片信息的数组，每个元素包含图片的src属性
 */
async function one_get() {
    const url_list = await get_url('https://dimtown.com/vipcos');

    // 随机选择一个链接
    const randomIndex = Math.floor(Math.random() * url_list.length);
    return [
        await get_img(url_list[randomIndex].href),
        url_list[randomIndex].href,
        url_list[randomIndex].title
    ]
}

// 如直接运行则执行示例代码
if (import.meta.url.endsWith(process.argv[1])) {
    console.log('开始执行示例代码...');
    const url_list = await get_url('https://dimtown.com/vipcos');

    // 现在有一个列表，随机选择一个
    const randomIndex = Math.floor(Math.random() * url_list.length);

    const img_url = await get_img(url_list[randomIndex].href);

    // 输出随机选择的链接和图片信息
    console.log(`随机选择的链接: ${url_list[randomIndex].href}`);
    // 输出图片信息
    img_url.forEach(img => {
        console.log(img.src);
    });

    process.exit(0);
}

/** 
 * 导出函数
 * @module get_img,get_url,one_get
 */
export { get_url, get_img, one_get };