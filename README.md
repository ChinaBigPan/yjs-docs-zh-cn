# Y.js 中文文档

Y.js 是对共享数据进行强大抽象的 CRDT 框架。

![image](http://note.youdao.com/yws/res/18823/WEBRESOURCE25abdd4c460c05fd84fcf0064854bccf)

[文档地址](https://chinabigpan.github.io/yjs-docs-zh-cn/)

[英文原地址](https://github.com/yjs/yjs)

v 13.3.2

> 对共享数据进行强大抽象的 CRDT 框架。   

> CRDT 是 Conflict-free Replicated Data Type 即免冲突的可复制的数据类型，这种数据类型可以用于数据跨网络复制并且可以自动解决冲突达到一致。

Yjs 是一种 CRDT 实现，它将其内部数据暴露为共享类型(shared types)。共享类型是一种常见的数据类型，如`Map`或`Array`，它们都具有很强的能力，对其变更会自动分配给其他对等的节点进行合并，而不会发生冲突。

Yjs 不依赖网络，支持许多现有的富文本编辑器、离线编辑、版本快照、撤消/重做和共享鼠标。它可以很好地扩展无限数量的用户，甚至非常适合大型文档。

该库包含了一个共享类型的集合，我们可以关注这些类型的更改并同时操作。网络功能和双向绑定是在单独的模块中实现的。








