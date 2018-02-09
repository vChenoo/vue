<template>
	<div class="preorganization">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList">
				<el-form :model="queryData" size="small" inline>
					<el-form-item label="体检单位">
				    <el-select v-model="queryData.organization" placeholder="体检单位">
				      <el-option v-for="item in orgSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="是否预登记">
				    <el-select v-model="queryData.isprepare" placeholder="是否预登记">
				      <el-option v-for="item in wetherOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery">查询</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="organization" label="单位名称" align="center" min-width="130" :formatter="formatterOrg"></el-table-column>
		      <el-table-column prop="times" label="第几次体检" align="center" min-width="100"></el-table-column>
		      <el-table-column prop="starttime" label="体检开始时间" align="center" min-width="100"></el-table-column>
		      <el-table-column prop="endtime" label="体检结束时间" align="center" min-width="100"></el-table-column>
		      <el-table-column prop="isprepare" label="是否预登记" align="center" min-width="130" :formatter="formatterWehter"></el-table-column>
		      <el-table-column label="操作" min-width="200" align='center'>
            <template slot-scope="scope">
              <el-button @click="clickUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit"></el-button>
            </template>
          </el-table-column>
		    </el-table>
		    <div class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
		    </div>
			</div>
			<div key="edit" class="page-show" v-else>
				<div class="info">
					<el-form class="group-form" :model="formTemp" ref="formEdit" size="small" label-width="120px" label-suffix="：" label-position="left">
						<h4>单位体检信息</h4>
						<div class="group">
							<el-row :gutter="30">
								<el-col :sm="24" :md="4">
									<el-form-item label="体检单位" prop="organization">
						       	<span>{{formatterOrg(formTemp)}}</span>
						      </el-form-item>
								</el-col>
					      <el-col :sm="24" :md="4">
			    	      <el-form-item label="第几次体检" prop="times">
						      	<span>{{formTemp.times}}</span>
						      </el-form-item>
					      </el-col>
					      <el-col :sm="24" :md="16">
			    	      <el-form-item label="体检时间段" prop="endtime">
						      	<span>{{formTemp.starttime + ' - ' + formTemp.endtime}}</span>
						      </el-form-item>
					      </el-col>				      
							</el-row>			
						</div>
					</el-form>
				</div>				
				<h4>单位体检分组</h4>
	      <div class="group">
	      	<el-form :model="queryPersonData" ref="formGroup" size="small"  inline>
						<el-form-item label="单位分组" prop="orggroup">
					    <el-select v-model="queryPersonData.orggroup" placeholder="单位分组">
					      <el-option v-for="item in orgGpSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
					    </el-select>
					  </el-form-item>
    	      <el-form-item label="姓名" prop="name">
			      	<el-input v-model="queryPersonData.name" placeholder="体检人员姓名"></el-input>
			      </el-form-item>
    	      <el-form-item label="身份证号" prop="idcard">
			      	<el-input v-model="queryPersonData.idcard" placeholder="身份证号"></el-input>
			      </el-form-item>
						<el-form-item label="性别" prop="sex">
							<el-select v-model="queryPersonData.sex" placeholder="性别">
					      <el-option v-for="item in sexOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
					    </el-select>
						</el-form-item>
						<el-form-item label="婚姻状况" prop="marry">
							<el-select v-model="queryPersonData.marry" placeholder="婚姻状况">
					      <el-option v-for="item in marryOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
					    </el-select>
						</el-form-item>
						<el-form-item>
					    <el-button type="primary" size="mini">批量导入</el-button>
					    <el-button type="primary" size="mini">模板下载</el-button>
					    <el-button type="primary" size="mini">查询</el-button>
					  </el-form-item>
					</el-form>
					<el-table ref="personTable" :data="tablePagePerson" border highlight-current-row style="width: 100%" align='center' size="small" @selection-change="selectionChange">
						<el-table-column type="selection" width="55"></el-table-column>
			      <el-table-column type="index" :index="indexPersonMethod" label="序号" align="center" min-width="50"></el-table-column>
			      <el-table-column prop="orggroup" label="单位分组" align="center" min-width="130" :formatter="formatterGroup"></el-table-column>
			      <el-table-column prop="name" label="人员姓名" align="center" min-width="80"></el-table-column>
			      <el-table-column prop="idcard" label="身份证" align="center" min-width="130"></el-table-column>
			      <el-table-column prop="sex" label="性别" align="center" min-width="50" :formatter="formatterSex"></el-table-column>
			      <el-table-column prop="age" label="年龄" align="center" min-width="100"></el-table-column>
			    </el-table>
			    <div class="pagination-container">
			      <el-pagination @size-change="handleSizePerson" @current-change="handleCurrentPerson" :current-page.sync="queryPersonData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryPersonData.limit" layout="total, sizes, prev, pager, next, jumper" :total="totalPerson" background></el-pagination>
			    </div>
			    <div v-if="selection.length">
			    	<h5 class="inline-h">已选中人员</h5>
			    	<div class="group">
			    		<el-tag :key="tag.code" v-for="tag in selection" closable @close="handleTagClose(tag)">{{tag.name}}</el-tag>
			    		<el-button type="primary" size="mini" icon="el-icon-close" @click="handleTagAllClose"></el-button>
			    	</div>
			    </div>
			    <div>
			    	<h5 class="inline-h">请选择已选中人员更换到的目标分组</h5>
	          <div class="group">
	    	      <el-form class="group-form" :model="changeGroupTemp" :rules="rules" ref="formChangeToGroup" size="small" label-width="120px" label-position="left" inline>
	    	      	<el-form-item label="目标分组" prop="targetgroup">
	          			<el-select v-model="changeGroupTemp.targetgroup" filterable size="medium" placeholder="目标分组">
	          				<el-option v-for="item in orgGroupOptions" :key="item.code" :label="item.name" :value="item.code">{{item.name}}</el-option>
	          			</el-select>
	    	      	</el-form-item>
	    	      	<el-form-item>	    	      		
	    			      <el-button type="primary" @click="handleChangeGroup">更换分组</el-button>
	    	      	</el-form-item>
    			        <div class="submit-container">
    			          <el-button type="primary" size="small" @click="updateData">登记确定</el-button>
    			          <el-button size="small" @click="visibleList = true">返回</el-button>
    			        </div>
	    		    </el-form>
	    	   	</div>
			    </div>    
	      </div>	    
			</div>
		</transition>
	</div>
</template>
<script>
  import PreorganizationJs from './Preorganization.js'

  export default PreorganizationJs
</script>
<style scoped lang="scss">
	.group {
		margin: 5px 30px;
	}
	.inline-h {
		margin: 10px 0 8px;
	}
	.el-tag + .el-tag {
    margin-left: 10px;
  }
</style>
