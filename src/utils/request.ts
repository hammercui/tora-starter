import Taro, { request } from '@tarojs/taro';

export const HTTP_STATUS = {
	SUCCESS: 200,
	CLIENT_ERROR: 400,
	AUTHENTICATE: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	SERVER_ERROR: 500,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504
};

/**
 *
 * @param type  'GET','POST','DELETE','PUT'
 * @param url
 * @param config
 * @param request
 * @param response
 * @param error bool型true表示是error
 */
function requestGroupLog(type = 'GET', url, config, request, response?) {
	if (!response) {
		console.group(type, url, '--Start');
	} else {
		console.group(type, url, '--End');
  }
	//if(request && request.toString() !== "[object Object]") //request 不等于{}
	console.log('request:', request);
	if (!!response) console.log('response:', response);
	//if(config && config.toString() !== "[object Object]")
	console.log('config:', config);
	//console.group(type, url);
	console.groupEnd();
}

/*
 * @Description: 网路请求包装类
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-01-23 14:36:15
 * @LastEditors: hammercui
 * @LastEditTime: 2019-01-23 15:09:57
 */

export interface IOptions {
	/**
       * 设置请求的 header，header 中不能设置 Referer。
       */
	header?: any;
	/**
       * （需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       *
       * @default GET
       */
	method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
	/**
       * 如果设为 json，会尝试对返回的数据做一次 JSON.parse
       *
       * @default json
       */
	dataType?: string;
	/**
       * 设置响应的数据类型。合法值：text、arraybuffer
       *
       * @default text
       * @since 1.7.0
       */
	responseType?: string;
}

/**
  * @name: 定义request包装类，默认get请求
  * @msg:
  * @param {type}
  * @return:
  */
export default function CustomRequest<RequestT, ResponseT>(url, data?: RequestT, options?: IOptions){
	const newOptions: request.Param<RequestT> = {
		...options,
    url: url,
    data:data,
  };

	//todo 定制options
	requestGroupLog(newOptions.method, url, newOptions, data);
	//日志
	return Taro.request<string, RequestT>(newOptions)
		.then(success => {
      requestGroupLog(newOptions.method, url, newOptions, data, success.data);
      //成功
			if (success.statusCode == HTTP_STATUS.SUCCESS) {
        try{
          return success.data as unknown as ResponseT;
        }catch(error){
          throw error;
        }
      }
      //失败
      else {
        const error = new Error(success.data);
        error.name = success.statusCode.toString();
        throw error;
			}
		})
		.catch(error => {
      console.error(error)
			throw error;
		});
}
