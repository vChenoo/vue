<template>
  <div class="systemlog">
    <el-form :inline="true" :model="queryData" size="small">
      <el-form-item label="操作类型">
        <el-select v-model="queryData.type" placeholder="操作类型">
          <el-option v-for="item in typeOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="体检编号">
        <el-input v-model="queryData.testNum" placeholder="体检编号"></el-input>
      </el-form-item>
      <el-form-item label="操作时间">
        <el-date-picker v-model="queryData.operateTime" type="datetimerange" :picker-options="pickerOption" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" align="right"></el-date-picker>
      </el-form-item>
      <el-form-item label="操作账号">
        <el-input v-model="queryData.operateAccount" placeholder="操作账号"></el-input>
      </el-form-item>
      <el-form-item label="操作员工">
        <el-input v-model="queryData.operateUser" placeholder="操作员工"></el-input>
      </el-form-item>
      <el-form-item label="操作内容">
        <el-input v-model="queryData.operateContent" placeholder="操作内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="clickQuery">查询</el-button>
      </el-form-item>
    </el-form>
    <div key="list" class="page-show">
      <el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
        <el-table-column type="index" :index="indexMethod" label="序号" align="center" width="50"></el-table-column>
        <el-table-column prop="account" label="操作账号" align="center" width="180"></el-table-column>
        <el-table-column prop="name" label="操作员工" align="center" width="150"></el-table-column>
        <el-table-column prop="type" label="操作类型" align="center" width="130" :formatter="formatterType"></el-table-column>
        <el-table-column prop="date" label="操作时间" align="center" width="130" sortable="true" show-overflow-tooltip></el-table-column>
        <el-table-column prop="content" label="操作内容" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="number" label="体检编号" align="center"></el-table-column>
        <el-table-column prop="ipaddress" label="操作IP" align="center"></el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
      </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import SystemlogJs from './Systemlog.js'

  export default SystemlogJs
</script>
<style scoped lang="scss">

</style>
