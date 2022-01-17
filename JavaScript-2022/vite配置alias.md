# Vite配置alias（设置别名）

> Vite配置alias需要两步进行（TS项目）
>
> 1、修改vite.config.ts（让程序支持）
>
> 2、修改tsconfig.json（让编辑器支持）

## 修改vite配置

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

function _resolve(dir: string) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 配置项目别名
  resolve: {
    alias: {
      '@': _resolve('src'),
    },
  },
})

```



## 修改tsconfig.json

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "noImplicitAny": false,
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "importHelpers": true, // 不让同样的辅助函数重复的出现在多个文件中
    "allowSyntheticDefaultImports": true, // 允许对不包含默认导出的模块使用默认导入。
    "baseUrl": ".", // 非相对模块的导入可以相对于baseUrl或通过下文会讲到的路径映射来进行解析
    "lib": [
      "esnext",
      "dom"
    ],
    "paths": { // 配置导出路径（这里根据自己项目执行修改）
      "@/stores*": [
        "./src/stores*"
      ],
      "@/components*": [
        "./src/components*"
      ],
      "@/modules*": [
        "./src/modules*"
      ],
      "@/utils*": [
        "./src/utils*"
      ],
    },
    "types": [
      "element-plus/global"
    ]
  },
  "exclude": [
    "node_modules",
  ],
  "include": [
    "src/*",
    "src/**/*.vue",
    "src/**/*.tsx",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.js"
  ]
}
```



## 结语

- 修改后请重启编辑器
- 本文验证与2022年1月10号，mac，win双平台均有效，如果以上配置无效了，请查看相关api的改动

- 如果帮助你解决了问题，动动小手点个赞吧！:)



