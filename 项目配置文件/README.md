## 升级到pnpm步骤
1. nodejs 升级到18以上
2. 安装pnpm:  npm install -g pnpm
3. 项目根目录创建.npmrc文件，内容如下：
```
shamefully-hoist = true
auto-install-peers =true
strict-peer-dependencies = false
```
4. 删除 node_modules
5. 导入yarn 依赖包： pnpm import
6. 安装： pnpm i
7. 删除 yarn.lock
8. 添加pnpm-lock.yaml 和 .npmrc 两个文件到git仓库
9. 使用: 编译构建 pnpm build， 调试： pnpm serve

## 升级后的问题
1. 本地编译报错：Error: error:0308010C:digital envelope routines::unsupported
   解决方案：设置环境变量：NODE_OPTIONS=--openssl-legacy-provider
```shell
#Linux & Mac OS：
export NODE_OPTIONS=--openssl-legacy-provider
#Windows：
set NODE_OPTIONS=--openssl-legacy-provider
```


##  pnpm 安装问题
   安装pnpm
   ```
   npm install -g pnpm@latest
   ```
   pnpm 对node版本有要求 最好使用最新node  目前版本 18 以上

   重新安装依赖
   ```
   pnpm i
   ```

   运行
   ```
   pnpm run serve
   ```

## 开发环境 升级配置
package.json 依赖版本使用beta 版本~  自动升级小版本号 例如: "@hexai.jarvis/bs-ui": "3.7.-beta.1"
流水线版本升级不用 手动升级 会自动打包成beta 版本, 打tag 包会升级到正式版本


## pnpm lib 成功 但是报错
[参考:https://blog.csdn.net/m0_48300767/article/details/131450325]
package.json 配置
```
 "lib": "export NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build --target lib --name xms-bo-ui --dest lib src/index.js",
```

