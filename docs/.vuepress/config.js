module.exports= {
    title: '起手模板',
    description: "别忘了改改它",
    markdown: {
        lineNumbers: true,
        anchor: {
            permalink: false
        }
    },
    themeConfig: {
        activeHeaderLinks: true,
        displayAllHeaders: true,
        nav: [
            {
                text: "主站",
                link: "https://frontendBecon.com"
            },
            {
                text: "文档首页",
                link: "/"
            }
        ],
        sidebar: [
            {
                title: '首页',
                path: '/',
                sidebarDepth: 2
            },
            {
                title: 'Logo写了吗',
                path: '/routes/',
                sidebarDepth: 2
            },
            {
                title: '版本号写了么',
                path: '/routes/chapter1.html',
                sidebarDepth: 2
            }
        ]
    },
    head: [
        ["link", {
            rel: "icon", href: "/images/favicon.ico"
        }]
    ]
}