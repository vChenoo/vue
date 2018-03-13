<template>
	<div class="formalcharge">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList">
				<content-title>个人体检收费</content-title>
				<el-form :model="queryData" size="small" inline>
					<el-form-item label="预登记流水号">
				    <el-input v-model="queryData.code" placeholder="预登记流水号"></el-input>
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
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="code" label="预登记流水号" align="center" min-width="100" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="date" label="预计体检时间" align="center" min-width="100" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="name" label="姓名" align="center" min-width="130"></el-table-column>
		      <el-table-column prop="idcard" label="身份证号" align="center" min-width="130" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="sex" label="性别" align="center" min-width="100" :formatter="formatterSex"></el-table-column>
		      <el-table-column prop="testtype" label="体检类别" align="center" min-width="100" :formatter="formatterType"></el-table-column>
		      <el-table-column label="操作" min-width="200" align='center'>
            <template slot-scope="scope">
              <el-button @click="clickUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit"></el-button>
              <el-button type="primary" size="mini">打印指引单</el-button>
            </template>
          </el-table-column>
		    </el-table>
		    <div class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
		    </div>
			</div>
			<div key="edit" class="page-show" v-else>
				<content-title>个人体检收费详情</content-title>
				<h4>体检者信息</h4>
				<div class="group">
					<el-form class="group-form" :model="formTemp" ref="formEdit" size="small" label-suffix="：" label-width="90px" label-position="left">
						<el-row :gutter="30">
							<el-col :sm="24" :md="6">
								<el-form-item label="姓名" label-width="60px" prop="name">
					        <span>{{formTemp.name}}</span>
					      </el-form-item>
							</el-col>
				      <el-col :sm="24" :md="6">
		    	      <el-form-item label="身份证" label-width="80px" prop="idcard">
		    			    <span>{{formTemp.idcard}}</span>
		    	      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="6">
				      	<el-form-item label="体检编号" label-width="90px" prop="code">
					      	<span>{{formTemp.code}}</span>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="6">
				      	<el-form-item label="登记流水号" label-width="100px" prop="registerid">
					      	<span>{{formTemp.registerid}}</span>
					      </el-form-item>
				      </el-col>
						</el-row>
			    </el-form>
				</div>
				<el-row>
					<el-col :md="24" :lg="14">
						<h4 class="title">组合项目列表</h4>
						<div class="group">
			      	<el-table :data="groupList" border highlight-current-row style="width: 100%" align='center' size="mini">
			      		<el-table-column prop="isenabled" label="套餐名称" align="center" min-width="80" :formatter="formatterPkg" show-overflow-tooltip></el-table-column>
			      		<el-table-column prop="name" label="组合项目名称" align="center" min-width="120" show-overflow-tooltip></el-table-column>
			      		<el-table-column prop="originalprice" label="标准价格/元" align="center" min-width="60" show-overflow-tooltip></el-table-column>
					      <el-table-column prop="price" label="实际费用/元" align="center" min-width="60" show-overflow-tooltip></el-table-column>
					      <el-table-column prop="discount" label="折扣" align="center" min-width="60" show-overflow-tooltip></el-table-column>
					      <el-table-column prop="collect" label="发票项目" align="center" min-width="80" :formatter="formatterInvoice" show-overflow-tooltip></el-table-column>
					    </el-table>
						</div>
					</el-col>
					<el-col :md="24" :lg="10">
						<h4 class="title">套餐列表</h4>
						<div class="group">
			      	<el-table :data="packageList" border highlight-current-row style="width: 100%" align='center' size="mini">
			      		<el-table-column prop="name" label="套餐名称" align="center" min-width="80" show-overflow-tooltip></el-table-column>
			      		<el-table-column prop="originalprice" label="标准价格" align="center" min-width="60" show-overflow-tooltip></el-table-column>
					      <el-table-column prop="price" label="实际费用" align="center" min-width="60" show-overflow-tooltip></el-table-column>
					      <el-table-column prop="discount" label="折扣" align="center" min-width="60" show-overflow-tooltip></el-table-column>
					    </el-table>
						</div>
						<h4 class="title title-top">相关收费项目</h4>
						<div class="group">
			      	<el-table :data="otherchargeList" border highlight-current-row style="width: 100%" align='center' size="mini" @cell-mouse-enter="triggerEdit" @cell-mouse-leave="cancelEdit">
					      <el-table-column prop="name" label="名称" align="center" min-width="60" show-overflow-tooltip></el-table-column>
					      <el-table-column prop="price" label="价格/元" align="center" min-width="50" show-overflow-tooltip></el-table-column>
					      <el-table-column class-name="cell-number" prop="number" label="数量" align="center" min-width="150">
			            <template slot-scope="scope">
			            	<div v-if="scope.row.edit">
			            		<el-input-number v-model="scope.row.number" :min="0" :max="100" size="mini" label="数量"></el-input-number>
			            	</div>
			            	<span v-else>{{ scope.row.number }}</span>
			            </template>
			          </el-table-column>
			          <el-table-column prop="ischarge" label="是否缴纳" align="center" min-width="60" show-overflow-tooltip>
			          	<template slot-scope="scope">
			          		<div v-if="scope.row.edit">
			          			<el-checkbox v-model="scope.row.ischarge"></el-checkbox>
			          		</div>
										<span v-else>{{ scope.row.ischarge | yesorno}}</span>
			          	</template>
			          </el-table-column>
					    </el-table>
					    <p class="guide">*提示： 注意修改相关收费项目的数量、是否缴纳</p>
						</div>
					</el-col>
				</el-row>
				<h4 class="title">收费信息</h4>
				<div class="group">
					<el-form class="group-form" :model="chargeInfo" size="small" label-suffix="：" label-width="90px" label-position="left">
						<el-row>
							<el-col :sm="24" :md="6">
								<el-form-item label="收费名称" prop="chargename">
					        <span>{{chargeInfo.chargename}}</span>
					      </el-form-item>
							</el-col>
				      <el-col :sm="24" :md="6">
		    	      <el-form-item label="当前发票" prop="invoice">
		    			    <span>{{chargeInfo.invoice}}</span>
		    	      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="6">
				      	<el-form-item label="体检编号" prop="code">
					      	<span>{{chargeInfo.code}}</span>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="6">
				      	<el-form-item label="姓名" prop="name">
					      	<span>{{chargeInfo.name}}</span>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="6">
				      	<el-form-item label="合计金额" prop="cptotal">
					      	<span>{{chargeInfo.cptotal}}</span>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="6">
				      	<el-form-item label="合计应收" prop="cpreceivable">
					      	<span>{{chargeInfo.cpreceivable}}</span>
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
								<div class="wrap">
									<el-form-item label="发票名称" prop="invoicename">
						        <el-input placeholder="请输入发票名称" tabindex="3" v-model="invoiceName"></el-input>
						      </el-form-item>
								</div>
							</el-col>
							<el-col :sm="24" :md="8">
								<div class="wrap">
									<el-form-item label="发票金额" prop="invoicecharge">
						        <!-- <el-input type="number" placeholder="请输入发票名称" :min="0" tabindex="4" v-model="invoiceCharge" @blur="limitNumber"></el-input> -->
						        <span>{{invoiceCharge}}</span>
						      </el-form-item>
								</div>
							</el-col>
							<el-col :sm="24" :md="8">
								<el-form-item label="是否打印发票" label-width="120px" prop="isinvoice">
									<el-checkbox v-model="isInvoice"></el-checkbox>
								</el-form-item>
							</el-col>
						</el-row>
						<div class="submit-container">
		          <el-button size="small" @click="visibleList = true">返回</el-button>
		        </div>
					</el-form>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
  import FormalchargeJs from './Formalcharge.js'

  export default FormalchargeJs
</script>
<style scoped lang="scss">
	/* .show-step {
		margin: 10px 20%;
	} */
	.not-step /deep/ .el-step__icon {
		display: none
	}
	.step-enter-active {
	  transition: all .5s;
	}
	.step-leave-active {
	  transition: all .2s;
	}
	.step-enter {
	  opacity: 0;
	  transform: translateX(-20px);
	}
	.step-leave {
	  opacity: 0;
	  transform: translateX(20px);
	}
	.item {
		margin: 0 30px;
		.left {
			color: #99a9bf;
		}
	}
	.inline-h {
		margin: 10px 0 8px;
	}
	.el-tag + .el-tag {
    margin-left: 10px;
  }
	.guide {
    margin: 1rem 0.4rem;
    color: #2dc3e8;
    font-size: 12px;
  }
  /deep/ td.cell-number{
		padding: 0;
	}
	.text-balance, .text-total {
		font-size: 2.5rem;
		color: #FF0000;
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
	.invoice-input {
		/deep/ .wrap {
			width:15rem;
		}
	}
</style>