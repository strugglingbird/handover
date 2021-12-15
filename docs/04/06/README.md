# nacos部署

## 部署配置文件

![image-20210528102058926](https://tva1.sinaimg.cn/large/008i3skNgy1gqxxevu050j315q0u0tgv.jpg)

![image-20210528103016070](https://tva1.sinaimg.cn/large/008i3skNgy1gqxxoj5r79j31le0u0n1x.jpg)

```nginx
mysql.db.name = nacos
mysql.host =192.168.1.89
mysql.password = jsyk@123
mysql.port = 3306
mysql.user = root
```

## 部署应用

镜像配置: 

```bash
nacos/nacos-server:1.4.2
```

![image-20210528103203748](https://tva1.sinaimg.cn/large/008i3skNgy1gqxxqehwchj31x60dotag.jpg)

端口配置: 

```bash
8848
```

![image-20210528103230618](https://tva1.sinaimg.cn/large/008i3skNgy1gqxxqv7o13j31xo08sdgz.jpg)

环境变量配置: 



```nginx
# 键：	 	 
MODE = cluster

NACOS_REPLICAS = 3

NACOS_SERVERS =	nacos-server-0.nacos-server.global.svc.cluster.local:8848 nacos-server-1.nacos-server.global.svc.cluster.local:8848 nacos-server-2.nacos-server.global.svc.cluster.local:8848

PREFER_HOST_MODE = hostname
 	

# 引用其他资源:
Config Map		nacos-cm		mysql.db.name		以		MYSQL_SERVICE_DB_NAME

Config Map		nacos-cm		mysql.host			以		MYSQL_SERVICE_HOST

Config Map		nacos-cm		mysql.password	以		MYSQL_SERVICE_PASSWORD

Config Map		nacos-cm		mysql.port			以		MYSQL_SERVICE_PORT

Config Map		nacos-cm		mysql.user			以		MYSQL_SERVICE_USER
```

![image-20210528103307629](https://tva1.sinaimg.cn/large/008i3skNgy1gqxxrie5nsj31e00u045d.jpg)

健康检查配置:

```
请求路径: /nacos/actuator/health
容器端口: 8848
```

![image-20210528103933276](https://tva1.sinaimg.cn/large/008i3skNgy1gqxxy75qnrj317g0u0ais.jpg)