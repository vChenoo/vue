<template>
	<div class="testtype">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList">
				<content-title>体检类别管理</content-title>
			  <el-form :inline="true" :model="queryData" size="small">
			  	<el-form-item label="体检类别名称">
			      <el-input v-model="queryData.name" placeholder="体检类别名称"></el-input>
			    </el-form-item>
			    <el-form-item label="体检报告类型">
			      <el-select v-model="queryData.report" placeholder="体检报告类型">
			        <el-option v-for="item in reportOptions" :key="item.code" :value="item.code" :label="item.name"></el-option>
			      </el-select>
			    </el-form-item>
			    <el-form-item label="职业病类型">
			      <el-select v-model="queryData.occupational" placeholder="职业病类型">
			        <el-option v-for="item in occupationalOptions" :key="item.code" :value="item.code" :label="item.name"></el-option>
			      </el-select>
			    </el-form-item>
			    <el-form-item label="业务类型">
			      <el-select v-model="queryData.service" placeholder="业务类型">
			        <el-option v-for="item in serviceOptions" :key="item.code" :value="item.code" :label="item.name"></el-option>
			      </el-select>
			    </el-form-item>
			    <el-form-item>
			      <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
			      <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
			    </el-form-item>
			  </el-form>
		    <el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="name" label="体检类别名称" align="center" min-width="110" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="report" label="体检报告类型" align="center" min-width="100" :formatter="formatterReport" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="occupational" label="职业病类型" align="center" min-width="100" :formatter="formatterOccupational" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="service" label="业务类型" align="center" min-width="100" :formatter="formatterService" show-overflow-tooltip></el-table-column>
		      <el-table-column label="操作" min-width="120" align='center'>
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
		  	<content-title>体检类别管理详情</content-title>
		    <el-form class="line-form" label-width="30%" label-position="right" :model="formTemp" :rules="rules" ref="formEdit" size="small">
		      <el-form-item label="体检类别名称" prop="name">
		        <el-input v-model="formTemp.name"></el-input>
		      </el-form-item>
		      <el-form-item label="体检报告类型" prop="report">
		        <el-select v-model="formTemp.report" placeholder="体检报告类型">
			        <el-option v-for="item in reportOption" :key="item.value" :value="item.value" :label="item.label"></el-option>
			      </el-select>
		      </el-form-item>
		      <el-form-item label="职业病类型" prop="occupational">
		        <el-select v-model="formTemp.occupational" placeholder="职业病类型">
			        <el-option v-for="item in occupationalOption" :key="item.value" :value="item.value" :label="item.label"></el-option>
			      </el-select>
		      </el-form-item>
		      <el-form-item label="业务类型" prop="service">
		        <el-select v-model="formTemp.service" placeholder="业务类型">
			        <el-option v-for="item in serviceOption" :key="item.value" :value="item.value" :label="item.label"></el-option>
			      </el-select>
		      </el-form-item>
		      <el-form-item label="备注" prop='remark'>
		        <el-input type="textarea" v-model="formTemp.remark"></el-input>
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
  import TesttypeJs from './Testtype.js'

  export default TesttypeJs
</script>
<style scoped lang="scss">
	
</style>