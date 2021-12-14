# rancher版本升级

### 更新 Helm chart 仓库

1. 执行以下命令，更新本地的 helm 仓库。

   ```bash
   helm repo update
   ```

2. 获取用于安装 Rancher 的仓库名称。

   请替换命令中的`<CHART_REPO>`，替换为`latest`，`stable`或`alpha`。有关仓库及其差异的信息，请参见[Helm Chart 仓库](http://rancher2.docs.rancher.cn/docs/rancher2/installation/resources/choosing-version/_index)。

   - `latest`：最新版，推荐在尝试新功能时使用。
   - `stable`：稳定版，推荐生产环境中使用。
   - `alpha`：预览版，未来版本的实验性预览。

   ```bash
   [root@lb ~]# helm repo list
   NAME          	URL
   rancher-stable	https://releases.rancher.com/server-charts/stable
   ```

   > **注意：** 如果要切换到其他 Helm chart 仓库，请按照[切换仓库文档](http://rancher2.docs.rancher.cn/docs/rancher2/installation/resources/choosing-version/_index)进行切换。如果要切换仓库，请确保在继续执行第 3 步之前再次列出仓库，以确保添加了正确的仓库。

3. 切换仓库

   ```bash
   helm repo add rancher-stable https://releases.rancher.com/server-charts/stable
   ```

4. 从 Helm chart 仓库中获取最新的 chart ，安装 Rancher。

   该命令将拉取最新的 chart 并将其保存为当前目录中的一个`.tgz`文件。请替换命令中的`<CHART_REPO>`，替换为`latest`，`stable`或`alpha`。

   ```bash
   helm fetch rancher-<CHART_REPO>/rancher
   ```

### [升级Rancher](http://rancher2.docs.rancher.cn/docs/rancher2/installation/install-rancher-on-k8s/upgrades/ha/_index#升级-rancher)

本节介绍如何使用 Helm 升级 Rancher 的常规（连接 Internet） 或离线安装。

#### [Rancher高可用升级](http://rancher2.docs.rancher.cn/docs/rancher2/installation/install-rancher-on-k8s/upgrades/ha/_index#rancher-高可用升级)

从已安装的当前 Rancher Helm chart 中获取通过 `--set` 传递的值。

```bash
[root@lb ~]# helm get values rancher -n cattle-system
USER-SUPPLIED VALUES:
hostname: k8s.ecolovo.com
ingress:
  tls:
    source: secret
privateCA: true
```

> **注意：** 此命令将列出更多的值。这只是其中一个值的示例。

如果您在将 cert-manager 从 0.11.0 之前的版本升级到最新版本，请执行 `选项 B - 重新安装 Rancher Chart 和 Cert Manager`。否则，请执行 `选项 A - 升级Rancher`。

##### [选项A-升级Rancher](http://rancher2.docs.rancher.cn/docs/rancher2/installation/install-rancher-on-k8s/upgrades/ha/_index#选项-a---升级-rancher)

使用所有设置将 Rancher 升级到最新版本。

取上一步中的所有值，然后使用`--set key=value`将它们附加到命令中：

```bash
helm upgrade rancher rancher-stable/rancher   --namespace cattle-system   --set hostname=k8s.ecolovo.com   --set ingress.tls.source=secret   --set privateCA=true
```