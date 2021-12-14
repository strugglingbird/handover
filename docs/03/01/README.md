# 使用rancher搭建kubenetes高可用集群

## 配置清单

| hostname      | ip           | 配置  |
| :------------ | :----------- | :---- |
| rancher-lb    | 192.168.0.80 | 2核2G |
| rancher-node1 | 192.168.0.81 | 2核4G |
| rancher-node2 | 192.168.0.82 | 2核4G |
| rancher-node3 | 192.168.0.83 | 2核4G |

> 以上配置为最低要求配置，实际情况可按需求添加配置或伸缩节点，rancher-node最少可为1个节点，其中安装etcd节点最好为奇数节点，否则会出现脑裂。



## 环境初始化

所有机器都要执行

```bash
# 关闭防火墙
systemctl stop firewalld
systemctl disable firewalld

# 关闭selinux
sed -i 's/enforcing/disabled/' /etc/selinux/config  # 永久
setenforce 0  # 临时

# 关闭swap
swapoff -a  # 临时
sed -ri 's/.*swap.*/#&/' /etc/fstab    # 永久

# 根据规划设置主机名
hostnamectl set-hostname k8s-master1

yum install wget vim -y

# 修改yum源
cd /etc/yum.repos.d/ 

wget http://mirrors.163.com/.help/CentOS7-Base-163.repo

mv CentOS-Base.repo CentOS-Base.repo.bak

mv CentOS7-Base-163.repo CentOS-Base.repo

# 配置kubernetes源

cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
       http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

yum clean all 

yum makecache 

yum update -y

# 安装docker
# step 1: 安装必要的一些系统工具
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# Step 2: 添加软件源信息
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# Step 3: 更新并安装 Docker-CE
sudo yum makecache fast

yum -y install docker-ce-19.03.12-3.el7
# Step 4: 开启Docker服务
systemctl start docker
systemctl enable docker

# 修改docker镜像源
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "data-root": "/home/docker",
  "registry-mirrors": ["https://q8tek117.mirror.aliyuncs.com"]
}
EOF

# 启动docker
sudo systemctl daemon-reload
sudo systemctl restart docker
sudo systemctl enable docker
```

#### 授权lb节点免密登陆其他节点

Lb 节点执行

```bash
# 生成私钥和公钥，一路回车
ssh-keygen -t rsa -b 4096

# 分发公钥到其他节点
ssh-copy-id -i root@192.168.100.81
ssh-copy-id -i root@192.168.100.82
ssh-copy-id -i root@192.168.100.83

```

#### 添加用户

非lb的其他节点执行

```bash
# 添加docker用户并添加至docker用户组
useradd -g docker docker
cp -r /root/.ssh /home/docker/
chown -R docker:docker /home/docker/.ssh
```

> **注意:** 这个步骤一定不能与上个步骤顺序执行相反，否则docker用户无法免密登陆

## 配置lb节点

该节点不是必须节点，云厂商可以使用负载均衡器

### 预先准备

#### 上传安装文件（rke、helm、cert-manager）

链接: https://pan.baidu.com/s/1N_tJ9aNsr-O6jd5OtlnvUw  密码: q68u

下载后并上传

```bash
[root@rke-lb rke-install]# pwd
/root/rke-install
[root@rke-lb rke-install]# ls
cert-manager  helm-v3.3.0-linux-amd64.tar.gz  rke_linux-amd64
# 将镜像分发到其他镜像，待其他节点安装
cd cert-manager
scp cert-manager*.gz root@192.168.100.81:
scp cert-manager*.gz root@192.168.100.82:
scp cert-manager*.gz root@192.168.100.83:
```

### 安装nginx

```nginx
rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm

yum install nginx -y

# 编辑配置文件
rm -rf /etc/nginx/nginx.conf
vi /etc/nginx/nginx.conf


worker_processes 4;
worker_rlimit_nofile 40000;
 
events {
  worker_connections 8192;
}
 
stream {
  upstream rancher_servers_http {
    least_conn;
    server 192.168.100.81:80 max_fails=3 fail_timeout=5s;
    server 192.168.100.82:80 max_fails=3 fail_timeout=5s;
    server 192.168.100.83:80 max_fails=3 fail_timeout=5s;
  }
  server {
    listen     80;
    proxy_pass rancher_servers_http;
  }
 
  upstream rancher_servers_https {
    least_conn;
    server 192.168.100.81:443 max_fails=3 fail_timeout=5s;
    server 192.168.100.82:443 max_fails=3 fail_timeout=5s;
    server 192.168.100.83:443 max_fails=3 fail_timeout=5s;
  }
  server {
    listen     443;
    proxy_pass rancher_servers_https;
  }
}

# 启动nginx
sudo systemctl daemon-reload
sudo systemctl restart nginx
```

### 安装kukectl

```bash
yum install kubectl -y
```

### 安装helm

```bash
cd /root/rke-install

tar -zxvf  helm-v3.2.4-linux-amd64.tar.gz

mv linux-amd64/helm /usr/local/bin

# 添加 Helm Chart 仓库
helm repo add rancher-stable https://releases.rancher.com/server-charts/stable
```



## 开始安装k8s集群

以下操作均在lb节点上执行

#### 编辑配置文件，并保存命名为`rancher-cluster.yml`

将`nodes`列表中的`address`和`internal_address` 替换为您创建的 3 个节点的 IP 地址或 DNS 名称

```yaml
nodes:
  - address: 192.168.100.81
    internal_address: 192.168.100.81
    user: docker
    role: [controlplane, worker, etcd]
  - address: 192.168.100.82
    internal_address: 192.168.100.82
    user: docker
    role: [controlplane, worker, etcd]
  - address: 192.168.100.83
    internal_address: 192.168.100.83
    user: docker
    role: [controlplane, worker, etcd]

services:
  etcd:
    snapshot: true
    creation: 6h
    retention: 24h
```

> TIPS:
>
> 如果在执行上面的命令之前检查过命令的话会发现三台node都创建了一个名为docker的用户，并且用户组为docker，这是因为centos的docker是以root用户运行的，但rke的安装不能用root用户来执行命令。所以需要建立一个用户，并将其加入docker组，而这个用户可以实其他名字而不一定为docker
>
> **注意事项:** 如果您的节点具有公网和内网地址，建议在`internal_address`一栏输入内网地址，以便 Kubernetes 将其用于集群内部通信。如果使用自身安全组或防火墙，则某些云服务供应商强制要求设置 `internal_address:`
>
> ###  RKE 节点通用选项
>
> | 选项               | 是否必选 | 描述                                                   |
> | ------------------ | -------- | ------------------------------------------------------ |
> | `address`          | 是       | 公共 DNS 或 IP 地址                                    |
> | `user`             | 是       | 可以执行 docker 命令的用户                             |
> | `role`             | 是       | 给节点分配的 Kubernetes 角色列表                       |
> | `internal_address` | 否       | 给集群内部流量使用的私有 DNS 或者 IP 地址              |
> | `ssh_key_path`     | 否       | 用来登录节点的 SSH 私钥路径 ，默认值为 `~/.ssh/id_rsa` |

####  运行 RKE

输入以下命令，运行 RKE 节点。

```bash
cd /root/rke-install
mv rke_linux-amd64 rke
chmod +x rke
./rke up --config ./rancher-cluster.yml
```

运行结束后返回 `Finished building Kubernetes cluster successfully`，表示正常运行。

#### 存放kubectl配置文件

接下来要将kube_config_rancher-cluster.yml放置到指定位置，使kubectl能够正常访问kubenetes集群

```bash
mkdir $HOME/.kube && cp kube_config_rancher-cluster.yml $HOME/.kube/config
```

验证并检查所有Pods的情况

```bash
kubectl get pods --all-namespaces
```

## 安装Rancher

### 安装方式选择

Rancher安装默认需要 SSL/TLS 配置来保证访问的安全性，因此在安装前需要确定你使用哪一种证书安装方式，一般由以下2种证书安装方式，两种方式2选1即可。

-  方案一： 由Rancher生成证书安装
- 方案二： 用自己已有的证书安装

方案对比：

| 设置                                                         | Chart 选项                       | 描述                                                       | 是否需要 cert-manager                                        |
| ------------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| [Rancher 自签名证书](https://rancher2.docs.rancher.cn/docs/installation/options/helm2/helm-rancher/_index#rancher-自签名证书) | `ingress.tls.source=rancher`     | 使用 Rancher 生成的 CA 签发的自签名证书 此项为**默认选项** | [是](https://rancher2.docs.rancher.cn/docs/installation/options/helm2/helm-rancher/_index#选装：安装-cert-manager) |
| [Let’s Encrypt](https://rancher2.docs.rancher.cn/docs/installation/options/helm2/helm-rancher/_index#lets-encrypt) | `ingress.tls.source=letsEncrypt` | 使用[Let's Encrypt](https://letsencrypt.org/)颁发的证书    | [是](https://rancher2.docs.rancher.cn/docs/installation/options/helm2/helm-rancher/_index#选装：安装-cert-manager) |
| [您已有的证书](https://rancher2.docs.rancher.cn/docs/installation/options/helm2/helm-rancher/_index#您已有的证书) | `ingress.tls.source=secret`      | 使用您的已有证书（Kubernetes 密文）                        | 否                                                           |

> 仅由 Rancher 生成的 CA `ingress.tls.source=rancher` 和 Let's Encrypt 颁发的证书 `ingress.tls.source=letsEncrypt` 才需要 cert-manager。如果您使用自己的证书文件 `ingress.tls.source=secret` 或者[使用外部 TLS 负载均衡器](https://rancher2.docs.rancher.cn/docs/installation/options/helm2/helm-rancher/chart-options/_index#外部-tls-termination)可以不需要[安装cert-manager](#安装 cert-manager)。

### 方案一：由Rancher生成证书安装

#### 安装 cert-manager

- 单独安装 CustomResourceDefinition 资源

  ```bash
  kubectl apply -f cert-manager.crds.yaml
  ```

- 为 cert-manager 创建命名空间

  ```bash
  kubectl create namespace cert-manager
  ```

- 标记 cert-manager 命名空间，禁用资源验证

  ```bash
  kubectl label namespace cert-manager certmanager.k8s.io/disable-validation=true
  ```

- 添加 Jetstack Helm repository

  ```bash
  helm repo add jetstack https://charts.jetstack.io
  ```

- 更新本地的 Helm chart repository 缓存

  ```bash
  helm repo update
  ```

- 加载helm安装cert-manager时所需要的docker镜像

  在所有非lb节点执行以下命令，如果是科学上网可忽略此步骤

  ```bash
  docker load -i cert-manager-webhook.tar.gz
  
  docker load -i cert-manager-cainjector.tar.gz
  
  docker load -i cert-manager.tar.gz
  ```

- 使用 Helm chart 安装 cert-manager

  ```bash
  helm install \
    cert-manager \
    jetstack/cert-manager \
    --namespace cert-manager \
    --version v0.13.0
  ```

- 安装 cert-manager 以后，您可以通过检查 cert-manager 命名空间下的 pod 运行状态来验证部署是否正确：

  ```bash
  kubectl get pods --namespace cert-manager
  
  NAME                                            READY   STATUS      RESTARTS   AGE
  cert-manager-7cbdc48784-rpgnt                   1/1     Running     0          3m
  cert-manager-webhook-5b5dd6999-kst4x            1/1     Running     0          3m
  cert-manager-cainjector-3ba5cd2bcd-de332x       1/1     Running     0          3m
  ```

#### rancher安装

```bash
# 创建命名空间
kubectl create namespace cattle-system

# 安装
helm install \
  rancher \
  rancher-stable/rancher \
  --namespace cattle-system \
  --set hostname=k8s.ecolovo.icu
```

> TIPS:
>
> 将hostname替换成解析道lb节点的域名地址



### 方案二：用自己已有的证书安装

#### 添加 Kubernetes TLS 密文

**申请颁发证书**

阿里云证书一般选择下载tomcat类型证书，下载解压后会得到`xxx_domain.pfx`和`pfx-password.txt`

```bash
# 转换证书得到pem证书，执行该命令时需要输入pfx-password.tx中的密码
openssl pkcs12 -in xxx_domain.pfx -nodes -out cacerts.pem

openssl rsa -in cacerts.pem -out tls.key
openssl x509 -in cacerts.pem -out tls.crt
```

使用 `kubectl` 来创建 `tls` 类型的密文。

```
kubectl -n cattle-system create secret tls tls-rancher-ingress \
  --cert=tls.crt \
  --key=tls.key
```

> **提示：** 如果您想要更换证书，您可以使用 `kubectl -n cattle-system delete secret tls-rancher-ingress` 来删除 `tls-rancher-ingress` 密文，之后使用上面的命令创建一个新的密文。如果您使用的是私有 CA 签发的证书，仅当新证书与当前证书是由同一个 CA 签发的，才可以替换。

**提供 CA 证书的副本**

如果您使用的是私有 CA，Rancher 需要您提供 CA 证书的副本，用来校验 Rancher Agent 与 Server 的连接。

拷贝 CA 证书到名为 cacerts.pem 的文件，使用 kubectl 命令在 cattle-system 命名空间中创建名为 tls-ca 的密文。

```bash
kubectl -n cattle-system create secret generic tls-ca \
  --from-file=cacerts.pem=./cacerts.pem
```

#### rancher安装

如果您使用的是私有CA证书，请在命令中增加 `--set privateCA=true`：

```bash
helm install \
  rancher \
  rancher-stable/rancher \
  --namespace cattle-system \
  --set hostname=k8s.ecolovo.icu \
  --set ingress.tls.source=secret \
  --set privateCA=true
```

### 运行

输入地址：https://rancher.my.org

修改密码：

```bash
kubectl -n cattle-system exec $(kubectl -n cattle-system get pods -l app=rancher | grep '1/1' | head -1 | awk '{ print $1 }') -- reset-password
New password for default administrator (user-xxxxx):
<new_password>
```



## 遇到的问题

问题一：

安装时报错：

```bash
FATA[0215] Failed to get job complete status for job rke-network-plugin-deploy-job in namespace kube-system
```

遇到这个问题，重新执行`./rke up --config ./rancher-cluster.yml`即可


## 运维

### 更新证书

```bash
./rke cert rotate --config ./rancher-cluster.yml
```
