# ZAPT-UI

ZAPT的前端界面

[TOC]

## 启动

```bash
# pnpm 安装依赖
pnpm install

# pnpm
pnpm run dev
```

项目将运行在`http://localhost:3000

## 构建

构建生成版本

```bash
# pnpm
pnpm run build
```

构建本地预览版本

```bash
# pnpm
pnpm run preview
```

## 技术栈

| 名称                                | 版本           | 说明          |
|-----------------------------------|--------------|-------------|
| Nuxt                              | 3.13         | 基于Vue3的框架   |
| Element-plus/nuxt                 | 1.0.9        | UI库         |
| AOS                               | 3.0.0-beta.6 | 首页组件使用到的动画库 |
| tailwind css                      | 3.4.10       | CSS处理框架     |
| @egoist/tailwindcss-icons         | 1.8.1        | 图标库         |
| pinia                             | 2.2.2        | 状态库         |
| @pinia-plugin-persistedstate/nuxt | 1.2.1        | 状态库持久化插件    |

## 关于图标

使用了 [@egoist/tailwindcss-icons](https://github.com/egoist/tailwindcss-icons) 插件，配合tailwind css使用。
本项目使用了 [google material icons](https://icones.js.org/collection/ic)

**例子**

```html
<span class="i-ic-baseline-ad-units"></span>
```

## 关于请求

创建了 `plugins/api.ts`, 用来封装ofetch的请求，实现双token无感刷新

然后二次封装 `composables/fetch.ts` ，封装了常用请求方法，方便使用

对于复用率不高的接口，可以直接使用

```ts
const data = await fetchGet<DataVO>('/api/xxx', {})
```

复用率高的接口，可以创建一个封装的api，例如 `composables/api/system/userApi.ts` ：

```ts
import {fetchDelete} from "~/composables/fetch";
import type {UnwrapRef} from "vue";

export const deleteUserById = async (id: UnwrapRef<UserVO["id"]>) => {
    await fetchDelete('/system/user/delete', {
        params: {
            id
        }
    })
}
```

如果是需要提高SEO的，例如博客文章之类内容，允许没有登录的情况下也能访问的

可以在 `<script lang='ts' setup>`中使用 `useAsyncData`

```html

<script lang='ts' setup>
    const {data, error} = await useAsyncData('articles', () => fetchGet('/articles'))
</script>
```

这样的好处是，在服务端渲染的时候，就可以直接获取到数据并渲染好。减少了一次请求，客户浏览起来的速度快，对SEO也友好

前面直接使用fetchGet的例子，其实跟普通的Vue3项目使用封装好的axios没有区别。nuxt3提供的SSR能力没有完全发挥出来

## 关于权限&登录

本项目希望是一个集成管理后台和门户界面的项目。

- 管理后台：能够操控敏感数据，所以需要带权限访问
- 门户界面：允许不登录的情况下，查看部分不敏感的数据

管理后台的权限也多种多样，可能有多个不同类型的管理员用户，他们能够查看的页面、按钮也应不尽相同。

为了实现前端的权限控制，我们需要在用户端缓存用户的权限，并提供权限判断方法。

Nuxt提供了 `useCokie` api，可以使得浏览器和服务器端拥有相同的cookie。但是把权限信息都放在cookie中，我认为是一个不明智的选择。
权限列表动辄上千条，大小可能有几Kb。每次请求都会自动传输所有的cookie到后端，这会占用很多资源。

因此我选择把权限信息放在 `pinia`中，并配置持久化到localstorage。这样就避免了传输问题、cookie
过期问题。

所以登录流程大概如下

1. 登录页面，发送用户名密码到后端，后端返回token，并把token写入cookie。随后跳转到首页。
2. 设置一个全局的、仅在客户端运行的路由 `01.auth.global.ts`
   。他在每次的路由跳转时候，都会进行以下步骤：是否登录，没登录则跳转到登录页面；缓存用户信息、字典数据、权限数据到pinia中，并自动持久化；根据权限信息等判断是否允许访问页面
3. 页面通过两个自定义指令 `v-hasPermi` 和 `v-hasRole`, 读取pinia中的权限信息，决定按钮是否显示

所以，前端权限相关的问题，只会在client端判断。不会在客户端判断。

## TypeScript篇

使用TS最重要的是声明各种类型，便于编译器进行类型推断，提高代码可读性和维护性

只需要声明类型，例如 `types/system.d.ts` ，然后在`index.d.ts`中引入即可

## 关于黑暗模式&主题

黑暗模式，是通过点击按钮切换的。原理是使用 `useDark` 给整个html添加了一个 `dark` class。

所有组件的样式都会写一份`dark`的样式。

例如

```css
/*正常模式*/
.el-input__inner {
    background-color: #fafafa;
}

/*黑暗模式*/
.dark .el-input__inner {
    background-color: #2d2d2d;
}
```

而我们使用了 tailwind css，只需要在元素的class上添加dark即可，例如：

```html

<div class="dark:bg-gray-800">
</div>
```

主题颜色，则通过两个地方进配置

1. `assets/scss/element/index.scss` 和 `assets/scss/element/dark.scss`
2. `tailwind.config.js`

`assets/css/**`下还有很多其他的样式，也可以自行修改

## 功能蓝图

本项目功能基于ruoyi-vue-pro进行重构。
目前正在开发中。

**框架功能**

| 功能名称     | 状态  | 预计完成时间 |
|----------|-----|--------|
| 黑暗模式     | 完成  |        |
| i18n     | 未完成 |        |
| 响应式布局    | 完成  |        |
| 双token刷新 | 完成  |        |
| 字典数据缓存   | 完成  |        |
| 前端按钮权限控制 | 完成  |        |
| 路由控制     | 未完成 |        |

**业务功能**

| 功能名称     | 状态 | 预计完成时间 |
|----------|----|--------|
| 登录/退出    | 完成 |        |
| 用户管理     | 完成 |        |
| 部门管理     | 完成 |        |
| 角色管理     | 完成 |        |
| 岗位管理     | 完成 |        |
| 租户管理     |    |        |
| 菜单管理     |    |        |
| 字典管理     |    |        |
| 文件管理     |    |        |
| 消息中心     |    |        |
| 配置管理     |    |        |
| 修改个人资料   |    |        |
| 代码生成     |    |        |
| 业务日志     |    |        |
| 定时任务     |    |        |
| 工作流引擎    |    |        |
| online表单 |    |        |
| 表单设计器    |    |        |
| CMS模块    |    |        |


## 代码规范

因为Nuxt基于文件路径进行路由，会将pages下的所有文件都当作单独页面。所以某个页面的专属组件，需要放到components/下。然后通过手动导入