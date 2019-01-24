/*
 * @Description: dva配置类
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-01-24 10:15:28
 * @LastEditors: hammercui
 * @LastEditTime: 2019-01-24 14:43:16
 */

import {create} from 'dva-core';
import createLoading from 'dva-loading';

let app;
let store;
let dispatch;

function createApp(opt) {
  opt.onAction = [];
  //开发模式 启用redux-logger
  if (process.env.NODE_ENV === 'development') {
    opt.onAction.push(require('redux-logger').createLogger())
  }
  //opt.onAction = [createLogger()];
  app = create(opt);
  app.use(createLoading({}));

  if (!global.registered){
    //opt.models.forEach(model => app.model(model));
    const obj = opt.models
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        app.model(obj[key]);
      }
    }
  }
  global.registered = true;
  app.start();

  store = app._store;
  app.getStore = () => store;

  dispatch = store.dispatch;

  app.dispatch = dispatch;
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  }
}
