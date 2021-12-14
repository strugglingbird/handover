# rancher配置负载均衡添加访问路径转发后端服务

### 配置规则

添加访问路径

```bash
/eco-crm(/|$)(.*)
```

![image-20210609090751135](https://tva1.sinaimg.cn/large/008i3skNgy1grbqqh4otnj31760u0457.jpg)

### 配置标签/注释

添加注释

```
nginx.ingress.kubernetes.io/rewrite-target=/$2
```

![image-20210609090909266](https://tva1.sinaimg.cn/large/008i3skNgy1grbqrtvpkgj31ww0mwjvf.jpg)

