---
title: 信息呈现绑定
---

# 信息呈现绑定

## y-prosemirror

[英文原地址](https://github.com/yjs/y-prosemirror)

> [ProseMirror](http://prosemirror.net/)绑定到 Yjs

该绑定将`Y.XmlFragment`映射到 ProseMirror 状态。

### 特点

- 同步 ProseMirror 状态。
- 共享的光标。
- 共享撤消/重做(每个客户端都有自己的撤消/重做历史记录)
- 当并发编辑结果出现无效文档架构时，成功恢复

#### 示例

```js
import { ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo } from 'y-prosemirror'
import { exampleSetup } from 'prosemirror-example-setup'
import { keymap } from 'prosemirror-keymap'
..

const type = ydocument.get('prosemirror', Y.XmlFragment)

const prosemirrorView = new EditorView(document.querySelector('#editor'), {
  state: EditorState.create({
    schema,
    plugins: [
        ySyncPlugin(type),
        yCursorPlugin(provider.awareness),
        yUndoPlugin(),
        keymap({
          'Mod-z': undo,
          'Mod-y': redo,
          'Mod-Shift-z': redo
        })
      ].concat(exampleSetup({ schema }))
  })
})
```

[这里](https://github.com/yjs/yjs-demos/tree/master/prosemirror)有工作示例。

#### **远程光标**

远程光标依赖于大多数信息分发端导出的感知实例。感知协议处理非永久性数据，如用户数量、用户名、光标位置和颜色。您可以通过如下方式更改用户的名称和颜色：

```bash
example.binding.awareness.setLocalStateField('user', { color: '#008833', name: 'My real name' })
```

为了显示光标信息，您需要为用户图标嵌入定制的CSS。下面是一个可以用于样式化光标信息的模板。

```css
/* 这段是对第一个段落为空时的第一个光标位置的粗略修正 */
.ProseMirror > .ProseMirror-yjs-cursor:first-child {
  margin-top: 16px;
}
.ProseMirror p:first-child, .ProseMirror h1:first-child, .ProseMirror h2:first-child, .ProseMirror h3:first-child, .ProseMirror h4:first-child, .ProseMirror h5:first-child, .ProseMirror h6:first-child {
  margin-top: 16px
}
/* 为远程用户提供光标。颜色会自动覆盖 */
.ProseMirror-yjs-cursor {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-color: orange;
  word-break: normal;
  pointer-events: none;
}
/* 将用户名渲染到光标上 */
.ProseMirror-yjs-cursor > div {
  position: absolute;
  top: -1.05em;
  left: -1px;
  font-size: 13px;
  background-color: rgb(250, 129, 0);
  font-family: serif;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  user-select: none;
  color: white;
  padding-left: 2px;
  padding-right: 2px;
  white-space: nowrap;
}
```

您还可以通过在 yCursorPlugin 中指定一个光标构建器来覆盖默认的部件 DOM。

```js
/**
 * 该函数接收远程用户的“用户”感知状态.
 */
export const myCursorBuilder = user => {
  const cursor = document.createElement('span')
  cursor.classList.add('ProseMirror-yjs-cursor')
  cursor.setAttribute('style', `border-color: ${user.color}`)
  const userDiv = document.createElement('div')
  userDiv.setAttribute('style', `background-color: ${user.color}`)
  userDiv.insertBefore(document.createTextNode(user.name), null)
  cursor.insertBefore(userDiv, null)
  return cursor
}

const prosemirrorView = new EditorView(document.querySelector('#editor'), {
  state: EditorState.create({
    schema,
    plugins: [
        ySyncPlugin(type),
        yCursorPlugin(provider.awareness, { cursorBuilder: myCursorBuilder }),
        yUndoPlugin(),
        keymap({
          'Mod-z': undo,
          'Mod-y': redo,
          'Mod-Shift-z': redo
        })
      ].concat(exampleSetup({ schema }))
  })
})
```

## y-quill

> [Quill Editor](https://quilljs.com/)绑定到 Yjs

该绑定将`Y.Text`映射到 Quill 实例。

可以选择通过[quill-cursors](https://github.com/reedsy/quill-cursors)模块支持共享光标。

### 示例

```js
import { QuillBinding } from 'y-quill'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'

..

Quill.register('modules/cursors', QuillCursors)

const type = ydoc.getText('quill')

var editor = new Quill('#editor-container', {
  modules: {
    cursors: true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ]
  },
  placeholder: 'Start collaborating...',
  theme: 'snow' // 或 'bubble'
})

// 如果信息分发端支持，可指定一个感知实例
const binding = new QuillBinding(type, editor, provider.awareness)

/*
// 定义用户和用户名
// 检查 quill-cursors 以了解如何更改呈现光标的方式
provider.awareness.setLocalStateField('user', {
  name: 'Typing Jimmy',
  color: 'blue'
})
*/
```

[这里](https://github.com/y-js/yjs-demos/tree/master/quill)有工作示例。

## y-codemirror

[英文原地址](https://github.com/yjs/y-codemirror)

> [CodeMirror](https://codemirror.net/)绑定到 Yjs

该绑定将`Y.Text`映射到 CodeMirror 编辑器。

### 特点

- 同步 CodeMirror 状态。
- 共享的光标。
- 共享撤消/重做(每个客户端都有自己的撤消/重做历史记录)
- 当并发编辑结果出现无效文档架构时，成功恢复

### 示例

```js
import * as Y from 'yjs'
import { CodemirrorBinding } from 'y-codemirror'
import { WebrtcProvider } from 'y-webrtc'
import CodeMirror from 'codemirror'

const ydoc = new Y.Doc()
const provider = new WebrtcProvider('codemirror-demo-room', ydoc)
const yText = ydoc.getText('codemirror')

const editor = CodeMirror(editorDiv, {
  mode: 'javascript',
  lineNumbers: true
})

const binding = new CodemirrorBinding(yText, editor, provider.awareness)
```

[这里](https://github.com/yjs/yjs-demos/tree/master/codemirror)有工作示例。

## y-monaco

[英文原地址](https://github.com/yjs/y-monaco)

> [Monaco](https://microsoft.github.io/monaco-editor/index.html)绑定到 Yjs

该绑定将`Y.Text`映射到 Monaco 编辑器(它就是 VS Code 的编辑器)。

### 特点

- 共享光标

#### 示例

```js
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { MonacoBinding } from 'y-monaco'
import * as monaco from 'monaco-editor'

const ydocument = new Y.Doc()
const provider = new WebsocketProvider(`${location.protocol === 'http:' ? 'ws:' : 'wss:'}//localhost:1234`, 'monaco', ydocument)
const type = ydocument.getText('monaco')

const editor = monaco.editor.create(document.getElementById('monaco-editor'), {
  value: '', // MonacoBinding 使用类型内容覆盖该值
  language: "javascript"
})

// 将 Yjs 绑定到编辑器模型
const monacoBinding = new MonacoBinding(type, editor.getModel(), new Set([editor]), provider.awareness)
```

[这里](https://github.com/y-js/yjs-demos/tree/master/monaco)有工作示例。

### API

```js
import { MonacoBinding } from 'y-monaco'

const binding = new MonacoBinding(type, editor.getModel(), new Set([editor]), provider.awareness)
```
### Class:MonacoBinding

#### `constructor(Y.Text, monaco.editor.ITextModel, [Set<monaco.editor.IStandaloneCodeEditor>, [Awareness]])`

如果指定了编辑器，MonacoBinding 会在发生远程更改时调整选项。Awareness 是 y-protocols/awareness 感知协议的实现。如果指定了 Awareness, 那么 MonacoBinding 会显示远端的选项。

#### `destroy()`

取消所有事件监听器。当模型被释放时自动调用。



