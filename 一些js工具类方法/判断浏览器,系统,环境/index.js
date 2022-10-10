// Navigator对象主要是包含有关客户端浏览器的一些信息
// userAgent属性是一个只读的字符串，申明浏览器用于HTPP请求的用户代理头的值，
// 简单点说其实就是通过UserAgent可以取得浏览器类别、版本，客户端操作系统等信息。

//获取浏览器信息
function getBrowerType() {
  var agent = navigator.userAgent.toLowerCase();
  var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
    console.log("这是windows32位系统");
  }
  if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
    console.log("这是windows64位系统");
  }
  if (isMac) {
    console.log("这是mac系统");
  }
}

//判断操作系统信息

function getOSType() {
  if (/(Android)/i.test(navigator.userAgent)) {
    console.log("Android");
  } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    console.log("ios");
  }
}
//判断当前环境是否是微信环境
function is_weixin() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}
