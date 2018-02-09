<template>
	<div class="package">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList">
				<el-form :model="queryData" size="small" inline>
					<el-form-item label="套餐名称">
				    <el-input v-model="queryData.name" placeholder="套餐名称"></el-input>
				  </el-form-item>
				  <el-form-item label="套餐简称">
				    <el-input v-model="queryData.shorthand" placeholder="套餐简称"></el-input>
				  </el-form-item>
				  <el-form-item label="体检类别">
				    <el-select v-model="queryData.testtype" placeholder="体检类别">
				      <el-option v-for="item in typeOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery">查询</el-button>
				    <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="name" label="体检套餐名称" align="center" min-width="100"></el-table-column>
		      <el-table-column prop="shorthand" label="套餐简称" align="center" min-width="130"></el-table-column>
		      <el-table-column prop="testtype" label="体检类别" align="center" min-width="130" :formatter="formatterType"></el-table-column>
		      <el-table-column prop="originalprice" label="标准价格" align="center" min-width="100"></el-table-column>
		      <el-table-column prop="isenabled" label="是否启用" align="center" min-width="100" :formatter="formatterWhether"></el-table-column>
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
				<el-form class="group-form" :model="formTemp" :rules="rules" ref="formEdit" size="small" label-width="120px" label-position="left">
					<h4>组合项目主要信息</h4>
					<div class="group">
						<el-row :gutter="30">
							<el-col :sm="24" :md="8">
								<el-form-item label="套餐名称" prop="name">
					        <el-input v-model="formTemp.name"></el-input>
					      </el-form-item>
							</el-col>
				      <el-col :sm="24" :md="8">
		    	      <el-form-item label="简称" prop="shorthand">
		    	      	<el-input v-model="formTemp.shorthand"></el-input>
		    	      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="体检类别" prop="testtype">
					      	<el-select v-model="formTemp.testtype" placeholder="体检类别">
							      <el-option v-for="item in typeOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
							    </el-select>
					      </el-form-item>
				      </el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :sm="24" :md="8">
				      	<el-form-item label="是否启用" prop="isenabled">
					        <el-switch v-model="formTemp.isenabled" active-value="1" inactive-value="2"></el-switch>
					      </el-form-item>
				      </el-col>							
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="适用性别" prop="sex">
					      	<el-select v-model="formTemp.sex" placeholder="适用性别">
							      <el-option v-for="item in sexOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
							    </el-select>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="备注" prop="remark">
					      	<el-input v-model="formTemp.remark"></el-input>
					      </el-form-item>
				      </el-col>			      
						</el-row>
			      <el-row :gutter="30">
			      	<el-col :sm="24" :md="24">
				      	<el-form-item label="简介" prop="profile">
							    <el-input type="textarea" v-model="formTemp.profile"></el-input>
					      </el-form-item>
				      </el-col>
			      </el-row>
					</div>
		      <h4>项目选择</h4>
		      <div class="group">
		      	<el-row :gutter="30">
							<el-col :sm="24" :md="8">
								<el-form-item label="标准价格" prop="originalprice">
					        <el-input v-model="originalPrice" disabled></el-input>
					      </el-form-item>
							</el-col>
				      <el-col :sm="24" :md="8">
		    	      <el-form-item label="折扣" prop="discount">
		    	      	<el-input v-model="formTemp.discount"></el-input>
		    	      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="实际费用" prop="price">
					      	<el-input v-model="Price" disabled></el-input>
					      </el-form-item>
				      </el-col>
						</el-row>
		      	<el-form-item label="组合项目" prop="groupproject">
		      		<template>
		      			<el-select v-model="formTemp.groupproject" multiple filterable size="medium" placeholder="请选择套餐内包含的组合项目">
		      				<el-option v-for="item in groupOption" :key="item.code" :label="item.name" :value="item.code">
		      					<span style="float:left">{{item.name}}</span>
		      					<span style="float: right;margin-right:15px; color: #8492a6; font-size: 13px">{{ item.price }}￥</span>
		      				</el-option>
		      			</el-select>
		      		</template>
		      	</el-form-item>
		      </div>
		      <el-col :span="24">
		      	<el-form-item>
			        <div class="submit-container">
			          <el-button v-if="statusForm=='create'" type="primary" @click="createData">确定</el-button>
			          <el-button v-else type="primary" @click="updateData">确定</el-button>
			          <el-button @click="visibleList = true">返回</el-button>
			        </div>
			      </el-form-item>
		      </el-col>
		    </el-form>
			</div>
		</transition>
	</div>
</template>
<script>
  import packageJs from './package.js'

  export default packageJs
</script>
<style scoped lang="scss">
	.group-form .group {
		margin: 5px 30px;
	}
</style>
