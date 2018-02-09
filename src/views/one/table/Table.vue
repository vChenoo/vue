<template>
  <div>
    <transition name="fade" mode="out-in" v-on:enter="enter">
      <div key="list" class="page-show" v-if="visibleList">
        <el-form :inline="true" :model='listQuery' class="search" size="mimi">
          <el-form-item>
            <el-input placeholder="姓名" v-model='listQuery.name'></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="地址" v-model='listQuery.address'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click='handleFilter' icon="el-icon-search">查询</el-button>
            <el-button type="primary" @click='handleCreate' icon="el-icon-plus">新增</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="mini">
          <el-table-column type="index" :index="indexMethod" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="date" label="日期" align="center" width="180" sortable="true"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center" width="150" sortable="true"></el-table-column>
          <el-table-column prop="sex" sortable="true" label="性别" align="center" width="130" :formatter="formatterSex" :filters="fields.sex.filter.list"
            :filter-method="filterSex" :filter-multiple="fields.sex.filter.multiple"></el-table-column>
          <el-table-column prop="status" label="状态" align="center" width="130" sortable="true" :formatter="formatterStatus"
            :filters="fields.status.filter.list" :filter-method="filterStatus" :filter-multiple="fields.status.filter.multiple"></el-table-column>
          <el-table-column prop="address" label="地址" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="200" align='center'>
            <template slot-scope="scope">
              <el-button @click="handleUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit"></el-button>
              <el-button @click="deleteData(scope.$index)" type="danger" size="mini" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
        </el-pagination>
        </div>
      </div>
      <div key="edit" class="page-show" v-else>
        <el-form :model="formTemp" :rules="rules" ref="formEdit" size="small" label-width="80px">
          <el-form-item label="日期" prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="formTemp.date" :picker-options="pickerDateOptions" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formTemp.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="formTemp.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="启用" prop="status">
            <el-switch v-model="formTemp.status" active-value="1" inactive-value="2"></el-switch>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="formTemp.address"></el-input>
          </el-form-item>
          <el-form-item label="模板内容" style="width:986px;" prop='content'>
            <div id="editorContent"></div>
          </el-form-item>
          <el-form-item>
            <div class="submit-container">
              <el-button v-if="statusForm=='create'" type="primary" @click="createData">确定</el-button>
              <el-button v-else type="primary" @click="updateData">确定</el-button>
              <el-button @click="visibleList = true">返回</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
  import TableJs from './Table.js'

  export default TableJs
</script>
<style scoped>

</style>
