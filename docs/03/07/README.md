# rancher中nginx-ingress的配置获取真实IP地址

解决nginx-ingress无法从4层负载均衡器通过`protocol`协议转发的请求中获取客户端的真实IP地址问题

## 配置rancher

- 切换到【System】项目中

  ![image-20210528111636735](https://tva1.sinaimg.cn/large/008i3skNgy1gqxz0r34fwj31xy0hqdji.jpg)

- 进入【配置映射】中

  ![image-20210528111714893](https://tva1.sinaimg.cn/large/008i3skNgy1gqxz1ey0a7j31x80dg778.jpg)

- 找到命名空间**ingress-nginx**中的**nginx-configuration**配置

  ![image-20210528111830698](https://tva1.sinaimg.cn/large/008i3skNgy1gqxz2q80l4j31zy0ig41h.jpg)

- 打开配置编辑

  ![image-20210528112017153](https://tva1.sinaimg.cn/large/008i3skNgy1gqxz4kzryaj31z00ii41u.jpg)

- 添加

  |             键             |  值  |
  | :------------------------: | :--: |
  | compute-full-forwarded-for | true |
  |   use-forwarded-headers    | true |
  |     use-proxy-protocol     | true |

  ![image-20210528121918990](https://tva1.sinaimg.cn/large/008i3skNgy1gqy0u1k9pij31uj0u0dkh.jpg)



## 配置负载均衡服务器nginx

- 登陆服务器

  ```bash
  ssh root@192.168.1.71
  ```

- 修改nginx配置文件

  ```bash
  [root@rancher-lb ~]# cd /etc/nginx/
  [root@rancher-lb nginx]# ls
  cert    data            mime.types  nginx.conf   uwsgi_params
  conf.d  fastcgi_params  modules     scgi_params
  [root@rancher-lb nginx]# vi nginx.conf
  ```

  增加

  ```nginx
  server {
  	proxy_protocol on;
  	listen     443;
  	proxy_pass rancher_servers_https;
  }
  ```

  ![image-20211217135208601](https://tva1.sinaimg.cn/large/008i3skNgy1gxgsb5jazaj30u0113n0f.jpg)

- 重启nginx

  ```bash
  nginx -s reload
  ```

  