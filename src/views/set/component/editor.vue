<!-- 富文本模板 -->
<template>
	<el-dialog v-model="state.dialogFormVisible" width="600px" :title="title" destroy-on-close>
		<div style="border: 1px solid #ccc">
			<!-- wangEditor结构 -->
			<Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
			<Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
				@onCreated="handleCreated" />
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="cancel">取消</el-button>
				<el-button type="primary" @click="yes">
					确认
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
	import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
	import '@wangeditor/editor/dist/css/style.css' // 引入 css
	import {
		onBeforeUnmount, ref, shallowRef,
		reactive
	} from 'vue'
	import {
		ElMessage
	} from "element-plus"
	import { bus } from "@/utils/mitt.js"
	import { uploadCompanyIntroduce, getCompanyIntroduce } from '@/api/setting'
	import { getTip } from '../../../tips'

	const title = ref()

	const state = reactive({
		dialogFormVisible: false,
	});

	const introduceConfig = {
		1: { title: '公司介绍', needGet: true },
		2: { title: '公司架构', needGet: true },
		3: { title: '公司战略', needGet: true },
		4: { title: '公司高层', needGet: true },
	};

	// 打开富文本编辑
	const handleEditorTitle = async (id : number) => {
		const config = introduceConfig[id];

		// 
		if (!config) {
			ElMessage.error(`id为${id}的信息不存在`)
			return;
		}

		title.value = config.title;

		if (config.needGet) {
			const res = await getCompanyIntroduce(config.title);

			if (res.status === 0) {
				ElMessage({
					message: res.msg,
					type: 'success',
				});

				if (res.result[0] && res.result[0].set_text) {
					valueHtml.value = res.result[0].set_text;
				}
			} else {
				ElMessage.error(res.msg);
			}
		} else {
			ElMessage.error(getTip('other'));
		}
	}

	bus.on("editorTitle", async (id : number) => {
		await handleEditorTitle(id);
	});

	// 编辑器实例，必须用 shallowRef
	const editorRef = shallowRef()
	// mode
	const mode = ref('default')
	// 内容 HTML
	const valueHtml = ref()
	const toolbarConfig = {
		excludeKeys: []
	}
	const editorConfig = {
		placeholder: '请输入内容...',
		MENU_CONF: {
			uploadImage: {
				//上传图片配置
				server: 'http://127.0.0.1:3007/set/uploadCompanyPicture', //上传接口地址
				fieldName: 'file', //上传文件名
				methods: 'post',
				metaWithUrl: true, // 参数拼接到 url 上
				// 单个文件上传成功之后
				// onSuccess(file, res) {
				// },
				// 自定义插入图片
				customInsert(res, insertFn) {
					insertFn(res.url)
				},
			},
		}
	}

	// 编辑框菜单
	toolbarConfig.excludeKeys = [
		'blockquote',
		'bgColor',
		'color',
		'group-more-style',
		'fontFamily',
		'bulletedList',
		'numberedList',
		'lineHeight',
		'todo',
		'emotion',
		'insertLink',
		'group-video',
		'insertTable',
		'codeBlock',
		'divider',
		'fullScreen',
		// 'group-image',

		// 排除菜单组，写菜单组 key 的值即可
	]
	// 点击确认 修改文案
	const yes = async () => {
		//set_text set_name
		const res = await uploadCompanyIntroduce(title.value, valueHtml.value)
		if (res.status === 0) {
			ElMessage({
				message: res.msg,
				type: 'success',
			})
			state.dialogFormVisible = false
		} else {
			state.dialogFormVisible = false
			ElMessage.error(res.msg)
		}
	}


	// 组件销毁时，也及时销毁编辑器
	onBeforeUnmount(() => {
		const editor = editorRef.value
		if (editor == null) return
		editor.destroy()
	})

	const handleCreated = (editor : any) => {
		editorRef.value = editor // 记录 editor 实例，重要！
	}

	// 取消删除
	const cancel = () => {
		console.log("111");
		ElMessage.error("取消赋权！");
		state.dialogFormVisible = false;
	};

	// 暴露open方法
	const open = () => {
		state.dialogFormVisible = true;
	};
	defineExpose({
		open,
	});

	// 取消订阅/监听
	onBeforeUnmount(() => {
		bus.all.clear()
	})
</script>

<style lang="scss" scoped>
</style>