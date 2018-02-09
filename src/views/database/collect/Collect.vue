<template>
	<div class="collect">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList">
			  <el-form :inline="true" :model="queryData" size="small">
			  	<el-form-item label="汇总项目名称">
			      <el-input v-model="queryData.name" placeholder="汇总项目名称"></el-input>
			    </el-form-item>
			    <el-form-item label="发票项目">
			      <el-select v-model="queryData.invoice" placeholder="发票项目">
			        <el-option v-for="item in invoiceOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
			      </el-select>
			    </el-form-item>
			    <el-form-item label="是否启用">
			      <el-select v-model="queryData.isEnabled" placeholder="是否启用">
			        <el-option v-for="item in whetherOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
			      </el-select>
			    </el-form-item>
			    <el-form-item>
			      <el-button type="primary" @click="clickQuery">查询</el-button>
			      <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
			    </el-form-item>
			  </el-form>
		    <el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="name" label="汇总项目名称" align="center" min-width="180"></el-table-column>
		      <el-table-column prop="invoice" label="发票项目" align="center" min-width="50" :formatter="formatterInvoice"></el-table-column>
		      <el-table-column prop="isenabled" label="是否启用" align="center" min-width="50" :formatter="formatterEnabled"></el-table-column>
		      <el-table-column prop="lastaccount" label="最后修改账户" align="center" min-width="130"></el-table-column>
		      <el-table-column prop="lasttime" label="最后修改时间" align="center" min-width="180"></el-table-column>
		      <el-table-column label="操作" min-width="200" align='center'>
	            <template slot-scope="scope">
	              <el-button @click="clickUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit"></el-button>
	              <el-button @click="deleteData(scope.$index)" type="danger" size="mini" icon="el-icon-delete"></el-button>
	            </template>
	          </el-table-column>
		    </el-table>
		    <div class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
		    </div>
		  </div>
		  <div key="edit" class="page-show" v-else>
		    <el-form class="edit-form" :model="formTemp" :rules="rules" ref="formEdit" size="small" label-width="120px">
		      <el-form-item label="发票项目名称" prop="name">
		        <el-input v-model="formTemp.name"></el-input>
		      </el-form-item>
		      <el-form-item label="发票项目">
			      <el-select v-model="formTemp.invoice" placeholder="发票项目">
			        <el-option v-for="item in invoiceOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
			      </el-select>
			    </el-form-item>
		      <el-form-item label="是否启用" prop="isenabled">
		        <el-switch v-model="formTemp.isenabled" active-value="1" inactive-value="2"></el-switch>
		      </el-form-item>
		      <el-form-item label="最后修改账户" prop="lastaccount" v-if="statusForm=='update'">
		        <span>{{formTemp.lastaccount}}</span>
		      </el-form-item>
		      <el-form-item label="最后修改时间" prop='lasttime' v-if="statusForm=='update'">
		        <span>{{formTemp.lasttime}}</span>
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
  import CollectJs from './Collect.js'

  export default CollectJs
</script>
<style scoped lang="scss">
	
</style>