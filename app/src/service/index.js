class Service {
  constructor() {}

  serialize(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  toQueryString(obj) { //转化 {a:1,b:2} => a=1&b=2
    var query = '',
      name, value, fullSubName, subName, subValue, innerObj, i;
    for (name in obj) {
      value = obj[name];
      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  }

  getProjects(sendData) { //获取 视频列表
    let data = [{
      "type": "nativeApp",
      "title": "社区乐手机app",
      "href": "http://www.shequle.net/web/index/app_sql",
      "images": ["http://i1.piimg.com/593933/b920a4dabbf32fbbs.png", "http://i1.piimg.com/593933/827df2dfd904a93fs.png", "http://i1.piimg.com/593933/d5704b1c07ed2a9as.png", "http://i1.piimg.com/593933/e27b974715faef80s.png"],
      "intro": ["已上线，安卓和苹果，采用react-native技术。", "信息展示平台，用来展示企业的新闻信息，内有原生百度地图功能、gps定位、二维码扫码等功能。"],
      "id": 0
    }, {
      "type": "nativeApp",
      "title": "跳舞宝手机app@1.x",
      "href": "http://www.shequle.net/web/index/app_twb",
      "images": ["http://i1.piimg.com/593933/0d8da6144552171as.jpg", "http://i1.piimg.com/593933/b5287d81bc4e86ecs.jpg", "http://i1.piimg.com/593933/d912dda685bcc158s.jpg"],
      "intro": ["已上线，安卓和苹果，采用react-native技术。", "第一代版本是单纯的连接蓝牙，获取歌单列表，然后控制音响播放音乐，可编辑顺序。"],
      "id": 1
    }, {
      "type": "nativeApp",
      "title": "跳舞宝手机app@2.x",
      "href": "http://pan.baidu.com/s/1qYhSaFa",
      "images": ["http://i1.piimg.com/593933/1ac7b485e3132a9e.png", "http://i1.piimg.com/593933/360ed9eda99f5db7s.png", "http://i1.piimg.com/593933/9d843e617fc5aed7s.png", "http://i1.piimg.com/593933/1be5229880b3a939s.png", "http://i1.piimg.com/593933/149d1ca995d5a433s.png"],
      "intro": ["未上线，安卓和苹果，采用react native+ mobx技术。", "已完成了软件前端界面和功能实现，后端未完成。", "功能：展示信息、扫码、搜索、手机本地音乐视频播放，管理下载的音乐和视频，蓝牙连接音响，门店地图搜索。"],
      "id": 2
    }, {
      "type": "nativeApp",
      "title": "健康中心app",
      "href": "http://pan.baidu.com/s/1miNXADq",
      "images": ["http://i4.buimg.com/593933/f37f908223188799s.jpg", "http://i4.buimg.com/593933/1da661fb57e31a26s.png", "http://i4.buimg.com/593933/015998c1483919f6s.jpg", "http://i4.buimg.com/593933/373ea53380fc748es.jpg", "http://i4.buimg.com/593933/8b23e4aac67ed146s.jpg"],
      "intro": ["已上线，安卓和苹果，采用react native+ mobx技术。", "主要用来获取用户健康数据，然后转成图表展示。"],
      "id": 3
    }, {
      "type": "webApp",
      "title": "社区乐后台数据展示网页app",
      "href": "",
      "images": ["http://i4.buimg.com/593933/ea57892464624b56s.png", "http://i4.buimg.com/593933/434297989b5862d2s.png", "http://i4.buimg.com/593933/ea57892464624b56.png", "http://i4.buimg.com/593933/a3208b5663f98a9as.png", "http://i4.buimg.com/593933/636fbeb0990fcaa9s.png"],
      "intro": ["已上线。采用angular@1.x + echarts 编写", "分析数据，转化成图表"],
      "id": 4
    }, {
      "type": "webApp",
      "title": "商城手机网页app",
      "href": "http://www.709691139.win/JApp",
      "images": ["http://i4.buimg.com/593933/6760b54488a112f8s.png"],
      "intro": ["采用angular@1.x + echarts 编写", "分析数据，转化成图表"],
      "id": 5
    }, {
      "type": "webApp",
      "title": "社区乐手机网页app",
      "href": "http://www.709691139.win/shequle_phoneApp",
      "images": ["http://i4.buimg.com/593933/fbcc70a8d1d74a96s.png", "http://i4.buimg.com/593933/a94fbb293847affes.png"],
      "intro": ["未上线，采用angular@1.x + ionic框架。", "已经太监的项目，改成rn版本了。 "],
      "id": 6
    }, {
      "type": "web",
      "title": "社区乐展示网页h5",
      "href": "hhttp://www.709691139.win/shequle_intro",
      "images": ["http://i2.muimg.com/593933/7b9b15bded9e0fabs.png"],
      "intro": ["已上线，采用js 加 swiper插件。"],
      "id": 7
    }, {
      "type": "webApp",
      "title": "飞机射击大战h5",
      "href": "http://www.709691139.win/plane",
      "images": ["http://i2.muimg.com/593933/ac202f6a65825174s.png", "http://i2.muimg.com/593933/0a11429d76192cb8s.png", "http://i2.muimg.com/593933/a8e7e2e83eba5fcfs.png", "http://i2.muimg.com/593933/b9118545bb32c88fs.png", "http://i2.muimg.com/593933/28aaf20936c7fea8s.png", "http://i2.muimg.com/593933/30566a01a38fc5c9s.png", "http://i2.muimg.com/593933/7815a58eb895f3e2s.png", "http://i2.muimg.com/593933/a1cf050a650fa2acs.png"],
      "intro": ["已上线，毕业设计，后端php", "纯div版和canvas版都写过。", "功能： 登录注册、关卡、商店、任务、排行榜、音乐、战斗、道具。"],
      "id": 8
    }, {
      "type": "webApp",
      "title": "请假查询app",
      "href": "http://www.709691139.win/leave",
      "images": ["http://i2.muimg.com/593933/06382ab75e094148s.png"],
      "intro": ["个人项目，angular+inoic。"],
      "id": 9
    }, {
      "type": "web",
      "title": "旧版个人主页",
      "href": "http://www.709691139.win/oldWeb",
      "images": ["http://i2.muimg.com/593933/fd69251ff996cdfbs.png"],
      "intro": ["个人项目，jquery+响应式开发。"],
      "id": 10
    }, {
      "type": "webApp",
      "title": "gba口袋妖怪h5",
      "href": "https://github.com/a709691139/Pokemon",
      "images": ["http://i2.muimg.com/593933/a7ea52e4d078b34as.png", "http://i2.muimg.com/593933/b395bf36fa6f57c3s.png"],
      "intro": ["个人项目，未完成版本(太监了)，纯原生js加canvas。", "写的好累这玩意，图片资源什么都要百度，动画也麻烦，以后换个框架重写。"],
      "id": 11
    }];
    //sendData && console.log(sendData);
    if (sendData && sendData.id) {
      return data.reduce((pre, next) => {
        if (next.id == sendData.id) {
          pre = next;
        }
        return pre;
      }, {});
    }
    return data;
  }
}
const service = new Service();
export default service;