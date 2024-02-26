# frontend-watch-dog

## 快速开始

1. 安装Docker 官网：https://www.docker.com/

2. 安装docker-compose 下载地址：https://github.com/docker/compose/releases

3. 进入到service目录，修改hostIP

```shell
# 改成你的本地IP地址
export hostIP='192.168.104.105'
```
4. 进入到service目录,执行安装docker基础服务
```shell
./start-docker-compose.sh
```
5. 安装依赖
```shell
yarn install

yarn dev
```

## 目录说明
```shell
|-- desktop                                                          // 监控后台系统
|-- packages                                                         // 上报SDK
|   |-- web-sdk
|-- service                                                          // 监控服务端
```

### 实现功能

```test
- [ ] content
- [x] content
```

- [x] 流量分析（UV、PV、IP分析模型）
  - [x] 新用户趋势
  - [x] 今日流量
  - [x] 分时流量
  - [x] 每日流量
- [x] 性能分析
  - [x] 综合应用性能（网页平均性能）
  - [x] Top性能分析