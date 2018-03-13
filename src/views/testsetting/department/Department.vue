<template>
	<div class="department">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList">
				<content-title>体检科室</content-title>
				<el-form :model="queryData" size="small" inline>
					<el-form-item label="体检科室名称">
				    <el-input v-model="queryData.name" placeholder="体检科室名称"></el-input>
				  </el-form-item>
				  <el-form-item label="体检科室类型">
				    <el-select v-model="queryData.type" placeholder="体检科室类型">
				      <el-option v-for="item in dptypeOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
				    <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="40"></el-table-column>
		      <el-table-column prop="name" label="体检科室名称" align="center" min-width="80" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="type" label="体检科室类型" align="center" min-width="65" :formatter="formatterType" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="isenabled" label="是否允许一个项目多个诊断" align="center" min-width="40" :formatter="formatterWhether"></el-table-column>
		      <el-table-column prop="lastaccount" label="最后修改账户" align="center" min-width="60" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="lasttime" label="最后修改时间" align="center" min-width="80" show-overflow-tooltip></el-table-column>
		      <el-table-column label="操作" min-width="100" align='center'>
            <template slot-scope="scope">
              <el-button class="op-mini" @click="clickUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit"></el-button>
              <el-button class="op-mini" @click="deleteData(scope.$index)" type="danger" size="mini" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
		    </el-table>
		    <div class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
		    </div>
			</div>
			<div key="edit" class="page-show" v-else>
				<content-title>体检科室详情</content-title>
				<el-form class="line-form" label-width="30%" label-position="right" :model="formTemp" :rules="rules" ref="formEdit" size="small">
		      <el-form-item label="体检科室名称" prop="name">
		        <el-input v-model="formTemp.name"></el-input>
		      </el-form-item>
		      <el-form-item label="体检科室类型" prop="type">
		      	<el-select v-model="formTemp.type" placeholder="体检科室类型">
				      <el-option v-for="item in dptypeOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
		      </el-form-item>
		      <el-form-item label="备注" prop="remark">
		      	<el-input type="textarea" v-model="formTemp.remark"></el-input>
		      </el-form-item>
		      <el-form-item label="是否允许一个项目多个诊断" prop="isenabled">
		        <el-switch v-model="formTemp.isenabled" active-value="1" inactive-value="2"></el-switch>
		      </el-form-item>
	        <div class="submit-container">
	          <el-button v-if="statusForm=='create'" type="primary" @click="createData">确定</el-button>
	          <el-button v-else type="primary" @click="updateData">确定</el-button>
	          <el-button @click="visibleList = true">返回</el-button>
	        </div>
		    </el-form>
			</div>
		</transition>
	</div>
</template>
<script>
  import DepartmentJs from './Department.js'

  export default DepartmentJs
</script>
<style scoped lang="scss">
	
</style>
