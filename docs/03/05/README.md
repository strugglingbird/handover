# rancher安装nfs-client-provisioner动态提供nfs存储

### 第一步现在先添加应用商店：

商店1地址：

http://mirror.azure.cn/kubernetes/charts-incubator/
商店2地址：

 http://mirror.azure.cn/kubernetes/charts/
路径如下：全局-工具-商店设置-添加应用商店

 

### 第二步：启用应用商店，搜索 nfs-client-provisioner 进行安装，

添加应答编辑框输入，nfs-server的ip地址与共享路径

nfs.server  192.168.101.12
nfs.path  /nfs

点击启动即可。

以下为图示:

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gqpplzlganj31ck0kt419.jpg)

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gqppmezcsrj31cg0h0dgj.jpg)

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gqppmuf99ej31db0j1q40.jpg)

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gqppna9zfkj31ap0pm0v1.jpg)

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gqppnqnbq5j31cq0r1q5c.jpg)

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gqppo6jpphj318n0ezmxp.jpg)

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gqppoo0c3bj31dp0ibmy4.jpg)

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gqppp770raj31ak0gomxy.jpg)



![img](https://tva1.sinaimg.cn/large/008i3skNgy1gqpppja7a1j31f10q4wib.jpg)

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gqpppxuuzqj316w0ohad1.jpg)

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gqppq7o2ndj318e0gz0vq.jpg)



通过以上操作建立了nfs-client-provisioner之后，就可以在创建pvc中，选择nfs-client卷来由nfs-server服务器动态提供存储了，图示如下：

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gqppqmtkd6j318e0gz0vj.jpg)

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gqppr6agjdj31dz0kj0v7.jpg)