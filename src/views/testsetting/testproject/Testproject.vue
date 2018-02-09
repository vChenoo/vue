<template>
	<div class="testproject">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList">
				<el-form :model="queryData" size="small" inline>
					<el-form-item label="项目名称">
				    <el-input v-model="queryData.name" placeholder="项目名称"></el-input>
				  </el-form-item>
				  <el-form-item label="所属科室">
				    <el-select v-model="queryData.department" placeholder="所属科室">
				      <el-option v-for="item in dpOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="临床类型">
				    <el-select v-model="queryData.clinical" placeholder="临床类型">
				      <el-option v-for="item in clinicalOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="结果类型">
				    <el-select v-model="queryData.result" placeholder="结果类型">
				      <el-option v-for="item in resultOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="是否启用">
				    <el-select v-model="queryData.isenabled" placeholder="是否启用">
				      <el-option v-for="item in whetherOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery">查询</el-button>
				    <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="name" label="项目名称" align="center" min-width="100"></el-table-column>
		      <el-table-column prop="department" label="所属科室" align="center" min-width="130" :formatter="formatterDp"></el-table-column>
		      <el-table-column prop="clinical" label="临床类型" align="center" min-width="130" :formatter="formatterClinical"></el-table-column>
		      <el-table-column prop="price" label="标准价格" align="center" min-width="100"></el-table-column>
		      <el-table-column prop="unit" label="单位" align="center" min-width="130"></el-table-column>
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
				<el-form class="edit-form" :model="formTemp" :rules="rules" ref="formEdit" size="small" label-width="120px">
		      <el-form-item label="项目名称" prop="name">
		        <el-input v-model="formTemp.name"></el-input>
		      </el-form-item>
		      <el-form-item label="体检科室" prop="department">
		      	<el-select v-model="formTemp.department" placeholder="所属科室" @change="dpChanged">
				      <el-option v-for="item in dpOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
		      </el-form-item>
		      <el-form-item label="临床类型" prop="clinical" v-if="visibleClinical">
		      	<el-select v-model="formTemp.clinical" placeholder="临床类型">
				      <el-option v-for="item in clinicalOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
		      </el-form-item>
		      <el-form-item label="标准价格" prop="price">
		      	<el-input v-model="formTemp.price"></el-input>
		      </el-form-item>
		      <el-form-item label="适用性别" prop="sex">
		      	<el-select v-model="formTemp.sex" placeholder="适用性别">
				      <el-option v-for="item in sexOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
		      </el-form-item>
		      <el-form-item label="单位" prop="unit">
		        <el-input v-model="formTemp.unit"></el-input>
		      </el-form-item>
		      <el-form-item label="结果类型" prop="resulttype">
		      	<el-select v-model="formTemp.resulttype" placeholder="结果类型">
				      <el-option v-for="item in resultOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
		      </el-form-item>
		      <el-form-item label="正常结果" prop="result">
		      	<el-input v-model="formTemp.result"></el-input>
		      </el-form-item>
		      <el-form-item label="是否启用" prop="isenabled">
		        <el-switch v-model="formTemp.isenabled" active-value="1" inactive-value="2"></el-switch>
		      </el-form-item>
		      <el-form-item>
		        <div class="submit-container">
		          <el-button v-if="statusForm=='create'" type="primary" @click="createData">确定</el-button>
		          <el-button v-else type="primary" @click="updateData">确定</el-button>
		          <el-button @click="visibleList = true">返回</el-button>
		        </div>
		      </el-form-item>
		    </el-form>
			</div>
		</transition>
	</div>
</template>
<script>
  import TestprojectJs from './Testproject.js'

  export default TestprojectJs
</script>
<style scoped lang="scss">
	
</style>
