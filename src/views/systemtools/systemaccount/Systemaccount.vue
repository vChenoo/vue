<template>
	<div class="systemaccount">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList">
				<content-title>账户管理</content-title>
			  <el-form :inline="true" :model="queryData" size="small">
			  	<el-form-item label="账户">
			      <el-input v-model="queryData.account" placeholder="账户"></el-input>
			    </el-form-item>
			    <el-form-item label="所有者姓名">
			      <el-input v-model="queryData.name" placeholder="所有者姓名"></el-input>
			    </el-form-item>
			    <el-form-item label="是否启用">
			      <el-select v-model="queryData.isEnabled" placeholder="是否启用">
			        <el-option v-for="item in whetherOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
			      </el-select>
			    </el-form-item>
			    <el-form-item>
			      <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
			      <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
			    </el-form-item>
			  </el-form>
		    <el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="account" label="账户" align="center" min-width="60" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="name" label="所有者姓名" align="center" min-width="60" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="isenabled" label="是否启用" align="center" min-width="50" :formatter="formatterEnabled"></el-table-column>
		      <el-table-column prop="lasttime" label="最近登录时间" align="center" min-width="60" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="lastip" label="最近登录IP" align="center" min-width="60" show-overflow-tooltip></el-table-column>
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
		  	<content-title>账户管理详情</content-title>
		    <el-form class="line-form" label-width="30%" label-position="right" :model="formTemp" :rules="rules" ref="formEdit" size="small">
		    	<el-form-item label="账户" prop="account">
		        <el-input v-model="formTemp.account"></el-input>
		      </el-form-item>
		      <!-- <el-form-item label="密码" prop="password">
		        <el-input type="password" v-model="formTemp.password" auto-complete="off"></el-input>
		      </el-form-item>
		      <el-form-item label="确认密码" prop="confirmpwd">
		        <el-input type="password" v-model="formTemp.confirmpwd" auto-complete="off"></el-input>
		      </el-form-item> -->
		      <el-form-item label="是否启用" prop="isenabled">
		        <el-switch v-model="formTemp.isenabled" active-value="1" inactive-value="2"></el-switch>
		      </el-form-item>
		      <el-form-item label="所有者姓名" prop="name">
		        <el-input v-model="formTemp.name"></el-input>
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
  import SystemaccountJs from './Systemaccount.js'

  export default SystemaccountJs
</script>
<style scoped lang="scss">
	
</style>