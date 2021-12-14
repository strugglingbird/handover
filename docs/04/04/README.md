# 益客云项目入门开发手册

## 1、基本要求

### 1.1 硬件环境

- 操作系统要求: Windows/MacOS/Linux
- 最低硬件配置: 4核16G + SSD(128G)

### 1.2 软件环境

- Jdk1.8及以上版本
- Maven3.0及以上版本
- Docker18.xx(包含docker-compose)及以上版本
- Git2.31.0及以上版本
- Idea2020.1及以上版本
- Redis6.2.3及以上版本
- Navicat12.xx及以上版本

### 1.3 掌握技能

- 可以熟练使用java8的`lambda`表达式
- 熟练使用spring-boot项目开发
- 熟悉spring cloud的基本概念以及spring cloud alibaba的基本概念，并能够区分差异
- 熟悉基本的linux命令
- 熟悉基本的docker命令并能够编写基本的Dockerfile和docker-compose文件代码
- 熟悉基本的git命令并且能够理解git的基本原理
- 熟悉maven的基本命令和基本用法，并对maven的包管理依赖、镜像拉取流程能有基本的了解
- 熟悉swagger-ui代码文档的使用
- 熟练掌握对mysql/oracle的使用
- 熟练使用mybatis以及mybatis-plus的使用，并理解其概念以及它们之间的关系
- 熟练使用idea以及Lombok、Mybatis等关开发插件的安装和使用

### 1.4 代码要求

- 能够严格遵守《阿里巴巴java开发手册》的规范
- 代码命名不要有歧义
- 复杂的代码一定要注上作者姓名、时间以及含义

## 2、开发环境搭建

> TIPS:
>
> 以下流程的操作均建立在读者已符合第一章节的基本要求并且完成软件环境的安装
>
> 磨刀不误砍柴工，如果对上述要求还不熟悉的话请先不要着急研究和学习项目的源码以及环境的搭建，这样反而会欲速则不达，可以先自行去百度进行查阅了解，再回来继续跟进以下步骤。

### 2.1 下载代码

#### 2.1.1 注册coding账号

请先进入coding官网[注册页面](https://e.coding.net/register)，填写信息(团队名称填写`ecolovo`)完成注册和团队的加入以及项目的加入成为项目的开发者。

![image-20210519084936655](https://tva1.sinaimg.cn/large/008i3skNgy1gqng739lbaj31l40u0hdt.jpg)

#### 2.1.2  拉取代吗

进入[益客微服务平台](https://ecolovo.coding.net/p/ecolovo-cloud/d/ecolovo-cloud/git)项目后，点击`克隆`按钮完成项目地址的复制

![image-20210519085325772](https://tva1.sinaimg.cn/large/008i3skNgy1gqngb00bcfj32ek0u07e9.jpg)

代开本机的命令行窗口输入以下代码完成项目的git下载

```bash
git clone https://e.coding.net/ecolovo/ecolovo-cloud.git
```

> TIPS:
>
> 项目的模块介绍请细看项目的**Readme**文件



### 2.2 配置maven配置文件

#### 2.2.1 找到你本机maven的包下载目录，一般都是`.m2`名称的目录

![image-20210519091248776](https://tva1.sinaimg.cn/large/008i3skNgy1gqngv5ye38j30so0663z1.jpg)

#### 2.2.2 创建并编辑settings.xml配置文件

进入上述目录后会有一个名为repository的目录，该目录下就是存储maven项目所有依赖的jar包及pom文件，在该目录的同级下创建一个`settings.xml`名称的文件，用文本编辑工具(Sublime Text)打开，并将以下代码复制保存。

```xml
<?xml version="1.0" encoding="UTF-8"?>

<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

<!--
 | This is the configuration file for Maven. It can be specified at two levels:
 |
 |  1. User Level. This settings.xml file provides configuration for a single user,
 |                 and is normally provided in ${user.home}/.m2/settings.xml.
 |
 |                 NOTE: This location can be overridden with the CLI option:
 |
 |                 -s /path/to/user/settings.xml
 |
 |  2. Global Level. This settings.xml file provides configuration for all Maven
 |                 users on a machine (assuming they're all using the same Maven
 |                 installation). It's normally provided in
 |                 ${maven.conf}/settings.xml.
 |
 |                 NOTE: This location can be overridden with the CLI option:
 |
 |                 -gs /path/to/global/settings.xml
 |
 | The sections in this sample file are intended to give you a running start at
 | getting the most out of your Maven installation. Where appropriate, the default
 | values (values used when the setting is not specified) are provided.
 |
 |-->
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
  <!-- localRepository
   | The path to the local repository maven will use to store artifacts.
   |
   | Default: ${user.home}/.m2/repository
  <localRepository>/path/to/local/repo</localRepository>
  -->

  <!-- interactiveMode
   | This will determine whether maven prompts you when it needs input. If set to false,
   | maven will use a sensible default value, perhaps based on some other setting, for
   | the parameter in question.
   |
   | Default: true
  <interactiveMode>true</interactiveMode>
  -->

  <!-- offline
   | Determines whether maven should attempt to connect to the network when executing a build.
   | This will have an effect on artifact downloads, artifact deployment, and others.
   |
   | Default: false
  <offline>false</offline>
  -->

  <!-- pluginGroups
   | This is a list of additional group identifiers that will be searched when resolving plugins by their prefix, i.e.
   | when invoking a command line like "mvn prefix:goal". Maven will automatically add the group identifiers
   | "org.apache.maven.plugins" and "org.codehaus.mojo" if these are not already contained in the list.
   |-->
  <pluginGroups>
    <!-- pluginGroup
     | Specifies a further group identifier to use for plugin lookup.
    <pluginGroup>com.your.plugins</pluginGroup>
    -->
  </pluginGroups>

  <!-- proxies
   | This is a list of proxies which can be used on this machine to connect to the network.
   | Unless otherwise specified (by system property or command-line switch), the first proxy
   | specification in this list marked as active will be used.
   |-->
  <proxies>
    <!-- proxy
     | Specification for one proxy, to be used in connecting to the network.
     |
    <proxy>
      <id>optional</id>
      <active>true</active>
      <protocol>http</protocol>
      <username>proxyuser</username>
      <password>proxypass</password>
      <host>proxy.host.net</host>
      <port>80</port>
      <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
    </proxy>
    -->
  </proxies>

  <!-- servers
   | This is a list of authentication profiles, keyed by the server-id used within the system.
   | Authentication profiles can be used whenever maven must make a connection to a remote server.
   |-->
  <servers>
    <!-- server
     | Specifies the authentication information to use when connecting to a particular server, identified by
     | a unique name within the system (referred to by the 'id' attribute below).
     |
     | NOTE: You should either specify username/password OR privateKey/passphrase, since these pairings are
     |       used together.
     |
    <server>
      <id>deploymentRepo</id>
      <username>repouser</username>
      <password>repopwd</password>
    </server>
    -->

    <!-- Another sample, using keys to authenticate.
    <server>
      <id>siteServer</id>
      <privateKey>/path/to/private/key</privateKey>
      <passphrase>optional; leave empty if not used.</passphrase>
    </server>
    -->
  </servers>

  <!-- mirrors
   | This is a list of mirrors to be used in downloading artifacts from remote repositories.
   |
   | It works like this: a POM may declare a repository to use in resolving certain artifacts.
   | However, this repository may have problems with heavy traffic at times, so people have mirrored
   | it to several places.
   |
   | That repository definition will have a unique id, so we can create a mirror reference for that
   | repository, to be used as an alternate download site. The mirror site will be the preferred
   | server for that repository.
   |-->
  <mirrors>
    <!-- mirror
     | Specifies a repository mirror site to use instead of a given repository. The repository that
     | this mirror serves has an ID that matches the mirrorOf element of this mirror. IDs are used
     | for inheritance and direct lookup purposes, and must be unique across the set of mirrors.
     |
    <mirror>
      <id>mirrorId</id>
      <mirrorOf>repositoryId</mirrorOf>
      <name>Human Readable Name for this Mirror.</name>
      <url>http://my.repository.com/repo/path</url>
    </mirror>
     -->
      <mirror>
        <id>alimaven</id>
        <name>aliyun maven</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
        <mirrorOf>central</mirrorOf>
      </mirror>
  </mirrors>

  <!-- profiles
   | This is a list of profiles which can be activated in a variety of ways, and which can modify
   | the build process. Profiles provided in the settings.xml are intended to provide local machine-
   | specific paths and repository locations which allow the build to work in the local environment.
   |
   | For example, if you have an integration testing plugin - like cactus - that needs to know where
   | your Tomcat instance is installed, you can provide a variable here such that the variable is
   | dereferenced during the build process to configure the cactus plugin.
   |
   | As noted above, profiles can be activated in a variety of ways. One way - the activeProfiles
   | section of this document (settings.xml) - will be discussed later. Another way essentially
   | relies on the detection of a system property, either matching a particular value for the property,
   | or merely testing its existence. Profiles can also be activated by JDK version prefix, where a
   | value of '1.4' might activate a profile when the build is executed on a JDK version of '1.4.2_07'.
   | Finally, the list of active profiles can be specified directly from the command line.
   |
   | NOTE: For profiles defined in the settings.xml, you are restricted to specifying only artifact
   |       repositories, plugin repositories, and free-form properties to be used as configuration
   |       variables for plugins in the POM.
   |
   |-->
  <profiles>
    <!-- profile
     | Specifies a set of introductions to the build process, to be activated using one or more of the
     | mechanisms described above. For inheritance purposes, and to activate profiles via <activatedProfiles/>
     | or the command line, profiles have to have an ID that is unique.
     |
     | An encouraged best practice for profile identification is to use a consistent naming convention
     | for profiles, such as 'env-dev', 'env-test', 'env-production', 'user-jdcasey', 'user-brett', etc.
     | This will make it more intuitive to understand what the set of introduced profiles is attempting
     | to accomplish, particularly when you only have a list of profile id's for debug.
     |
     | This profile example uses the JDK version to trigger activation, and provides a JDK-specific repo.
    <profile>
      <id>jdk-1.4</id>

      <activation>
        <jdk>1.4</jdk>
      </activation>

      <repositories>
        <repository>
          <id>jdk14</id>
          <name>Repository for JDK 1.4 builds</name>
          <url>http://www.myhost.com/maven/jdk14</url>
          <layout>default</layout>
          <snapshotPolicy>always</snapshotPolicy>
        </repository>
      </repositories>
    </profile>
    -->

    <!--
     | Here is another profile, activated by the system property 'target-env' with a value of 'dev',
     | which provides a specific path to the Tomcat instance. To use this, your plugin configuration
     | might hypothetically look like:
     |
     | ...
     | <plugin>
     |   <groupId>org.myco.myplugins</groupId>
     |   <artifactId>myplugin</artifactId>
     |
     |   <configuration>
     |     <tomcatLocation>${tomcatPath}</tomcatLocation>
     |   </configuration>
     | </plugin>
     | ...
     |
     | NOTE: If you just wanted to inject this configuration whenever someone set 'target-env' to
     |       anything, you could just leave off the <value/> inside the activation-property.
     |
    <profile>
      <id>env-dev</id>

      <activation>
        <property>
          <name>target-env</name>
          <value>dev</value>
        </property>
      </activation>

      <properties>
        <tomcatPath>/path/to/tomcat/instance</tomcatPath>
      </properties>
    </profile>
    -->
  </profiles>

  <!-- activeProfiles
   | List of profiles that are active for all builds.
   |
  <activeProfiles>
    <activeProfile>alwaysActiveProfile</activeProfile>
    <activeProfile>anotherAlwaysActiveProfile</activeProfile>
  </activeProfiles>
  -->
</settings>

```

> TIPS:
>
> 上述配置完成之后，请使用idea打开刚才下载的项目代码，idea会默认加载刚才配置的`setting.xml`配置文件将其作为maven的配置文件，这样等待一段时间后就会完成项目的包依赖加载，代码就不会出现编译报错的情况。

### 2.3 安装启动nacos

> TIPS:
>
> nacos的安装有多种方式，下面我们简单介绍最常用的2种安装方式，不管哪一种安装方式都是基于官网的教程来指导安装，如果还不理解的话可以去[nacos官网](https://nacos.io/zh-cn/index.html)的`运维指南 -> 部署手册`进行查阅。

#### 2.3.1 通过下载二进制文件(启动程序)安装nacos(复杂-便于理解)

**1.预备环境准备**

Nacos 依赖 [Java](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/) 环境来运行。如果您是从代码开始构建并运行Nacos，还需要为此配置 [Maven](https://maven.apache.org/index.html)环境，请确保是在以下版本环境中安装使用:

1. 64 bit OS，支持 Linux/Unix/Mac/Windows，推荐选用 Linux/Unix/Mac。
2. 64 bit JDK 1.8+；[下载](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) & [配置](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/)。
3. Maven 3.2.x+；[下载](https://maven.apache.org/download.cgi) & [配置](https://maven.apache.org/settings.html)。

**2.下载源码或者安装包**

你可以通过源码和发行包两种方式来获取 Nacos。

从 Github 上下载源码方式

```bash
git clone https://github.com/alibaba/nacos.git
cd nacos/
mvn -Prelease-nacos -Dmaven.test.skip=true clean install -U  
ls -al distribution/target/

// change the $version to your actual path
cd distribution/target/nacos-server-$version/nacos/bin
```

下载编译后压缩包方式

您可以从 [最新稳定版本](https://github.com/alibaba/nacos/releases) 下载 `nacos-server-$version.zip` 包。

```bash
  unzip nacos-server-$version.zip 或者 tar -xvf nacos-server-$version.tar.gz
  cd nacos/bin
```

**3.启动服务器**

Linux/Unix/Mac

启动命令(standalone代表着单机模式运行，非集群模式):

```
sh startup.sh -m standalone
```

如果您使用的是ubuntu系统，或者运行脚本报错提示[[符号找不到，可尝试如下运行：

```
bash startup.sh -m standalone
```

Windows

启动命令(standalone代表着单机模式运行，非集群模式):

```
startup.cmd -m standalone
```

**5.关闭服务器**

Linux/Unix/Mac

```
sh shutdown.sh
```

Windows

```
shutdown.cmd
```

或者双击shutdown.cmd运行文件。

#### 2.3.2 通过docker-compose文件(基于docker)安装nacos(简单-便于开发)

**操作步骤**

- Clone 项目

  ```powershell
  git clone https://github.com/nacos-group/nacos-docker.git
  cd nacos-docker
  ```

- 单机模式 MySQL8

  ```
  docker-compose -f example/standalone-mysql-8.yaml up -d
  ```

- Nacos 控制台

  link：http://127.0.0.1:8848/nacos/

## 3、项目的启动

> TIPS:
>
> 当你对上述的环境搭建完毕之后就可以来执行我们的最后的一步了，当然之前的所有准备都是为了这一步而来，所以特别要熟练对一些操作的基础概念的理解，以及这么做的目的。

1. 使用idea打开我们的项目代码，完成maven的依赖构建之后我们就可以清晰的看到项目的目录和层级了

![image-20210519095253214](https://tva1.sinaimg.cn/large/008i3skNgy1gqni0vt49cj31c10u0qjc.jpg)

2. 在idea工具栏中将services配置出来

![image-20210519101938401](https://tva1.sinaimg.cn/large/008i3skNgy1gqnispjh9gj31c10u0b29.jpg)

3. 配置项目的启动项

![image-20210519102044490](https://tva1.sinaimg.cn/large/008i3skNgy1gqnitup4tqj31c10u0dqp.jpg)

下面里我们介绍一下项目3个基础服务(必须启动的服务)的启动

### 3.2 启动基础资料服务(system)

#### 3.1.1 在idea工具栏中将services配置出来

#### 3.1.2 修改配置文件

1. 指定环境变量

   ![image-20210519101504722](https://tva1.sinaimg.cn/large/008i3skNgy1gqninz3gukj31c10u0wx2.jpg)

2. 修改redis和数据库链接地址

   ![image-20210519101632493](https://tva1.sinaimg.cn/large/008i3skNgy1gqniph21ifj31c00u04ho.jpg)

3. 启动服务

   ![image-20210519103232208](https://tva1.sinaimg.cn/large/008i3skNgy1gqnj64my1mj31c00u0wzh.jpg)

### 3.2 启动统一认证服务(auth-server)

1. 指定环境变量

   ![image-20210519103634708](https://tva1.sinaimg.cn/large/008i3skNgy1gqnjabo0tmj31c00u0k7n.jpg)

2. 修改redis链接地址

   ![image-20210519103708063](https://tva1.sinaimg.cn/large/008i3skNgy1gqnjawmhv6j31c00u018u.jpg)

3. 启动服务

   ![image-20210519103411677](https://tva1.sinaimg.cn/large/008i3skNgy1gqnj7uwdu6j31c00u0wza.jpg)

### 3.3 启动统一网管服务(gateway)

1. 指定环境变量

   ![image-20210519103829018](https://tva1.sinaimg.cn/large/008i3skNgy1gqnjcbhlzhj31c00u0tpo.jpg)

2. 修改redis链接地址

   ![image-20210519103857116](https://tva1.sinaimg.cn/large/008i3skNgy1gqnjcsoil2j31c00u0k87.jpg)

3. 启动服务

   ![image-20210519103938826](https://tva1.sinaimg.cn/large/008i3skNgy1gqnjdj241aj31c00u0twd.jpg)

> TIPS:
>
> 项目启动完成后可以查看我们的项目接口文档了
>
> 文档地址: http://127.0.0.1:8000/doc.html
>
> ![image-20210519104227504](https://tva1.sinaimg.cn/large/008i3skNgy1gqnjggcoawj31l10u0wsz.jpg)

