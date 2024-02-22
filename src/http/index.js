// 导入axios
import axios from "axios";

// 创建axios实例
const instance = axios.create({
	// 后端Url地址
	baseURL: 'http://127.0.0.1:3007/',
	// 设置超时
	timeout: 6000,
	// 请求头类型
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});

// 添加请求拦截器
instance.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
})

// 添加响应拦截器
instance.interceptors.response.use(function(response) {
	// 2xx 范围内的状态码都会触发该函数。
	// 对响应数据做点什么
	return response.data;
}, function(error) {
	// 超出 2xx 范围的状态码都会触发该函数。
	// 对响应错误做点什么
	return Promise.reject(error);
});

// 对外暴露instance
export default instance;
