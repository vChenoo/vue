<template>
	<div class="orgexamination">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList===1">
				<content-title>单位体检</content-title>
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
				    <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
				    <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="code" label="单位体检编号" align="center" min-width="130" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="organization" label="单位名称" align="center" min-width="130" :formatter="formatterOrg" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="starttime" label="体检开始时间" align="center" min-width="100" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="endtime" label="体检结束时间" align="center" min-width="100" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="isover" label="是否已完结" align="center" min-width="60" :formatter="formatterWhether"></el-table-column>
		      <el-table-column label="操作" min-width="340" align='left' header-align="center">
            <template slot-scope="scope">
              <el-button class="op-mini" @click="clickUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit"></el-button>
              <el-button class="op-mini" type="primary" size="mini" @click="clickCharge(scope.row, scope.$index)">收费</el-button>
              <el-button class="op-mini" type="primary" size="mini" @click="clickArrearage(scope.row)">欠费</el-button>
              <el-button class="op-mini" type="primary" size="mini" @click="clickOver(scope.row)" v-if="scope.row.isover==2">完结</el-button>
              <el-button class="op-mini" type="primary" size="mini" @click="clickCancelOver(scope.row)" v-else-if="scope.row.isover==1">取消完结</el-button>
              <el-button class="op-mini" type="primary" size="mini">转档</el-button>
              <el-button class="op-mini" @click="deleteData(scope.$index)" type="danger" size="mini" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
		    </el-table>
		    <div class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
		    </div>
			</div>
			<div key="edit" class="page-show" v-else-if="visibleList===2">
				<content-title>单位体检详情</content-title>
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
	        <div class="submit-container">
	          <el-button v-if="statusForm=='create'" type="primary" @click="createData">确定</el-button>
	          <el-button v-else type="primary" @click="updateData">确定</el-button>
	          <el-button @click="visibleList = 1">返回</el-button>
	        </div>
		    </el-form>
			</div>
			<div key="charge" class="page-show" v-else-if="visibleList===3">
				<content-title>单位体检收费</content-title>
				<h4>单位信息</h4>
				<div class="group">
					<el-form class="group-form" :model="chargeTemp" ref="formEdit" size="small" label-suffix="：" label-width="90px" label-position="left">
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
					<el-form class="group-form" :model="chargeInfo" size="small" label-suffix="：" label-width="90px" label-position="left">
						<el-row>
							<el-col :sm="24" :md="6">
								<el-form-item label="单位名称" prop="chargename">
					        <span>{{chargeInfo.chargename}}</span>
					      </el-form-item>
							</el-col>
				      <el-col :sm="24" :md="6">
				      	<el-form-item label="单位编号" prop="code">
					      	<span>{{chargeInfo.code}}</span>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="6">
				      	<el-form-item label="应收金额" prop="cpreceivable">
					      	<span>{{chargeInfo.cpreceivable}}</span>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="6">
				      	<el-form-item label="结算人数" prop="number">
					      	<span>{{chargeInfo.number}}</span>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="6">
				      	<el-form-item label="凑整差额" prop="balance">
					      	<span class="text-balance">{{chargeInfo.balance}}</span>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="6">
				      	<el-form-item label="本次应收" prop="total">
					      	<span class="text-total">{{chargeInfo.total}}</span>
					      </el-form-item>
				      </el-col>
						</el-row>
			    </el-form>
				</div>
				<h4 class="title">收费结算</h4>
				<div class="group">
					<el-form :model="settlement" size="small" label-suffix="：" label-width="90px" label-position="left">
						<el-row>
							<el-col :sm="24" :md="8">
								<el-form-item label="收费编号" prop="code">
					        <span>{{settlement.code}}</span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="8">
								<el-form-item label="收费时间" prop="time">
					        <span>{{settlement.time}}</span>
					      </el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :sm="24" :md="8">
								<el-form-item label="应收金额" prop="total">
					        <span>{{settlement.total}}</span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="8">
								<el-form-item label="实收金额" prop="actualtotal">
					        <span>{{settlement.actualtotal}}</span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="8">
								<el-form-item label="实际差额" prop="balance">
					        <span>{{settlement.balance}}</span>
					      </el-form-item>
							</el-col>
						</el-row>
						<el-row class="cash-input">
							<el-col :sm="24" :md="8">
								<el-input type="number" placeholder="请输入收现金额" :min="0" tabindex="1" v-model="cash" @blur="limitNumber">
								  <template slot="prepend">收现金额</template>
								</el-input>
							</el-col>
							<el-col :sm="24" :md="8">
								<el-input type="number" placeholder="请输入找零金额" :min="0"tabindex="2" v-model="cashChange" @blur="limitNumber">
								  <template slot="prepend">找零</template>
								</el-input>
							</el-col>
							<el-col :sm="24" :md="8">
								<el-button type="primary" size="large">收费</el-button>
								<el-button size="large">其他收费方式</el-button>
							</el-col>
						</el-row>
						<el-row class="invoice-input">
							<el-col :sm="24" :md="8">
								<el-form-item label="是否打印发票" label-width="120px" prop="isinvoice">
									<el-checkbox v-model="isInvoice"></el-checkbox>
								</el-form-item>
							</el-col>
						</el-row>
						<div class="submit-container">
		          <el-button size="small" @click="visibleList = 1">返回</el-button>
		        </div>
					</el-form>
				</div>
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
