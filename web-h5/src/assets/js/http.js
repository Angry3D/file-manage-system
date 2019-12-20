import axios from "axios";
import store from "@/store/index";
// import router from "@/router/index";
import env from "./env";

// 实例
const instance = axios.create({
  baseURL: env.API_BASE_URL
});

// 拦截器
//-- 请求
instance.interceptors.request.use(
  config => {
    // store.state.loading = true;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//-- 响应
instance.interceptors.response.use(
  res => {
    // store.state.loading = false;
    // 错误码统一处理
    switch (res.data.errno) {
      case 201:
        store.state.vue.$toast(res.data.errmsg);
        break;
      case 202:
        store.state.vue.$toast(res.data.errmsg);
        break;
      default:
        return res;
    }
  },
  err => {
    // store.state.loading = false;
    return Promise.reject(err);
  }
);

// 过滤空参数
function filterEmptyParams(params) {
  if (!params) return null;
  for (const key in params) {
    if (params[key] === '' || params[key] === undefined) {
      delete params[key];
    }
  }
  return params;
}

// 请求模式
function requestMode1(url, params, method, headers = null) {
  params = filterEmptyParams(params);
  headers = headers || store.state.header;
  return new Promise((resolve, reject) => {
    instance({
      method,
      url,
      params,
      headers
    })
      .then(res => {
        res && resolve(res.data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function requestMode2(url, params, method, headers = null) {
  params = filterEmptyParams(params);
  headers = headers || store.state.header;
  return new Promise((resolve, reject) => {
    instance({
      method,
      url,
      data: params,
      headers
    })
      .then(res => {
        res && resolve(res.data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// export
export const get = (url, params = null) => {
  return requestMode1(url, params, "get");
};
export const deletes = (url, params = null) => {
  return requestMode1(url, params, "delete");
};
export const post = (url, params = null) => {
  return requestMode2(url, params, "post");
};
export const put = (url, params = null) => {
  return requestMode2(url, params, "put");
};
export const postForm = (url, params = null) => {
  const headers = Object.assign({}, store.state.header);
  headers["Content-Type"] = "multipart/form-data";
  return requestMode2(url, params, "post", headers);
};
