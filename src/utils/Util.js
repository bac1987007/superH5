import $ from 'jquery';
import _ from 'lodash';
import AntModal from './AntModal.js';
import Domain from '../config/Domain';

const Util = {
  checkTime(rule, value, callback) {
    if (!value) {
      callback(new Error('输入时间不能为空！'));
    } else {
      callback();
    }
  },

  checkStartTime(form, rule, value, callback) {
    // var { getFieldValue ,validateFields } = this.props.form;
    const { getFieldValue, validateFields } = form;
    const endTime = getFieldValue('endTime');
    if (!value) {
      callback(new Error('开始时间不能为空！'));
    } else if (value.getTime() <= Date.now()) {
      callback(new Error('开始时间需大于现在时间！'));
    } else {
      callback();
    }
    // trigger endTime checking
    if (value && rule) {
      validateFields(['endTime'], { force: true });
    }
  },

  checkEndTime(form, rule, value, callback) {
    const { getFieldValue } = form;
    const startTime = getFieldValue('startTime');

    if (!value) {
      callback(new Error('结束时间不能为空！'));
    } else if (value.getTime() <= Date.now()) {
      callback(new Error('结束时间已过！'));
    } else if (startTime && startTime.getTime() && value.getTime() <= startTime.getTime()) {
      callback(new Error('结束时间需大于开始时间！'));
    } else {
      callback();
    }
  },

  stringToTime(str) {
    const newStr = str.replace(/-/g, '/');
    return new Date(newStr);
  },

  getToday() {
    const now = new Date();
    const nowyear = now.getFullYear();
    const nowmonth = now.getMonth() + 1;
    const nowday = now.getDate();
    const today = `${nowyear}-${nowmonth}-${nowday}`;
    return (new Date(today.replace(/-/g, '/'))).getTime();
  },

  getTomorrow() {
    const now = new Date();
    const nowyear = now.getFullYear();
    const nowmonth = now.getMonth() + 1;
    const nowday = now.getDate();
    const today = `${nowyear}-${nowmonth}-${nowday}`;
    const oneDay = 24 * 60 * 60 * 1000;

    return (new Date(today.replace(/-/g, '/'))).getTime() + oneDay;
  },

  getWeekBefore() {
    const now = new Date();
    const nowyear = now.getFullYear();
    const nowmonth = now.getMonth() + 1;
    const nowday = now.getDate();
    const today = `${nowyear}-${nowmonth}-${nowday}`;
    const oneWeek = 6 * 24 * 60 * 60 * 1000;
    return (new Date(today.replace(/-/g, '/'))).getTime() - oneWeek;
  },

  timeToStr(time, fmt) {
    // var now = new Date();
    if (typeof time === 'string') {
      return time;
    }
    if (!time) {
      return time;
    }
    const o = {
      'M+': time.getMonth() + 1, // 月份
      'd+': time.getDate(), // 日
      'H+': time.getHours(), // 小时
      'm+': time.getMinutes(), // 分
      's+': time.getSeconds(), // 秒
      'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
      S: time.getMilliseconds(), // 毫秒
    };
    if (!fmt) fmt = 'yyyy-MM-dd HH:mm:ss';
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${time.getFullYear()}`).substr(4 - RegExp.$1.length));
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
    return fmt;
  },

  msToStr(ms, fmt) {
    const time = new Date(ms);
    const o = {
      'M+': time.getMonth() + 1, // 月份
      'd+': time.getDate(), // 日
      'H+': time.getHours(), // 小时
      'm+': time.getMinutes(), // 分
      's+': time.getSeconds(), // 秒
      'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
      S: time.getMilliseconds(), // 毫秒
    };
    if (!fmt) fmt = 'yyyy-MM-dd HH:mm:ss';
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${time.getFullYear()}`).substr(4 - RegExp.$1.length));
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
    return fmt;
  },

  rowKey(key, record) {
    key = key || 'id';
    return record ? record[key] : '';  // 设置主键
  },

  pagination({ total, current, pageSize, onPageChange }) {
    return {
      showQuickJumper: true,
      total,
      current: current || 1,
      showSizeChanger: false,
      pageSize: Number(pageSize) || 10,
      onChange: onPageChange,
    };
  },

  getParams() {
    const opt = {};
    const param = window.location.href ? window.location.href.split('?')[1] : '';
    if (param && param.split('&').length > 0) {
      param.split('&').map((item) => {
        const arr = item.split('=');
        opt[arr[0]] = arr[1];
      });
    }
    return opt;
  },

  fenToYuan(fen) {
    fen = fen || 0;
    return (parseFloat(fen) / 100).toFixed(2);
  },

  yuanToFen(yuan) {
    yuan = yuan || 0;
    return Math.round(yuan * 100);
  },

  fetchOpt(opt) {
    return {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      jsonData: opt,
    };
  },

  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },

  queryOpt(options) {
    let opt = {},
      tmpOpt = _.pick(options.filter, options.filterOpt);
    _.filter(tmpOpt, (value, key) => {
      if (value) {
        opt[key] = value;
      }
    });
    return opt;
  },

  jsonp(url, opt, cb) {
    const callback = cb || 'jsonpCallback';
    const requestParam = Util.wxParams();
    const optData = Object.assign({}, opt, requestParam);
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        cache: false,
        url,
        data: optData,
        dataType: 'jsonp',
        jsonp: callback,
      }).then((resp) => {
        if (resp.bizHead.bizRetCode === '1000') {
          resolve(resp);
        } else {
          AntModal.resultError(resp.message);
        }
      }).fail((err) => {
        AntModal.catchError(err);
      });
    });
  },
  ajaxGet(url, opt) {
    let optData = {};
    const requestParam = Util.wxParams();
    optData = Object.assign({}, opt.data, requestParam);
    return new Promise((resolve, reject) => {
      $.ajax({
        xhrFields: {
          withCredentials: true,
        },
        url: url || '',
        data:  JSON.stringify(opt.data),
        method: 'GET',
      }).then((resp) => {
        var o = JSON.parse(resp);
        resolve(o);
      });
    });
  },

  ajaxPost(url, opt) {
    let optData = {};
    const requestParam = Util.wxParams();
    optData = Object.assign({}, opt, requestParam);
    return new Promise((resolve, reject) => {
      $.ajax({
        xhrFields: {
          withCredentials: true,
        },
        url: url || '',
        data: JSON.stringify(opt),
        method: 'post',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
      }).then((resp) => {
        if(resp.code === 200){
          resolve(resp);
        }
      }).fail(() => {
      });
    });
  },

  ajaxDelete(url, opt) {
    const requestParams = Util.wxParams();
    const optData = Object.assign({}, opt, requestParams);
    return new Promise((resolve, reject) => {
      $.ajax({
        xhrFields: {
          withCredentials: true,
        },
        url: url || '',
        data: optData ? JSON.stringify(optData) : '',
        method: 'delete',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
      }).then((resp) => {
        if (resp.bizHead.bizRetCode === '1000') {
          resolve(resp);
        } else if (resp.bizHead.bizRetCode === '9998') {
          AntModal.confirm({
            title: resp.message,
            content: '请重新登录',
            cb() {
              window.location.href = '/userba/login.html';
            },
          });
        }
      }).fail(() => {
      });
    });
  },

  ajaxPostLogin(url, opt) {
    const requestParam = Util.getParams();
    const optData = Object.assign({}, opt, requestParam);
    return new Promise((resolve, reject) => {
      $.ajax({
        xhrFields: {
          withCredentials: true,
        },
        url: url || '',
        data: optData,
        method: 'post',
        success: function (res){
          let data = res;
        }
      }).then(() => {
        // 登录成功后，进行跳转
        location.href = `${Domain.PREFIX}/Suger`;
      });
    });
  },

  ajaxPut(url, opt) {
    console.log(opt)
    return new Promise((resolve, reject) => {
      $.ajax({
        xhrFields: {
          withCredentials: true,
        },
        url: url || '',
        data: opt ,
        method: 'put',
        contentType: 'application/json;charset=UTF-8',
      }).then((resp) => {
        var o = JSON.parse(resp);
        resolve(o);
      }).fail(() => {
      });
    });
  },

  ajaxPutJson(url, opt) {
    const requestParam = Util.wxParams();
    const optData = Object.assign({}, opt, requestParam);
    return new Promise((resolve, reject) => {
      $.ajax({
        xhrFields: {
          withCredentials: true,
        },
        url: url || '',
        data: optData ? JSON.stringify(optData) : '',
        method: 'put',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
      }).then((resp) => {
        if (resp.bizHead.bizRetCode === '1000') {
          resolve(resp);
        }
      }).fail(() => {
      });
    });
  },

  ajax(url, opt) {
    const requestParam = Util.wxParams();
    const optData = Object.assign({}, opt, requestParam);
    return new Promise((resolve, reject) => {
      $.ajax({
        xhrFields: {
          withCredentials: true,
        },
        url: url || '',
        data: optData ? JSON.stringify(optData) : '',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
      }).then((resp) => {
        if (resp.code === '1000') {
          resolve(resp);
        } else if (resp.code === '9998') {
          AntModal.confirm({
            title: resp.message,
            content: '请重新登录',
            cb() {
              window.location.href = '/userba/login.html';
            },
          });
          resolve(resp);
        } else {
          AntModal.resultError(resp.message);
          resolve(resp);
        }
      }).fail(() => {
        AntModal.catchError();
        resolve({ code: '50x' });
      });
    });
  },

  ajaxs(url, opt, method) {
    const requestParam = Util.wxParams();
    const optData = Object.assign({}, opt, requestParam);
    return new Promise((resolve, reject) => {
      $.ajax({
        xhrFields: {
          withCredentials: true,
        },
        url: url || '',
        data: optData || '',
        method: method || 'GET',
      }).then((resp) => {
        if (resp.bizHead && (resp.bizHead.bizRetCode === '1000' || resp.bizHead.bizRetCode === '1001')) {
          resolve(resp);
        } else if (resp.code === '9998') {
          AntModal.confirm({
            title: resp.message,
            content: '请重新登录',
            cb() {
              window.location.href = '/userba/login.html';
            },
          });
        } else {
          resolve(resp);
        }
      }).fail((resp) => {
        // AntModal.catchError();
        resolve({ code: '50x' });
      });
    });
  },

  isEmpty(value) {
    if (typeof value === 'number') {
      if (value === 0) {
        return false;
      } else {
        return !value;
      }
    } else if (typeof value === 'object') {
      return _.isEmpty(value);
    } else if (typeof value === 'string') {
      return !value.length;
    } else if (typeof value === 'undefined') {
      return !value;
    } else {
      return !value;
    }
  },

  isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },

  getQueryOpt(payload, dataObj, params) {
    payload = payload || {};
    params = params || [];
    payload.pageNum = typeof payload.pageNum === 'undefined' ? dataObj.pageNum : payload.pageNum;
    payload.pageSize = typeof payload.pageSize === 'undefined' ? dataObj.pageSize : payload.pageSize;
    params.map((item) => {
      payload[item] = typeof payload[item] === 'undefined' ? dataObj[item] : payload[item];
    });
    return payload;
  },

  getFilterOpt(payload, data) {
    payload = payload || {};
    data = data || {};
    const filterOpt = data.filterOpt || [];

    filterOpt.map((item) => {
      payload[item] = typeof payload[item] === 'undefined' ? data[item] : payload[item];
    });

    if (_.has(filterOpt, 'pageNum') && !payload.pageNum) {
      payload.pageNum = 1;
    }

    payload = _.pick(payload, filterOpt);
    return payload;
  },

  checkTelephone(rule, value, callback) {
    if (!value) {
      callback(new Error('手机号不能为空'));
    }
    if (!/^[\d]{11}$/.test(value)) {
      callback(new Error('请输入11位手机号'));
    } else if (!/^.{1,20}$/.test(value)) {
      callback(new Error('微信号不能为空,最多20个字符'));
    } else {
      callback();
    }
    // 校验汉字
    const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
  },

  CheckChinese(obj, val) {
    const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
    if (reg.test(val)) {
      alert('不能输入汉字！');
    }
  },

  wxParams() {
    const params = Util.getParams();
    const openid = $.trim(params.openid) || $.trim(params._openId);
    return openid.length > 0 ? { _app: 'wx', openid, _openId: openid } : {};
  },

  getObj(str){
    var param = {}
    var arrx = str.split('&');
    for( var v=0;v<arrx.length;v++){
      var arrs = arrx[v].split('=');
      param[arrs[0]] = arrs[1] ;
    }
    return param;
  }
};

export default Util;
