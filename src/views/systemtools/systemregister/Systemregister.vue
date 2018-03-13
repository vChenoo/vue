<template>
	<div class="systemregister">
		<div class="main-title">
			<p class="title">系统注册</p>
			<p class="subtitle">License Key</p>
			<div class="register-warp">
				<el-form label-position="left" label-suffix=":" class="status">
					<el-form-item label="当前状态">
						<span v-bind:class="{'text-success':hasRegister,'text-warning':needRegister,'text-danger':notRegister}">{{registerStatus}}</span>
					</el-form-item>
					<el-form-item label="注册期限">
						<span>{{registerData.time}}</span>
					</el-form-item>
					<el-form-item label="注册单位">
						<span>{{registerData.unit}}</span>
					</el-form-item>
					<!-- <el-form-item>
						    	<el-button type="primary" @click="startRegister">点击开始注册</el-button>
					</el-form-item> -->
				</el-form>
			</div>
			<div class="register-warp">
				<el-form :model="registerForm" ref="registerForm" :rules="rules" @submit.native.prevent>
					<el-form-item prop="register" label="请输入注册码">
						<el-input v-model="registerForm.register" placeholder="注册码" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item>
				  	<el-button type="primary" @click="submitRegister('registerForm')">提交</el-button>
				  	<el-button @click="resetForm('registerForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
	  </div>
	</div>
</template>
<script>
  import SystemregisterJs from './Systemregister.js'

  export default SystemregisterJs
</script>
<style scoped lang="scss">
	.register-warp {
		margin: 1rem 0 1rem 10%;
	}
	.el-form {
		width: 460px;
		&.status {
			.el-form-item {
				margin-bottom: 0;
			}
		}
	}
	@media only screen and (max-width:991px){
		.el-form {
			width: 100%;
		}
	}
</style>