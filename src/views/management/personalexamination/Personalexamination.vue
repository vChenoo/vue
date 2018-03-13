<template>
	<div class="personalexamination">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList===1">
				<content-title>个人体检管理</content-title>
				<el-form :model="queryData" size="small" inline>
					<el-form-item label="体检编号">
				    <el-input v-model="queryData.code" placeholder="体检编号"></el-input>
				  </el-form-item>
				  <el-form-item label="姓名">
				    <el-input v-model="queryData.name" placeholder="姓名"></el-input>
				  </el-form-item>
				  <el-form-item label="身份证号">
				    <el-input v-model="queryData.idcard" placeholder="身份证号"></el-input>
				  </el-form-item>
				  <el-form-item label="体检类别">
				    <el-select v-model="queryData.testtype" placeholder="体检类别">
				      <el-option v-for="item in testOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="是否已总检">
				    <el-select v-model="queryData.isTotal" placeholder="是否已总检">
				      <el-option v-for="item in whetherOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="40"></el-table-column>
		      <el-table-column prop="code" label="体检编号" align="center" min-width="100" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="times" label="第几次体检" align="center" min-width="60"></el-table-column>
		      <el-table-column prop="prepareid" label="预约编号" align="center" min-width="80" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="registerid" label="登记流水号" align="center" min-width="80" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="name" label="姓名" align="center" min-width="80"></el-table-column> 
		      <el-table-column prop="sex" label="性别" align="center" min-width="40" :formatter="formatterSex"></el-table-column>
		      <el-table-column prop="org" label="体检单位" align="center" min-width="100" :formatter="formatterOrg"  show-overflow-tooltip></el-table-column>
		      <el-table-column prop="testtype" label="体检类别" align="center" min-width="100" :formatter="formatterType"></el-table-column>
		      <el-table-column prop="date" label="体检日期" align="center" min-width="100"  show-overflow-tooltip></el-table-column>
		      <el-table-column prop="idcard" label="身份证号" align="center" min-width="120" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="istotal" label="是否已总检" align="center" min-width="50" :formatter="formatterWhether"></el-table-column>
		      <el-table-column label="操作" min-width="220" align='left' header-align="center">
            <template slot-scope="scope">
            	<el-button class="op-mini" type="primary" size="mini" @click="handleInfo(scope.row, scope.$index)">详情</el-button>
              <el-button class="op-mini" type="primary" size="mini" @click="handleFiled">转档</el-button>
              <el-button class="op-mini" type="primary" size="mini" @click="handleRefused(scope.row)">拒检</el-button>
              <el-button v-if="scope.row.istotal=='1'" class="op-mini" type="primary" size="mini" icon="el-icon-search"></el-button>
            </template>
          </el-table-column>
		    </el-table>
		    <div class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
		    </div>
			</div>
			<div key="edit" class="page-show" v-else-if="visibleList===2">
				<content-title>个人体检拒检</content-title>
				<div class="top-back">
					<el-button size="medium" @click="visibleList = 1">返回<i class="el-icon-arrow-right el-icon--right"></i></el-button>
				</div>
				<h4>个人信息</h4>
				<div class="group">
					<el-form class="group-form" :model="formTemp" ref="formEdit" size="small" label-suffix="：" label-width="90px" label-position="left">
						<el-row :gutter="30">
				      <el-col :sm="24" :md="6">
		    	      <el-form-item label="姓名" label-width="60px" prop="name">
		    			    <span>{{formTemp.name}}</span>
		    	      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="6">
								<el-form-item label="身份证号" prop="idcard">
					        <span>{{formTemp.idcard}}</span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="6">
								<el-form-item label="体检编号" prop="code">
					        <span>{{formTemp.code}}</span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="6">
								<el-form-item label="手机号" prop="phone">
					        <span>{{formTemp.phone}}</span>
					      </el-form-item>
							</el-col>
						</el-row>
			    </el-form>
				</div>
				<h4 class="title">项目列表</h4>
				<div class="group">
			    <el-table ref="itemTable" :data="tableItem" :row-class-name="tableRowClassName" border style="width: 100%" align='center' size="small">
			      <el-table-column type="index" label="序号" align="center" min-width="50"></el-table-column>
			      <el-table-column prop="name" label="项目名称" align="center" min-width="100"></el-table-column>
			      <el-table-column prop="department" label="体检科室" align="center" min-width="130" :formatter="formatterDp"></el-table-column>
			      <el-table-column prop="clinical" label="临床类型" align="center" min-width="130" :formatter="formatterClinical"></el-table-column>
			      <el-table-column prop="isenabled" label="体检状态" align="center" min-width="100">
			      	<template slot-scope="scope">
			      		<span class="text-success" v-if="scope.row.isenabled=='1'">已体检</span>
			      		<span class="text-warning" v-else>未体检</span>
			      	</template>
			      </el-table-column>
			      <el-table-column label="操作" min-width="150" align='center'>
	            <template slot-scope="scope" v-if="scope.row.isenabled=='2'">
	              <el-button type="primary" size="mini" @click="refusedExame(scope.row, scope.$index)">登记拒检</el-button>
	            </template>
	          </el-table-column>
			    </el-table>
				</div>
			</div>
			<div key="info" class="page-show" v-else-if="visibleList===3">
				<content-title>个人体检详情</content-title>
				<div class="top-back">
					<el-button size="medium" @click="visibleList = 1">返回<i class="el-icon-arrow-right el-icon--right"></i></el-button>
				</div>
				<h4>个人体检信息</h4>
				<div class="group">
					<el-form :model="formInfoTemp" ref="formInfo" size="small" label-suffix="：" label-width="90px" label-position="left">
						<el-row :gutter="30">
				      <el-col :sm="24" :md="6">
		    	      <el-form-item label="姓名" label-width="60px" prop="name">
		    			    <span v-text="formInfoTemp.name"></span>
		    	      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="6">
								<el-form-item label="体检编号" prop="code">
									<span v-text="formInfoTemp.code"></span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="6">
								<el-form-item label="体检状态" prop="istotal">
					        <span>已缴费</span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="6">
								<el-form-item label="是否单位体检" label-width="120px" prop="isorg">
					        <span>{{formInfoTemp.isorg | yesorno}}</span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="6" v-if="formInfoTemp.isorg">
								<el-form-item label="体检单位" prop="org">
					        <span>{{formatterOrg(formInfoTemp) }}</span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="6">
								<el-form-item label="体检登记日期" label-width="120px" prop="date">
					        <span v-text="formInfoTemp.date"></span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="6">
								<el-form-item label="性别" prop="sex">
					        <span>{{formatterSex(formInfoTemp)}}</span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="6">
								<el-form-item label="年龄" prop="age">
					        <span v-text="formInfoTemp.age"></span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="6">
								<el-form-item label="电话" prop="phone">
					        <span v-text="formInfoTemp.phone"></span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="6">
								<el-form-item label="证件类型">
					        <span>身份证</span>
					      </el-form-item>
							</el-col>
				      <el-col :sm="24" :md="6">
								<el-form-item label="证件号码" prop="idcard">
					        <span v-text="formInfoTemp.idcard"></span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="6">
								<el-form-item label="地址" prop="address">
					        <span v-text="formInfoTemp.address"></span>
					      </el-form-item>
							</el-col>
						</el-row>
			    </el-form>
				</div>
				<h4>套餐列表</h4>
				<div class="group">
	      	<el-table :data="packageList" border highlight-current-row style="width: 100%" align='center' size="mini">
	      		<el-table-column prop="name" label="套餐名称" align="center" min-width="80" show-overflow-tooltip></el-table-column>
	      		<el-table-column prop="originalprice" label="标准价格" align="center" min-width="60" show-overflow-tooltip></el-table-column>
			      <el-table-column prop="price" label="实际费用" align="center" min-width="60" show-overflow-tooltip></el-table-column>
			      <el-table-column prop="discount" label="折扣" align="center" min-width="60" show-overflow-tooltip></el-table-column>
			    </el-table>
				</div>
				<h4 class="title">组合项目列表</h4>
				<div class="group">
	      	<el-table :data="groupList" border highlight-current-row style="width: 100%" align='center' size="mini">
    		    <el-table-column type="expand" width="70">
    		      <template slot-scope="props">
    		      	<ul class="table-expand header">
    		      		<li>
    		      			<span>项目</span>
    		      			<span>体检结果</span>
    		      			<span>是否正常</span>
    		      		</li>
    		      	</ul>
    		      	<ul class="table-expand">
    		      		<li v-for="item in projectList" :key="item.id" class="item">
	    					    <span class="item">{{item.name}}</span>
	    					    <span class="item">{{item.result + item.unit}}</span>
	    					    <span class="item">{{item.isnormal | yesorno}}</span>
	    					  </li>
    		      	</ul>
    		      </template>
    		    </el-table-column>
	      		<el-table-column prop="isenabled" label="套餐名称" align="center" min-width="80" :formatter="formatterPkg" show-overflow-tooltip></el-table-column>
	      		<el-table-column prop="name" label="组合项目名称" align="center" min-width="120" show-overflow-tooltip></el-table-column>
	      		<el-table-column prop="originalprice" label="标准价格/元" align="center" min-width="60" show-overflow-tooltip></el-table-column>
			      <el-table-column prop="price" label="实际费用/元" align="center" min-width="60" show-overflow-tooltip></el-table-column>
			      <el-table-column prop="discount" label="折扣" align="center" min-width="60" show-overflow-tooltip></el-table-column>
			      <el-table-column prop="isenabled" label="是否已拒检" align="center" min-width="80" :formatter="formatterStatus"></el-table-column>
			    </el-table>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
  import PersonalexaminationJs from './Personalexamination.js'

  export default PersonalexaminationJs
</script>
<style scoped lang="scss">
	.group-form .group {
		margin: 5px 30px;
	}
	.top-back {
		float: right;
	}
	.table-expand{
		list-style: none;
		li {
			color: #99a9bf;
			span {
				display: inline-block;
				width: 80px;
				margin: 0 30px;
				text-align: center;
				&.item {
					margin-bottom: 5px;
				}
			}
		}
		&.header li {
			margin-bottom: 10px;
			font-size: 14px;
			font-weight: 600;
			color: #606266;
		}
	}
</style>
