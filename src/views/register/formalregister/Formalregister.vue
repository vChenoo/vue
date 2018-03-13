<template>
	<div class="formalregister">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList===1">
				<content-title>体检正式登记</content-title>
				<el-form :model="queryData" size="small" inline>
					<el-form-item label="预登记流水号">
				    <el-input v-model="queryData.code" placeholder="预登记流水号"></el-input>
				  </el-form-item>
				  <el-form-item label="体检单位">
				    <el-select v-model="queryData.organization" placeholder="体检单位">
				      <el-option v-for="item in orgOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="姓名">
				    <el-input v-model="queryData.name" placeholder="姓名"></el-input>
				  </el-form-item>
				  <el-form-item label="身份证号">
				    <el-input v-model="queryData.idcard" placeholder="身份证号"></el-input>
				  </el-form-item>
				  <el-form-item label="手机号码">
				    <el-input v-model="queryData.phone" placeholder="手机号码"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery"icon="el-icon-search">查询</el-button>
				    <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
				    <el-button type="primary" @click="clickQuery" icon="el-icon-sort">刷卡</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="name" label="姓名" align="center" min-width="60"></el-table-column>
		      <el-table-column prop="idcard" label="身份证号" align="center" min-width="100" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="sex" label="性别" align="center" min-width="40" :formatter="formatterSex"></el-table-column>
		      <el-table-column prop="code" label="预登记流水号" align="center" min-width="80" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="date" label="预计体检时间" align="center" min-width="80" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="department" label="体检单位" align="center" min-width="80" :formatter="formatterDp" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="phone" label="手机号码" align="center" min-width="80" show-overflow-tooltip></el-table-column>
		      <el-table-column label="操作" min-width="270" align='center'>
            <template slot-scope="scope">
              <el-button class="op-mini" @click="clickUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit"></el-button>
              <el-button class="op-mini" @click="clickAddItem(scope.row, scope.$index)" type="primary" size="mini">加做项目</el-button>
              <el-button class="op-mini" type="primary" size="mini">打印登记单</el-button>
              <el-button class="op-mini" @click="deleteData(scope.$index)" type="danger" size="mini" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
		    </el-table>
		    <div class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
		    </div>
			</div>
			<div key="edit" class="page-show" v-else-if="visibleList===2">
				<el-steps class="show-step" :active="active">
					<el-step class="not-step" title="" icon="el-icon-caret-right"></el-step>
				  <el-step v-for="item in steps" :key="item.id" :title="item.title"></el-step>
				  <el-step class="not-step" title="" icon="el-icon-caret-right"></el-step>
				</el-steps>
				<!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
				<transition name="step" mode="out-in">
					<div key="first" class="page-show" v-if="visibleFirst">
						<el-form class="group-form" :model="formTemp" :rules="rules" ref="formEdit" size="small" label-width="120px" label-position="left">
							<h4>预登记信息</h4>
							<div class="group">
								<el-row :gutter="30">
									<el-col :sm="24" :md="6">
										<el-form-item label="预登记流水号：" prop="code">
							        <span>{{formTemp.code}}</span>
							      </el-form-item>
									</el-col>
						      <el-col :sm="24" :md="6">
				    	      <el-form-item label="预计体检时间：" prop="date">
				    			    <span>{{formTemp.date}}</span>
				    	      </el-form-item>
						      </el-col>
						      <el-col :sm="24" :md="6">
						      	<el-form-item label="体检次数：" prop="times">
							      	<span>{{formTemp.times}}</span>
							      </el-form-item>
						      </el-col>
						      <el-col :sm="24" :md="6">
						      	<el-form-item label="体检类别：" prop="times">
							      	<span>{{formTemp.testtype}}</span>
							      </el-form-item>
						      </el-col>
								</el-row>
							</div>
							<h4>人员信息</h4>
							<div class="group">
								<el-row :gutter="30">
					      	<el-col :sm="24" :md="8">
						      	<el-form-item label="是否单位体检" prop="isorg">
						      		<el-switch v-model="formTemp.isorg" active-value="1" inactive-value="2"></el-switch>
							      </el-form-item>
						      </el-col>
						      <el-col :sm="24" :md="8" v-if="formTemp.isorg=='1'">
						      	<el-form-item label="体检单位" prop="org">
						      		<el-select v-model="formTemp.org" placeholder="体检单位">
								      <el-option v-for="item in orgOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
								    </el-select>
							      </el-form-item>
						      </el-col>
						      <el-col :sm="24" :md="8">
						      	<el-form-item label="预登记流水号" prop="prepareid">
						      		<el-input v-model="formTemp.prepareid"></el-input>
							      </el-form-item>
						      </el-col>
					      </el-row>
								<el-row :gutter="30">
					      	<el-col :sm="24" :md="8">
						      	<el-form-item label="姓名" prop="name">
									    <el-input v-model="formTemp.name"></el-input>
							      </el-form-item>
						      </el-col>
						      <el-col :sm="24" :md="8">
						      	<el-form-item label="身份证号" prop="idcard">
						      		<el-input v-model="formTemp.idcard"></el-input>
							      </el-form-item>
						      </el-col>
						      <el-col :sm="24" :md="8">
						      	<el-form-item label="性别" prop="sex">
						      		<el-radio-group v-model="formTemp.sex">
					      	      <el-radio v-for="item in sexOption" :key="item.code" :label="item.code">{{item.name}}</el-radio>
					      	    </el-radio-group>
							      </el-form-item>
						      </el-col>
					      </el-row>
					      <el-row :gutter="30">
					      	<el-col :sm="24" :md="8">
			            	<el-form-item label="联系电话" prop="phone">
			      	        <el-input v-model="formTemp.phone"></el-input>
			      	      </el-form-item>
			            </el-col>
					      	<el-col :sm="24" :md="8">
							      	<el-form-item label="年龄" prop="age">
								      	<el-input v-model="formTemp.age"></el-input>
							      </el-form-item>
							    </el-col>
							    <el-col :sm="24" :md="8">
			            	<el-form-item label="婚姻状况" prop="marriage">
			      	        <el-select v-model="formTemp.marriage" placeholder="婚姻状况">
			      			      <el-option v-for="item in marriageOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
			      			    </el-select>
			      	      </el-form-item>
			            </el-col>
					      </el-row>
					      <el-row :gutter="30">
			            <el-col :sm="24" :md="8">
						      	<el-form-item label="出生日期" prop="birthday">
							        <el-date-picker v-model="formTemp.birthday" type="date"></el-date-picker>
							      </el-form-item>
						      </el-col>
			            <el-col :sm="24" :md="8">
			            	<el-form-item label="民族" prop="nation">
			            		<el-input v-model="formTemp.nation"></el-input>
			      	      </el-form-item>
			            </el-col>
									<el-col :sm="24" :md="8">
			            	<el-form-item label="Email" prop="email">
			      	        <el-input v-model="formTemp.email"></el-input>
			      	      </el-form-item>
			            </el-col>
					      </el-row>
					      <el-row :gutter="30">
			            <el-col :sm="24" :md="8">
						      	<el-form-item label="现居住地" prop="address" >
							      	<el-cascader :options="addressOption" :props="addressProps" v-model="addressVm" @change="addressChanged"></el-cascader>
							      </el-form-item>
						      </el-col>
			            <el-col :sm="24" :md="8">
			            	<el-form-item label="详细地址" prop="detailaddr">
			      	        <el-input v-model="formTemp.detailaddr"></el-input>
			      	      </el-form-item>
			            </el-col>
			            <el-col :sm="24" :md="8">
			            	<el-form-item label="从事职业" prop="profession">
			      	        <el-input v-model="formTemp.profession"></el-input>
			      	      </el-form-item>
			            </el-col>
					      </el-row>
							</div>
			        <div class="submit-container">
			        	<template v-if="statusForm=='create'">
			        		<el-button type="primary" @click="createData">提交并下一步</el-button>
			        		<el-button @click="resetFormTemp">重置</el-button>
			        	</template>
			        	<template v-else>
			        		<el-button type="primary" @click="updateData">确认并下一步</el-button>
			        		<el-button @click="updateJump">跳转下一步</el-button>
			        	</template>
			          <el-button @click="visibleList = 1">返回</el-button>
			        </div>
				    </el-form>
					</div>
					<div key="second" class="page-show" v-else>
						<h4>请选择套餐</h4>
						<div class="group">
							<el-table ref="pkgTable" :data="packageList" style="width: 100%" align='center' size="small" highlight-current-row @select="pkgSelected" @selection-change="pkgSelectionChange">
								<el-table-column type="selection" width="50"></el-table-column>
						    <el-table-column type="expand" width="70">
						      <template slot-scope="props">
						      	<span v-for="item in props.row.groupproject" :key="item.id" class="item">
									    <span class="left">{{item.name}}</span>
									    <span class="right">( ￥{{item.price}} )</span>
									  </span>
						      </template>
						    </el-table-column>
						    <el-table-column label="套餐名称" prop="name"></el-table-column>
						    <el-table-column label="套餐价格" prop="price"></el-table-column>
						    <el-table-column label="套餐折扣" prop="discount"> </el-table-column>
						    <el-table-column label="适用性别" prop="sex"></el-table-column>
						  </el-table>
				  		<div v-if="pkgSelection.length">
				      	<h5 class="inline-h">已选套餐</h5>
				      	<div class="group">
				      		<el-tag :key="tag.code" v-for="tag in pkgSelection" closable @close="handleTagClose(tag)">{{tag.name}}</el-tag>
				      		<el-button type="primary" size="mini" icon="el-icon-close" @click="handleTagAllClose"></el-button>
				      	</div>
				      </div>
						</div>
						<h4>请选择单个体检项目</h4>
						<div class="group">
							<el-form :model="queryItemData" ref="formGroup" size="small"  inline>
								<el-form-item label="体检科室" prop="department">
							    <el-select v-model="queryItemData.department" placeholder="体检科室">
							      <el-option v-for="item in dpOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
							    </el-select>
							  </el-form-item>
		    	      <el-form-item label="项目名称" prop="name">
					      	<el-input v-model="queryItemData.name" placeholder="项目名称"></el-input>
					      </el-form-item>
								<el-form-item>
							    <el-button type="primary" size="mini">查询</el-button>
							  </el-form-item>
							</el-form>
							<el-table ref="itemTable" :data="tablePageItem" border highlight-current-row style="width: 100%" align='center' size="small" @select="itemSelected">
								<el-table-column type="selection" width="55"></el-table-column>
					      <el-table-column type="index" :index="indexItemMethod" label="序号" align="center" min-width="50"></el-table-column>
					      <el-table-column prop="name" label="项目名称" align="center" min-width="100"></el-table-column>
					      <el-table-column prop="department" label="体检科室" align="center" min-width="130" :formatter="formatterDp"></el-table-column>
					      <el-table-column prop="clinical" label="临床类型" align="center" min-width="130" :formatter="formatterClinical"></el-table-column>
					      <el-table-column prop="price" label="价格" align="center" min-width="100"></el-table-column>
					    </el-table>
					    <div class="pagination-container">
					      <el-pagination @size-change="handleSizeItem" @current-change="handleCurrentItem" :current-page.sync="queryItemData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryItemData.limit" layout="total, sizes, prev, pager, next, jumper" :total="totalItem" background></el-pagination>
					    </div>
					    <div v-if="itemSelection.length">
					    	<h5 class="inline-h">已选中人员</h5>
					    	<div class="group">
					    		<el-tag :key="tag.code" v-for="tag in itemSelection" closable @close="itemTagClose(tag)">
					    			<span>{{tag.name}}</span>
					    			<span v-if="tag.pkgname">( {{tag.pkgname}} )</span>
					    		</el-tag>
					    		<el-button type="primary" size="mini" icon="el-icon-close" @click="toggleItemSelection"></el-button>
					    	</div>
					    </div>
						</div>
						<el-row>
							<el-col :sm="8" :md="12">
								<el-button size="mini" @click="last">上一步</el-button>
							</el-col>
							<el-col class="text-right" :sm="16" :md="12">
								<el-button type="primary" @click="updateItem">确认并返回</el-button>
								<el-button type="primary" @click="saveItem">确认</el-button>
				    		<el-button @click="visibleList = 1">取消</el-button>
							</el-col>
						</el-row>						
					</div>
				</transition>
			</div>
			<div class="page-show" v-else-if="visibleList===3">
				<content-title>体检加做项目</content-title>
				<h4>请选择单个体检项目</h4>
				<div class="group">
					<el-form :model="queryAddItemData" ref="formGroup" size="small"  inline>
						<el-form-item label="体检科室" prop="department">
					    <el-select v-model="queryAddItemData.department" placeholder="体检科室">
					      <el-option v-for="item in dpOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
					    </el-select>
					  </el-form-item>
    	      <el-form-item label="项目名称" prop="name">
			      	<el-input v-model="queryAddItemData.name" placeholder="项目名称"></el-input>
			      </el-form-item>
						<el-form-item>
					    <el-button type="primary" size="mini">查询</el-button>
					  </el-form-item>
					</el-form>
					<el-table ref="addItemTable" :data="tablePageAddItem" border highlight-current-row style="width: 100%" align='center' size="small" @selection-change="addItemSelectionChange">
						<el-table-column type="selection" width="55"></el-table-column>
			      <el-table-column type="index" :index="indexAddItemMethod" label="序号" align="center" min-width="50"></el-table-column>
			      <el-table-column prop="name" label="项目名称" align="center" min-width="100"></el-table-column>
			      <el-table-column prop="department" label="体检科室" align="center" min-width="130" :formatter="formatterDp"></el-table-column>
			      <el-table-column prop="clinical" label="临床类型" align="center" min-width="130" :formatter="formatterClinical"></el-table-column>
			      <el-table-column prop="price" label="价格" align="center" min-width="100"></el-table-column>
			    </el-table>
			    <div class="pagination-container">
			      <el-pagination @size-change="handleSizeAddItem" @current-change="handleCurrentAddItem" :current-page.sync="queryAddItemData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryAddItemData.limit" layout="total, sizes, prev, pager, next, jumper" :total="totalAddItem" background></el-pagination>
			    </div>
			    <div v-if="addItemSelection.length">
			    	<h5 class="inline-h">已选中人员</h5>
			    	<div class="group">
			    		<el-tag :key="tag.code" v-for="tag in addItemSelection" closable @close="addItemTagClose(tag)">
			    			<span>{{tag.name}}</span>
			    			<span v-if="tag.pkgname">( {{tag.pkgname}} )</span>
			    		</el-tag>
			    		<el-button type="primary" size="mini" icon="el-icon-close" @click="toggleAddItemSelection"></el-button>
			    	</div>
			    </div>
			    <div class="submit-container">
	          <el-button type="primary" size="mini" @click="submitAddItem">确定</el-button>
	          <el-button size="mini" @click="visibleList = 1">返回</el-button>
	        </div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
  import FormalregisterJs from './Formalregister.js'

  export default FormalregisterJs
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

</style>