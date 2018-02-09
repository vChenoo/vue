<template>
  <div class="tree">
    <el-input size="mini"
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>

    <el-row>
      <el-tree
        :data="data" ref="tree" :filter-node-method="filterNode"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="true"
        :render-content="renderContent">
      </el-tree>
    </el-row>
    <el-dialog :title="isAdd?'新增节点':'修改节点'" :visible.sync="nodeChangeDialog" width="30%" center>
      <el-input v-model="nodeValue" placeholder="请输入节点名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="nodeChangeCfm">确 定</el-button>
        <el-button>取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import TreeJs from './Tree.js'

  export default TreeJs
</script>
<style scoped lang="scss">
  .demo-layout .el-row{margin-bottom:20px}
  /deep/ .node-item {
    flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;
    .el-button {
      font-size: 12px;
    }
  }
</style>
