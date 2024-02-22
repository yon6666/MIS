<template>
	<div class="common-layout">
		<el-container>
			<el-header class="header-wrapped">
				<div class="header-content">
					<h3>MIS</h3>
					<span class="welcome-content">欢迎您的登录</span>
				</div>
			</el-header>
			<el-main>
				<div class="login-wrapped">
					<el-card class="box-card">
						<el-tabs v-model="activeName" class="demo-tabs" stretch>
							<el-tab-pane label="登录" name="first">
								<el-form :rules="rules" class="login-form">
									<el-form-item label="账号" prop='loginAccount'>
										<el-input v-model="loginData.account" placeholder="请输入账号" />
									</el-form-item>
									<el-form-item label="密码" prop='loginPassword'>
										<el-input v-model="loginData.password" show-password placeholder="请输入密码" />
									</el-form-item>
									<div class="login-footer">
										<div class="forget-password">
											<span class="forget-password-btn" @click="openForget">忘记密码</span>
										</div>
										<div class="login-btn">
											<el-button type="primary" @click="Login">登录</el-button>
										</div>
										<div class="register-btn">
											还没有账号？<span class="to-register">马上注册</span>
										</div>
									</div>
								</el-form>
							</el-tab-pane>
							<el-tab-pane label="注册" name="second">
								<el-form :rules="rules" class="register-form">
									<el-form-item label="账号" prop='registerAccount'>
										<el-input v-model="registerData.account" placeholder="账号长度6-12位" />
									</el-form-item>
									<el-form-item label="密码" prop='registerPassword'>
										<el-input v-model="registerData.password" placeholder="密码需长度6-12位含字母数字" />
									</el-form-item>
									<el-form-item label="确认" prop='registerNextPassword'>
										<el-input v-model="registerData.nextPassword" placeholder="请再次输入密码" />
									</el-form-item>
									<div class="register-btn">
										<el-button type="primary" @click='Register'>注册</el-button>
									</div>
								</el-form>
							</el-tab-pane>
						</el-tabs>
					</el-card>
				</div>
			</el-main>
			<el-footer class="footer-wrapped">
				<div class="footer-content">
					<div class="title">
						<span>MIS</span>
						<span>Vue3 + Vite + Pinia + ElementPlus</span>
						<span>Express.js</span>
					</div>
				</div>
			</el-footer>
		</el-container>
	</div>
	<forgetPassword ref='forgetV'></forgetPassword>
</template>

<script lang="ts" setup>
	import { ElMessage } from 'element-plus'
	import forgetPassword from './component/forgetPassword.vue'
	import {
		ref,
		reactive
	} from 'vue'
	import {
		register, login
	} from '@/api/login'
	import { CollectionTag } from '@element-plus/icons-vue/dist/types';
	import { useRouter } from 'vue-router'
	import { getTip } from '@/tips'
	import { useUserInfoStore } from '@/store/userInfo'

	const forgetV = ref()
	const activeName = ref('first')
	const router = useRouter()
	const store = useUserInfoStore()

	// 表单规则
	const rules = reactive({
		loginAccount: [
			{ required: true, message: '请输入您的账号', trigger: 'blur' },
		],
		loginPassword: [
			{ required: true, message: '请输入您的密码', trigger: 'blur' },
		],
		registerAccount: [
			{ required: true, message: '请输入您的账号', trigger: 'blur' },
		],
		registerPassword: [
			{ required: true, message: '请输入您的密码', trigger: 'blur' },
		],
		registerNextPassword: [
			{ required: true, message: '请确认您的密码', trigger: 'blur' },
		],
	})

	// 表单接口
	interface FormData {
		account : number | null, //账号
		password : string, //密码
		nextPassword ?: string; //确认密码
	}

	// 登录表单数据
	const loginData : FormData = reactive({
		account: null, //账号
		password: '', //密码
	})

	// 表单数据
	const registerData : FormData = reactive({
		account: null, //账号
		password: '', //密码
		nextPassword: '', //确认密码
	})

	// 注册
	const Register = async () => {
		if (registerData.password == registerData.nextPassword) {
			console.log(registerData);
			const res = await register(registerData)
			if (res.msg == "注册成功") {
				ElMessage({
					message: res.msg,
					type: 'success',
				})
				activeName.value = 'first'
			} else {
				ElMessage.error(res.msg)
			}
		} else {
			ElMessage.error('注册失败')
		}
	}

	// 登录
	const Login = async () => {
		if (loginData.account && loginData.password) {
			const res = await login(loginData)
			console.log(res);
			if (res.msg == "登录成功") {
				// 解构
				const { id, name, account, email, department } = res.result
				const { token } = res
				console.log(token);
				ElMessage({
					message: res.msg,
					type: 'success',
				})
				localStorage.setItem('id', id)
				localStorage.setItem('token', token)
				localStorage.setItem('name', name)
				localStorage.setItem('department', department)
				store.fetchUserInfo(id)
				// 登录成功后跳转至home首页
				router.push('/home')
			} else {
				ElMessage.error(res.msg)
			}
		} else {
			ElMessage.error(getTip('FullLoginFrom'))
		}
	}

	// 忘记密码弹窗
	const openForget = () => {
		forgetV.value.open()
	}
</script>

<style lang="scss" scoped>
	// 头部
	.header-wrapped {

		// 头部内容
		.header-content {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;

			// 欢迎语
			.welcome-content {
				font-size: 13px;
			}
		}
	}

	// 主体
	.el-main {
		background-image: url('@/assets/code.jpg');
		height: 600px;
		--el-main-padding: 0;

		// 登录框
		.login-wrapped {
			width: 1200px;
			height: 600px;
			margin: 0 auto;

			// 登录卡片
			.box-card {
				width: 350px;
				height: 375px;
				float: right;
				position: relative;
				top: 14%;

				// 登录表单
				.login-form {

					// 登录底部
					.login-footer {
						display: flex;
						flex-direction: column;

						// 登录按钮
						.login-btn {
							display: flex;
							justify-content: center;
						}

						// 忘记密码
						.forget-password {
							display: flex;
							justify-content: flex-end;
							margin: 10px 0;

							.forget-password-btn {
								font-size: 12px;
								color: #409eff;
								// 鼠标移入的效果
								cursor: pointer;
							}
						}

						// 注册
						.register-btn {
							font-size: 12px;
							margin: 14px 0;
							display: flex;
							justify-content: center;

							.to-register {
								font-size: 12px;
								color: #409eff;
								cursor: pointer;
							}
						}
					}
				}

				// 注册表单
				.register-form {

					// 注册按钮
					.register-btn {
						display: flex;
						justify-content: center;
					}
				}
			}
		}
	}

	// 底部主体
	.footer-wrapped {
		margin-top: 10px;

		// 底部内容
		.footer-content {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;

			// 底部介绍
			.title {
				color: #666;
				font-weight: 500;
				margin: 0 auto;
				font-size: 14px;

				// 除最后一个span外添加间隔内容
				span:not(:last-child)::after {
					content: " | ";
				}
			}
		}
	}

	// tabs标签
	:deep(.el-tabs__item) {
		color: #333;
		font-size: 18px;
	}

	// 表单边距
	.el-form {
		margin-top: 30px;
	}

	// 输入框高度
	:deep(.el-input__inner) {
		height: 40px;
	}

	// 输入框标签字体高度
	:deep(.el-form-item__label) {
		height: 40px;
		line-height: 40px;
	}

	// 登录按钮
	:deep(.el-button) {
		width: 300px;
		height: 45px;
		font-size: 16px;
	}
</style>