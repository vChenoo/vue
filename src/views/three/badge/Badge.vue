<template>
  <div class="badge">
    <el-row>
      <el-badge :value="12" class="item">
        <el-button size="small">评论</el-button>
      </el-badge>
      <el-badge :value="200" :max="99" class="item">
        <el-button size="small">评论</el-button>
      </el-badge>
      <el-badge value="new" class="item">
        <el-button size="small">评论</el-button>
      </el-badge>
    </el-row>
    <el-row>
      <el-badge is-dot class="item">数据查询</el-badge>
      <el-badge is-dot class="item">
        <el-button class="share-button" icon="el-icon-share" type="primary"></el-button>
      </el-badge>
    </el-row>
  </div>
</template>

<script>
  import BadgeJs from './Badge.js'

  export default BadgeJs
</script>
<style scoped lang="scss">
  .demo-layout .el-row{margin-bottom:20px}
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
