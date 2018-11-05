# 关于vscode的个性化设置

1. 使用eclipse风格快捷键

点击编译器左下角 打开键盘快捷方式

```
[
    { "key": "alt+/",  "command": "editor.action.triggerSuggest","when": "editorTextFocus" },
    { "key": "ctrl+d", "command": "editor.action.cutLines","when": "editorTextFocus" },
    { "key": "ctrl+alt+down","command": "editor.action.copyLinesDownAction", "when": "editorTextFocus" },
    { "key": "ctrl+alt+up", "command": "editor.action.copyLinesUpAction", "when": "editorTextFocus" },
    { "key": "shift+alt+r","command": "editor.action.rename","when": "editorTextFocus" },
    { "key": "ctrl+shift+c","command": "editor.action.commentLine","when": "editorTextFocus" },
    { "key": "ctrl+d","command": "editor.action.deleteLines","when": "editorTextFocus" },
    { "key": "ctrl+k","command": "editor.action.addSelectionToNextFindMatch","when": "editorFocus"},
    { "key": "alt+shift+2","command": "workbench.action.splitEditor"},
    { "key": "ctrl+shift+f","command": "editor.action.format","when": "editorTextFocus"},
]
```

2. 

必须安装的插件



