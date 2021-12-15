#  益客云一键单机部署示例

## 一、准备一台空置的服务器

- 可用内存不小于16GB
- 可用存储不低于200GB

## 二、安装docker

如果已安装过docker可以跳过此步骤

```bash
# step 1: 安装必要的一些系统工具
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

```bash
# Step 2: 添加软件源信息
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

```bash
# Step 3: 更新并安装 Docker-CE
sudo yum makecache fast
yum -y install docker-ce-19.03.12-3.el7
```

```bash
# Step 4: 修改docker镜像源
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
	# 指定docker容器的工作路径（尽量选择内存比较大的磁盘路径）
  "data-root": "/home/docker",
  "registry-mirrors": ["https://q8tek117.mirror.aliyuncs.com"]
}
EOF
```

```bash
# Step 5: 开启Docker服务
systemctl start docker
systemctl enable docker
```

## 三、安装应用

### 1、下载代码

```bash
git clone https://e.coding.net/ecolovo/ecolovo-cloud/ecolovo-cloud-deploy-script.git
```

### 2、上传代码

通过ftp工具将下载下来的代码上传值服务器上

### 3、执行启动脚本

```bash
# step 1: 进入脚本目录
cd ecolovo-cloud-deploy-script
```

```bash
# step 2: 执行启动脚本
./start-up.sh
```

> 如需修改启动的配置文件，如下路径：
>
> ![image-20211022120617287](https://tva1.sinaimg.cn/large/008i3skNgy1gvnyjsof2zj61qs0petby02.jpg)