import { hashHistory } from 'react-router';
import { notification } from 'antd';
import URLS from './urls.development.js';
import Configs from './config.js';

// const DEFAULT_CONTENT_TYPE = 'application/json';
const DEFAULT_CONTENT_TYPE = 'application/x-www-form-urlencoded';

const serializeQS = (qs) => {
  let ret = '';
  for (const it in qs) {
    if (qs.hasOwnProperty(it) && qs[it] !== null) {
      if (ret) {
        ret = `${ret}&`;
      }
      ret = `${ret}${it}=${encodeURIComponent(qs[it])}`;
    }
  }
  return ret;
};

const serializeBody = (contentType, body) => {
  if (contentType.indexOf('application/json') > -1) {
    return JSON.stringify(body);
  } else if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
    return serializeQS(body);
  }
  return body;
};

/* 处理请求状态 */
function badToken(rsp) {
  sessionStorage.removeItem('token');
  window.clearAuthInfo && window.clearAuthInfo();
  hashHistory.push('/login');
}

export default (next, store) => {
  return (input, init) => {
    init = init || {};

    /* test API */
    if (input.indexOf('test:') > -1) {
      input = `${URLS.test}${input.slice(5)}`;
    } else {
      input = `${URLS.app}${input}`;
    }

    // 插入Query Param
    if (init.qs) {
      input = `${input}?${serializeQS(init.qs)}`;
    }

    init.headers = init.headers || {};

    if (init.method && init.method.toUpperCase() !== 'GET') {
      if (!init.headers['Content-Type']) {
        init.headers['Content-Type'] = DEFAULT_CONTENT_TYPE;
      }
    }

    // 序列化body
    if (typeof init.body === 'object') {
      const contentType = init.headers['Content-Type'];
      init.body = serializeBody(contentType, init.body);
    }

    // 插入token
    init.headers.tenant = init.headers.tenant || 'mm';
    init.headers.workstation = init.headers.workstation || 'mm';

    return next(input, init).then((rsp) => {
      if (rsp.ok) {
        const contentType = rsp.headers.get('Content-Type');
        if (contentType && contentType.indexOf('application/json') > -1) {
          return rsp.json();
        }
        return rsp.json();
      }
      notification.error({
        message: '请求错误提示',
      });
      throw rsp;
    }).then((json) => {
      if (json.status !== '000' && !init.$noToast) {
        if (json.status === '403' || json.status === '401') {
          badToken(json);
        }
        notification.error({
          message: '请求错误提示',
          description: json.message,
        });
        throw json;
      }
      return json;
    });
  };
};
