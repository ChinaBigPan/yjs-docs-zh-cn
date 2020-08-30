---
title: 信息分发端
sidebarDepth: 3
---

## y-webrtc

[英文原地址](https://github.com/yjs/y-webrtc)

> Yjs 的 WebRTC 连接器

使用 WebRTC 向所有用户同步传播文档更新。

- 快速的信息传播。
- 对不受信任的信令服务器进行加密和授权。
- 无需设置，可以使用公共信令服务器。
- 低服务器负载。
- 不适合大量客户端协作编辑单个文档（每个端点是彼此连接的）。

### 设置

#### 安装

```js
npm i y-webrtc
```

#### 客户端代码

```js
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

const ydoc = new Y.Doc()
// 连接到相同房间名称的客户端共享文档更新
const provider = new WebrtcProvider('your-room-name', ydoc, { password: 'optional-room-password' })
const yarray = ydoc.get('array', Y.Array)
```

#### 信令

客户端通过连接到信令服务器来彼此联通。这个包在`./bin/server.js`中实现了一个小型的信令服务器。

```bash
# start signaling server
PORT=4444 node ./bin/server.js
```

用同一信号服务器的客户端将相互找到对方。您可以指定几个自定义信号服务器，像这样:

```js
const provider = new WebrtcProvider('your-room-name', ydoc, { signaling: ['wss://y-webrtc-ckynwnzncc.now.sh', 'ws://localhost:4444'] })
```

#### 限制条件

y-webrtc 受到浏览器可以创建的对等节点的数量的限制。默认情况下，每个客户端都链接到其他客户端，直到达到最大`conn`数为止。如果每个客户端至少间接地连接到其他客户端，那么客户端也会同步。从理论上讲，y-webrtc 允许无限数量的用户，但在某种程度上它不能保证客户端同步文档的后续可能。因为贪得无厌是不好的，所以 y-webrtc 有一个限制，即最多只能连接`20 + math.floor(random.rand() * 15)`个客户端。我们看到该值有一个随机因子，目的是为了防止客户端连接到其它集群，这些集群也无法连接其他客户端。这个值可以使用`maxConn`配置项设置，如下：

```js
const provider = new WebrtcProvider('your-room-name', ydoc, { maxConns: 70 + math.floor(random.rand() * 70) })
```

::: warning
可以试试看根据网络中连接点的数量计算形成集群的概率。默认为在网络连接很糟糕的情况下连接至少100个客户端的网络会议。
:::

#### 使用 y-webrtc 进行视频会议解决方案。

只需要监听信息分发端的`peers`事件就能够监听更多传入的 WebRTC 连接，并使用 simple-peer API 来共享流。在这方面，我们也需要更多帮助。默认情况下，浏览器使用的是`BroadcastChannel`来共享数据而非`WebRTC`。为了连接所有客户端浏览器，我们可以设置`maxConns = Number.POSITIVE_INFINITY`和`filterBcConns = false`。

### API

```js
new WebrtcProvider(roomName, ydoc[, opts])
```

下面是配置项及默认值：

```js
{
  // 指定令的服务器。客户端将同时连接到每个信令服务器，以尽可能快地找到其他客户端.
  signaling: ['wss://signaling.yjs.dev', 'wss://y-webrtc-signaling-eu.herokuapp.com', 'wss://y-webrtc-signaling-us.herokuapp.com'],
  // 如果password是字符串，它将用于加密通过信令服务器的所有通信.
  // 非敏感信息(WebRTC连接信息，共享数据)将在信令服务器上共享.
  // 主要目标是防止中间人攻击，并允许您安全地使用公共/不受信任的信号实例.
  password: null,
  // 指定一个现有的感知实例——请参见 https://github.com/yjs/y-protocols
  awareness: new awarenessProtocol.Awareness(doc),
  // WebRTC 的最大连接数目.
  // 推荐使用随机因素，因为这样会减少 n 个客户机组成一个集群的机会.
  maxConns: 20 + math.floor(random.rand() * 15),
  // 是否禁用WebRTC连接到同一浏览器中的其他选项卡。
  // 同一浏览器中的选项卡使用 BroadcastChannel 共享文档更新.
  // WebRTC连接在同一浏览器因此只有当你想要分享视频信息时才有必要.
  filterBcConns: true,
  // simple-peer选项。请参见 https://github.com/feross/simple-peer#peer- newpeeropts 以获取更多信息。
  // y-webrtc 在内部使用 simple-peer 作为库来创建WebRTC连接.
  peerOpts: {}
}
```

### 日志

y-webrtc 使用 lib0/logging.js 日志库。默认情况下，此库是禁用的。您可以通过设置`log`环境/localStorage 变量来启用它:

```js
// 多所有模块启用日志
localStorage.log = 'true'
// 仅对 y-webrtc 启用日志
localStorage.log = 'y-webrtc'
// 以正则表达式匹配
localStorage.log = '^y.*'
```

```bash
# 在 nodejs 中启动
LOG='y-webrtc' node index.js
```

## y-websocket

[英文原地址](https://github.com/yjs/y-websocket)

### Websocket Provider

Websocket 信息分发端实现了一个经典的客户端服务器模型。客户端通过 Websocket 连接到单个端点。服务器在客户机之间分发感知信息和文档更新。

如果您需要处理身份验证和授权的中心资源，Websocket 信息分发端是一个可靠的选择。Websockets 也发送头部信息和 cookie，所以你可以使用服务器现有的身份验证机制。

[BroadcastChannel]:https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
[localStorage]:https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage


- 支持跨选项卡通信。当您在相同的浏览器中打开相同的文档时，文档上的更改通过跨选项卡通信交换(以[BroadcastChannel][BroadcastChannel]和[localStorage][localStorage]保底)。
- 支持感知信息的交换(例如光标)。

#### 客户端代码：

```js
import * as Y from 'yjs'
import { WebsocketProvider } from 'yjs/provider/websocket.js'

const doc = new Y.Doc()
const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', doc)

wsProvider.on('status', event => {
  console.log(event.status) // logs "connected" or "disconnected"
})
```

#### 启动 WebSocket 服务器：

```bash
PORT=1234 npx y-websocket-server
```

由于 npm 从是您本地的`./node_modules/.bin`文件夹链接了`y-websocket-server`可执行文件，所以您可以简单地运行`npx`。`PORT`环境变量已经默认为`1234`。

#### 持久性 Websocket 服务器

使用 LevelDB 数据库进行持久化文档更新。

参见[LevelDB 数据库](https://github.com/yjs/y-leveldb)获取更多信息。

```bash
PORT=1234 YPERSISTENCE=./dbDir node ./node_modules/y-websocket/bin/server.js
```

### Websocket服务器与HTTP回调

在文档更新时向 HTTP 服务器发送防抖的回调(`POST`)。

可以传递下面的 ENV 变量:

- `CALLBACK_URL`: 回调服务器的URL。
- `CALLBACK_DEBOUNCE_WAIT`: 取消回调之间的时间间隔(ms)。默认为2000毫秒。
- `CALLBACK_DEBOUNCE_MAXWAIT`: 在回调之前等待的最大时间。默认值为10秒。
- `CALLBACK_TIMEOUT`: HTTP调用超时。默认为5秒。
- `CALLBACK_OBJECTS`: 用于获取数据的共享对象的JSON(`'{"SHARED_OBJECT_NAME":"SHARED_OBJECT_TYPE}'`)

```bash
CALLBACK_URL=http://localhost:3000/ CALLBACK_OBJECTS='{"prosemirror":"XmlFragment"}' npm start
```

在接收到请求体中名为`“prosemirror”`的`XmlFragment`数据更新(默认为`DEBOUNCE_WAIT`) 2秒后，将向`localhost:3000`发送一个防抖的回调。

#### 扩展

这些仅仅是对如何扩展服务器环境的建议。

**建议1：** Websocket 服务器通过 PubSub 服务器互相通信。每个房间代表一个 PubSub 频道。这种方法的缺点是相同的文档可能被许多服务器处理。但反过来也具有了容错能力，没有单点故障且适合路由平衡。

**建议2：** 使用一致的 hash 值。每个文档由唯一的服务器处理。该模式需要一个实体(etcd)来执行定期的运行状况检查并管理服务器。根据可用服务器列表(由etcd管理)代理计算那个服务器处理每个请求的文档。该方法的缺点是负载分配可能并不公平。尽管如此，如果您想要将共享文档储存在数据库中——比方说建立索引——这种方法可能是首选的解决方案。

## y-leveldb

[英文原地址](https://github.com/yjs/y-leveldb)

### Yjs 的 LevelDB 数据库适配器

LevelDB 是一个快速的嵌入式数据库。它是 IndexedDB 的底层技术。

在内部，y-leveldb 使用了 [level](https://github.com/Level/level)，它允许为其支持的不同数据库交换存储介质。因此，这个适配器还支持 rocksdb、lmdb等。

- 服务器的持久存储。
- 可交换的存储介质。
- 可以用在[y-websocket](https://github.com/yjs/y-websocket)中。
- 一个 y-leveldb 实例可以处理许多文档。

### 搞起

```bash
npm install y-leveldb --save
```

```js
import { LeveldbPersistence } from 'y-leveldb'

const persistence = new LeveldbPersistence('./storage-location')

const ydoc = new Y.Doc()
ydoc.getArray('arr').insert(0, [1, 2, 3])
ydoc.getArray('arr').toArray() // => [1, 2, 3]

// 从其他客户端检索的存储文档更新
persistence.storeUpdate('my-doc', Y.encodeStateAsUpdate(ydoc))

// 当您想要同步或存储数据到数据库时，检索临时的 Y.Doc 来使用数据
persistence.getYDoc('my-doc').getArray('arr') // [1, 2, 3]
```

#### API

#### `persistence = LeveldbPersistence(storageLocation, [{ [level] }])`

创建一个 y-leveldb 持久实例。

您可以使用兼容任何级别的适配器。

```js
import { LeveldbPersistence } from 'y-leveldb'
import level from 'level-mem'

const persistence = new LeveldbPersistence('./storage-location', { level })
```

##### `persistence.getYDoc(docName: string): Promise<Y.Doc>`

创建一个保存在 leveldb 中的数据的 Y.Doc 实例。使用这个临时创建一个 Yjs 文档来同步更改或提取数据。

##### `persistence.storeUpdate(docName: string, update: Uint8Array): Promise`

将单个文档更新存储到数据库中。

#### `persistence.getStateVector(docName: string): Promise<Uint8Array>`

状态向量(描述持久化文档的状态 —— 请参阅Yjs文档)用一个单独的字段中维护并不断更新。

这方便您同步更改且不用实际创建一个 Yjs 文档。

##### `persistence.getDiff(docName: string, stateVector: Uint8Array): Promise<Uint8Array>`

直接从数据库中获取差异。等同于`Y.encodestateasupdate (ydoc, stateVector)`。

##### `persistence.clearDocument(docName: string): Promise`

从数据库中删除文档和所有相关数据。

##### `persistence.setMeta(docName: string, metaKey: string, value: any): Promise`

在数据库中持久化一些元信息并将其与文档关联。你在这里储存什么由你自己决定。例如，您可以在这里存储验证信息。

##### `persistence.getMeta(docName: string, metaKey: string): Promise<any|undefined>`

从数据库中检索存储的元数据。如果`metaKey`不存在则返回`undefined`。

##### `persistence.delMeta(docName: string, metaKey: string): Promise`

删除存储的元数据。

##### `persistence.getAllDocNames(docName: string): Promise<Array<string>>`

检索所有存储文档的名称。

##### `persistence.getAllDocStateVectors(docName: string): Promise<Array<{ name:string,clock:number,sv:Uint8Array}`

检索所有存储文档的状态向量。您可以使用它同步两个 y-leveldb 实例。

::: warning 注意
如果关联文档尚未刷新，则状态向量可能已经过时。所以要小心使用。
:::

##### `persistence.flushDocument(docName: string): Promise` <Badge text="仅限开发环境" />

y-leveldb 内部存储增量更新。您可以将所有文档更新合并到单个条目。你可能永远都用不上这个。

## y-dat

[英文原文档](https://github.com/yjs/y-dat)

### Yjs 的 Dat 连接器

> 使用 Dat 协议传递文档更新。该功能还在开发中，并不是所有的细节都已经完成。[Demo](https://demos.yjs.dev/prosemirror-dat/prosemirror-dat.html)

- 使用超核数据通道交换文档更新和感知信息。
- 支持多个用户操作相同的 dat。
- 如果客户端知道公钥(“dat key”)，则授予访问权限。
- 目前，不使用私钥对文档更新进行签名。
- 支持数据存储来持久化数据。
- 支持 node 和浏览器环境(内部使用[dat-sdk](https://github.com/datproject/sdk))

### 方法

[Dat Multiwriter]:https://www.datprotocol.com/deps/0008-multiwriter/

最初的想法是实现[Dat 多重写入][Dat Multiwriter]。在内部，Yjs 已经在维护数个只接受新增的日志数据了。但和 Dat Hypercore 相比优化了只接受新增的日志数据，甚至在“垃圾回收”时截断日志。由于历史记录在 Dat 多重写入当中不再工作(无需跟踪更多信息)，y-dat 实现了自定义的存储和同步机制。历史消息的管理依旧可以使用 Yjs 状态向量来实现。y-dat 不使用 Hypercore 概念，但它使用了 Dat 生态系统的许多其他概念，包括群、噪音协议、Dat 存储，并将在未来支持数据签名。

[two-way handshake]:https://github.com/yjs/yjs#example-sync-two-clients-by-computing-the-differences

Yjs 通过超核数据通道功能(一种与可用对等点通信的方法)共享感知信息和更新文档。连接的客户端执行[双向握手][two-way handshake]，以便同步并将所有文档更新传播到所有连接的客户端。这与 y-webrtc 实现的方法相同，但是使用了来自 Dat 生态系统的技术。可以使用 Dat 存储信息发布器进行持久化文档更新。

它允许多个拥有相同公钥的用户操作相同的数据。将来，我们还希望使用私钥对文档更新进行签名。


### 设置

#### 安装

```bash
npm i y-dat
```

### 客户端代码

```js
import * as Y from 'yjs'
// @ts-ignore
import { DatProvider } from 'y-dat'

const ydoc = new Y.Doc()
const givenDatKey = null // '7b0d584fcdaf1de2e8c473393a31f52327793931e03b330f7393025146dc02fb'

const provider = new DatProvider(givenDatKey, ydoc)

const yarray = ydoc.getArray('my-shared-array')

provider.on('loaded', () => {
  console.log('Loaded document from dat-storage!')
})

provider.on('synced', () => {
  console.log('Synced document with all available peers!')
})
```

可以使用现有的超核构造器：

```js
import SDK from 'dat-sdk'

const { Hypercore } = SDK()

const provider = new DatProvider(givenDatKey, ydoc, { Hypercore })
```

#### Demos

您可以在`y-dat/demo/`找到演示示例。克隆这个存储库并运行`npm install && npm start`。另一个例子可以在[yjs-demo /prosemirror-dat](https://github.com/yjs/yjs-demos/tree/master/prosemirror-dat)中找到。

演示也可以在 nodejs 中运行。运行

```bash
node y-dat/demo/node-server.cjs --key 7b0d584fcdaf1de2e8c473393a31f52327793931e03b330f7393025146dc02fb
```

来更新现有秘钥。运行

```bash
node y-dat/demo/node-server.cjs
```

生成新秘钥。

### API

```js
new DatProvider(roomName, ydoc[, opts])
```

下面是配置项和默认值：

```js
{
  // 指定一个现有的感知信息实例 —— 请参见https://github.com/yjs/y-protocols
  awareness: new awarenessProtocol.Awareness(doc),
  // 超核构造器, 由 dat-sdk 创建
  Hypercore: SDK().Hypercore
  // 自定义多核选项。详情见 https://github.com/mafintosh/hypercore#api
  hypercoreOpts: {},
  // Dat 存储数据分发器
  storage: require('random-access-memory'),
  // 是否在存储数据分发器中持久存储数据
  persist: true
}
```

### 日志

y-dat 使用 lib0/logging.js 日志库。默认情况下，此库是禁用的。您可以通过设置`log`环境/localStorage 变量来启用它:

```js
// 多所有模块启用日志
localStorage.log = 'true'
// 仅对 y-dat 启用日志
localStorage.log = 'y-dat'
// 以正则表达式匹配
localStorage.log = '^y.*'
```

```bash
# 在 nodejs 中启动
LOG='y-dat' node index.js
```
