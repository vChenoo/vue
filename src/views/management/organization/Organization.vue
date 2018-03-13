<template>
	<div class="organization">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList">
				<content-title>单位信息</content-title>
				<el-form :model="queryData" size="small" inline>
					<el-form-item label="单位名称">
				    <el-input v-model="queryData.name" placeholder="单位名称"></el-input>
				  </el-form-item>
				  <el-form-item label="企业性质">
				    <el-select v-model="queryData.nature" placeholder="企业性质">
				      <el-option v-for="item in natureOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
				    <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="name" label="单位名称" align="center" min-width="130" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="nature" label="企业性质" align="center" min-width="100" :formatter="formatterNature" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="contact" label="联系人" align="center" min-width="100"></el-table-column>
		      <el-table-column prop="phone" label="联系手机" align="center" min-width="100" show-overflow-tooltip></el-table-column>
		      <el-table-column label="操作" min-width="120" align='center'>
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
				<content-title>单位信息详情</content-title>
				<el-form class="group-form" :model="formTemp" :rules="rules" ref="formEdit" size="small" label-width="120px" label-position="left">
					<h4>单位主要信息</h4>
					<div class="group">
						<el-row :gutter="30">
							<el-col :sm="24" :md="8">
								<el-form-item label="单位名称" prop="name">
					        <el-input v-model="formTemp.name"></el-input>
					      </el-form-item>
							</el-col>
				      <el-col :sm="24" :md="8">
		    	      <el-form-item label="单位简称" prop="shorthand">
		    	      	<el-input v-model="formTemp.shorthand"></el-input>
		    	      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="企业性质" prop="nature">
					      	<el-select v-model="formTemp.nature" placeholder="企业性质">
							      <el-option v-for="item in natureOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
							    </el-select>
					      </el-form-item>
				      </el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :sm="24" :md="8">
				      	<el-form-item label="联系人" prop="contact">
					        <el-input v-model="formTemp.contact"></el-input>
					      </el-form-item>
				      </el-col>							
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="联系手机" prop="phone">
					      	<el-input v-model="formTemp.contact"></el-input>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="编制人数" prop="numberofpeople">
					      	<el-input v-model="formTemp.numberofpeople"></el-input>
					      </el-form-item>
				      </el-col>			      
						</el-row>
						<el-row :gutter="30">
							<el-col :sm="24" :md="8">
				      	<el-form-item label="银行账号" prop="bank">
					        <el-input v-model="formTemp.bank"></el-input>
					      </el-form-item>
				      </el-col>							
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="联系地址" prop="address">
					      	<el-input v-model="formTemp.address"></el-input>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="传真" prop="fax">
					      	<el-input v-model="formTemp.fax"></el-input>
					      </el-form-item>
				      </el-col>			      
						</el-row>
						<el-row :gutter="30">
							<el-col :sm="24" :md="8">
				      	<el-form-item label="邮政编码" prop="postcode">
					        <el-input v-model="formTemp.postcode"></el-input>
					      </el-form-item>
				      </el-col>							
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="拼音简码" prop="pinyin">
					      	<el-input v-model="formTemp.pinyin"></el-input>
					      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="五笔简码" prop="wubi">
					      	<el-input v-model="formTemp.wubi"></el-input>
					      </el-form-item>
				      </el-col>			      
						</el-row>
			      <el-row :gutter="30">
			      	<el-col :sm="24" :md="24">
				      	<el-form-item label="备注" prop="remark">
							    <el-input type="textarea" v-model="formTemp.remark"></el-input>
					      </el-form-item>
				      </el-col>
			      </el-row>
					</div>
	        <div class="submit-container">
	          <el-button v-if="statusForm=='create'" type="primary" @click="createData">确定</el-button>
	          <el-button v-else type="primary" @click="updateData">确定</el-button>
	          <el-button @click="visibleList = true">返回</el-button>
	        </div>
		    </el-form>
			</div>
		</transition>
	</div>
</template>
<script>
  import OrganizationJs from './Organization.js'

  export default OrganizationJs
</script>
<style scoped lang="scss">
	.group-form .group {
		margin: 5px 30px;
	}
</style>
