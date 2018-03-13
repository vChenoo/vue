<template>
	<div class="workstation">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList===1">
				<content-title>工作台管理</content-title>
				<el-form :model="queryData" size="small" inline>
				  <el-form-item label="体检科室">
				    <el-select v-model="queryData.department" placeholder="体检科室">
				      <el-option v-for="item in dpOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="临床类型">
				    <el-select v-model="queryData.clinical" placeholder="临床类型">
				      <el-option v-for="item in clinicalOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="工作台名称">
				    <el-input v-model="queryData.name" placeholder="工作台名称"></el-input>
				  </el-form-item>
				  <el-form-item label="账户">
				    <el-input v-model="queryData.account" placeholder="账户"></el-input>
				  </el-form-item>
				  <el-form-item label="组合项目名称">
				    <el-input v-model="queryData.groupproject" placeholder="组合项目名称"></el-input>
				  </el-form-item>
				  <el-form-item label="是否启用">
				    <el-select v-model="queryData.isenabled" placeholder="是否启用">
				      <el-option v-for="item in whetherOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
				    <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="department" label="体检科室" align="center" min-width="70" :formatter="formatterDp" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="name" label="工作台名称" align="center" min-width="80" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="clinical" label="临床类型" align="center" min-width="70" :formatter="formatterClinical"></el-table-column>
		      <el-table-column prop="isenabled" label="是否启用" align="center" min-width="40" :formatter="formatterWhether"></el-table-column>
		      <el-table-column label="操作" min-width="100" align='center'>
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
			<div key="edit" class="page-show" v-else-if="visibleList===2">
				<content-title>工作台详情</content-title>
				<h4>工作台信息</h4>
				<div class="group">
					<el-form :model="formTemp" :rules="rules" ref="formEdit" size="small" label-width="120px">
						<el-row :gutter="30">
							<el-col :sm="24" :md="8">
								<el-form-item label="工作台名称" prop="name">
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
								<el-form-item label="提示信息" prop="tip">
									<el-input v-model="formTemp.tip"></el-input>
								</el-form-item>
							</el-col>
							<el-col :sm="24" :md="8">
								<el-form-item label="工作台位置" prop="address">
									<el-input v-model="formTemp.address"></el-input>
								</el-form-item>
							</el-col>
							<el-col :sm="24" :md="8">
								<el-form-item label="是否启用" prop="isenabled">
								  <el-switch v-model="formTemp.isenabled" active-value="1" inactive-value="2"></el-switch>
								</el-form-item>
							</el-col>
						</el-row>
			    </el-form>
				</div>
    		<h4>工作台账号</h4>
    		<div class="group">
    			<el-popover ref="accountpopover" placement="top-start" title="添加账户" v-model="accountPopOver">
    				<el-form ref="accountCreateForm" label-width="80px" :rules="accountRules" :model="formAccountTemp" size="mini">
    				  <el-form-item label="账户" prop="account">
    				    <el-select v-model="formAccountTemp.account" placeholder="账户" @change="getAccountSelected">
    		          <el-option v-for="item in accountList" :key="item.account" :label="item.name" :value="item.account"></el-option>
    		        </el-select>
    				  </el-form-item>
    				  <el-form-item class="popover-button">
    				    <el-button type="primary" @click="showAccount">确认</el-button>
    				    <el-button type="text" @click="accountPopOver = false">取消</el-button>
    				  </el-form-item>
    				</el-form>
    			</el-popover>
        	<el-table :data="accountData" border highlight-current-row style="width: 100%" align='center' size="mini">
    	      <el-table-column prop="account" label="账户" align="center" min-width="150" show-overflow-tooltip></el-table-column>
    	      <el-table-column prop="name" label="员工姓名" align="center" min-width="150"></el-table-column>
    	      <el-table-column label="操作" min-width="150" align='center'>
              <template slot-scope="scope">
            		<el-popover ref="accountpopdelete{{$index}}" placement="top-end" title="账户删除" v-model="scope.row.delete">
            			<p>您确定要删除记录吗?</p>
          			  <div class="popover-button">
          			    <el-button type="primary" size="mini" @click="deleteAccount(scope.$index)">确认</el-button>
          			    <el-button type="text" size="mini" @click="scope.row.delete = false">取消</el-button>
          			  </div>
            		</el-popover>
            		<el-popover ref="accountpopover{{$index}}" placement="top-end" title="编辑账户" v-model="scope.row.edit">
            			<el-form label-width="80px" :model="formAccountTemp"  :rules="accountRules" size="mini">
            			  <el-form-item label="账户" prop="account">
			    				    <el-select v-model="formAccountTemp.account" placeholder="账户" @change="getAccountSelected">
			    		          <el-option v-for="item in accountList" :key="item.account" :label="item.name" :value="item.account"></el-option>
			    		        </el-select>
			    				  </el-form-item>
            			  <el-form-item class="popover-button">
            			    <el-button type="primary" @click="showAccount">确认</el-button>
            			    <el-button type="text" @click="scope.row.edit = false">取消</el-button>
            			  </el-form-item>
            			</el-form>
            		</el-popover>
                <el-button @click="handlePopUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit" v-popover:accountpopover{{$index}}></el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" v-popover:accountpopdelete{{$index}}></el-button>
              </template>
            </el-table-column>
    	    </el-table>
    	    <el-button class="account-button" type="primary" size="small" @click="handlePopCreate" v-popover:accountpopover>添加账户</el-button>
    		</div>
				<h4 class="title-top">工作台包含项目</h4>
				<div class="group">
					<el-popover ref="itempopover" placement="top-start" title="项目选择" v-model="itemPopOver">
						<div>
							<el-transfer filterable filter-placeholder="请输入项目名称" :titles="popTitle" v-model="itemChoose" :props="itemAlias" :data="itemList"></el-transfer>
						</div>
					  <div class="popover-button">
					    <el-button type="primary" size="mini" @click="showItem">确定</el-button>
					    <el-button size="mini" type="text" @click="itemPopOver = false">取消</el-button>
					  </div>
					</el-popover>
	      	<el-table :data="itemProjectData" border highlight-current-row style="width: 100%" align='center' size="mini">
			      <el-table-column prop="name" label="项目名称" align="center" min-width="100" show-overflow-tooltip></el-table-column>
			    </el-table>
			    <el-button class="item-button" type="primary" size="small" v-popover:itempopover>工作台项目录入</el-button>
				</div>
    		<div class="submit-container">
          <el-button v-if="statusForm=='create'" type="primary" @click="createData">确定</el-button>
          <el-button v-else type="primary" @click="updateData">确定</el-button>
          <el-button @click="visibleList = 1">返回</el-button>
        </div>
			</div>
		</transition>
	</div>
</template>
<script>
  import WorkstationJs from './Workstation.js'

  export default WorkstationJs
</script>
<style scoped lang="scss">
	.account-button, .item-button {
		margin:10px 0;
	}
</style>
