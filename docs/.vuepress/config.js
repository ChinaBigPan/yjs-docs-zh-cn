module.exports= {
    title: 'Y.js',
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
        logo: "/images/logo.png",
        nav: [
            {
                text: "大笑文档",
                link: "http://www.febeacon.com"
            },
            {
                text: "文档首页",
                link: "/"
            }
        ],
        sidebar: [
            {
                title: '总览',
                path: '/routes/',
                sidebarDepth: 2
            },
            {
                title: '开始',
                path: '/routes/start',
                sidebarDepth: 2
            },
            {
                title: 'API',
                path: '/routes/API',
                sidebarDepth: 2
            },
            {
                title: 'CRDT 算法',
                path: '/routes/CRDT_Algorithm',
                sidebarDepth: 2
            },
            {
                title: '信息呈现绑定',
                path: '/routes/binding',
                sidebarDepth: 2
            },
            {
                title: '信息分发端',
                path: '/routes/provider',
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