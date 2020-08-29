module.exports= {
    title: 'Y.js 中文文档',
    description: "对共享数据进行强大抽象的 CRDT 框架。",
    base: '/yjs-docs-zh-cn/',
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
            // {
            //     text: "主站",
            //     link: "http://febeacon.com"
            // },
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
            rel: "icon", href: "/images/yjs_favicon.png"
        }]
    ]
}