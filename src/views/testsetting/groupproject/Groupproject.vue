<template>
	<div class="groupproject">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList">
				<el-form :model="queryData" size="small" inline>
					<el-form-item label="组合项目名称">
				    <el-input v-model="queryData.name" placeholder="组合项目名称"></el-input>
				  </el-form-item>
				  <el-form-item label="体检科室">
				    <el-select v-model="queryData.department" placeholder="所属科室" @change="dpSelChanged">
				      <el-option v-for="item in dpOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="临床类型" v-if="visibleClinicalSel">
				    <el-select v-model="queryData.clinical" placeholder="临床类型">
				      <el-option v-for="item in clinicalOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery">查询</el-button>
				    <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="name" label="组合项目名称" align="center" min-width="100"></el-table-column>
		      <el-table-column prop="department" label="体检科室" align="center" min-width="130" :formatter="formatterDp"></el-table-column>
		      <el-table-column prop="clinical" label="临床类型" align="center" min-width="130" :formatter="formatterClinical"></el-table-column>
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
								<el-form-item label="组合项目名称" prop="name">
					        <el-input v-model="formTemp.name"></el-input>
					      </el-form-item>
							</el-col>
				      <el-col :sm="24" :md="8">
		    	      <el-form-item label="体检科室" prop="department">
		    	      	<el-select v-model="formTemp.department" placeholder="所属科室" @change="dpChanged">
		    			      <el-option v-for="item in dpOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
		    			    </el-select>
		    	      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="临床类型" prop="clinical" v-if="visibleClinical">
					      	<el-select v-model="formTemp.clinical" placeholder="临床类型" @change="resetProject">
							      <el-option v-for="item in clinicalOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
							    </el-select>
					      </el-form-item>
				      </el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :sm="24" :md="8">
				      	<el-form-item label="汇总项目" prop="collect">
					      	<el-select v-model="formTemp.collect" placeholder="汇总项目">
							      <el-option v-for="item in collectOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
							    </el-select>
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
				      	<el-form-item label="是否妇科" prop="isgynaecology">
					        <el-switch v-model="formTemp.isgynaecology" active-value="1" inactive-value="2"></el-switch>
					      </el-form-item>
				      </el-col>
						</el-row>
			      <el-row :gutter="30">
			      	<el-col :sm="24" :md="8">
				      	<el-form-item label="结果获取方式" prop="accesstype">
							    <el-radio-group v-model="formTemp.accesstype">
			      	      <el-radio v-for="item in accesstypeOption" :key="item.code" :label="item.code">{{item.name}}</el-radio>
			      	    </el-radio-group>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="检查类型" prop="checktype">
					      	<el-select v-model="formTemp.checktype" placeholder="检查类型">
							      <el-option v-for="item in checktypeOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
							    </el-select>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="平均检查时间" prop="checktime">
					        <el-input v-model="formTemp.checktime">
					        	<template slot="append">分</template>
					        </el-input>
					      </el-form-item>
				      </el-col>
			      </el-row>
			      <el-row :gutter="30">
				      <el-col :sm="24" :md="8">
					      	<el-form-item label="用餐时间点" prop="mealtime">
					      	<el-radio-group v-model="formTemp.mealtime">
			      	      <el-radio v-for="item in mealtimeOption" :key="item.code" :label="item.code">{{item.name}}</el-radio>
			      	    </el-radio-group>
					      </el-form-item>
					    </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="是否需要标本" prop="issample">
					        <el-switch v-model="formTemp.issample" active-value="1" inactive-value="2" @change="sampleChanged"></el-switch>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8" v-if="visibleSample">
				      	<el-form-item label="标本类型" prop="sample" >
					      	<el-select v-model="formTemp.sample" placeholder="标本类型">
							      <el-option v-for="item in sampleOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
							    </el-select>
					      </el-form-item>
				      </el-col>
			      </el-row>
			      <el-row :gutter="30">
	            <el-col :sm="24" :md="8">
	            	<el-form-item label="是否需抽血" prop="isblood">
	      	        <el-switch v-model="formTemp.isblood" active-value="1" inactive-value="2"></el-switch>
	      	      </el-form-item>
	            </el-col>
	            <el-col :sm="24" :md="8">
	            	<el-form-item label="标准价格" prop="originalprice">
	      	        <el-input v-model="formTemp.originalprice"></el-input>
	      	      </el-form-item>
	            </el-col>
	            <el-col :sm="24" :md="8">
	            	<el-form-item label="折扣" prop="discount">
	      	        <el-input v-model="formTemp.discount"></el-input>
	      	      </el-form-item>
	            </el-col>
			      </el-row>
			      <el-row :gutter="30">
	            <el-col :sm="24" :md="8">
	            	<el-form-item label="最低折扣" prop="lowestdiscount">
	      	        <el-input v-model="formTemp.lowestdiscount"></el-input>
	      	      </el-form-item>
	            </el-col>
	            <el-col :sm="24" :md="8">
	            	<el-form-item label="实际价格" prop="price">
	      	        <el-input v-model="formTemp.price"></el-input>
	      	      </el-form-item>
	            </el-col>
	            <el-col :sm="24" :md="8">
	            	<el-form-item label="是否需申请单" prop="isapplication">
	      	        <el-switch v-model="formTemp.isapplication" active-value="1" inactive-value="2"></el-switch>
	      	      </el-form-item>
	            </el-col>
			      </el-row>
			      <el-row :gutter="30">
	            <el-col :sm="24" :md="8">
	            	<el-form-item label="接口类型" prop="interfacetype">
	      	      	<el-select v-model="formTemp.interfacetype" placeholder="接口类型">
	      			      <el-option v-for="item in interfaceOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
	      			    </el-select>
	      	      </el-form-item>
	            </el-col>
	            <el-col :sm="24" :md="8">
	            	<el-form-item label="申请单接口编号" prop="appinterface">
	      	        <el-input v-model="formTemp.appinterface"></el-input>
	      	      </el-form-item>
	            </el-col>
	            <el-col :sm="24" :md="8">
	            	<el-form-item label="报告单接口编号" prop="reportinterface">
	      	        <el-input v-model="formTemp.reportinterface"></el-input>
	      	      </el-form-item>
	            </el-col>
			      </el-row>
			      <el-row :gutter="30">
	            <el-col :sm="24" :md="8">
	            	<el-form-item label="提示信息" prop="tip">
	      	        <el-input v-model="formTemp.tip"></el-input>
	      	      </el-form-item>
	            </el-col>
	            <el-col :sm="24" :md="8">
	            	<el-form-item label="正常小结" prop="result">
	      	        <el-input v-model="formTemp.result"></el-input>
	      	      </el-form-item>
	            </el-col>
	            <el-col :sm="24" :md="8">
	            	<el-form-item label="临床意义" prop="clinicalsign">
	      	      	<el-input v-model="formTemp.clinicalsign"></el-input>
	      	      </el-form-item>
	            </el-col>
			      </el-row>
			      <el-row :gutter="30">
	            <el-col :sm="24" :md="8">
	            	<el-form-item label="拼音编码" prop="pinyin">
	      	      	<el-input v-model="formTemp.pinyin"></el-input>
	      	      </el-form-item>
	            </el-col>
	            <el-col :sm="24" :md="8">
	            	<el-form-item label="五笔编码" prop="wubi">
	      	      	<el-input v-model="formTemp.wubi"></el-input>
	      	      </el-form-item>
	            </el-col>
	            <el-col :sm="24" :md="8">
	            	<el-form-item label="是否启用" prop="isenabled">
	      	        <el-switch v-model="formTemp.isenabled" active-value="1" inactive-value="2"></el-switch>
	      	      </el-form-item>
	            </el-col>
			      </el-row>
					</div>
		      <h4>项目选择</h4>
		      <div class="group">
		      	<el-form-item label="体检项目" prop="project">
		      		<template>
		      			<el-select v-model="formTemp.project" multiple filterable size="medium" placeholder="请选择组合的项目" style="display:block">
		      				<el-option v-for="item in projectOption" :key="item.code" :label="item.name" :value="item.code">
		      					<span style="float:left">{{item.name}}</span>
		      					<span style="float: right;margin-right:15px; color: #8492a6; font-size: 13px">{{ item.price }}￥</span>
		      				</el-option>
		      			</el-select>
		      		</template>
		      	</el-form-item>
		      </div>
		      <h4>耗材选择</h4>
		      <div class="group">
		      	<el-table :data="tableConsumableData" border highlight-current-row style="width: 100%" align='center' size="small">
				      <el-table-column type="index" label="序号" align="center" min-width="50"></el-table-column>
				      <el-table-column prop="name" label="耗材名称" align="center" min-width="180"></el-table-column>
				      <el-table-column prop="specification" label="规格" align="center" min-width="180"></el-table-column>
				      <el-table-column prop="unit" label="单位" align="center" min-width="180"></el-table-column>
				      <el-table-column prop="price" label="单价" align="center" min-width="180"></el-table-column>
				      <el-table-column label="数量" min-width="200" align='center'>
		            <template slot-scope="scope">
		              <el-input-number size="mini" v-model="scope.row.count" :min="1" :max="50" label="数量"></el-input-number>
		            </template>
		          </el-table-column>
				    </el-table>
						<el-select class="consumable-select" v-if="visibleConsumable" v-model="consumableSelected" multiple filterable size="medium" placeholder="请选择耗材">
      				<el-option v-for="item in consumableOption" :key="item.code" :label="item.name" :value="item.code">
      					<span style="float:left">{{item.name}}</span>
      					<span style="float: right;margin-right:15px; color: #8492a6; font-size: 13px">{{ item.specification }}</span>
      				</el-option>
      			</el-select>
				    <el-button class="create-btn" type="primary" size="mini" @click='selectConsumable' icon="el-icon-plus">
				    	<span v-if="visibleConsumable">收起</span>
				    	选择耗材
				    </el-button>
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
  import GroupprojectJs from './Groupproject.js'

  export default GroupprojectJs
</script>
<style scoped lang="scss">
	.group-form .group {
		margin: 5px 30px;
	}
	.create-btn {
		float: right;
    margin: 5px 10px;
	}
	.consumable-select {
		margin: 10px 0 0;
	}
</style>
