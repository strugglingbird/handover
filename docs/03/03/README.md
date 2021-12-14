# rancher升级kubernates版本

### 下载最新版本RKE

- 进入rke的[下载页](https://github.com/rancher/rke/releases)进行下载

- 下载完成后将下载的文件命名成rke并替换掉原来的rke执行文件

  ![image-20210527164402261](https://tva1.sinaimg.cn/large/008i3skNgy1gqx2v69b9fj31ra068760.jpg)

### 升级版本

- 查看rke支持kubernates的版本号

  ```bash
  [root@lb rke-install]# ./rke config --list-version --all
  v1.19.10-rancher1-1
  v1.17.17-rancher2-3
  v1.18.18-rancher1-2
  v1.20.6-rancher1-1
  ```

- 修改集群配置文件`rancher-cluster.yml`

  ```yaml
  nodes:
    - address: 192.168.1.72
      internal_address: 192.168.1.72
      user: docker
      role: [controlplane, worker, etcd]
    - address: 192.168.1.73
      internal_address: 192.168.1.73
      user: docker
      role: [controlplane, worker, etcd]
    - address: 192.168.1.74
      internal_address: 192.168.1.74
      user: docker
      role: [controlplane, worker, etcd]
    - address: 192.168.1.82
      internal_address: 192.168.1.82
      user: docker
      role: [controlplane, worker, etcd]
  services:
    etcd:
      snapshot: true
      creation: 6h
      retention: 24h
  # 在这里修改版本号
  kubernetes_version: v1.20.6-rancher1-1
  ```

- 执行更新命令

  ```bash
  [root@lb rke-install]# ./rke up --config rancher-cluster.yml
  ...
  INFO[2860] [dns] DNS provider coredns deployed successfully
  INFO[2860] [addons] Setting up Metrics Server
  INFO[2860] [addons] Saving ConfigMap for addon rke-metrics-addon to Kubernetes
  INFO[2860] [addons] Successfully saved ConfigMap for addon rke-metrics-addon to Kubernetes
  INFO[2860] [addons] Executing deploy job rke-metrics-addon
  INFO[2870] [addons] Metrics Server deployed successfully
  INFO[2870] [ingress] Setting up nginx ingress controller
  INFO[2870] [addons] Saving ConfigMap for addon rke-ingress-controller to Kubernetes
  INFO[2870] [addons] Successfully saved ConfigMap for addon rke-ingress-controller to Kubernetes
  INFO[2870] [addons] Executing deploy job rke-ingress-controller
  INFO[2880] [ingress] ingress controller nginx deployed successfully
  INFO[2880] [addons] Setting up user addons
  INFO[2880] [addons] no user addons defined
  INFO[2880] Finished building Kubernetes cluster successfully
  ```

  

