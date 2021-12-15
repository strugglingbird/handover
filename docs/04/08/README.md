# nfs-client-provisioner部署

配置商店:

![image-20210528104949570](https://tva1.sinaimg.cn/large/008i3skNgy1gqxy8vvm07j31xg0jon0l.jpg)

![image-20210528105042529](https://tva1.sinaimg.cn/large/008i3skNgy1gqxy9t4jjcj31x00oa79i.jpg)

![image-20210528105104626](https://tva1.sinaimg.cn/large/008i3skNgy1gqxya6hxvdj311y0ligna.jpg)

名称:  `azure-library`

商店 URL 地址:  `http://mirror.azure.cn/kubernetes/charts/`

|  分支  |  范围   | Helm 版本 |
| :----: | :-----: | :-------: |
| master | project |  Helm v3  |

去商店搜索应用:

![image-20210528105443091](https://tva1.sinaimg.cn/large/008i3skNgy1gqxydzdl74j31yi0mgdj2.jpg)

![image-20210528105510452](https://tva1.sinaimg.cn/large/008i3skNgy1gqxyeg4o6cj31yi0l6tbz.jpg)

修改应答配置:

![image-20210528105606686](https://tva1.sinaimg.cn/large/008i3skNgy1gqxyffd7vaj31x00lkju8.jpg)

```nginx
nfs.path = /data/nfs
nfs.server = 192.168.1.79
```

