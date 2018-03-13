<template>
	<div class="orghistory">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList===1">
				<content-title>单位体检转档记录</content-title>
				<el-form :model="queryData" size="small" inline>
					<el-form-item label="体检单位">
				    <el-select v-model="queryData.organization" placeholder="体检单位">
				      <el-option v-for="item in orgOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="体检时间">
		        <el-date-picker v-model="queryData.exameTime" type="datetimerange" :picker-options="pickerOption" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" align="right"></el-date-picker>
		      </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="code" label="单位体检编号" align="center" min-width="80" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="organization" label="单位名称" align="center" min-width="80" :formatter="formatterOrg" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="starttime" label="体检开始时间" align="center" min-width="80" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="endtime" label="体检结束时间" align="center" min-width="80" show-overflow-tooltip></el-table-column>
		      <el-table-column label="操作" min-width="145" align='center'>
            <template slot-scope="scope">
              <el-button class="op-mini" type="primary" size="mini" @click="clickDetail(scope.row, scope.$index)">详情</el-button>
              <el-button class="op-mini" type="primary" size="mini" @click="clickCancelOver(scope.row)">转档回撤</el-button>
            </template>
          </el-table-column>
		    </el-table>
		    <div class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
		    </div>
			</div>
			<div key="charge" class="page-show" v-else-if="visibleList===2">
				<content-title>单位体检转档记录详情</content-title>
				<div class="top-back">
					<el-button size="medium" @click="visibleList = 1">返回<i class="el-icon-arrow-right el-icon--right"></i></el-button>
				</div>
				<h4>单位信息</h4>
				<div class="group">
					<el-form :model="chargeTemp" ref="formEdit" size="small" label-suffix="：" label-width="90px" label-position="left">
						<el-row :gutter="30">
				      <el-col :sm="24" :md="6">
		    	      <el-form-item label="单位名称" prop="name">
		    			    <span>{{chargeTemp.organizationName}}</span>
		    	      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="6">
								<el-form-item label="单位编号" prop="code">
					        <span>{{chargeTemp.code}}</span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="6">
								<el-form-item label="体检时间" prop="date">
					        <span>{{chargeTemp.date}}</span>
					      </el-form-item>
							</el-col>
						</el-row>
			    </el-form>
				</div>
				<h4 class="title">分组信息列表</h4>
				<div class="group">
	      	<el-table :data="groupList" border highlight-current-row style="width: 100%" align='center' size="mini">
	      		<el-table-column prop="name" label="分组名称" align="center" min-width="120" show-overflow-tooltip></el-table-column>
	      		<el-table-column prop="cash" label="分组收费金额" align="center" min-width="60" show-overflow-tooltip></el-table-column>
	      		<el-table-column prop="counttype" label="计数方式" align="center" min-width="80" show-overflow-tooltip></el-table-column>
			      <el-table-column prop="number" label="计算人数" align="center" min-width="60" show-overflow-tooltip></el-table-column>
			      <el-table-column prop="discount" label="折扣" align="center" min-width="60" show-overflow-tooltip></el-table-column>
			      <el-table-column prop="cashtotal" label="分组总金额" align="center" min-width="100" show-overflow-tooltip></el-table-column>
			    </el-table>
				</div>
				<h4 class="title">收费信息</h4>
				<div class="group">
					<el-form :model="chargeInfo" size="small" label-suffix="：" label-width="90px" label-position="left">
						<el-row>
				      <el-col :sm="24" :md="6">
				      	<el-form-item label="结算人数" prop="number">
					      	<span>{{chargeInfo.number}}</span>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="6">
				      	<el-form-item label="应收总额" prop="total">
					      	<span>{{chargeInfo.total}}</span>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="6">
				      	<el-form-item label="是否欠费" prop="istotal">
					      	<span>{{chargeInfo.istotal}}</span>
					      </el-form-item>
				      </el-col>
						</el-row>
			    </el-form>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
  import OrghistoryJs from './Orghistory.js'

  export default OrghistoryJs
</script>
<style scoped lang="scss">
	.group-form .group {
		margin: 5px 30px;
	}
	.cash-input {
		margin-bottom: 18px;
		/deep/ .el-input {
			width: 15rem;
			/deep/ .el-input-group__prepend {
				border-right-width: 0px;
			}
		}
	}
	.text-balance, .text-total {
		font-size: 2.5rem;
		color: #FF0000;
	}
</style>
