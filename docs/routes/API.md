---
title: API
---

# API

[英文原地址](https://github.com/yjs/yjs#api)

```js
import * as Y from 'yjs'
```

## *共享类型*


## Y.Array

一种可共享的类数组类型，支持在任何位置插入/删除元素。在内部，它使用了数组链表，必要时可以分割数组。

```js
const yarray = new Y.Array() 
```

### `insert(index:number, content:Array<object|boolean|Array|string|number|Uint8Array|Y.Type>)`

在`index`处插入内容。请注意内容是元素的数组。`array.insert(0, [1])`在索引`0`处拼接列表并插入`1`。

### `push(Array<Object|boolean|Array|string|number|Uint8Array|Y.Type>)`

### `unshift(Array<Object|boolean|Array|string|number|Uint8Array|Y.Type>)`

### `delete(index:number, length:number)`

### `get(index:number)`

### `length:number`

### `forEach(function(value:object|boolean|Array|string|number|Uint8Array|Y.Type, index:number, array: Y.Array))`

### `map(function(T, number, YArray):M):Array<M>`

### `toArray():Array<object|boolean|Array|string|number|Uint8Array|Y.Type>`


将该`YArray`的内容拷贝到一个新数组中。

### `toJSON():Array<Object|boolean|Array|string|number>`

将该`YArray`的内容拷贝到一个新数组中。该方法会使用`toJSON`方法将所有子类型转换为 JSON。

### `[Symbol.Iterator]`

返回一个`YArray`迭代器，其中包含了数组中每个索引的值。

`for (let value of yarray) { .. }`

### `observe(function(YArrayEvent, Transaction):void)`

向该类型添加一个事件侦听器，该事件侦听器将在每次修改这个类型时同步调用。如果在事件侦听器中修改了此类型，则在当前事件侦听器返回后将再次调用事件侦听器。

### `unobserve(function(YArrayEvent, Transaction):void)`

从该类型中删除`observe`事件侦听器。

### `observeDeep(function(Array<YEvent>, Transaction):void)`

向该类型添加一个事件侦听器，该事件侦听器将在每次修改此类型或其任何子类型时同步调用。如果在事件侦听器中修改了此类型，则在当前事件侦听器返回后将再次调用事件侦听器。事件侦听器接收自己或其子程序创建的所有事件。

### `unobserveDeep(function(Array<YEvent>, Transaction):void)`

从该类型中删除`observeDeep`事件监听器。

## Y.Map

共享 Map 类型。

```js
const ymap = new Y.Map()
```

### `get(key:string):object|boolean|string|number|Uint8Array|Y.Type`

### `set(key:string, value:object|boolean|string|number|Uint8Array|Y.Type)`

### `delete(key:string)`

### `has(key:string):boolean`

### `get(index:number)`

### `toJSON():Object<string, Object|boolean|Array|string|number|Uint8Array>`

将该`YMap`的`[key,value]`对复制到一个新对象。它使用`toJSON`方法将所有子类型转换为JSON。

### `forEach(function(value:object|boolean|Array|string|number|Uint8Array|Y.Type, key:string, map: Y.Map))`

对每个键值对执行一次传入的函数。

### `[Symbol.Iterator]`

返回迭代器的`[key, value]`对。

```js
for (let [key, value] of ymap) { .. }
```

### `entries()`

返回迭代器的`[key, value]`对。

### `values`

返回迭代器的所有值。

### `keys`

返回迭代器的所有键。

### `observe(function(YMapEvent, Transaction):void)`

向该类型添加一个事件侦听器，该事件侦听器将在每次修改这个类型时同步调用。如果在事件侦听器中修改了此类型，则在当前事件侦听器返回后将再次调用事件侦听器。

### `unobserve(function(YMapEvent, Transaction):void)`

从该类型中删除`observe`事件侦听器。

### `observeDeep(function(Array<YEvent>, Transaction):void)`

向该类型添加一个事件侦听器，该事件侦听器将在每次修改此类型或其任何子类型时同步调用。如果在事件侦听器中修改了此类型，则在当前事件侦听器返回后将再次调用事件侦听器。事件侦听器接收自己或其子程序创建的所有事件。

### `unobserveDeep(function(Array<YEvent>, Transaction):void)`

从该类型中删除`observeDeep`事件监听器。

## Y.Text

为文本的共享编辑而优化的可共享类型。它允许在文本中将属性分配给范围。这让视线该类型的服务文绑定成为可能。

该类型还可以转换为[delta format](https://quilljs.com/docs/delta)。同样地，`YTextEvents`计算增量变化。

```js
const ytext = new Y.Text()
```

### `insert(index:number, content:string, [formattingAttributes:Object<string,string>])`

在`index`处插入一个字符串，并为其分配格式化属性。

```js
ytext.insert(0, 'bold text', { bold: true })
```

### `delete(index:number, length:number)`

### `format(index:number, length:number, formattingAttributes:Object<string,string>)`

为文本中的的一定范围指定格式化属性。

### `applyDelta(delta, opts:Object<string,any>)`

参见[Quill Delta](https://quilljs.com/docs/delta/)可以设置防止删除结束换行的配置项，默认为`true`。

```js
ytext.applyDelta(delta, { sanitize: false })
```

### `length:number`

### `toString():string`

在不使用格式化配置项的情况下，将此类型转换为字符串。

### `toJSON():string`

参见`toString`

### `toDelta():Delta`

将该类型转换为[Quill Delta](https://quilljs.com/docs/delta/)

### `observe(function(YTextEvent, Transaction):void)`

向该类型添加一个事件侦听器，该事件侦听器将在每次修改这个类型时同步调用。如果在事件侦听器中修改了此类型，则在当前事件侦听器返回后将再次调用事件侦听器。

### `unobserve(function(YTextEvent, Transaction):void)`

从该类型中删除`observe`事件侦听器。

### `observeDeep(function(Array<YEvent>, Transaction):void)`

向该类型添加一个事件侦听器，该事件侦听器将在每次修改此类型或其任何子类型时同步调用。如果在事件侦听器中修改了此类型，则在当前事件侦听器返回后将再次调用事件侦听器。事件侦听器接收自己或其子程序创建的所有事件。

### `unobserveDeep(function(Array<YEvent>, Transaction):void)`

从该类型中删除`observeDeep`事件监听器。

## Y.XmlFragment

包含`Y.XmlElements`数组的容器。

```js
const yxml = new Y.XmlFragment()
```

### `insert(index:number, content:Array<Y.XmlElement|Y.XmlText>)`

### `delete(index:number, length:number)`

### `get(index:number)`

### `length:number`

### `toArray():Array<Y.XmlElement|Y.XmlText>`

将子元素拷贝到一个新数组。

### `toDOM():DocumentFragment`

将此类型和所有子元素转换为新的 DOM 元素。

### `toString():string`

获取所有后代的 XML 序列化。

### `toJSON():string`

参见`toString`

### `observe(function(YXmlEvent, Transaction):void)`

向该类型添加一个事件侦听器，该事件侦听器将在每次修改这个类型时同步调用。如果在事件侦听器中修改了此类型，则在当前事件侦听器返回后将再次调用事件侦听器。

### `unobserve(function(YXmlEvent, Transaction):void)`

从该类型中删除`observe`事件侦听器。

### `observeDeep(function(Array<YEvent>, Transaction):void)`

向该类型添加一个事件侦听器，该事件侦听器将在每次修改此类型或其任何子类型时同步调用。如果在事件侦听器中修改了此类型，则在当前事件侦听器返回后将再次调用事件侦听器。事件侦听器接收自己或其子程序创建的所有事件。

### `unobserveDeep(function(Array<YEvent>, Transaction):void)`

从该类型中删除`observeDeep`事件监听器。

## T.XmlElement

表示 XML 元素的可共享类型。它拥有`nodeName`、属性和一系列子节点。但是它不需要验证其内容，也不需要遵循 XML。

```js
const yxml = new Y.XmlElement()
```

### `insert(index:number, content:Array<Y.XmlElement|Y.XmlText>)`

### `delete(index:number, length:number)`

### `get(index:number)`

### `length:number`

### `setAttribute(attributeName:string, attributeValue:string)`

### `removeAttribute(attributeName:string)`

### `getAttribute(attributeName:string):string`

### `getAttributes(attributeName:string):Object<string,string>`

### `toArray():Array<Y.XmlElement|Y.XmlText>`

将子元素拷贝到一个新数组。

### `toDOM():Element`

将此类型和所有子元素转换为新的 DOM 元素。

### `toString():string`

获取所有后代的 XML 序列化。

### `toJSON():string`

参见`toString`。

### `observe(function(YXmlEvent, Transaction):void)`

向该类型添加一个事件侦听器，该事件侦听器将在每次修改这个类型时同步调用。如果在事件侦听器中修改了此类型，则在当前事件侦听器返回后将再次调用事件侦听器。

### `unobserve(function(YXmlEvent, Transaction):void)`

从该类型中删除`observe`事件侦听器。

### `observeDeep(function(Array<YEvent>, Transaction):void)`

向该类型添加一个事件侦听器，该事件侦听器将在每次修改此类型或其任何子类型时同步调用。如果在事件侦听器中修改了此类型，则在当前事件侦听器返回后将再次调用事件侦听器。事件侦听器接收自己或其子程序创建的所有事件。

### `unobserveDeep(function(Array<YEvent>, Transaction):void)`

从该类型中删除`observeDeep`事件监听器。

## Y.Doc

```js
const doc = new Y.Doc()
```

### `clientID` <Badge text="readonly" type="warning" />

表示客户的唯一ID。

### `gc`

是否在该 doc 实例上启用了垃圾回收机制(Garbage Collection)。设置`doc.gc = false`以禁用垃圾回收并能够恢复旧内容。

### `transact(function(Transaction):void [, origin:any])`

对共享文档的每个更改都发生在一个事件流程(transaction)中。观察者调用和更新事物是在每个事件流程后。您应该将更改放到单个事件流程中以降低事件调用的数量。举个例子，`doc.transact(() => { yarray.insert(..); ymap.set(..) })`触发单个的更改事件。

您可以通过设置可选参数`origin`，存储在`transaction.origin`和`on('update', (update, origin) => ..)`。

### `toJSON():any`

将整个文档转换为 js 对象，递归遍历每种 yjs 类型。

### `get(string, Y.[TypeClass]):[Type]`

定义一个共享类型。

### `getArray(string):Y.Array`

定义一个共享的 Y.Array 类型。等同于`y.get(string, Y.Array)`。

### `getMap(string):Y.Map`

定义一个共享的 Y.Map 类型。等同于`y.get(string, Y.Map)`。

### `getXmlFragment(string):Y.XmlFragment`

定义一个共享的 Y.XmlFragment 类型。等同于`y.get(string, Y.XmlFragment)`。

### on(string, function)

在共享类型上注册事件侦听器。

### off(string, function)

解绑共享类型上的事件侦听器。

## Y.Doc 事件

### `on('update', function(updateMessage:Uint8Array, origin:any, Y.Doc):void)`

侦听文档更新。文档在更新时必须传输到所有其他的展示端。您可以不限顺序且多次的更新文档。

### `on('beforeTransaction', function(Y.Transaction, Y.Doc):void)`

每个事件流程开始前派发。

### `on('afterTransaction', function(Y.Transaction, Y.Doc):void)`

每个事件流程结束后派发。

### `on('beforeAllTransactions', function(Y.Doc):void)`

事件流程可以嵌套(例如，在一个事件流程中调用另一个事件流程)。在首个事件流程前派发。

### `on('afterAllTransactions', function(Y.Doc, Array<Y.Transaction>):void)`

在最后一个事件流程结束后派发。

## 文档更新

共享文档上的更改被编码到*文档更新*中。文档更新是*可交换*且*幂等*的。这意味着它们可以以任何顺序应用且应用多次。

**示例：侦听更新事件并将其应用于远程客户端**

```js
const doc1 = new Y.Doc()
const doc2 = new Y.Doc()

doc1.on('update', update => {
  Y.applyUpdate(doc2, update)
})

doc2.on('update', update => {
  Y.applyUpdate(doc1, update)
})

// 所有的更改也更新到了其他文档中
doc1.getArray('myarray').insert(0, ['Hello doc2, you got this?'])
doc2.getArray('myarray').get(0) // => 'Hello doc2, you got this?'
```

Yjs 在内部维护了**“状态向量”**(后面会介绍)，用以表示每个客户端的下一个期望时钟。它保存了每个客户端创建的结构数量。当两个客户端同步时，您既可以交换完整的文档结构，也可以通过发送**“状态向量”**来计算差异。

**示例：通过交换完整的文档结构同步两个客户端**

```js
const state1 = Y.encodeStateAsUpdate(ydoc1)
const state2 = Y.encodeStateAsUpdate(ydoc2)
Y.applyUpdate(ydoc1, state2)
Y.applyUpdate(ydoc2, state1)
```

**示例：通过计算差异同步两个客户端**

这个例子展示了如何通过使用远程客户端的“状态向量”来计算差异，从而用最少的交换数据同步两个客户端。使用状态向量同步客户端需要另一次往返，但可以保证很大的带宽安全。

```js
const stateVector1 = Y.encodeStateVector(ydoc1)
const stateVector2 = Y.encodeStateVector(ydoc2)
const diff1 = Y.encodeStateAsUpdate(ydoc1, stateVector2)
const diff2 = Y.encodeStateAsUpdate(ydoc2, stateVector1)
Y.applyUpdate(ydoc1, diff2)
Y.applyUpdate(ydoc2, diff1)
```

### `Y.applyUpdate(Y.Doc, update:Uint8Array, [transactionOrigin:any])`

对共享文档应用更新。您可以选择设置`transactionOrigin`从而将其存储到`transaction.Origin`和`ydoc.on('update', (update, origin) => ..)`

### `Y.encodeStateAsUpdate(Y.Doc, [encodedTargetStateVector:Uint8Array]):Uint8Array`

将文档状态编码为可应用于远程文档的单个更新消息。可以选择指定目标状态向量，以便只将差异写入更新消息。

### `Y.encodeStateVector(Y.Doc):Uint8Array`

计算状态向量并将其编码为 Uint8Array。

## 相对位置

::: warning 警告
该API尚不稳定。
:::

该特性用于管理选择的内容/光标。当和操作文档的其它用户一起工作时，请不要相信索引位置是你以为的位置。**相对位置**会始终保持在共享文档的元素上，不受远程更改的影响。举个例子，在文档中位置是`“a|c”`则相对位置就会判断到`c`。若远程用户在光标签插入了文档，光标仍旧会停留在`c`前。`insert(1, 'x')("a|c") = "ax|c"`。当相对位置设置为文档结尾，那么光标就会一直停留在文档结尾了。

**示例：移动到相对位置并返回**

```js
const relPos = Y.createRelativePositionFromTypeIndex(ytext, 2)
const pos = Y.createAbsolutePositionFromRelativePosition(relPos, doc)
pos.type === ytext // => true
pos.index === 2 // => true
```

**示例：向远程客户端发送相对位置(json)**

```js
const relPos = Y.createRelativePositionFromTypeIndex(ytext, 2)
const encodedRelPos = JSON.stringify(relPos)
// 向远程客户端发送 encodedRelPos。
const parsedRelPos = JSON.parse(encodedRelPos)
const pos = Y.createAbsolutePositionFromRelativePosition(parsedRelPos, remoteDoc)
pos.type === remoteytext // => true
pos.index === 2 // => true
```

**示例：发送相对位置到远程客户端(Uint8Array)**

```js
const relPos = Y.createRelativePositionFromTypeIndex(ytext, 2)
const encodedRelPos = Y.encodeRelativePosition(relPos)
// 向远程客户端发送 encodedRelPos。
const parsedRelPos = Y.decodeRelativePosition(encodedRelPos)
const pos = Y.createAbsolutePositionFromRelativePosition(parsedRelPos, remoteDoc)
pos.type === remoteytext // => true
pos.index === 2 // => true
```

### `Y.createRelativePositionFromTypeIndex(Uint8Array|Y.Type, number)`

### `Y.createAbsolutePositionFromRelativePosition(RelativePosition, Y.Doc)`

### `Y.encodeRelativePosition(RelativePosition):Uint8Array`

### `Y.decodeRelativePosition(Uint8Array):RelativePosition`

## Y.UndoManager

Yjs 自带了撤销/重做管理器，用以应对 Yjs 类型的撤销/重做。可以选择将更改的范围限定到起始事件流程。

```js
const ytext = doc.getText('text')
const undoManager = new Y.UndoManager(ytext)

ytext.insert(0, 'abc')
undoManager.undo()
ytext.toString() // => ''
undoManager.redo()
ytext.toString() // => 'abc'
```

### `constructor(scope:Y.AbstractType|Array<Y.AbstractType> [, {captureTimeout:number,trackedOrigins:Set<any>,deleteFilter:function(item):boolean}])`

可以接受单个类型作为范围，也可以接受类型数组。

### `undo()`

### `redo()`

### `stopCapturing()`

### `on('stack-item-added', { stackItem: { meta: Map<any,any> }, type: 'undo' | 'redo' })`

注册当`StackItem`添加到撤销栈或重做栈时调用的事件。

### `on('stack-item-popped', { stackItem: { meta: Map<any,any> }, type: 'undo' | 'redo' })`

注册当`StackItem`从撤销栈或重做栈移出时调用的事件。

**示例：停止捕获**

如果创建的时间间隔小于`options.captureTimeout`，则`UndoManager`会合并`Undo-StackItem`。调用`um.stopCapturing()`可以避免下一个`StackItem`被合并。

```js
// 无停止捕获
ytext.insert(0, 'a')
ytext.insert(1, 'b')
undoManager.undo()
ytext.toString() // => '' (注意 'ab' 被移除了)
// 带停止捕获
ytext.insert(0, 'a')
undoManager.stopCapturing()
ytext.insert(0, 'b')
undoManager.undo()
ytext.toString() // => 'a' (注意只有 'b' 被)
```

**示例：指定追踪的起始点**

共享文档上的每个更改都有一个起始点。如果没有指定起始点，则默认为`null`。通过指定`trackedOrigins`您可以有选择地指定`UndoManager`应该跟踪哪些更改。`UndoManager`实例总会被添加到`trackedOrigins`中。

```js
class CustomBinding {}

const ytext = doc.getText('text')
const undoManager = new Y.UndoManager(ytext, {
  trackedOrigins: new Set([42, CustomBinding])
})

ytext.insert(0, 'abc')
undoManager.undo()
ytext.toString() // => 'abc' (不跟踪，因为起始点“null”并且不是“trackedTransactionOrigins”的一部分)
ytext.delete(0, 3) // 恢复

doc.transact(() => {
  ytext.insert(0, 'abc')
}, 42)
undoManager.undo()
ytext.toString() // => '' (跟踪，因为起始点是“trackedTransactionOrigins”的一部分)

doc.transact(() => {
  ytext.insert(0, 'abc')
}, 41)
undoManager.undo()
ytext.toString() // => '' (不跟踪，因为 41 不是“trackedTransactionOrigins”的一部分)
ytext.delete(0, 3) // 恢复

doc.transact(() => {
  ytext.insert(0, 'abc')
}, new CustomBinding())
undoManager.undo()
ytext.toString() // => '' (跟踪，因为起始点 `CustomBinding` 和 `CustomBinding`是 `trackedTransactionorigins`的一部分)
```

**示例：向`StackItems`添加其他信息**

在撤消或重做以前的操作时，通常需要恢复其他元信息，如光标位置或文档上的视图。您可以为`Undo-/Redo-StackItems`分配元信息。

```js
const ytext = doc.getText('text')
const undoManager = new Y.UndoManager(ytext, {
  trackedOrigins: new Set([42, CustomBinding])
})

undoManager.on('stack-item-added', event => {
  // 保存 stack-item 的当前光标位置
  event.stackItem.meta.set('cursor-location', getRelativeCursorLocation())
})

undoManager.on('stack-item-popped', event => {
  // 储存 stack-item 的当前光标位置
  restoreCursorLocation(event.stackItem.meta.get('cursor-location'))
})
```