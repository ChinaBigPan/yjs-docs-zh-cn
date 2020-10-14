---
home: true
heroImage: /images/logo.png
heroText: Y.js
tagline: 对共享数据进行强大抽象的 CRDT 框架
actionText: v 13.3.2 →
actionLink: /routes/
meta:
  - name: description
    content: Y.js 对共享数据进行强大抽象的 CRDT 框架。它是一种 CRDT 实现，将其内部数据暴露为共享类型(shared types)，非常适合做共享文档。
  - name: keywords
    content: Y.js yjs, CRDT, 共享文档, y.js中文文档
  - name: feversion
    content: v 13.3.2
  - name: fetags
    content: "[{'kind': 'iconfolder-docs', 'text': '共享文档'}, {'kind':'iconNodejs', 'text': 'Node.js'}]"
features:
  - title: CRDT 
    details: CRDT 是 Conflict-free Replicated Data Type 即免冲突的可复制的数据类型，这种数据类型可以用于数据跨网络复制并且可以自动解决冲突达到一致。
  - title: 共享类型
    details: Y.js 是一种 CRDT 实现，它将其内部数据暴露为共享类型(shared types)。共享类型是一种常见的数据类型，如 Map 或 Array，它们都具有很强的能力，对其变更会自动分配给其他对等的节点进行合并，而不会发生冲突。
  - title: 可脱机
    details: Y.js 不依赖网络，支持许多现有的富文本编辑器、离线编辑、版本快照、撤消/重做和共享鼠标。它可以很好地扩展无限数量的用户，甚至非常适合大型文档。
footer: MIT Licensed | Developed By dmonad Kevin Jahns | Translated By 大笑
---
