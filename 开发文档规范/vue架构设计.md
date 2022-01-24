来源:https://juejin.cn/post/6984708706231386119

## 前言

架构包含非常广泛的概念与内容，架构的核心目的是为了提高效率、降低成本、保障质量， 同时需要结合实际业务情况综合考虑，为未来提供可持续发展空间。
目前在公司我负责做一个运维服务云平台中后台管理系统的前端架构开发工作，公司内部目前主要使用的技术栈是Vue，但是并没有非常适合我们项目需求的的工程模板，因此在原有框架的基础上根据项目实际情况进行优化升级，符合实际项目需求。

## 技术选型

在技术选型阶段，需要考虑公司内部采用的技术栈以及团队成员的技术栈，目前公司内部主流的技术栈方向是Vue,所以我们选择Vue作为前端主要技术框架。


脚手架：围绕Vue技术栈，我们采用Vue CLI脚手架工具来快速构建基础工程。


UI组件库：为了提高开发效率避免重复造轮子，我们需要选择一套现有的UI组件库，我们选择了目前主流的ElementUI。


路由管理：路由控制采用Vue Router。


状态管理：统一集中管理项目中组件状态采用Vuex。


异步请求：异步请求采用axios。


样式管理：样式管理采用scss。


静态资源：静态资源图标等采用svg图标。


工具库：为了提高开发效率，降低JS中数组、对象、字符串、日期等等使用难度，我们采用了Lodash、dayjs。

## 开发规范

事先制定一个统一的代码风格、命名规则、目录结构、静态资源使用规范，可以显著提高开发效率、开发质量；在这里主要从以下几方面进行规范管理。

### 开发工具

每个人习惯使用的IDE不同，可能导致出现不同的开发风格，尽量统一开发工具，我们这里采用VS Code进行前端编码开发工作(同时也可以通过配置editorconfig的方式来支持不同IDE统一代码风格)。

### ESLint

编码过程中，代码规范很重要，可以避免很多编码错误，提高代码可读性，我们采用Airbnb JavaScript 这套代码规范。

### prettier

我们采用Vetur插件来实现代码质量提示&错误、格式化/风格、智能提示格式化。

### 静态资源

对静态资源的管理，在开发过程中，经常会用到大量图标，这里我们选择使用 SVG 图标。

### 代码规范

1. 
   统一使用2占位符缩进。

2. 
   统一使用UTF-8字符编码。

3. 
   js代码最外层统一使用单引号。

4. 
   js代码末尾不需要加分号。

5. 
   变量命名采用驼峰式命名，常量全大写。

6. data的使用，在组建中使用data属性的时候，data选项必须是一个函数。
   
     ```js
     data(){
       return {
         count: 0
    }
     }
     ```
     
     
     
7. prop定义时，至少需要指定其类型。
   
    ```js
    props: {
    attr: {
      type: Object,
      default: function () {
        return {}
      }
    }
    }
    ```
    
    


8. v-if和v-for不能同时使用，可以采用computed的方式对v-for的数据进行过滤。
`错误的示例：`
<div v-for="item in message" v-if="item!=='a'"></div>

`正确的示例：`

<div v-for="item in getMessage"></div>
```js
computed: {
  getMessage () {
    return this.message.filter(res=>res!=='a')
  }
}
```




9. computed中禁止对变量进行修改操作。


10. 公共方法抽取封装到utils文件目录中。


11. 使用prop传参时，不要改变prop参数的值，可以采用emit方式修改参数值。


12. 修改vuex中数据必须通过mutations。


13. 可以通过getters获取需要的数据格式。


14. 和服务端交互的数据接口尽量在actions中调用，获取的数据通过mutations改变state。


15. 组件特有样式必须设置独立作用域。




命名规则


1. 文件夹命名
采用小驼峰命名法;
例如：productList, productDetail\textrm{productList, productDetail}productList, productDetail
复数结构时，采用复数命名法；
例如：pages, views, utils\textrm{pages, views, utils}pages, views, utils


2. Vue组件命名
采用官方推荐的大驼峰命名法；
例如：MyComponent.vue\textrm{MyComponent.vue}MyComponent.vue


3. Prop参数命名
采用小驼峰命名法；
例如：orderId\textrm{orderId}orderId


4. method自定义函数命名
采用小驼峰命名法；
前缀应该为动词；
例如：isNaN, getData\textrm{isNaN, getData}isNaN, getData


5. data属性命名
采用小驼峰命名法；
例如：orderId\textrm{orderId}orderId



## 流程规范

需求迭代、开发、测试、上线的流程规范;研发如果没有完善的流程规范，项目快做完了可能自己都不一定清楚自己开发了哪些功能，管理上也会导致混乱。大致流程如下：

GIT规范
GIT版本、分支、代码提交日志规范；采用内部搭建GitLab管理公司项目代码。


分支管理

1. master主分支 
用于生产部署，一般由 uat 分支合并，任何情况下不允许直接在 master 分支上修改代码。
2. uat分支 
预上线分支，提供生产环境下用户测试使用;始终保持与 master 分支一致，一般由 sit 分支合并，不建议直接在此分支上直接修改代码，。
3. sit分支
测试分支，用于测试环境测试使用，根据项目需求大小来确定是否直接在此分支开发或者在开发者本地分支上进行开发。
4. dev分支
开发分支，用于开发新需求，需求上线发布成功后，开发人员删除此分支。



版本管理

1. 版本号使用x.x.x进行定义.
2. 第一个X代表大版本，一个大迭代代表一个版本。 
3. 第二个X代表小版本，一个大迭代可以分成几个小版本。 
4. 第三个X代表线上BUG修正。



日志规范
为了方便项目管理，git commit 信息最好按照一定的格式规范，使用良好的Commit Message有利于代码审查，能更快速查找变更记录。规范格式如下：

```html
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
```



<footer>


type为必填项，用于指定commit的类型.

```js
常用type：
    feat：新曾功能或功能变更
    fix：修复bug
其他type:    
    docs：文档提交
    build：修改项目的的构建工具或外部依赖（webpack、glup等）
    style：主要是样式方面的优化、如删除空格、改变缩进、单双引号切换等，并不会影响代码逻辑的修改
    refactor：代码重构
    revert：回滚某个更早的提交
    ci：修改项目的持续集成流程（Kenkins、Travis等）的提交
    chore：构建过程或辅助工具的变化
    pref：性能、体验相关的提交
    test：测试相关的开发
```


subject.

```js
commit的简短描述，如果有团队管理工具(issue ,JIRA)等，以内部命名的需求代号作为描述信息的一部分。
举例：
feat:##需求代号 开发XXX需求
```


body.

```js
body填写详细描述，针对比较重要或复杂的情况进行详细描述。
```


footer.

```js
备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接。
例如：
Closes XX-0001
fix #JIRA_ID
```

