<template>
	<div class="formalregister">
		<el-steps class="show-step" :active="active">
			<el-step class="not-step" title="" icon="el-icon-caret-right"></el-step>
		  <el-step v-for="item in steps" :key="item.id" :title="item.title"></el-step>
		  <el-step class="not-step" title="" icon="el-icon-caret-right"></el-step>
		</el-steps>
		<el-button style="margin-top: 12px;" @click="next">下一步</el-button>
	</div>
</template>
<script>
  import FormalregisterJs from './Formalregister.js'

  export default FormalregisterJs
</script>
<style scoped lang="scss">
	/* .show-step {
		margin: 10px 20%;
	} */
	.not-step /deep/ .el-step__icon {
		display: none
	}
</style>