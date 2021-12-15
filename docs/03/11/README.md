# rancher的域名证书更新(k8s.ecolovo.com)

rancher的管理页面也是通过配置https域名来访问的，此时该域名也存在过期问题处理

切换到`Local` -> `System`命名空间下

![image-20211215144357737](https://tva1.sinaimg.cn/large/008i3skNgy1gxeikghmvfj31fn0u0djp.jpg)

切换到`资源` -> `密文`

![image-20211215144455910](https://tva1.sinaimg.cn/large/008i3skNgy1gxeilgf110j31ww0f8gok.jpg)

切换到`证书列表`

![image-20211215144537317](https://tva1.sinaimg.cn/large/008i3skNgy1gxeim6krogj31tg0u0jx4.jpg)

找到该域名点击`升级`

![image-20211215144634784](https://tva1.sinaimg.cn/large/008i3skNgy1gxein6axqdj31ma0u0dkp.jpg)

上传私钥和公钥`保存`即可

![image-20211215144727113](https://tva1.sinaimg.cn/large/008i3skNgy1gxeio2vvvoj31gs0u00yi.jpg)