export const getTip = (messageKey) => {
	const tips = {
		// 提示信息
		CompleteInfoForm: '请按要求填写完整!',
		FullLoginFrom: '请输入账号和密码',
	};
	return tips[messageKey] || '未知的错误,请联系管理员'

}