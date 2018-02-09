<template>
  <div class="pagination">
    <div class="block">
      <span class="demonstration">完整功能</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import PaginationJs from './Pagination.js'

  export default PaginationJs
</script>
<style scoped lang="scss">
  .demo-layout .el-row{margin-bottom:20px}
</style>
