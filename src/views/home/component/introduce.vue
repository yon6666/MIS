<!-- 富文本模板 -->
<template>
	<el-dialog v-model="state.dialogFormVisible" width="600px" :title="title" destroy-on-close>
		<el-container>
			<el-main>
				<div class="content" v-html="valueHtml"></div>
			</el-main>
		</el-container>
	</el-dialog>
</template>

<script lang="ts" setup>
	import '@wangeditor/editor/dist/css/style.css' // 引入 css
	import {
		onBeforeUnmount, ref, shallowRef,
		reactive
	} from 'vue'
	import {
		ElMessage
	} from "element-plus"
	import { bus } from "@/utils/mitt.js"
	import { getCompanyIntroduce } from '@/api/setting'
	import { getTip } from '../../../tips'
	import { async } from 'fast-glob'

	const title = ref()

	const state = reactive({
		dialogFormVisible: false,
	});

	bus.on("introduce", async (set_name : string) => {
		title.value = set_name
		const res = await getCompanyIntroduce(set_name)
		if (res.status === 0) {
			if (res.result[0] && res.result[0].set_text) {
				valueHtml.value = res.result[0].set_text;
			}
			else {
				ElMessage.error(res.msg);
			}
		} else {
			ElMessage.error(getTip('other'));
		}
	})
	
	// 内容 HTML
	const valueHtml = ref()

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