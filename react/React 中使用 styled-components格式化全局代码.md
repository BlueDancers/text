# React 中使用 styled-components格式化全局代码

在styled-components V4版本后 injectGlobal 被移除

> 注入式全局API被移除，代之以样式组件v4中的createGlobalStyle。

取而代之的是createGlobalStyle

文档说明

```
一个辅助函数，用于生成处理全局样式的特殊StyledComponent。通常，样式化组件会自动限定为本地CSS类，因此与其他组件隔离。对于createGlobalStyle，将删除此限制，并且可以应用CSS重置或基本样式表等内容。
返回不接受子项的StyledComponent。将它放在React树的顶部，当组件被“渲染”时，将注入全局样式。
```



使用方法

`style.js`

```css
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

```

在根节点进行引入

```react
import React from 'react';
import ReactDOM from 'react-dom';
import App from './main/main';
import {GlobalStyle} from "./style";

const dom = (
  <div>
    <GlobalStyle></GlobalStyle>
    <App />
  </div>
)

ReactDOM.render(dom, document.getElementById('root'));
```

