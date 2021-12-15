# 负载均衡器的使用

负载均衡器一般用于对阿里云内部所有部署的应用进行单独的路由负载（包括ESC和K8S部署的应用）即网关入口，并对外暴露一个高可用的负载地址。

> 这里面引用了一个现实的场景需求：
>
> 千瓣莲商城这个应用需要通过负载均衡单独配置外部的访问入口，并且这个项目同时部署在ECS和K8S中，之所以这么做主要就是防止任意一方出现故障可以做到及时切换。

## 配置负载均衡实例

1.切换到菜单栏找到负载均衡应用

![image-20211215090136926](https://tva1.sinaimg.cn/large/008i3skNgy1gxe8o8zzv9j31l60u0q7t.jpg)

2.进入到实例一般通过点击创建实例就可以看到下方的实力列表了（这里我们就略掉实例的创建方式，主要看如何配置实例的负载规则）

![image-20211215091058485](https://tva1.sinaimg.cn/large/008i3skNgy1gxe8xzrupej31vq0u0q70.jpg)

3.配置实例的负载规则

3.1 创建玩实例之后点击进入实例详情并切换到监听选项

![image-20211215091445777](https://tva1.sinaimg.cn/large/008i3skNgy1gxe91xh6rgj31uf0u041o.jpg)

3.2 这里我们是https访问因此监听的端口肯定是443

![image-20211215091602363](https://tva1.sinaimg.cn/large/008i3skNgy1gxe939m8eej31rq0u0juk.jpg)

3.3 这里我们选择一个服务器组，如果没有点击创建并[配置服务器组](#配置服务器组)

![image-20211215091706109](https://tva1.sinaimg.cn/large/008i3skNgy1gxe94d091mj328s0tewhe.jpg)

3.4 配置玩服务器组提交配置即可

![image-20211215101319960](https://tva1.sinaimg.cn/large/008i3skNgy1gxeaqve1ayj31h60u042c.jpg)

3.5 提交完便出现一条监听实例

![image-20211215101403660](https://tva1.sinaimg.cn/large/008i3skNgy1gxearlz39ej328y0d2n08.jpg)

3.6 编辑规则

点击查看/编辑转发规则

![image-20211215101838761](https://tva1.sinaimg.cn/large/008i3skNgy1gxeawe0ehqj329e0iejul.jpg)

这里会出现一个默认配置，一般不用改改动，如果有特殊的路由规则可以添加配置（类似nginx的路由配置）

![image-20211215101914123](https://tva1.sinaimg.cn/large/008i3skNgy1gxeax07tdpj321c0u0wiy.jpg)

3.7 管理证书

管理证书一般是针对https访问时需要我们配置域名证书，来保证https可以正常访问

点击管理证书

![image-20211215102025203](https://tva1.sinaimg.cn/large/008i3skNgy1gxeay8ix69j329e0i2whm.jpg)

点击添加扩展证书，选择一配置好的证书（详细配置请参考[证书管理](#证书管理)）

![image-20211215103341050](https://tva1.sinaimg.cn/large/008i3skNgy1gxebc1cucrj31nt0u00w3.jpg)

点击确定即可

![image-20211215103412330](https://tva1.sinaimg.cn/large/008i3skNgy1gxebckyv3xj327o0u0tc8.jpg)

## 配置服务器组

服务器组，一般是用于配置被负载的一群集群的后端应用服务，在这里我们可以配置ECS或者K8S中部署的应用

进入服务器组页面点击创建服务器组

![image-20211215095013403](https://tva1.sinaimg.cn/large/008i3skNgy1gxea2te2ygj31q30u0wh8.jpg)

配置基本信息

![image-20211215095349763](https://tva1.sinaimg.cn/large/008i3skNgy1gxea6kl8srj30u00yp0u6.jpg)

配置健康检查

![image-20211215095440787](https://tva1.sinaimg.cn/large/008i3skNgy1gxea7gfydyj30u00yy403.jpg)

这里我们选择已经创建好的健康检查规则，具体配置规则请参考[配置健康检查](#配置健康检查)

![image-20211215095547776](https://tva1.sinaimg.cn/large/008i3skNgy1gxea8m41tyj30yn0u0dhs.jpg)

点击创建后，便可看到一条服务器组记录

![image-20211215095700460](https://tva1.sinaimg.cn/large/008i3skNgy1gxea9waerzj31xs0u041y.jpg)



配置后端服务器

![image-20211215095812682](https://tva1.sinaimg.cn/large/008i3skNgy1gxeab4mndkj329m0fqju6.jpg)



选择需要添加的节点，这里我们选择分别部署在ECS和K8S中的商城应用所属的两组类别服务器节点

![image-20211215100309805](https://tva1.sinaimg.cn/large/008i3skNgy1gxeagawkovj31oh0u0tem.jpg)

配置负载的端口的权重

这里我们在k8s中配置服务的暴露端口是30250，而在ECS单机节点部署暴露的端口是8050，并且对K8S的服务访问权重为100，对ECS单机节点服务访问权重为0，即我们的访问流量会100%的命中K8S节点上，而ECS单机部署节点则不会被命中。

![image-20211215100422018](https://tva1.sinaimg.cn/large/008i3skNgy1gxeahjfezkj328s0osjw2.jpg)

## 配置健康检查

健康检查一般主要是解决后端服务节点不可用时，我们的流量不会被负载到这种不可用的节点，这样即使某个节点挂掉之后我们的应用仍然不会收到影响。

进入健康检查页面点击创建健康检查

![image-20211215101005362](https://tva1.sinaimg.cn/large/008i3skNgy1gxeani0eloj31s30u0q59.jpg)

![image-20211215103528353](https://tva1.sinaimg.cn/large/008i3skNgy1gxebdw956bj30tk13wdi5.jpg)

![image-20211215103610520](https://tva1.sinaimg.cn/large/008i3skNgy1gxebemr8e9j30tg166mzl.jpg)



## 证书管理

证书一般用于负载实例监听配置了https访问，需要提在这里配置好的证书

点击进入证书管理 -> 创建证书

![image-20211215103833961](https://tva1.sinaimg.cn/large/008i3skNgy1gxebh4n6abj31p50u0dje.jpg)

> TIPS:
>
> 1.如果是阿里云证书并且所属当前阿里云账号直接选择阿里云颁发证书即可，如果是非该账号下的证书选择上传非阿里云签发证书。
>
> 2.上传非阿里云签发证书上传nginx证书类型的公钥和私钥创建即可