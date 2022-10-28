//针对所有接口的处理（Get）
const get = (url, params = {}, clearFn) => {
  new Promise((resolve) => {
    axios
      .get(url, { params })
      .then((result) => {
        let res;
        if (clearFn != undefined) {
          res = clearFn(reuslt.data);
        } else {
          res = result.data;
        }
        resolve([null, res]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });
};
// 请求拦截
const handleRequestHeader = (config) => {
  config["name"] = "xxx";
  return config;
};

const handleAuth = (config) => {
  config.header["token"] = localStorage.getItem("token") || token || "";
  return config;
};

axios.interceptors.request.use((config) => {
  config = handleChangeRequestHeader(config);
  config = handleConfigureAuth(config);
  return config;
});

// 响应拦截>>>>>>>
// 错误处理函数
const handleNetworkError = (errStatus) => {
  let errMessage = "未知错误";
  if (errStatus) {
    switch (errStatus) {
      case 400:
        errMessage = "错误的请求";
        break;
      case 401:
        errMessage = "未授权，请重新登录";
        break;
      case 403:
        errMessage = "拒绝访问";
        break;
      case 404:
        errMessage = "请求错误,未找到该资源";
        break;
      case 405:
        errMessage = "请求方法未允许";
        break;
      case 408:
        errMessage = "请求超时";
        break;
      case 500:
        errMessage = "服务器端出错";
        break;
      case 501:
        errMessage = "网络未实现";
        break;
      case 502:
        errMessage = "网络错误";
        break;
      case 503:
        errMessage = "服务不可用";
        break;
      case 504:
        errMessage = "网络超时";
        break;
      case 505:
        errMessage = "http版本不支持该请求";
        break;
      default:
        errMessage = `其他连接错误 --${errStatus}`;
    }
  } else {
    errMessage = `无法连接到服务器！`;
  }

  message.error(errMessage);
};

const handleAuthError = (errno) => {
  const authErrMap = {
    10031: "登录失效，需要重新登录", // token 失效
    10032: "您太久没登录，请重新登录~", // token 过期
    10033: "账户未绑定角色，请联系管理员绑定角色",
    10034: "该用户未注册，请联系管理员注册用户",
    10035: "code 无法获取对应第三方平台用户",
    10036: "该账户未关联员工，请联系管理员做关联",
    10037: "账号已无效",
    10038: "账号未找到",
  };

  if (authErrMap.hasOwnProperty(errno)) {
    message.error(authErrMap[errno]);
    // 授权错误，登出账户
    logout();
    return false;
  }

  return true;
};

const handleGeneralError = (errno, errmsg) => {
  if (err.errno !== "0") {
    meessage.error(err.errmsg);
    return false;
  }

  return true;
};
// 适配
// 当我们将所有的错误类型处理函数写完，在 axios 的拦截器中进行调用即可。
axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return new Promise.reject(response.data);
    handleAuthError(response.data.errno);
    handleGeneralError(response.data.errno, response.data.errmsg);
    return response;
  },
  (err) => {
    handleNetworkError(err.response.status);
    Promise.reject(err.response);
  }
);

export { get };
