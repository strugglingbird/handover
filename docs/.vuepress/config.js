module.exports = {
    base: '/handover/',
    title: '交接文档',
    description: 'Just playing around',
    head: [
        ['link', { rel: 'icon', href: '/hero.svg' }]
    ],
    // theme: 'vue',
    themeConfig: {
        sidebar: 'auto',
        nav: [
            {text: '首页', link: '/'},
            {text: '服务器相关', link: '/01/'},
            {text: '代码相关', link: '/02/'},
            {text: '运维相关', link: '/03/'},
            {text: '其他', link: '/04/'},
        ],
        displayAllHeaders: false,
    },
}