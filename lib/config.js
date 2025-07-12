let config = {
    // 默认配置
    help_img: 'https://img.kookapp.cn/assets/2025-07/12/LQe5HEPtG50qo0w7.png'
};

try {
    const res = await fetch('https://oss.xt-url.com/%E6%AC%A1%E5%85%83%E5%B0%8F%E9%95%87/config.json');
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} ${res.statusText}`);
    }
    config = await res.json();
} catch (error) {
    logger.error(`获取配置数据失败: ${error}`);
}


async function get_Help_img() {
    return config.help_img;
}

export { get_Help_img };