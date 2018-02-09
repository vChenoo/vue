<template>
  <div class="systemclear">
  	<div class="main-title">
  		<p class="title">系统优化</p>
  		<p class="subtitle">用于系统数据优化</p>
  		<div class="operation">
  			<el-button type="primary" icon="el-icon-tj-youhua" @click="optimizeHandle">系统优化</el-button>
  			<el-progress type="circle" :percentage="optimizePercent" :width="150" v-show="isOptimize" :status="optimizePercentStatus"></el-progress>
  		</div>
  	</div>
  	<div class="main-title">
  		<p class="title">系统清理</p>
  		<p class="subtitle">用于系统功能数据清理</p>
  		<div class="operation">
  			<el-button type="primary" icon="el-icon-tj-cleanup" @click="clearHandle">系统清理</el-button>
  			<el-progress type="circle" :percentage="clearPercent" :width="150" v-show="isClear" :status="clearPercentStatus"></el-progress>
  		</div>
  	</div>
  </div>
</template>
<script>
  import SystemclearJs from './Systemclear.js'

  export default SystemclearJs
</script>
<style scoped lang="scss">
	.operation {
		margin: 1rem 0 1rem 10%;
		height: 150px;
		.el-button {
			margin-top: 54px;
		}
		.el-progress {
			margin-left: 8%;
			vertical-align: middle;
		}
	}
</style>