<template>
	<div class="totaltest">
		<transition name="fade" mode="out-in">
			<div key="list" class="page-show" v-if="visibleList">
				<content-title>总检医生工作台</content-title>
				<el-form :model="queryData" size="small" inline>
					<el-form-item label="姓名">
				    <el-input v-model="queryData.name" placeholder="姓名"></el-input>
				  </el-form-item>
					<el-form-item label="体检编号">
				    <el-input v-model="queryData.code" placeholder="体检编号"></el-input>
				  </el-form-item>
				  <el-form-item label="登记流水号">
				    <el-input v-model="queryData.registerid" placeholder="登记流水号"></el-input>
				  </el-form-item>
				  <el-form-item label="总检分组">
				    <el-select v-model="queryData.totalGroup" placeholder="总检分组">
				      <el-option v-for="item in totalGroupOptSel" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="是否已总检">
				    <el-select v-model="queryData.isTotal" placeholder="是否已总检">
				      <el-option v-for="item in whetherOption" :key="item.code" :value="item.code" :label="item.name"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="clickQuery">查询</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="code" label="体检编号" align="center" min-width="100" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="name" label="姓名" align="center" min-width="100" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="date" label="体检日期" align="center" min-width="100" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="sex" label="性别" align="center" min-width="60" :formatter="formatterSex"></el-table-column>
		      <el-table-column prop="age" label="年龄" align="center" min-width="60"></el-table-column>
		      <el-table-column prop="idcard" label="身份证号" align="center" min-width="130" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="registerid" label="登记流水号" align="center" min-width="100" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="istotal" label="体检状态" align="center" min-width="60" :formatter="formatterStatus"></el-table-column>
		      <el-table-column label="操作" min-width="100" align='center'>
            <template slot-scope="scope">
              <el-button class="op-mini" type="primary" size="mini" @click="handleCandle(scope.row, scope.$index)">总检</el-button>
            </template>
          </el-table-column>
		    </el-table>
		    <div class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
		    </div>
			</div>
			<div key="edit" class="page-show" v-else>
				<content-title>总检详情</content-title>
				<h4 class="title">体检者信息</h4>
				<div class="group">
					<el-form :model="tester" size="small" label-suffix="：" inline>
					  <el-row>
							<el-col :sm="24" :md="18">
								<el-row :gutter="30">
									<el-col :sm="24" :md="8">
					  	      <el-form-item label="体检编号">
					  			    <span>{{tester.code}}</span>
					  	      </el-form-item>
						      </el-col>
									<el-col :sm="24" :md="8">
										<el-form-item label="姓名">
							        <span>{{tester.name}}</span>
							      </el-form-item>
									</el-col>
						      <el-col :sm="24" :md="8">
						      	<el-form-item label="登记流水号">
							      	<span>{{tester.registerid}}</span>
							      </el-form-item>
						      </el-col>
									<el-col :sm="24" :md="8">
						      	<el-form-item label="性别" >
							      	<span>{{tester.sex}}</span>
							      </el-form-item>
									</el-col>
									<el-col :sm="24" :md="8">
						      	<el-form-item label="年龄" >
							      	<span>{{tester.age}}</span>
							      </el-form-item>
						      </el-col>
						      <el-col :sm="24" :md="8">
						      	<el-form-item label="体检类别" >
							      	<span>{{tester.testtype}}</span>
							      </el-form-item>
						      </el-col>
						      <el-col :sm="24" :md="8">
						      	<el-button type="text" size="mini" @click="visibleProDetail=!visibleProDetail"><span v-if="visibleProDetail">收起</span><span v-else>显示</span>体检结果详情</el-button>
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
				<div v-if="visibleProDetail">
					<h4 class="title">体检项目</h4>
					<div class="group">
						<el-row :gutter="20">
							<el-col :sm="24" :md="6">
								<el-menu class="item-list" default-active="0" @select="handleMenuSelect">
									<el-menu-item v-for="(project, index) in groupProject" :key="project.code" :index="''+index">{{project.name}}</el-menu-item>
								</el-menu>
							</el-col>
							<el-col :sm="24" :md="18">
				      	<el-table :data="projectDetail" border highlight-current-row style="width: 100%" align='center' size="mini" @cell-mouse-enter="triggerEdit" @cell-mouse-leave="cancelEdit">
						      <el-table-column prop="name" label="体检项目名称" align="center" min-width="100"></el-table-column>
						      <el-table-column class-name="cell-result" prop="result" label="结果" align="center" min-width="200" show-overflow-tooltip>
				            <template slot-scope="scope">
				            	<div v-if="scope.row.edit">
				            		<el-input class="edit-input" size="mini" v-model="scope.row.result"></el-input>
				            		<el-button class="cancel-btn" size="mini" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
				            	</div>
				            	<span v-else>{{ scope.row.result }}</span>
				            </template>
				          </el-table-column>
				          <el-table-column prop="unit" label="单位" align="center" min-width="60"></el-table-column>
				          <el-table-column prop="ispositive" label="是否阳性" align="center" min-width="60">
				          	<template slot-scope="scope">
				          		<div v-if="scope.row.edit">
				          			<el-checkbox v-model="scope.row.ispositive"></el-checkbox>
				          		</div>
											<span v-else>{{ scope.row.ispositive | yesorno}}</span>
				          	</template>
				          </el-table-column>
						    </el-table>
							</el-col>
						</el-row>
					</div>
				</div>
				<h4 class="title title-top">综述与建议</h4>
				<div class="group">
					<el-popover width="400" ref="suggestpopover" placement="bottom-start" title="综述与建议" v-model="suggestPopOver">
						<el-form label-width="60px" :model="formSuggestTemp" size="mini">
						  <el-form-item label="综述" prop="content">
					      <el-input type="textarea" :autosize="{'minRows': 2}" placeholder="请输入综述" v-model="formSuggestTemp.content"></el-input>
						  </el-form-item>
						  <el-form-item label="建议" prop="suggestion">
						  	<el-input type="textarea" :autosize="{'minRows': 3}" placeholder="请输入建议" v-model="formSuggestTemp.suggestion"></el-input>
					    </el-form-item>
						  <el-form-item class="popover-button">
						    <el-button type="primary" @click="showSuggest">确认</el-button>
						    <el-button type="text" @click="suggestPopOver = false">取消</el-button>
						  </el-form-item>
						</el-form>
					</el-popover>
		    	<el-table :data="suggest" border highlight-current-row style="width: 100%" align='center' size="mini">
		    		<el-table-column type="index" label="序号" align="center" min-width="50"></el-table-column>
			      <el-table-column prop="content" label="综述" align="center" min-width="120" show-overflow-tooltip></el-table-column>
			      <el-table-column prop="suggestion" label="建议" header-align="center" align="left" min-width="500"></el-table-column>
			      <el-table-column label="操作" min-width="200" align='center'>
		          <template slot-scope="scope">
		        		<el-popover ref="suggestpopdelete{{$index}}" placement="top-end" title="综述与建议删除" v-model="scope.row.delete">
		        			<p>您确定要删除记录吗?</p>
		      			  <div class="popover-button">
		      			    <el-button type="primary" size="mini" @click="deleteSuggest(scope.$index)">确认</el-button>
		      			    <el-button type="text" size="mini" @click="scope.row.delete = false">取消</el-button>
		      			  </div>
		        		</el-popover>
		        		<el-popover width="400" ref="suggestpopover{{$index}}" placement="bottom-end" title="综述与建议" v-model="scope.row.edit">
		        			<el-form label-width="80px" :model="formSuggestTemp" size="mini">
		        			  <el-form-item label="综述" prop="content">
		        	        <el-input type="textarea" :autosize="{'minRows': 2}" placeholder="请输入综述" v-model="formSuggestTemp.content"></el-input>
		        			  </el-form-item>
		        			  <el-form-item label="建议" prop="suggestion">
		        			  	<el-input type="textarea" :autosize="{'minRows': 3}" placeholder="请输入建议" v-model="formSuggestTemp.suggestion"></el-input>
		        	      </el-form-item>
		        			  <el-form-item class="popover-button">
		        			    <el-button type="primary" @click="showSuggest">确认</el-button>
		        			    <el-button type="text" @click="scope.row.edit = false">取消</el-button>
		        			  </el-form-item>
		        			</el-form>
		        		</el-popover>
		            <el-button @click="handleSuggestUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit" v-popover:suggestpopover{{$index}}></el-button>
		            <el-button type="danger" size="mini" icon="el-icon-delete" v-popover:suggestpopdelete{{$index}}></el-button>
		          </template>
		        </el-table-column>
			    </el-table>
			    <el-button class="diagnose-button" type="primary" size="small" @click="handleSuggestCreate" v-popover:suggestpopover>添加综述</el-button>
				</div>
				<h4 class="title title-top">诊断</h4>
				<div class="group">
	      	<el-table :data="diagnose" border highlight-current-row style="width: 100%" align='center' size="mini">
	      		<el-table-column type="index" label="序号" align="center" min-width="50"></el-table-column>
	      		<el-table-column prop="department" label="科室" align="center" min-width="100" show-overflow-tooltip></el-table-column>
			      <el-table-column prop="name" label="主要诊断" align="center" min-width="100" show-overflow-tooltip></el-table-column>
			      <el-table-column prop="doctor" label="体检医生" align="center" min-width="100"></el-table-column>
			    </el-table>
				</div>
				<h4 class="title">体检结论</h4>
				<div class="group">
					<el-form :model="conclusion" size="small">
					  <el-form-item prop="content">
					    <el-autocomplete class="line-input" v-model="conclusion.content" :fetch-suggestions="querySearchConclusion" placeholder="请输入体检结论" @select="handleSelectConclusion"
				    ></el-autocomplete>
					  </el-form-item>
					</el-form>
				</div>
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
		        		<el-popover ref="visitpopdelete{{$index}}" placement="top-end" title="复诊信息" v-model="scope.row.delete">
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
		            <el-button @click="handlePopUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit" v-popover:visitpopover{{$index}}></el-button>
		            <el-button type="danger" size="mini" icon="el-icon-delete" v-popover:visitpopdelete{{$index}}></el-button>
		          </template>
		        </el-table-column>
			    </el-table>
			    <el-button class="diagnose-button" type="primary" size="small" @click="handlePopCreate" v-popover:visitpopover>添加复诊</el-button>
				</div>
				<div class="submit-container">
		      <el-button type="primary" @click="submit">提交</el-button>
		      <el-button @click="visibleList = true">返回</el-button>
		    </div>
			</div>
		</transition>
	</div>
</template>
<script>
  import TotaltestJs from './Totaltest.js'

  export default TotaltestJs
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
	.edit-input {
	  padding-right: 85px;
	}
	.cancel-btn {
	  position: absolute;
	  right: 15px;
	  padding: 6px 15px;
	}
	.create-btn {
		float: right;
    margin: 5px 10px;
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
	.line-input {
		width: 100%;
	}
</style>