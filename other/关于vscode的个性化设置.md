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

2. 必须安装的插件

以下配置解决了什么

`ctrl + alt + f`的格式化 不会自动添加分号 全部变成单引号

编译器规范按editorconfig来

创建`.editorconfig`

```
root = true

# 对所有文件生效
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

# 对后缀名为 md 的文件生效
[*.md]
trim_trailing_whitespace = false
```

更变vscode里面的`setting.json`

```
{
   "prettier.singleQuote": true,
   "prettier.semi": false,
   "vetur.format.defaultFormatter.html": "js-beautify-html",
   "vetur.format.defaultFormatterOptions": {
      "wrap_attributes": "force-aligned"
    }
}
```



