<template>
	<div class="clinical">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList">
				<content-title>临床类型管理</content-title>
			  <el-form :inline="true" :model="queryData" size="small">
			  	<el-form-item label="临床类型名称">
			      <el-input v-model="queryData.typeName" placeholder="临床类型名称"></el-input>
			    </el-form-item>
			    <!-- <el-form-item label="编号">
			      <el-input v-model="queryData.code" placeholder="临床类型编号"></el-input>
			    </el-form-item> -->
			    <el-form-item>
			      <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
			      <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
			    </el-form-item>
			  </el-form>
		    <el-table :data="tableData.dataList" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="typeName" label="临床类型名称" align="center" min-width="100" show-overflow-tooltip></el-table-column>
		      <!-- <el-table-column prop="code" label="编号" align="center" min-width="80" show-overflow-tooltip></el-table-column> -->
		      <el-table-column prop="clinicalTypeColor" label="颜色" align="center" min-width="80" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="editUser" label="最后修改账户" align="center" min-width="80" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="updateDate" label="最后修改时间" align="center" min-width="80" show-overflow-tooltip></el-table-column>
		      <el-table-column label="操作" min-width="120" align='center'>
	            <template slot-scope="scope">
	              <el-button class="op-mini" @click="clickUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit"></el-button>
	              <el-button class="op-mini" @click="deleteData(scope.$index)" type="danger" size="mini" icon="el-icon-delete"></el-button>
	            </template>
	          </el-table-column>
		    </el-table>
		    <div class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.number" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.size" layout="total, sizes, prev, pager, next, jumper" :total="tableData.totalElements" background></el-pagination>
		    </div>
		  </div>
		  <div key="edit" class="page-show" v-else>
		  	<content-title>临床类型管理详情</content-title>
		    <el-form class="line-form" label-width="30%" label-position="right" :model="formTemp" :rules="rules" ref="formEdit" size="small">
		      <el-form-item label="临床类型名称" prop="typeName">
		        <el-input v-model="formTemp.typeName"></el-input>
		      </el-form-item>
		      <!-- <el-form-item label="编号" prop="code">
		        <el-input v-model="formTemp.code"></el-input>
		      </el-form-item> -->
		      <el-form-item label="颜色" prop="clinicalTypeColor">
		      	<!-- <el-select v-model="formTemp.color" placeholder="颜色">
		      			          <el-option v-for="item in colorOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
		      			        </el-select> -->
		        <el-input v-model="formTemp.clinicalTypeColor"></el-input>
		      </el-form-item>
		      <el-form-item label="备注" prop="remark">
		        <el-input v-model="formTemp.remark"></el-input>
		      </el-form-item>
		      <el-form-item label="最后修改账户" prop="editUser" v-if="statusForm=='update'">
		        <span>{{formTemp.editUser}}</span>
		      </el-form-item>
		      <el-form-item label="最后修改时间" prop='updateDate' v-if="statusForm=='update'">
		        <span>{{formTemp.updateDate}}</span>
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
  import ClinicalJs from './Clinical.js'

  export default ClinicalJs
</script>
<style scoped lang="scss">
	
</style>