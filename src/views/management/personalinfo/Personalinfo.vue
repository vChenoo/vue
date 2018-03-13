<template>
	<div class="personalinfo">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList">
				<content-title>个人信息</content-title>
				<el-form :model="queryData" size="small" inline>
				  <el-form-item label="个人姓名">
				    <el-input v-model="queryData.name" placeholder="个人姓名"></el-input>
				  </el-form-item>
				  <el-form-item label="证件类型">
				    <el-select v-model="queryData.cardtype" placeholder="证件类型">
				      <el-option v-for="item in cardTypeOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="身份证号">
				    <el-input v-model="queryData.idcard" placeholder="身份证号"></el-input>
				  </el-form-item>
				  <el-form-item label="所属单位">
				    <el-select v-model="queryData.organization" placeholder="所属单位">
				      <el-option v-for="item in orgOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
				    <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="name" label="姓名" align="center" min-width="130" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="cardtype" label="证件类型" align="center" min-width="100" :formatter="formatterCardtype"></el-table-column>
		      <el-table-column prop="idcard" label="证件号" align="center" min-width="130" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="sex" label="性别" align="center" min-width="60"></el-table-column>
		      <el-table-column prop="organization" label="所属单位" align="center" min-width="100" :formatter="formatterOrg" show-overflow-tooltip></el-table-column>
		      <el-table-column label="操作" min-width="110" align='center'>
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
				<content-title>个人信息详情</content-title>
				<el-form class="group-form" :model="formTemp" :rules="rules" ref="formEdit" size="small" label-width="120px" label-position="left">
					<h4>人员信息</h4>
					<div class="group">
						<el-row :gutter="30">
			      	<el-col :sm="24" :md="8">
				      	<el-form-item label="姓名" prop="name">
							    <el-input v-model="formTemp.name"></el-input>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
	            	<el-form-item label="证件类型" prop="cardtype">
	      	        <el-select v-model="formTemp.cardtype" placeholder="证件类型">
	      			      <el-option v-for="item in cardtypeOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
	      			    </el-select>
	      	      </el-form-item>
	            </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="身份证号" prop="idcard">
				      		<el-input v-model="formTemp.idcard"></el-input>
					      </el-form-item>
				      </el-col>				      
			      </el-row>
			      <el-row :gutter="30">
			      	<el-col :sm="24" :md="8">
				      	<el-form-item label="性别" prop="sex">
				      		<el-radio-group v-model="formTemp.sex">
			      	      <el-radio v-for="item in sexOption" :key="item.code" :label="item.code">{{item.name}}</el-radio>
			      	    </el-radio-group>
					      </el-form-item>
				      </el-col>
			      	<el-col :sm="24" :md="8">
	            	<el-form-item label="手机" prop="phone">
	      	        <el-input v-model="formTemp.phone"></el-input>
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
	            	<el-form-item label="民族" prop="nation">
	            		<el-input v-model="formTemp.nation"></el-input>
	      	      </el-form-item>
	            </el-col>
	            <el-col :sm="24" :md="8">
				      	<el-form-item label="出生日期" prop="birthday">
					        <el-date-picker v-model="formTemp.birthday" type="date"></el-date-picker>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
					      	<el-form-item label="年龄" prop="age">
						      	<el-input v-model="formTemp.age"></el-input>
					      </el-form-item>
					    </el-col>	            
			      </el-row>
			      <el-row :gutter="30">
			      	<el-col :sm="24" :md="8">
	            	<el-form-item label="婚姻状况" prop="marriage">
	      	        <el-select v-model="formTemp.marriage" placeholder="婚姻状况">
	      			      <el-option v-for="item in marriageOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
	      			    </el-select>
	      	      </el-form-item>
	            </el-col>
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
			      </el-row>
			      <el-row :gutter="30">
			      	<el-col :sm="24" :md="8">
	            	<el-form-item label="从事职业" prop="profession">
	      	        <el-input v-model="formTemp.profession"></el-input>
	      	      </el-form-item>
	            </el-col>
	            <el-col :sm="24" :md="8">
			      		<el-form-item label="所属单位" prop="organization">
							    <el-select v-model="formTemp.organization" placeholder="所属单位">
							      <el-option v-for="item in orgOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
							    </el-select>
							  </el-form-item>
			      	</el-col>
			      </el-row>
					</div>
	        <div class="submit-container">
	        	<template v-if="statusForm=='create'">
	        		<el-button type="primary" @click="createData">确定</el-button>
	        		<el-button @click="resetFormTemp">重置</el-button>
	        	</template>			          
	          <el-button v-else type="primary" @click="updateData">提交</el-button>
	          <el-button @click="visibleList = true">返回</el-button>
	        </div>
		    </el-form>
			</div>
		</transition>
	</div>
</template>
<script>
  import PersonalinfoJs from './Personalinfo.js'

  export default PersonalinfoJs
</script>
<style scoped lang="scss">
	.group-form .group {
		margin: 5px 30px;
	}
</style>
