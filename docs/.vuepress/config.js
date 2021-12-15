module.exports = {
    port: 8080,
    base: '/handover/',
    markdown: {
        lineNumbers: true
    },
    title: '交接文档',
    description: 'Just playing around',
    head: [
        ['link', { rel: 'icon', href: '/hero.svg' }]
    ],
    // theme: 'vue',
    themeConfig: {
        repo: 'https://github.com/strugglingbird/handover',
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        repoLabel: 'GitHub',
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