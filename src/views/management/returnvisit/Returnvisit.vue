<template>
	<div class="returnvisit">
		<div class="page-show">
			<content-title>复诊通知</content-title>
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
			  <el-form-item label="总检时间">
	        <el-date-picker v-model="queryData.totalExameTime" type="datetimerange" :picker-options="pickerOption" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" align="right"></el-date-picker>
	      </el-form-item>
			  <el-form-item label="是否已通知">
			    <el-select v-model="queryData.isNotice" placeholder="是否已通知">
			      <el-option v-for="item in whetherOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
			  </el-form-item>
			</el-form>
			<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
	      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="30"></el-table-column>
	      <el-table-column prop="code" label="体检编号" align="center" min-width="50" show-overflow-tooltip></el-table-column>
	      <el-table-column prop="name" label="姓名" align="center" min-width="60" show-overflow-tooltip></el-table-column>
	      <el-table-column prop="sex" label="性别" align="center" min-width="40" :formatter="formatterSex"></el-table-column>
	      <el-table-column prop="age" label="年龄" align="center" min-width="40"></el-table-column>
	      <el-table-column prop="idcard" label="身份证号" align="center" min-width="80" show-overflow-tooltip></el-table-column>
	      <el-table-column prop="phone" label="联系手机" align="center" min-width="60" show-overflow-tooltip></el-table-column>
	      <el-table-column prop="registerid" label="登记流水号" align="center" min-width="50" show-overflow-tooltip></el-table-column>
	      <el-table-column prop="date" label="总检时间" align="center" min-width="60" show-overflow-tooltip></el-table-column>
	      <el-table-column prop="visitdoctor" label="建议复诊医生" align="center" min-width="60"></el-table-column>
	      <el-table-column prop="visitdate" label="建议复诊日期" align="center" min-width="60" show-overflow-tooltip></el-table-column>
	      <el-table-column prop="isnotice" label="是否已通知" align="center" min-width="40" :formatter="formatterWhether"></el-table-column>
	      <el-table-column prop="noticeaccount" label="通知账号" align="center" min-width="60"></el-table-column>
	      <el-table-column prop="noticedate" label="通知时间" align="center" min-width="60" show-overflow-tooltip></el-table-column>
	      <el-table-column label="操作" min-width="150" align='center'>
          <template slot-scope="scope">
            <el-button class="option" type="primary" size="mini" @click="handleNotice(scope.row, scope.$index)">通知</el-button>
            <el-button class="option" type="primary" size="mini">发送短信</el-button>
          </template>
        </el-table-column>
	    </el-table>
	    <div class="pagination-container">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
	    </div>
		</div>
	</div>
</template>
<script>
  import ReturnvisitJs from './Returnvisit.js'

  export default ReturnvisitJs
</script>
<style scoped lang="scss">
	.group-form .group {
		margin: 5px 30px;
	}
	.option.el-button--mini {
		padding: 7px 8px
	}
</style>
