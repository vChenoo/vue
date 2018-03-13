<template>
	<div class="reportsend">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList">
				<content-title>体检报告发放</content-title>
				<el-form :model="queryData" size="small" inline>
				  <el-form-item label="姓名">
				    <el-input v-model="queryData.name" placeholder="姓名"></el-input>
				  </el-form-item>
				  <el-form-item label="身份证号">
				    <el-input v-model="queryData.idcard" placeholder="身份证号"></el-input>
				  </el-form-item>
				  <el-form-item label="体检编号">
				    <el-input v-model="queryData.code" placeholder="体检编号"></el-input>
				  </el-form-item>
				  <el-form-item label="登记流水号">
				    <el-input v-model="queryData.registerId" placeholder="登记流水号"></el-input>
				  </el-form-item>
				  <el-form-item label="体检类别">
				    <el-select v-model="queryData.testtype" placeholder="体检类别">
				      <el-option v-for="item in testOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="总检时间">
		        <el-date-picker v-model="queryData.totalExameTime" type="datetimerange" :picker-options="pickerOption" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" align="right"></el-date-picker>
		      </el-form-item>
				  <el-form-item label="是否已发放">
				    <el-select v-model="queryData.isSend" placeholder="是否已总检">
				      <el-option v-for="item in whetherOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="code" label="体检编号" align="center" min-width="100"></el-table-column>
		      <el-table-column prop="name" label="姓名" align="center" min-width="80"></el-table-column> 
		      <el-table-column prop="sex" label="性别" align="center" min-width="60" :formatter="formatterSex"></el-table-column>
		      <el-table-column prop="idcard" label="身份证号" align="center" min-width="130" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="org" label="体检单位" align="center" min-width="100" :formatter="formatterOrg" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="testtype" label="体检类别" align="center" min-width="100" :formatter="formatterType"></el-table-column>
		      <el-table-column prop="registerid" label="登记流水号" align="center" min-width="60" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="date" label="总检时间" align="center" min-width="100" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="issend" label="是否已发放" align="center" min-width="60" :formatter="formatterWhether"></el-table-column>
		      <el-table-column prop="sender" label="发放人" align="center" min-width="80"></el-table-column>
		      <el-table-column prop="senddate" label="发放日期" align="center" min-width="90" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="print" label="报告打印次数" align="center" min-width="50"></el-table-column>
		      <el-table-column label="操作" min-width="110" align='center'>
            <template slot-scope="scope">
              <el-button class="op-mini" type="primary" size="mini" @click="handleSend(scope.row, scope.$index)">发放</el-button>
              <el-button class="op-mini" type="primary" size="mini" icon="el-icon-search"></el-button>
              <el-button v-if="scope.row.istotal=='1'" class="op-mini" type="primary" size="mini" icon="el-icon-search"></el-button>
            </template>
          </el-table-column>
		    </el-table>
		    <div class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
		    </div>
			</div>
		</transition>
	</div>
</template>
<script>
  import ReportsendJs from './Reportsend.js'

  export default ReportsendJs
</script>
<style scoped lang="scss">
	.group-form .group {
		margin: 5px 30px;
	}
</style>
