/*
* 使用axios函数封装Ajax函数的返回值是promise
* */
import axios from 'axios';

export default function ajax(url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    let promise;
    if (type === 'GET') {
      let queryString = '';
      Object.keys(data).forEach(key => {
        const value = data[key];
        queryString += key + '=' + value + '&'
      });
      if (queryString) {// username=tom&password=123&
        queryString = queryString.substring(0, queryString.length - 1);
        url += '?' + queryString;
      }
      // 发get请求
      promise = axios.get(url)
    } else {
      //发送post请求
      promise = axios.post(url,data);
    }
    promise.then(
      // 异步按成功后传递的数据不再是response, 而是response里的data
      response => resolve(response.data),
      error => reject(error)
    )
  })
}

