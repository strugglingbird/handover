# 容器服务Kubernetes的使用

打开阿里云选择【`容器服务Kubernetes版`】并进入

![image-20211214170320008](https://tva1.sinaimg.cn/large/008i3skNgy1gxdgz7csroj311d0u0ado.jpg)

## 节点扩容

进入`集群` -> `节点管理` -> `节点` -> `集群扩容`

![image-20211214170753951](https://tva1.sinaimg.cn/large/008i3skNgy1gxdh3wu3ixj31oq0u0teg.jpg)

## 应用管理

### 创建应用

![image-20211214173606897](https://tva1.sinaimg.cn/large/008i3skNgy1gxdhx9ny54j31te0u0wit.jpg)

配置参数请参考下图：

![image-20211215081457106](https://tva1.sinaimg.cn/large/008i3skNgy1gxe7br4q9tj30u01l9n17.jpg)

### 更新应用

更新应用一般都是通过云效Devops的流水线来发布新版本应用

1.打开[云效Devops](https://flow.aliyun.com/my)

![image-20211215081752904](https://tva1.sinaimg.cn/large/008i3skNgy1gxe7er2887j32l40o8ae8.jpg)

2.对于已创建的流水线在更新代码后直接点击运行即可

![image-20211215082056413](https://tva1.sinaimg.cn/large/008i3skNgy1gxe7hxhq25j32l80mc78l.jpg)

3.对于未创建的流水线则需要我们创建一个新的流水线

点击新建流水线

![image-20211215082124195](https://tva1.sinaimg.cn/large/008i3skNgy1gxe7iee3uvj32la0n4jvn.jpg)

任选一个企业模版

![image-20211215082329541](https://tva1.sinaimg.cn/large/008i3skNgy1gxe7kkvw5pj31rt0u0q7y.jpg)

以后端模版为例

配置代码库

![image-20211215082544446](https://tva1.sinaimg.cn/large/008i3skNgy1gxe7mxqm4rj31lu0u077i.jpg)

配置docker推送的景象仓库

![image-20211215082722519](https://tva1.sinaimg.cn/large/008i3skNgy1gxe7omi2ogj31li0u0diu.jpg)

配置kubectl发布参数

![image-20211215082828780](https://tva1.sinaimg.cn/large/008i3skNgy1gxe7proi1uj31lk0u0770.jpg)

配置完成之后点击保存并运行

![image-20211215082909014](https://tva1.sinaimg.cn/large/008i3skNgy1gxe7qgqd3vj32kl0u077k.jpg)

### 版本回退

找到工作负载，点击应用 -> 更多 -> 回滚

![image-20211215083015191](https://tva1.sinaimg.cn/large/008i3skNgy1gxe7rmc3tuj31xc0u00xv.jpg)

找到对应的版本号点击回滚即可

![image-20211215083139549](https://tva1.sinaimg.cn/large/008i3skNgy1gxe7t2ls4kj31l50u0443.jpg)

### 日志查询

进入应用详情页

![image-20211215083301816](https://tva1.sinaimg.cn/large/008i3skNgy1gxe7ui6ctoj320h0u0q7x.jpg)

切换到日志选项即可

![image-20211215083348052](https://tva1.sinaimg.cn/large/008i3skNgy1gxe7vaz7rkj31kz0u07de.jpg)

### 容器扩缩

1.临时方案（简单快捷，持久化方案不建议使用，因为一旦应用更新便会回到原来的副本数量）

点击伸缩

![image-20211215083828754](https://tva1.sinaimg.cn/large/008i3skNgy1gxe8069huaj32l20to7b0.jpg)

输入副本数量

![image-20211215083906017](https://tva1.sinaimg.cn/large/008i3skNgy1gxe80tpxiej32ep0u0n3j.jpg)

2.持久化方案（可用于长期策略，永久生效，需要配置代码）

找到项目的配置文件，修改代码中的副本数量，最后再进行[更新应用](#更新应用)

![image-20211215084249185](https://tva1.sinaimg.cn/large/008i3skNgy1gxe84owa2sj326i0u0gqt.jpg)

## 证书配置

一般我们项目API的域名证书即将到期之后需要重新配置新的证书

点击配置管理 -> 密保字典

![image-20211215084800906](https://tva1.sinaimg.cn/large/008i3skNgy1gxe8a39lr3j32l80s6te0.jpg)

输入域名和nginx证书的cert和key

![image-20211215084912598](https://tva1.sinaimg.cn/large/008i3skNgy1gxe8bby2aqj32l80t4wl9.jpg)

## 域名配置

域名配置一般是用于暴露服务的外部访问

点击网络 -> 路由 -> 创建

![image-20211215085353726](https://tva1.sinaimg.cn/large/008i3skNgy1gxe8g84l7rj32la0py0yc.jpg)

配置域名、路径、服务和证书之后即可

![image-20211215085600074](https://tva1.sinaimg.cn/large/008i3skNgy1gxe8iet2emj30u00xz413.jpg)

> 这里需要注意的是下方有个注解，一般不用配置，但这个也很重要，主要是设置k8s内部nginx的访问策略，比如这里就是设置代理访问的重定向路由策略（http://ma.ecolovo.com/api/xxx -> http://qbl-admin-svc/xxx）
>
> 具体规则请参考：
>
> [Annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/?spm=a2c4g.11186623.0.0.6d477faaPuHmVz)
