<template>
  <div class="progress">
    <el-row>
      <el-progress :percentage="0"></el-progress>
      <el-progress :text-inside="true" :stroke-width="28" :percentage="70"></el-progress>
      <el-progress :percentage="100" status="success"></el-progress>
      <el-progress :percentage="50" status="exception"></el-progress>
    </el-row>
    <el-row>
      <el-progress type="circle" :percentage="0"></el-progress>
      <el-progress type="circle" :percentage="25"></el-progress>
      <el-progress type="circle" :percentage="100" status="success"></el-progress>
      <el-progress type="circle" :percentage="50" status="exception"></el-progress>
    </el-row>
  </div>
</template>

<script>
  import ProgressJs from './Progress.js'

  export default ProgressJs
</script>
<style scoped lang="scss">
  .demo-layout .el-row{margin-bottom:20px}
</style>
