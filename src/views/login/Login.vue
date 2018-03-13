<template>
	<div class="login">
		<div class="login-content">
      <h2 class="title">系统登录</h2>
			<el-form class="loginform" label-position="left" label-width="0px" ref='loginForm' :model='data' :rules="loginRules">
        <el-form-item prop='username'>
          <el-input type="text" size="large" auto-complete="off" placeholder="账号" v-model='data.username' prefix-icon="el-icon-tj-user"></el-input>
        </el-form-item>

        <el-form-item prop='password'>
          <el-input type="password" auto-complete="off" placeholder="密码" v-model='data.password' @keyup.native.enter="onLogin" prefix-icon="el-icon-view"></el-input>
        </el-form-item>
        <el-form-item prop="isremember">
          <el-checkbox v-model="data.isremember">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" type="default" @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
		</div>
    <ul class="line-animate">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
	</div>
</template>

<script>
  import LoginJs from './Login.js'
  export default LoginJs
</script>

<style scoped lang="scss">
	@import url(Login.scss);
</style>