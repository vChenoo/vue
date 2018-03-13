<template>
	<div class="test">
		<content-title>体检医生工作台</content-title>
		<h4 class="title">体检医生信息</h4>
	  <div class="group">
	  	<el-form :model="queryWs" size="small" inline>
	  		<el-row>
	  			<el-col :sm="24" :md="6">
	  				<el-form-item label="姓名">
	  					<span>{{queryWs.currentName}}</span>
	  				</el-form-item>
	  			</el-col>
	  			<el-col :sm="24" :md="6">
	  				<el-form-item label="账号">
					    <span>{{queryWs.currentAccount}}</span>
					  </el-form-item>
	  			</el-col>
	  			<el-col :sm="24" :md="12">
	  				<el-form-item label="工作台名称">
	  				  <el-select v-model="queryWs.workstation" placeholder="工作台名称">
	  				    <el-option v-for="item in wsOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
	  				  </el-select>
	  				</el-form-item>
	  			</el-col>
	  		</el-row>
			</el-form>
	  </div>
		<h4 class="title">体检者信息</h4>
		<div class="group">
			<el-form :model="queryTester" size="small" inline>
			  <el-form-item label="体检编号">
			    <el-input v-model="queryTester.num" placeholder="体检编号"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="clickQuery">查询</el-button>
			  </el-form-item>
			  <el-form-item class="call-number">
			    <el-button type="primary" round>叫号</el-button>
			    <el-button type="primary" round>跳号</el-button>
			  </el-form-item>
			  <el-row>
					<el-col :sm="24" :md="18">
						<el-row :gutter="30">
							<el-col :sm="24" :md="8">
								<el-form-item label="姓名：">
					        <span>{{tester.name}}</span>
					      </el-form-item>
							</el-col>
				      <el-col :sm="24" :md="8">
			  	      <el-form-item label="体检编号：">
			  			    <span>{{tester.code}}</span>
			  	      </el-form-item>
				      </el-col>
				      <el-col :sm="24" :md="8">
				      	<el-form-item label="登记流水号：">
					      	<span>{{tester.registerid}}</span>
					      </el-form-item>
				      </el-col>
							<el-col :sm="24" :md="8">
				      	<el-form-item label="性别：" >
					      	<span>{{tester.sex}}</span>
					      </el-form-item>
							</el-col>
							<el-col :sm="24" :md="8">
				      	<el-form-item label="年龄：" >
					      	<span>{{tester.age}}</span>
					      </el-form-item>
				      </el-col>
						</el-row>
					</el-col>
					<el-col :sm="24" :md="6">
						<div class="image-avatar">
							<img v-if="tester.imageUrl" :src="tester.imageUrl">
						</div>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<h4 class="title">体检项目</h4>
		<div class="group">
			<el-row :gutter="20">
				<el-col :sm="24" :md="6">
					<el-menu class="item-list" default-active="0" @select="handleMenuSelect">
						<el-menu-item v-for="(project, index) in groupProject" :key="project.code" :index="''+index">{{project.name}}</el-menu-item>
					</el-menu>
				</el-col>
				<el-col :sm="24" :md="18">
	      	<el-table :data="projectDetail" border highlight-current-row style="width: 100%" align='center' size="mini">
			      <el-table-column prop="name" label="体检项目名称" align="center" min-width="100"></el-table-column>
			      <el-table-column class-name="cell-result" prop="result" label="结果" align="center" min-width="200" show-overflow-tooltip>
	            <template slot-scope="scope">
            		<el-autocomplete class="inline-auto" size="mini" clearable="true" v-model="scope.row.result" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleIptSelect">
            			<i class="autocomplete-close el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick"></i>
            			<template slot-scope="props">
            				<div class="autocomplete-wrap">
            					<span class="name">{{ props.item.desc }}</span>
          			    	<span class="addr" v-if="props.item.isnormal===1">(正常范围)</span>
            				</div>
          			  </template>
            		</el-autocomplete>
	            </template>
	          </el-table-column>
	          <el-table-column prop="unit" label="单位" align="center" min-width="60"></el-table-column>
	          <el-table-column prop="ispositive" label="是否阳性" align="center" min-width="60">
	          	<template slot-scope="scope">
	          		<div>
	          			<el-checkbox v-model="scope.row.ispositive"></el-checkbox>
	          		</div>
	          	</template>
	          </el-table-column>
			    </el-table>
				</el-col>
			</el-row>
		</div>
		<el-row>
			<el-col :sm="24" :md="12">
				<h4 class="title title-top">诊断</h4>
				<div class="group">
					<el-popover ref="popover" placement="top-start" title="诊断选择" v-model="visiblePopOver">
						<div>
							<el-transfer filterable filter-placeholder="请输入诊断" :titles="popTitle" v-model="diagnoseChoose" :props="diagnoseAlias" :data="diagnoseList"></el-transfer>
						</div>
					  <div class="popover-button">
					    <el-button type="primary" size="mini" @click="showDiagnose">确定</el-button>
					    <el-button size="mini" type="text" @click="visiblePopOver = false">取消</el-button>
					  </div>
					</el-popover>
	      	<el-table :data="diagnose" border highlight-current-row style="width: 100%" align='center' size="mini">
			      <el-table-column prop="name" label="主要诊断" align="center" min-width="100" show-overflow-tooltip></el-table-column>
			    </el-table>
			    <el-button class="diagnose-button" type="primary" size="small" v-popover:popover>诊断录入</el-button>
				</div>
			</el-col>
			<el-col :sm="24" :md="12">
				<h4 class="title title-top">小结</h4>
				<div class="group">
					<el-form :model="result" size="small">
					  <el-form-item prop="content">
					    <el-input type="textarea" :autosize="{'minRows': 5}" placeholder="请输入内容" v-model="result.content"></el-input>
					  </el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>
		<h4 class="title">复诊</h4>
		<div class="group">
			<el-popover ref="visitpopover" placement="top-start" title="复诊信息" v-model="visitPopOver">
				<el-form  label-width="80px" :model="formVisitTemp" size="mini">
				  <el-form-item label="复诊项目" prop="code">
				    <el-select v-model="formVisitGroup" placeholder="复诊项目" value-key="code">
		          <el-option v-for="item in groupProject" :key="item.code" :label="item.name" :value="item"></el-option>
		        </el-select>
				  </el-form-item>
				  <el-form-item label="复诊日期" prop="date">
				  	<el-date-picker v-model="formVisitTemp.date" type="date" value-format="yyyy-MM-dd"></el-date-picker>
		      </el-form-item>
		      <el-form-item label="建议医生" prop="doctor">
		        <el-input v-model="formVisitTemp.doctor"></el-input>
		      </el-form-item>
		      <el-form-item label="描述" prop="desc">
		        <el-input v-model="formVisitTemp.desc"></el-input>
		      </el-form-item>
				  <el-form-item class="popover-button">
				    <el-button type="primary" @click="showReturnVisit">确认</el-button>
				    <el-button type="text" @click="visitPopOver = false">取消</el-button>
				  </el-form-item>
				</el-form>
			</el-popover>
    	<el-table :data="returnvisit" border highlight-current-row style="width: 100%" align='center' size="mini">
    		<el-table-column type="index" label="序号" align="center" min-width="50"></el-table-column>
	      <el-table-column prop="name" label="复诊项目" align="center" min-width="120" show-overflow-tooltip></el-table-column>
	      <el-table-column prop="date" label="复诊时间" align="center" min-width="120"></el-table-column>
	      <el-table-column prop="doctor" label="建议医生" align="center" min-width="80"></el-table-column>
	      <el-table-column prop="desc" label="描述" align="center" min-width="100" show-overflow-tooltip></el-table-column>
	      <el-table-column label="操作" min-width="200" align='center'>
          <template slot-scope="scope">
        		<el-popover ref="visitpopdelete{{$index}}" placement="top-end" title="复诊信息删除" v-model="scope.row.delete">
        			<p>您确定要删除记录吗?</p>
      			  <div class="popover-button">
      			    <el-button type="primary" size="mini" @click="deleteReturnVisit(scope.$index)">确认</el-button>
      			    <el-button type="text" size="mini" @click="scope.row.delete = false">取消</el-button>
      			  </div>
        		</el-popover>
        		<el-popover ref="visitpopover{{$index}}" placement="top-end" title="复诊信息" v-model="scope.row.edit">
        			<el-form label-width="80px" :model="formVisitTemp" size="mini">
        			  <el-form-item label="复诊项目" prop="code">
        			    <el-select v-model="formVisitGroup" placeholder="复诊项目" value-key="code">
        	          <el-option v-for="item in groupProject" :key="item.code" :label="item.name" :value="item"></el-option>
        	        </el-select>
        			  </el-form-item>
        			  <el-form-item label="复诊日期" prop="date">
        			  	<el-date-picker v-model="formVisitTemp.date" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        	      </el-form-item>
        	      <el-form-item label="建议医生" prop="doctor">
        	        <el-input v-model="formVisitTemp.doctor"></el-input>
        	      </el-form-item>
        	      <el-form-item label="描述" prop="desc">
        	        <el-input v-model="formVisitTemp.desc"></el-input>
        	      </el-form-item>
        			  <el-form-item class="popover-button">
        			    <el-button type="primary" @click="showReturnVisit">确认</el-button>
        			    <el-button type="text" @click="scope.row.edit = false">取消</el-button>
        			  </el-form-item>
        			</el-form>
        		</el-popover>
            <el-button class="op-mini" @click="handlePopUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit" v-popover:visitpopover{{$index}}></el-button>
            <el-button class="op-mini" type="danger" size="mini" icon="el-icon-delete" v-popover:visitpopdelete{{$index}}></el-button>
          </template>
        </el-table-column>
	    </el-table>
	    <el-button class="diagnose-button" type="primary" size="small" @click="handlePopCreate" v-popover:visitpopover>添加复诊</el-button>
		</div>
		<div class="submit-container">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
	</div>
</template>
<script>
  import TestJs from './Test.js'

  export default TestJs
</script>
<style scoped lang="scss">
	.image-avatar {
		float: right;
		width: 100px;
		height: 100px;
		margin-top: -10px;
		margin-right: 20%;
		overflow: hidden;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
	}
	.item-list {
		.el-menu-item {
			height: 40px;
    	line-height: 40px;
		}
	}
	.inline-auto {
		width: 100%;
		.autocomplete-close{
			// cursor: pointer;
		}
		.autocomplete-wrap {
			text-overflow: ellipsis;
			overflow: hidden;
			.addr {
				font-size: 0.8rem;
				color: #b4b4b4;
			}
		}
	}
	.call-number {
		float: right;
	}
	.popover-button {
		margin: 0;
		padding: 10px 0 0;
		text-align: right;
	}
	.diagnose-button {
		margin:10px 0;
	}
	/deep/ td.cell-result{
		padding: 0;
	}
</style>