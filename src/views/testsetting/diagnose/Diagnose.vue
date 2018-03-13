<template>
	<div class="diagnose">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList===1">
				<content-title>诊断建议</content-title>
				<el-form :model="queryData" size="small" inline>
					<el-form-item label="诊断名称">
				    <el-input v-model="queryData.name" placeholder="诊断名称"></el-input>
				  </el-form-item>
				  <el-form-item label="体检科室">
				    <el-select v-model="queryData.department" placeholder="体检科室" @change="dpSelChanged">
				      <el-option v-for="item in dpOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="临床类型" v-if="visibleClinicalSel">
				    <el-select v-model="queryData.clinical" placeholder="临床类型">
				      <el-option v-for="item in clinicalOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
				    <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small" tooltip-effect="dark">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="name" label="主要诊断" align="center" min-width="100" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="department" label="体检科室" align="center" min-width="70" :formatter="formatterDp" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="clinical" label="临床类型" align="center" min-width="65" :formatter="formatterClinical" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="isillness" label="是否疾病" align="center" min-width="50" :formatter="formatterWhether" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="iscommon" label="是否常见病" align="center" min-width="50" :formatter="formatterWhetherCom" show-overflow-tooltip></el-table-column>
		      <el-table-column label="操作" min-width="220" align='center'>
            <template slot-scope="scope">
              <el-button @click="clickUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit"></el-button>
              <el-button @click="clickConnect(scope.row, scope.$index)" type="primary" size="mini">关联科室</el-button>
              <el-button @click="deleteData(scope.$index)" type="danger" size="mini" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
		    </el-table>
		    <div class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
		    </div>
			</div>
			<div key="edit" class="page-show" v-else-if="visibleList===2">
				<content-title>诊断建议详情</content-title>
				<el-form class="group-form" :model="formTemp" :rules="rules" ref="formEdit" size="small" label-width="120px" label-position="left">
					<h4>诊断基本信息</h4>
					<div class="group">
						<el-row :gutter="30">
							<el-col :sm="24" :md="8">
								<el-form-item label="诊断名称" prop="name">
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
					      	<el-select v-model="formTemp.clinical" placeholder="临床类型">
							      <el-option v-for="item in clinicalOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
							    </el-select>
					      </el-form-item>
				      </el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :sm="24" :md="8">
				      	<el-form-item label="是否疾病" prop="isillness">
					      	<el-switch v-model="formTemp.isillness" active-value="1" inactive-value="2"></el-switch>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="是否常见病" prop="iscommon">
					      	<el-switch v-model="formTemp.iscommon" active-value="1" inactive-value="2"></el-switch>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="诊断描述" prop="describe">
					        <el-input v-model="formTemp.describe"></el-input>
					      </el-form-item>
				      </el-col>
						</el-row>
			      <el-row :gutter="30">
			      	<el-col :sm="24" :md="8">
				      	<el-form-item label="拼音码" prop="pinyin">
							    <el-input v-model="formTemp.pinyin"></el-input>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="五笔简码" prop="wubi">
					      	<el-input v-model="formTemp.wubi"></el-input>
					      </el-form-item>
				      </el-col>
			      </el-row>			      
					</div>
					<h4>科普内容</h4>
					<div class="group">
						<el-row :gutter="30">
				      <el-col :sm="24" :md="24">
					      <el-form-item label="科普说明" prop="science">
					      	<el-input type="textarea" v-model="formTemp.science" autosize></el-input>
					      </el-form-item>
					    </el-col>
			      </el-row>
					</div>
		      <h4>建议内容</h4>
		      <div class="group">
		      	<el-table :data="formTemp.suggestion" border highlight-current-row style="width: 100%" align='center' size="mini">
				      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
				      <el-table-column prop="content" label="建议内容" align="center" min-width="100" show-overflow-tooltip>
		            <template slot-scope="scope">
		            	<template v-if="scope.row.edit">
		            		<el-input class="edit-input" size="mini" v-model="scope.row.content"></el-input>
		            		<el-button class="cancel-btn" size="mini" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
		            	</template>
		            	<span v-else>{{ scope.row.content }}</span>
		            </template>
		          </el-table-column>
		          <el-table-column label="操作" align="center">
		          	<template slot-scope="scope">
		          		<el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="mini" icon="el-icon-circle-check-outline">确定</el-button>
		          		<el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="mini" icon="el-icon-edit">编辑</el-button>
		          	</template>
		          </el-table-column>
				    </el-table>
				    <el-col :span="24">
				    	<el-button class="create-btn" type="primary" size="mini" @click='createSuggestion' icon="el-icon-plus">新增</el-button>
				    </el-col>
		      </div>
	        <div class="submit-container">
	          <el-button v-if="statusForm=='create'" type="primary" @click="createData">确定</el-button>
	          <el-button v-else type="primary" @click="updateData">确定</el-button>
	          <el-button @click="visibleList = 1">返回</el-button>
	        </div>
		    </el-form>
			</div>
			<div class="page-show" v-else-if="visibleList===3">
				<content-title>关联科室</content-title>
				<div class="tree-wrapper">
					<el-input size="mini" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
					<el-tree :data="dpTreeData" ref="dpTree" :filter-node-method="filterNode" :props="defaultProps" show-checkbox node-key="code" :expand-on-click-node="true"></el-tree>
				</div>
				<div class="submit-container">
				  <el-button type="primary" @click="submitConnect">确定</el-button>
				  <el-button @click="visibleList = 1">返回</el-button>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
  import DiagnoseJs from './Diagnose.js'

  export default DiagnoseJs
</script>
<style scoped lang="scss">
	h4{
		margin: 2px 0 15px;
	}
	.group-form .group {
		margin: 5px 30px;
	}
	.edit-input {
	  padding-right: 100px;
	}
	.cancel-btn {
	  position: absolute;
	  right: 15px;
	  top: 10px;
	}
	.create-btn {
		float: right;
    margin: 5px 10px;
	}
	.tree-wrapper {
		padding: 10px;
		border: 1px solid #ebeef5;
	}
</style>
