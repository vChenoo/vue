<template>
  <div class="button">
    <el-row>
     <el-button type="primary" icon="el-icon-edit"></el-button>
     <el-button type="primary" icon="el-icon-share"></el-button>
     <el-button type="primary" icon="el-icon-delete"></el-button>
     <el-button type="primary" icon="el-icon-search">搜索</el-button>
     <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </el-row>
    <el-row>
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
        <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
      <el-button-group>
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="primary" icon="el-icon-share"></el-button>
        <el-button type="primary" icon="el-icon-delete"></el-button>
      </el-button-group>
    </el-row>
    <el-row>
      <el-button type="primary" :loading="true">加载中</el-button>
    </el-row>
    <el-row>
      <el-button type="text">文字按钮</el-button>
      <el-button type="text" disabled>文字按钮</el-button>
    </el-row>
    <el-row>
      <el-button round>默认按钮</el-button>
        <el-button size="medium" round>中等按钮</el-button>
        <el-button size="small" round>小型按钮</el-button>
        <el-button size="mini" round>超小按钮</el-button>
    </el-row>
    <div>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>
  </div>
</template>

<script>
  import ButtonJs from './Button.js'

  export default ButtonJs
</script>
<style scoped lang="scss">
  .demo-layout .el-row{margin-bottom:20px}
</style>
