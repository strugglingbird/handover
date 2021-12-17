# 节点磁盘不够用时如何处理

## 一、清理或迁移docker的存储目录

> docker用起来简单，但是要用到实际线上业务当中细节问题往往影响整个系统的稳定，比如docker容器在物理机上的数据卷问题。docker默认的根目录是/var/lib/docker，容器使用一段时间后会发现该目录所占磁盘会非常大，小到几个G，大到上百G，而/var/lib/docker所在的分区往往不大，此时就需要将该目录迁移到一个物理空间比较大的分区中，并修改docker的默认根目录。

具体步骤如下：

### 查看磁盘使用情况

查看磁盘使用情况

```bash
[root@rancher-node2 ~]# du -hs /var/lib/docker/
47G	/var/lib/docker/
```

查看Docker的磁盘使用情况

```bash
[root@rancher-node2 ~]# docker system df
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          32        9         8.661GB   5.789GB (66%)
Containers      16        12        181.9kB   0B (0%)
Local Volumes   3         3         78.36MB   0B (0%)
Build Cache     0         0         0B        0B
```

### 停止docker服务

```bash
systemctl stop docker
```

### 创建新的docker目录并迁移原有数据

执行命令df -h,找一个大的磁盘。 我在 /home目录下面建了 /home/docker/lib目录，执行的命令是：

```bash
mkdir -p /home/docker/lib
```

迁移/var/lib/docker目录下面的文件到 /home/docker/lib：

```bash
cp -r /var/lib/docker /home/docker/lib/
```

### 修改存储配置

### Docker 版本 >= v17.05.0

因为 Docker 官方在这个发行版本就 deprecated 了 `graph` 这个 feature，所以如果你机器上安装的 Docker 版本 >= v17.05.0，则无法通过在 `/etc/default/docker` 配置文件中指定 `graph` 参数来修改 Docker 的默认安装(存储)目录了，具体参见官网文档：[Docker Docs](https://link.ld246.com/forward?goto=https%3A%2F%2Fdocs.docker.com%2Fengine%2Fdeprecated%2F%23-g-and---graph-flags-on-dockerd)。

好在天无绝人之路，新版本的 Docker 还有其他方式可以达到我们修改安装(存储)目录的目的：通过修改(新建)`/etc/docker/daemon.json`，指定 `data-root` 参数的值。

按如下操作：

```bash
vim /etc/docker/daemon.json
```

加入

```bash
{
    "data-root": "/home/docker/lib"
}
```

### 重启 Docker

最后，重启 Docker 服务：

```bash
sudo systemctl restart docker
# or
sudo service docker restart
```

### 检查

```bash
docker info
```

Docker Root Dir: /data/docker/lib/docker
执行`docker images`可以看到之前所有的镜像也全部同步了过来

## 二、扩容磁盘

详情请移步参考[CentOS7如何给磁盘扩容](../../04/13/)