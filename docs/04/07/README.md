# seata部署

## 部署配置文件

![image-20210528102058926](https://tva1.sinaimg.cn/large/008i3skNgy1gqxxevu050j315q0u0tgv.jpg)

![image-20210528102135016](https://tva1.sinaimg.cn/large/008i3skNgy1gqxxfhzptwj31mv0u0q7w.jpg)

```nginx
registry {
    type = "nacos"
    nacos {
      cluster = "default"
      namespace = "903b3e07-ae29-431f-95ce-ab565c5faf28"
      username = "nacos"
      password = "jsyk@123"
      application = "seata-server"
      serverAddr = "nacos-server.global:8848"
      group = "SEATA_GROUP"
    }
}
config {
  type = "nacos"
  nacos {
    cluster = "default"
    namespace = "903b3e07-ae29-431f-95ce-ab565c5faf28"
    username = "nacos"
    password = "jsyk@123"
    serverAddr = "nacos-server.global:8848"
  }
}
```

## 部署应用

镜像配置: 

```bash
seataio/seata-server:1.3.0
```

![image-20210528102346739](https://tva1.sinaimg.cn/large/008i3skNgy1gqxxhrzuhjj31zk0f0jt5.jpg)

端口配置: 

```bash
8091
```

![image-20210528102435224](https://tva1.sinaimg.cn/large/008i3skNgy1gqxximj404j31xq09ugmu.jpg)

环境变量配置: 

```bash
SEATA_CONFIG_NAME=file:/root/seata-config/registry
```

![image-20210528102508139](https://tva1.sinaimg.cn/large/008i3skNgy1gqxxj6xxo4j31wa0iyju5.jpg)

数据卷配置:

![image-20210528102702941](https://tva1.sinaimg.cn/large/008i3skNgy1gqxxl6l5hij31tp0u0q7a.jpg)

![image-20210528102609192](https://tva1.sinaimg.cn/large/008i3skNgy1gqxxk92jwij31w50u0adp.jpg)