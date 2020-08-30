---
title: 开始
---

# 开始

安装 Yjs 和您最喜欢的包管理器：

```bash
npm i yjs y-websocket
```

启动 y-websocket 服务器

```bash
PORT=1234 node ./node_modules/y-websocket/bin/server.js
```

## 示例：观察类型

```js
const yarray = doc.getArray('my-array')
yarray.observe(event => {
  console.log('yarray was modified')
})
// 每次本地或远程客户端修改了 yarray 都会调用观察者
yarray.insert(0, ['val']) // => "yarray was modified"
```

## 示例：嵌套类型

请记住，共享类型只是普通的旧数据类型。唯一的限制是共享类型在共享文档中只能存在一次。

```js
const ymap = doc.getMap('map')
const foodArray = new Y.Array()
foodArray.insert(0, ['apple', 'banana'])
ymap.set('food', foodArray)
ymap.get('food') === foodArray // => true
ymap.set('fruit', foodArray) // => 错误! foodArray 已经定义了
```

现在您了解了如何在共享文档上定义类型。接下来，您可以跳转到演示仓库或继续阅读API文档。

## 示例：使用并组合更新程序

任何 Yjs 更新程序都可以相互结合。所以您可以通过不同的网络技术同步数据。

在大多数情况下，您希望将网络更新程序(如`y-websocket`或`y-webrtc`)与持久性信息分发程序(浏览器中的`y-indexeddb`)结合使用。持久性允许您更快地加载文档，并持久化断网时创建的数据。

为了展示，我们将两个不同的网络信息分发程序与一个持久性信息分发结合在一起。

```js
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { WebsocketProvider } from 'y-websocket'
import { IndexeddbPersistence } from 'y-indexeddb'

const ydoc = new Y.Doc()

// 这允许您直接获取(缓存的)文档数据
const indexeddbProvider = new IndexeddbPersistence('count-demo', ydoc)
idbP.whenSynced.then(() => {
  console.log('loaded data from indexed db')
})

// 使用 y-webrtc 同步客户端
const webrtcProvider = new WebrtcProvider('count-demo', ydoc)

// 使用 y-websocket 同步客户端
const websocketProvider = new WebsocketProvider(
  'wss://demos.yjs.dev', 'count-demo', ydoc
)

// 数字数组产生一个和值
const yarray = ydoc.getArray('count')

// 观察和值的改变
yarray.observe(event => {
  // 当数据更新时打印
  console.log('new sum: ' + yarray.toArray().reduce((a,b) => a + b))
})

// 加 1
yarray.push([1]) // => "new sum: 1"
```






































