# CentOS7如何给磁盘扩容

如果出现磁盘不够使用，导致服务器无法正常运行时，我们可以通过扩容磁盘的方式来解决

### 1、扩展磁盘

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gxgt0whpyzj30lk0dzgmu.jpg)

注意：扩容磁盘的方式分为 [添加磁盘]、[扩展磁盘] ; 扩展磁盘需要在此虚拟机停止的状态下进行，同时扩展的数字是扩展后的预期大小，比如之前是60G，希望扩展200G，那么我们应该输入200G。这里我们以扩展磁盘的方式进行。go go go ！



### 2、首先确认状态

扩展后，重新启动linux，使用df -kh命令发现磁盘目录大小没有变化

```bash
[admin@localhost ~]$ df -h

Filesystem Size Used Avail Use% Mounted on
/dev/mapper/centos-root 36G 1.6G 35G 5% /
devtmpfs 3.9G 0 3.9G 0% /dev
tmpfs 3.9G 0 3.9G 0% /dev/shm
tmpfs 3.9G 8.9M 3.9G 1% /run
tmpfs 3.9G 0 3.9G 0% /sys/fs/cgroup
/dev/sda1 1014M 189M 826M 19% /boot
/dev/mapper/centos-home 18G 33M 18G 1% /home
tmpfs 783M 0 783M 0% /run/user/0
tmpfs 783M 0 783M 0% /run/user/1001
```

使用fdisk确认磁盘空间是否已经扩展

```bash
[admin@localhost ~]$ sudo fdisk -l

Disk /dev/sda: 214.7 GB, 214748364800 bytes, 419430400 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x0005871c

Device Boot Start End Blocks Id System
/dev/sda1 * 2048 2099199 1048576 83 Linux
/dev/sda2 2099200 125829119 61864960 8e Linux LVM

Disk /dev/mapper/centos-root: 38.2 GB, 38235275264 bytes, 74678272 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/mapper/centos-swap: 6442 MB, 6442450944 bytes, 12582912 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/mapper/centos-home: 18.7 GB, 18668847104 bytes, 36462592 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

可以看到“Disk /dev/sda: 214.7 GB”，已经扩展了140G空间

### 3、扩展分区

```bash
[admin@localhost ~]$ sudo fdisk /dev/sda
Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): n
Partition type:
   p   primary (2 primary, 0 extended, 2 free)
   e   extended
Select (default p): p
Partition number (3,4, default 3): 
First sector (125829120-419430399, default 125829120): 
Using default value 125829120
Last sector, +sectors or +size{K,M,G} (125829120-419430399, default 419430399): 
Using default value 419430399
Partition 3 of type Linux and of size 140 GiB is set

Command (m for help): t
Partition number (1-3, default 3): L
Partition number (1-3, default 3): 
Hex code (type L to list all codes): L

 0  Empty           24  NEC DOS         81  Minix / old Lin bf  Solaris        
 1  FAT12           27  Hidden NTFS Win 82  Linux swap / So c1  DRDOS/sec (FAT-
 2  XENIX root      39  Plan 9          83  Linux           c4  DRDOS/sec (FAT-
 3  XENIX usr       3c  PartitionMagic  84  OS/2 hidden C:  c6  DRDOS/sec (FAT-
 4  FAT16 <32M      40  Venix 80286     85  Linux extended  c7  Syrinx         
 5  Extended        41  PPC PReP Boot   86  NTFS volume set da  Non-FS data    
 6  FAT16           42  SFS             87  NTFS volume set db  CP/M / CTOS / .
 7  HPFS/NTFS/exFAT 4d  QNX4.x          88  Linux plaintext de  Dell Utility   
 8  AIX             4e  QNX4.x 2nd part 8e  Linux LVM       df  BootIt         
 9  AIX bootable    4f  QNX4.x 3rd part 93  Amoeba          e1  DOS access     
 a  OS/2 Boot Manag 50  OnTrack DM      94  Amoeba BBT      e3  DOS R/O        
 b  W95 FAT32       51  OnTrack DM6 Aux 9f  BSD/OS          e4  SpeedStor      
 c  W95 FAT32 (LBA) 52  CP/M            a0  IBM Thinkpad hi eb  BeOS fs        
 e  W95 FAT16 (LBA) 53  OnTrack DM6 Aux a5  FreeBSD         ee  GPT            
 f  W95 Ext'd (LBA) 54  OnTrackDM6      a6  OpenBSD         ef  EFI (FAT-12/16/
10  OPUS            55  EZ-Drive        a7  NeXTSTEP        f0  Linux/PA-RISC b
11  Hidden FAT12    56  Golden Bow      a8  Darwin UFS      f1  SpeedStor      
12  Compaq diagnost 5c  Priam Edisk     a9  NetBSD          f4  SpeedStor      
14  Hidden FAT16 <3 61  SpeedStor       ab  Darwin boot     f2  DOS secondary  
16  Hidden FAT16    63  GNU HURD or Sys af  HFS / HFS+      fb  VMware VMFS    
17  Hidden HPFS/NTF 64  Novell Netware  b7  BSDI fs         fc  VMware VMKCORE 
18  AST SmartSleep  65  Novell Netware  b8  BSDI swap       fd  Linux raid auto
1b  Hidden W95 FAT3 70  DiskSecure Mult bb  Boot Wizard hid fe  LANstep        
1c  Hidden W95 FAT3 75  PC/IX           be  Solaris boot    ff  BBT            
1e  Hidden W95 FAT1 80  Old Minix      
Hex code (type L to list all codes): 8e     
Changed type of partition 'Linux' to 'Linux LVM'

Command (m for help): w
The partition table has been altered!

Calling ioctl() to re-read partition table.

WARNING: Re-reading the partition table failed with error 16: Device or resource busy.
The kernel still uses the old table. The new table will be used at
the next reboot or after you run partprobe(8) or kpartx(8)
Syncing disks.
```

### 4、加载分区表

方法一：（推荐）

```bash
[root@localhost ~]# partprobe
```

方法二：

```bash
[root@localhost ~]# reboot
```

### 5、分区确认

通过fdisk可以看到已经添加了/dev/sda3

```bash
[admin@localhost ~]$ sudo fdisk -l    

Disk /dev/sda: 214.7 GB, 214748364800 bytes, 419430400 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x0005871c

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048     2099199     1048576   83  Linux
/dev/sda2         2099200   125829119    61864960   8e  Linux LVM
/dev/sda3       125829120   419430399   146800640   8e  Linux LVM

Disk /dev/mapper/centos-root: 38.2 GB, 38235275264 bytes, 74678272 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/mapper/centos-swap: 6442 MB, 6442450944 bytes, 12582912 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/mapper/centos-home: 18.7 GB, 18668847104 bytes, 36462592 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

### 6、扩展vg

创建PV

```bash
[admin@localhost ~]$ sudo pvcreate /dev/sda3
Physical volume "/dev/sda3" successfully created.
```

使用vgs查看

```bash
[admin@localhost ~]$ sudo vgs
  VG     #PV #LV #SN Attr   VSize   VFree
  centos   1   3   0 wz--n- <59.00g    0 
```

### 7、把sda3加入到LVM组中

```bash
[admin@localhost ~]$ sudo vgextend centos /dev/sda3 
  Volume group "centos" successfully extended
```

注意：centos 是vg组名称，请根据具体情况填写

```bash
[admin@localhost ~]$ sudo vgs
  VG     #PV #LV #SN Attr   VSize   VFree   
  centos   2   3   0 wz--n- 198.99g <140.00g
```

### 8、扩展lv

我们把新扩展的100G全部添加到centos-root中

```bash
[admin@localhost ~]$ sudo lvextend /dev/mapper/centos-root  /dev/sda3 
  Size of logical volume centos/root changed from <35.61 GiB (9116 extents) to <175.61 GiB (44955 extents).
  Logical volume centos/root successfully resized.
```

使用lvs可以看到 centos-root 已经是140G了，但是…请继续往下看

```bash
[admin@localhost ~]$ sudo lvs
  LV   VG     Attr       LSize    Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  home centos -wi-ao----  <17.39g                                                    
  root centos -wi-ao---- <175.61g                                                    
  swap centos -wi-ao----    6.00g  
```

使用df -kh查看，空间并没有变化，look down…

```bash
[admin@localhost ~]$ df -khl
Filesystem               Size  Used Avail Use% Mounted on
/dev/mapper/centos-root   36G  1.6G   35G   5% /
devtmpfs                 3.9G     0  3.9G   0% /dev
tmpfs                    3.9G     0  3.9G   0% /dev/shm
tmpfs                    3.9G  8.9M  3.9G   1% /run
tmpfs                    3.9G     0  3.9G   0% /sys/fs/cgroup
/dev/sda1               1014M  189M  826M  19% /boot
/dev/mapper/centos-home   18G   33M   18G   1% /home
tmpfs                    783M     0  783M   0% /run/user/1001
```

### 9、xfs在线扩容

```bash
[admin@localhost ~]$ df -T
Filesystem              Type     1K-blocks    Used Available Use% Mounted on
/dev/mapper/centos-root xfs       37320904 1616800  35704104   5% /
devtmpfs                devtmpfs   3992828       0   3992828   0% /dev
tmpfs                   tmpfs      4004744       0   4004744   0% /dev/shm
tmpfs                   tmpfs      4004744    9036   3995708   1% /run
tmpfs                   tmpfs      4004744       0   4004744   0% /sys/fs/cgroup
/dev/sda1               xfs        1038336  192612    845724  19% /boot
/dev/mapper/centos-home xfs       18221056   33020  18188036   1% /home
tmpfs                   tmpfs       800952       0    800952   0% /run/user/1001
[admin@localhost ~]$ sudo xfs_growfs /dev/mapper/centos-root 
meta-data=/dev/mapper/centos-root isize=512    agcount=4, agsize=2333696 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=0 spinodes=0
data     =                       bsize=4096   blocks=9334784, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0 ftype=1
log      =internal               bsize=4096   blocks=4558, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
data blocks changed from 9334784 to 46033920
```

### 10、再次确认df状态, 添加的100G空间已经有效

```bash
[admin@localhost ~]$ df -kh
Filesystem               Size  Used Avail Use% Mounted on
/dev/mapper/centos-root  176G  1.6G  175G   1% /
devtmpfs                 3.9G     0  3.9G   0% /dev
tmpfs                    3.9G     0  3.9G   0% /dev/shm
tmpfs                    3.9G  8.9M  3.9G   1% /run
tmpfs                    3.9G     0  3.9G   0% /sys/fs/cgroup
/dev/sda1               1014M  189M  826M  19% /boot
/dev/mapper/centos-home   18G   33M   18G   1% /home
tmpfs                    783M     0  783M   0% /run/user/1001
```