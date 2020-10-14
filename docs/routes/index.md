---
title: 总览
---

<febeacon />

# 总览

该库包含了一个共享类型的集合，我们可以关注这些类型的更改并同时操作。网络功能和双向绑定是在单独的模块中实现的。

> 该部分对应的文档在目录底部。

[英文原地址](https://github.com/yjs/yjs)

## 信息呈现绑定 (Binding)

<table>
  <thead>
  <tr>
    <th>名称</th>
    <th align="center">光标</th>
    <th>绑定(链接指向原地址)</th>
    <th>Demo</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://prosemirror.net/" rel="nofollow">ProseMirror</a> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td>
      <td align="center">YES</td>
      <td><a href="http://github.com/yjs/y-prosemirror">y-prosemirror</a></td>
      <td><a href="https://demos.yjs.dev/prosemirror/prosemirror.html" rel="nofollow">demo</a></td>
    </tr>
    <tr>
      <td><a href="https://quilljs.com/" rel="nofollow">Quill</a></td>
      <td align="center">YES</td>
      <td><a href="http://github.com/yjs/y-quill">y-quill</a></td>
      <td><a href="https://demos.yjs.dev/quill/quill.html" rel="nofollow">demo</a></td>
    </tr>
    <tr>
      <td><a href="https://codemirror.net/" rel="nofollow">CodeMirror</a></td>
      <td align="center">YES</td>
      <td><a href="http://github.com/yjs/y-codemirror">y-codemirror</a></td>
      <td><a href="https://demos.yjs.dev/codemirror/codemirror.html" rel="nofollow">demo</a></td>
    </tr>
    <tr>
      <td><a href="https://microsoft.github.io/monaco-editor/" rel="nofollow">Monaco</a></td>
      <td align="center">YES</td>
      <td><a href="http://github.com/yjs/y-monaco">y-monaco</a></td>
      <td><a href="https://demos.yjs.dev/monaco/monaco.html" rel="nofollow">demo</a></td>
    </tr>
  </tbody>
</table>

## 信息分发端 (Provider)

在客户端之间建立通信、管理感知信息以及存储共享数据是一件非常麻烦的事情。有更新程序帮您管理所有这些，您不用担心。

[y-webrtc](http://github.com/yjs/y-webrtc)

使用 WebRTC 点对点传播文档更新。在信令服务器上交换信令数据。公开可用的信令服务器是可用的。通过信息分发端共享密钥，可以对信令服务器上的通信进行加密，从而保持连接信息和共享文档的私密性。

[y-websocket](http://github.com/yjs/y-websocket)

包含简单的 websocket 后端和连接到该后端的 websocket 客户端的模块。后台可以在 leveldb 数据库中扩展从而进行持久化更新。

[y-indexeddb](http://github.com/yjs/y-indexeddb)

高效地将文档更新并在浏览器的 IndexedDB 数据库进行持久化。该文档开箱即用，只需要通过网络更新程序同步即可。

[y-dat](http://github.com/yjs/y-dat)

[开发中]使用多点写入将文档高效写入 dat 网络。每个客户端都有一个用于追加的 CDRT 本地更新日志(超核)。多点写入管理和同步超核以及 y-dat 侦听变化，并将它们应用到 Yjs 文档。


















