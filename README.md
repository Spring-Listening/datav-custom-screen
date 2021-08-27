<!--
 * @Descripttion: 
 * @version: 
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-08-12 15:56:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-27 12:21:20
-->
# datav-custom-screen

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Docker
```
# 打包镜像
docker image build ./ -t hello-docker:1.0.0 

# 生成容器
docker container create -p 2333:80 hello-docker:1.0.0

# 启动容器
docker container start xxx # xxx 为上一条命令运行得到的结果

# 查看容器列表
docker container ls

# 查看镜像列表
docker image ls
```
