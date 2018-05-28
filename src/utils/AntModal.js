import { Modal } from 'antd';

const AntModal = {
  success(content, time) {
    const options = { title: this.getTitle()['200'] };
    if (typeof content === 'object') {
      options.content = content.content;
      options.time = content.time;
    } else if (typeof content === 'string') {
      options.content = content;
      options.time = time;
    }
    const modal = Modal.success({
      title: options.title,
      content: options.content,
    });
    setTimeout(() => modal.destroy(), options.time ? options.time : 1000);
  },

  error(content, time) {
    const options = { title: this.getTitle()['40X'] };
    if (typeof content === 'object') {
      options.title = content.title || options.title;
      options.content = content.content;
      options.time = content.time;
    } else if (typeof content === 'string') {
      options.content = content;
      options.time = time;
    }
    const modal = Modal.error({
      title: options.title,
      content: options.content,
    });
    setTimeout(() => modal.destroy(), options.time ? options.time : 1000);
  },

  info(options) {
    const modal = Modal.info({
      title: options.title,
      content: options.content,
    });
    setTimeout(() => modal.destroy(), options.time ? options.time : 1000);
  },

  warning(content) {
    const options = { title: this.getTitle()['600'] };
    if (typeof content === 'object') {
      options.content = content.content;
      options.time = content.time;
    } else if (typeof content === 'string') {
      options.content = content;
      options.time = content.time;
    }

    const modal = Modal.warning({
      title: options.title,
      content: options.content,
    });
    setTimeout(() => modal.destroy(), options.time ? options.time : 1000);
  },

  confirm(options) {
    options = options || {};
    Modal.confirm({
      title: options.title ? options.title : '操作',
      content: options.content ? options.content : '确定此操作吗？',
      okText: options.okText ? options.okText : '确定',
      cancelText: options.cancelText ? options.cancelText : '取消',
      onOk() {
        if (options.cb && typeof options.cb === 'function') {
          options.cb();
        }
      },
      onCancel() {
      },
    });
  },
  getTitle() {
    return {
      200: 'Congratulation',
            // '200': '恭喜',
      '40X': '请求接口异常',
      '50X': '网络异常',
      600: 'Warning',
    };
  },
  catchError(err) {
    const opt = {
      title: this.getTitle()['50X'],
      content: err,
    };
    this.error(opt);
  },
  resultError(err) {
    const opt = {
      title: this.getTitle()['40X'],
      content: err,
    };
    this.error(opt);
  },
};

// module.exports = AntModal;
export default AntModal;
