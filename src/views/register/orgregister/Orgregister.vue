<template>
	<div class="orgregister">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div class="page-show">
				<content-title>单位批量正式登记</content-title>
				<el-form :model="queryData" size="small" inline>
					<el-form-item label="体检单位">
				    <el-select v-model="queryData.organization" placeholder="体检单位">
				      <el-option v-for="item in orgOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="单位分组">
				    <el-select v-model="queryData.group" placeholder="单位分组">
				      <el-option v-for="item in orgGroupOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="姓名">
				    <el-input v-model="queryData.name" placeholder="姓名"></el-input>
				  </el-form-item>
				  <el-form-item label="身份证号">
				    <el-input v-model="queryData.idcard" placeholder="身份证号"></el-input>
				  </el-form-item>
				  <el-form-item label="是否已登记">
				    <el-select v-model="queryData.isRegister" placeholder="是否已登记">
				      <el-option v-for="item in whetherOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
				    <el-button type="primary" icon="el-icon-printer">打印</el-button>
				  </el-form-item>
				</el-form>
				<el-table ref="personTb" :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small" @select="selected">
					<el-table-column align="center" type="selection" width="50"></el-table-column>
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="organization" label="体检单位" align="center" min-width="150" :formatter="formatterOrg"></el-table-column>
		      <el-table-column prop="orggroup" label="所属分组" align="center" min-width="100" :formatter="formatterOrgGroup"></el-table-column>
		      <el-table-column prop="name" label="姓名" align="center" min-width="80"></el-table-column>
		      <el-table-column prop="idcard" label="证件号" align="center" min-width="150"></el-table-column>
		      <el-table-column prop="sex" label="性别" align="center" min-width="80" :formatter="formatterSex"></el-table-column>
		      <el-table-column prop="age" label="年龄" align="center" min-width="80"></el-table-column>
		      <el-table-column prop="isregister" label="是否已登记" align="center" min-width="100" :formatter="formatterWhether"></el-table-column>
		    </el-table>
		    <div class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
		    </div>
		    <div v-if="tags.length">
	      	<h5 class="inline-h">已选人员</h5>
	      	<div class="group">
	      		<el-tag :key="tag.code" v-for="tag in tags" closable @close="handleTagClose(tag)">{{tag.name}}</el-tag>
	      		<el-button type="primary" size="mini" icon="el-icon-close" @click="handleTagAllClose"></el-button>
	      	</div>
	      	<div class="submit-container">
		      	<el-button type="primary" size="mini" @click="register">确认登记</el-button>
		      	<el-button type="danger" size="mini" @click="cancelRegister">取消登记</el-button>
		      </div>
	      </div>
	      <p class="guide" v-else>*提示： 勾选后可开始批量正式登记</p>
			</div>
		</transition>
	</div>
</template>
<script>
  import OrgregisterJs from './Orgregister.js'

  export default OrgregisterJs
</script>
<style scoped lang="scss">
	.group-form .group {
		margin: 5px 30px;
	}
	.el-tag + .el-tag {
    margin-left: 10px;
  }
  .guide {
    margin: 1rem 0.4rem;
    color: #2dc3e8;
    font-size: 12px;
  }
</style>
