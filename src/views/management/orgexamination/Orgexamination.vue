<template>
	<div class="orgexamination">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList">
				<el-form :model="queryData" size="small" inline>
					<el-form-item label="体检单位">
				    <el-select v-model="queryData.organization" placeholder="体检单位">
				      <el-option v-for="item in orgOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="体检时间">
		        <el-date-picker v-model="queryData.exameTime" type="datetimerange" :picker-options="pickerOption" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" align="right"></el-date-picker>
		      </el-form-item>
				  <el-form-item label="是否已完结">
				    <el-select v-model="queryData.isOver" placeholder="是否已完结">
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
		      <el-table-column prop="code" label="单位体检编号" align="center" min-width="130"></el-table-column>
		      <el-table-column prop="organization" label="单位名称" align="center" min-width="130" :formatter="formatterOrg"></el-table-column>
		      <el-table-column prop="starttime" label="体检开始时间" align="center" min-width="100"></el-table-column>
		      <el-table-column prop="endtime" label="体检结束时间" align="center" min-width="100"></el-table-column>
		      <el-table-column prop="isover" label="是否已完结" align="center" min-width="100" :formatter="formatterWhether"></el-table-column>
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
					<h4>单位体检信息</h4>
					<div class="group">
						<el-row :gutter="30">
							<el-col :sm="24" :md="8">
								<el-form-item label="体检单位" prop="organization">
					        <el-select v-model="formTemp.organization" placeholder="体检单位">
							      <el-option v-for="item in orgOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
							    </el-select>
					      </el-form-item>
							</el-col>
				      <el-col :sm="24" :md="8">
		    	      <el-form-item label="开始日期" prop="starttime">
					      	<el-date-picker v-model="formTemp.starttime" type="date"></el-date-picker>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
		    	      <el-form-item label="结束日期" prop="endtime">
					      	<el-date-picker v-model="formTemp.endtime" type="date"></el-date-picker>
					      </el-form-item>
				      </el-col>				      
						</el-row>			
					</div>
					<h4>单位分组选择</h4>
		      <div class="group">
		      	<el-form-item label="单位分组" prop="orggroup">
		      		<template>
		      			<el-select v-model="formTemp.orggroup" multiple filterable size="medium" placeholder="请选择此次体检需用到的分组（至少一项）" value-key="code">
		      				<el-option v-for="item in orgGroups" :key="item.code" :label="item.name" :value="item">{{item.name}}</el-option>
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
  import OrgexaminationJs from './Orgexamination.js'

  export default OrgexaminationJs
</script>
<style scoped lang="scss">
	.group-form .group {
		margin: 5px 30px;
	}
</style>
