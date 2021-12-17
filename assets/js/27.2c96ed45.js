(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{421:function(s,a,t){"use strict";t.r(a);var n=t(29),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"nacos部署"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#nacos部署"}},[s._v("#")]),s._v(" nacos部署")]),s._v(" "),t("h2",{attrs:{id:"部署配置文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#部署配置文件"}},[s._v("#")]),s._v(" 部署配置文件")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://tva1.sinaimg.cn/large/008i3skNgy1gqxxevu050j315q0u0tgv.jpg",alt:"image-20210528102058926"}})]),s._v(" "),t("p",[t("img",{attrs:{src:"https://tva1.sinaimg.cn/large/008i3skNgy1gqxxoj5r79j31le0u0n1x.jpg",alt:"image-20210528103016070"}})]),s._v(" "),t("div",{staticClass:"language-nginx line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-nginx"}},[t("code",[s._v("mysql.db.name = nacos\nmysql.host =192.168.1.89\nmysql.password = jsyk@123\nmysql.port = 3306\nmysql.user = root\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h2",{attrs:{id:"部署应用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#部署应用"}},[s._v("#")]),s._v(" 部署应用")]),s._v(" "),t("p",[s._v("镜像配置:")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("nacos/nacos-server:1.4.2\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://tva1.sinaimg.cn/large/008i3skNgy1gqxxqehwchj31x60dotag.jpg",alt:"image-20210528103203748"}})]),s._v(" "),t("p",[s._v("端口配置:")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8848")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://tva1.sinaimg.cn/large/008i3skNgy1gqxxqv7o13j31xo08sdgz.jpg",alt:"image-20210528103230618"}})]),s._v(" "),t("p",[s._v("环境变量配置:")]),s._v(" "),t("div",{staticClass:"language-nginx line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-nginx"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 键：\t \t ")]),s._v("\nMODE = cluster\n\nNACOS_REPLICAS = 3\n\nNACOS_SERVERS =\tnacos-server-0.nacos-server.global.svc.cluster.local:8848 nacos-server-1.nacos-server.global.svc.cluster.local:8848 nacos-server-2.nacos-server.global.svc.cluster.local:8848\n\nPREFER_HOST_MODE = hostname\n \t\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 引用其他资源:")]),s._v("\nConfig Map\t\tnacos-cm\t\tmysql.db.name\t\t以\t\tMYSQL_SERVICE_DB_NAME\n\nConfig Map\t\tnacos-cm\t\tmysql.host\t\t\t以\t\tMYSQL_SERVICE_HOST\n\nConfig Map\t\tnacos-cm\t\tmysql.password\t以\t\tMYSQL_SERVICE_PASSWORD\n\nConfig Map\t\tnacos-cm\t\tmysql.port\t\t\t以\t\tMYSQL_SERVICE_PORT\n\nConfig Map\t\tnacos-cm\t\tmysql.user\t\t\t以\t\tMYSQL_SERVICE_USER\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://tva1.sinaimg.cn/large/008i3skNgy1gqxxrie5nsj31e00u045d.jpg",alt:"image-20210528103307629"}})]),s._v(" "),t("p",[s._v("健康检查配置:")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("请求路径: /nacos/actuator/health\n容器端口: 8848\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://tva1.sinaimg.cn/large/008i3skNgy1gqxxy75qnrj317g0u0ais.jpg",alt:"image-20210528103933276"}})])])}),[],!1,null,null,null);a.default=e.exports}}]);