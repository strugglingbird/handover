# gateway部署

## 部署配置文件

![image-20210528102058926](https://tva1.sinaimg.cn/large/008i3skNgy1gqxxevu050j315q0u0tgv.jpg)

![image-20210528104250200](https://tva1.sinaimg.cn/large/008i3skNgy1gqxy1m09u2j31xa0oydjb.jpg)

```nginx
名称: env-cm
变量:
profile = prod-inner
```

## 部署应用

镜像配置: 

```bash
ecolovo-docker.pkg.coding.net/ecolovo-cloud/docker-repository/gateway:latest
```

![image-20210528104357592](https://tva1.sinaimg.cn/large/008i3skNgy1gqxy2s8t80j31x00dgq4s.jpg)

端口配置: 

```bash
8000
```

环境变量配置: 

```nginx
# 引用其他资源:
Config Map		env-cm		profile		以		PROFILE
```

![image-20210528104510529](https://tva1.sinaimg.cn/large/008i3skNgy1gqxy41mxhuj31wg0ja0v1.jpg)

健康检查配置:

```
请求路径: /actuator/health
容器端口: 8000
```

![image-20210528104629689](https://tva1.sinaimg.cn/large/008i3skNgy1gqxy5fepz2j317u0u011i.jpg)