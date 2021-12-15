# gateway负载均衡部署

## 规则配置:

![image-20210528110226745](https://tva1.sinaimg.cn/large/008i3skNgy1gqxym0rtw8j31sv0u0gpl.jpg)

## 证书配置:

![image-20210528110306437](https://tva1.sinaimg.cn/large/008i3skNgy1gqxympbwoej31xo0l80v6.jpg)

## 标签/注释配置:

添加注释:

```
nginx.ingress.kubernetes.io/proxy-body-size = 100m
```

![image-20210528110524290](https://tva1.sinaimg.cn/large/008i3skNgy1gqxyp399sjj31x00kcdk4.jpg)