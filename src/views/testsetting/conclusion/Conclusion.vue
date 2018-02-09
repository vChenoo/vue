<template>
	<div class="conclusion">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList">
				<content-title>体检结论列表</content-title>
			  <el-form :inline="true" :model="queryData" size="small">
			  	<el-form-item label="体检结论名称">
			      <el-input v-model="queryData.name" placeholder="体检结论名称"></el-input>
			    </el-form-item>
			    <el-form-item>
			      <el-button type="primary" @click="clickQuery">查询</el-button>
			      <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
			    </el-form-item>
			  </el-form>
		    <el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="name" label="体检结论名称" align="center" min-width="180"></el-table-column>
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
		      <el-form-item label="体检结论名称" prop="name">
		        <el-input v-model="formTemp.name"></el-input>
		      </el-form-item>
		      <el-form-item label="备注" prop="remark">
		        <el-input v-model="formTemp.remark"></el-input>
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
  import ConclusionJs from './Conclusion.js'

  export default ConclusionJs
</script>
<style scoped lang="scss">
	
</style>