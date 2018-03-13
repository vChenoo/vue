<template>
	<div class="testproject">
		<transition name="fade" mode="out-in" v-on:enter="enter">
			<div key="list" class="page-show" v-if="visibleList===1">
				<content-title>体检项目</content-title>
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
				    <el-button type="primary" @click="clickQuery" icon="el-icon-search">查询</el-button>
				    <el-button type="primary" @click='clickCreate' icon="el-icon-plus">新增</el-button>
				  </el-form-item>
				</el-form>
				<el-table :data="tablePageData" border highlight-current-row style="width: 100%" align='center' size="small">
		      <el-table-column type="index" :index="indexMethod" label="序号" align="center" min-width="40"></el-table-column>
		      <el-table-column prop="name" label="项目名称" align="center" min-width="60" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="department" label="所属科室" align="center" min-width="80" :formatter="formatterDp" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="clinical" label="临床类型" align="center" min-width="60" :formatter="formatterClinical" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="price" label="标准价格" align="center" min-width="50"></el-table-column>
		      <el-table-column prop="unit" label="单位" align="center" min-width="50" show-overflow-tooltip></el-table-column>
		      <el-table-column prop="resulttype" label="结果类型" align="center" min-width="40" :formatter="formatterResultType"></el-table-column>
		      <el-table-column prop="isenabled" label="是否启用" align="center" min-width="40" :formatter="formatterWhether"></el-table-column>
		      <el-table-column label="操作" min-width="180" align='center'>
            <template slot-scope="scope">
              <el-button class="op-mini" @click="clickUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit"></el-button>
              <el-button class="op-mini" @click="clickResult(scope.row, scope.$index)" type="primary" size="mini">常见结果</el-button>
              <el-button class="op-mini" @click="deleteData(scope.$index)" type="danger" size="mini" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
		    </el-table>
		    <div class="pagination-container">
		      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryData.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryData.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
		    </div>
			</div>
			<div key="edit" class="page-show" v-else-if="visibleList===2">
				<content-title>体检项目详情</content-title>
				<el-form class="line-form" label-width="30%" label-position="right" :model="formTemp" :rules="rules" ref="formEdit" size="small">
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
	        <div class="submit-container">
	          <el-button v-if="statusForm=='create'" type="primary" @click="createData">确定</el-button>
	          <el-button v-else type="primary" @click="updateData">确定</el-button>
	          <el-button @click="visibleList = 1">返回</el-button>
	        </div>
		    </el-form>
			</div>
			<div key="result" class="page-show" v-else-if="visibleList===3">
				<div v-if="resultType==2">
					<div class="top-back">
						<el-button size="medium" @click="resultNumerBack">返回<i class="el-icon-arrow-right el-icon--right"></i></el-button>
					</div>
					<h4 class="title title-top">数值型项目常见结果</h4>
					<div class="group">
						<el-popover width="450" ref="numerpopover" placement="bottom-start" title="添加常见结果" v-model="numerPopOver">
							<el-form class="group" label-width="80px" label-position="left" ref="numerCreateForm" :model="formNumerTemp" :rules="numerRules" size="mini">
								<el-row :gutter="30">
									<el-col :sm="24" :md="12">
										<el-form-item label="下限" prop="lower">
								    	<el-input placeholder="请输入下限值" v-model.number="formNumerTemp.lower" class="input-with-select">
								    		<el-select v-model="formNumerTemp.lowerunit" slot="append" placeholder="--">
								    			<el-option label="不限" value="0"></el-option>
								    			<el-option label="岁" value="岁"></el-option>
								    			<el-option label="月" value="月"></el-option>
								    		</el-select>
								    	</el-input>
								    </el-form-item>
									</el-col>
									<el-col :sm="24" :md="12">
										<el-form-item label="上限" prop="upper">
								    	<el-input placeholder="请输入上限值" v-model.number="formNumerTemp.upper" class="input-with-select">
								    		<el-select v-model="formNumerTemp.upperunit" slot="append" placeholder="--">
								    			<el-option label="不限" value="0"></el-option>
								    			<el-option label="岁" value="岁"></el-option>
								    			<el-option label="月" value="月"></el-option>
								    		</el-select>
								    	</el-input>
								    </el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :sm="24" :md="12">
										<el-form-item label="最小值" prop="min">
					  	      	<el-input v-model.number="formNumerTemp.min" placeholder="请输入最小值"></el-input>
					  	      </el-form-item>
									</el-col>
									<el-col :sm="24" :md="12">
										<el-form-item label="最大值" prop="max">
											<el-input v-model.number="formNumerTemp.max" placeholder="请输入最大值"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :sm="24" :md="12">
									  <el-form-item label="描述" prop="desc">
								      <el-input v-model="formNumerTemp.desc" placeholder="请输入描述"></el-input>
									  </el-form-item>
									</el-col>
									<el-col :sm="24" :md="12">
									  <el-form-item label="诊断" prop="diagnose">
									  	<el-select v-model="formNumerTemp.diagnose" filterable placeholder="请选择">
										    <el-option v-for="item in diagnoseOption" :key="item.code" :label="item.name" :value="item.code"></el-option>
										  </el-select>
								    </el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :sm="24" :md="12">
								    <el-form-item label="是否正常范围" prop="isnormal">
									  	<el-switch v-model="formNumerTemp.isnormal" active-value="1" inactive-value="2"></el-switch>
								    </el-form-item>
									</el-col>
									<el-col :sm="24" :md="12">
								    <el-form-item label="是否阳性" prop="ispositive">
									  	<el-switch v-model="formNumerTemp.ispositive" active-value="1" inactive-value="2"></el-switch>
								    </el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :sm="24" :md="12">
								    <el-form-item label="结果是否进入小结" prop="isresultin">
									  	<el-switch v-model="formNumerTemp.isresultin" active-value="1" inactive-value="2"></el-switch>
								    </el-form-item>
									</el-col>
									<el-col :sm="24" :md="12">
								    <el-form-item label="诊断是否进入小结" prop="isdiagnosein">
									  	<el-switch v-model="formNumerTemp.isdiagnosein" active-value="1" inactive-value="2"></el-switch>
								    </el-form-item>
									</el-col>
								</el-row>
						    <el-form-item label="适用性别" prop="sex">
						    	<el-radio-group v-model="formNumerTemp.sex">
						    		<el-radio v-for="item in sexOption" :key="item.code" :label="item.code">{{item.name}}</el-radio>
					    	  </el-radio-group>
						    </el-form-item>
						    <el-row :gutter="30">
									<el-col :sm="24" :md="12">
									  <el-form-item label="拼音简码" prop="pinyin">
								      <el-input v-model="formNumerTemp.pinyin" placeholder="请输入拼音简码"></el-input>
									  </el-form-item>
									</el-col>
									<el-col :sm="24" :md="12">
									  <el-form-item label="五笔简码" prop="wubi">
								      <el-input v-model="formNumerTemp.wubi" placeholder="请输入五笔简码"></el-input>
									  </el-form-item>
									</el-col>
								</el-row>
							  <el-form-item class="popover-button">
							    <el-button type="primary" @click="showNumer">确认</el-button>
							    <el-button type="text" @click="numerPopOver = false">取消</el-button>
							  </el-form-item>
							</el-form>
						</el-popover>
			    	<el-table :data="numerList" :span-method="numerSpan" border highlight-current-row style="width: 100%" align='center' size="mini">
			    		<el-table-column type="index" label="序号" align="center" min-width="50"></el-table-column>
			    		<el-table-column prop="sex" label="适用性别" align="center" min-width="80" :formatter="formatterSex"></el-table-column>
			    		<el-table-column prop="lower" label="下限" align="center" min-width="120" show-overflow-tooltip>
				      	<template slot-scope="scope">
				      		<span v-text="scope.row.lower+scope.row.lowerunit"></span>
				      	</template>
				      </el-table-column>
				      <el-table-column prop="upper" label="上限" align="center" min-width="120" show-overflow-tooltip>
				      	<template slot-scope="scope">
				      		<span v-text="scope.row.upper+scope.row.upperunit"></span>
				      	</template>
				      </el-table-column>
				      <el-table-column prop="min" label="最小值" align="center" min-width="80"></el-table-column>
				      <el-table-column prop="max" label="最大值" align="center" min-width="80"></el-table-column>
				      <el-table-column prop="desc" label="描述" align="center" min-width="120" show-overflow-tooltip></el-table-column>
				      <el-table-column prop="diagnose" label="诊断" header-align="center" align="left" min-width="100" :formatter="formatterDiagnose"></el-table-column>
				      <el-table-column prop="isnormal" label="是否正常范围" align="center" min-width="40" :formatter="formatterNormal"></el-table-column>
				      <el-table-column prop="ispositive" label="是否阳性" align="center" min-width="40" :formatter="formatterPositive"></el-table-column>
				      <el-table-column label="操作" min-width="125" align='center'>
			          <template slot-scope="scope">
			        		<el-popover ref="numerpopdelete{{$index}}" placement="top-end" title="常见结果删除" v-model="scope.row.delete">
			        			<p>您确定要删除记录吗?</p>
			      			  <div class="popover-button">
			      			    <el-button type="primary" size="mini" @click="deleteNumer(scope.$index)">确认</el-button>
			      			    <el-button type="text" size="mini" @click="scope.row.delete = false">取消</el-button>
			      			  </div>
			        		</el-popover>
			        		<el-popover width="450" ref="numerpopover{{$index}}" placement="bottom-end" title="修改常见结果" v-model="scope.row.edit">
			        			<el-form class="group" label-width="80px" label-position="left" ref="numerUpdateForm" :model="formNumerTemp" :rules="numerRules" size="mini">
			        				<el-row :gutter="30">
												<el-col :sm="24" :md="12">
													<el-form-item label="下限" prop="lower">
											    	<el-input placeholder="请输入下限值" v-model.number="formNumerTemp.lower" class="input-with-select">
											    		<el-select v-model="formNumerTemp.lowerunit" slot="append" placeholder="--">
											    			<el-option label="不限" value="0"></el-option>
											    			<el-option label="岁" value="岁"></el-option>
											    			<el-option label="月" value="月"></el-option>
											    		</el-select>
											    	</el-input>
											    </el-form-item>
												</el-col>
												<el-col :sm="24" :md="12">
													<el-form-item label="上限" prop="upper">
											    	<el-input placeholder="请输入上限值" v-model.number="formNumerTemp.upper" class="input-with-select">
											    		<el-select v-model="formNumerTemp.upperunit" slot="append" placeholder="--">
											    			<el-option label="不限" value="0"></el-option>
											    			<el-option label="岁" value="岁"></el-option>
											    			<el-option label="月" value="月"></el-option>
											    		</el-select>
											    	</el-input>
											    </el-form-item>
												</el-col>
											</el-row>
											<el-row :gutter="30">
												<el-col :sm="24" :md="12">
													<el-form-item label="最小值" prop="min">
								  	      	<el-input v-model.number="formNumerTemp.min" placeholder="请输入最小值"></el-input>
								  	      </el-form-item>
												</el-col>
												<el-col :sm="24" :md="12">
													<el-form-item label="最大值" prop="max">
														<el-input v-model.number="formNumerTemp.max" placeholder="请输入最大值"></el-input>
													</el-form-item>
												</el-col>
											</el-row>
											<el-row :gutter="30">
												<el-col :sm="24" :md="12">
												  <el-form-item label="描述" prop="desc">
											      <el-input v-model="formNumerTemp.desc" placeholder="请输入描述"></el-input>
												  </el-form-item>
												</el-col>
												<el-col :sm="24" :md="12">
												  <el-form-item label="诊断" prop="diagnose">
												  	<el-select v-model="formNumerTemp.diagnose" filterable placeholder="请选择">
													    <el-option v-for="item in diagnoseOption" :key="item.code" :label="item.name" :value="item.code"></el-option>
													  </el-select>
											    </el-form-item>
												</el-col>
											</el-row>
											<el-row :gutter="30">
												<el-col :sm="24" :md="12">
											    <el-form-item label="是否正常范围" prop="isnormal">
												  	<el-switch v-model="formNumerTemp.isnormal" active-value="1" inactive-value="2"></el-switch>
											    </el-form-item>
												</el-col>
												<el-col :sm="24" :md="12">
											    <el-form-item label="是否阳性" prop="ispositive">
												  	<el-switch v-model="formNumerTemp.ispositive" active-value="1" inactive-value="2"></el-switch>
											    </el-form-item>
												</el-col>
											</el-row>
											<el-row :gutter="30">
												<el-col :sm="24" :md="12">
											    <el-form-item label="结果是否进入小结" prop="isresultin">
												  	<el-switch v-model="formNumerTemp.isresultin" active-value="1" inactive-value="2"></el-switch>
											    </el-form-item>
												</el-col>
												<el-col :sm="24" :md="12">
											    <el-form-item label="诊断是否进入小结" prop="isdiagnosein">
												  	<el-switch v-model="formNumerTemp.isdiagnosein" active-value="1" inactive-value="2"></el-switch>
											    </el-form-item>
												</el-col>
											</el-row>
									    <el-form-item label="适用性别" prop="sex">
									    	<el-radio-group v-model="formNumerTemp.sex">
									    		<el-radio v-for="item in sexOption" :key="item.code" :label="item.code">{{item.name}}</el-radio>
								    	  </el-radio-group>
									    </el-form-item>
									    <el-row :gutter="30">
												<el-col :sm="24" :md="12">
												  <el-form-item label="拼音简码" prop="pinyin">
											      <el-input v-model="formNumerTemp.pinyin" placeholder="请输入拼音简码"></el-input>
												  </el-form-item>
												</el-col>
												<el-col :sm="24" :md="12">
												  <el-form-item label="五笔简码" prop="wubi">
											      <el-input v-model="formNumerTemp.wubi" placeholder="请输入五笔简码"></el-input>
												  </el-form-item>
												</el-col>
											</el-row>
	        			  	  <el-form-item class="popover-button">
	        			  	    <el-button type="primary" @click="showNumer">确认</el-button>
	        			  	    <el-button type="text" @click="scope.row.edit = false">取消</el-button>
	        			  	  </el-form-item>
			        			</el-form>
			        		</el-popover>
			            <el-button class="op-mini" @click="handleNumerUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit" v-popover:numerpopover{{$index}}></el-button>
			            <el-button class="op-mini" type="danger" size="mini" icon="el-icon-delete" v-popover:numerpopdelete{{$index}}></el-button>
			          </template>
			        </el-table-column>
				    </el-table>
				    <el-button class="result-button" type="primary" size="small" @click="handleNumerCreate" v-popover:numerpopover>添加常见结果</el-button>
					</div>
				</div>
				<div v-else>
					<div class="top-back">
						<el-button size="medium" @click="resultCharacterBack">返回<i class="el-icon-arrow-right el-icon--right"></i></el-button>
					</div>
					<h4 class="title title-top">字符型项目常见结果</h4>
					<div class="group">
						<el-popover width="450" ref="chtpopover" placement="bottom-start" title="添加常见结果" v-model="chtPopOver">
							<el-form class="group" label-width="80px" label-position="left" ref="chtCreateForm" :model="formChtTemp" :rules="chtRules" size="mini">
								<el-row :gutter="30">
									<el-col :sm="24" :md="12">
									  <el-form-item label="描述" prop="desc">
								      <el-input v-model="formChtTemp.desc" placeholder="请输入描述"></el-input>
									  </el-form-item>
									</el-col>
									<el-col :sm="24" :md="12">
									  <el-form-item label="诊断" prop="diagnose">
									  	<el-select v-model="formChtTemp.diagnose" filterable placeholder="请选择">
										    <el-option v-for="item in diagnoseOption" :key="item.code" :label="item.name" :value="item.code"></el-option>
										  </el-select>
								    </el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :sm="24" :md="12">
								    <el-form-item label="结果是否进入小结" prop="isresultin">
									  	<el-switch v-model="formChtTemp.isresultin" active-value="1" inactive-value="2"></el-switch>
								    </el-form-item>
									</el-col>
									<el-col :sm="24" :md="12">
								    <el-form-item label="诊断是否进入小结" prop="isdiagnosein">
									  	<el-switch v-model="formChtTemp.isdiagnosein" active-value="1" inactive-value="2"></el-switch>
								    </el-form-item>
									</el-col>
								</el-row>
							  <el-row :gutter="30">
									<el-col :sm="24" :md="24">
								    <el-form-item label="是否正常范围" label-width="110px" prop="isnormal">
									  	<el-switch v-model="formChtTemp.isnormal" active-value="1" inactive-value="2"></el-switch>
								    </el-form-item>
									</el-col>
								</el-row>
							  <el-row :gutter="30">
									<el-col :sm="24" :md="24">
										<el-form-item label="适用性别" prop="sex">
								    	<el-radio-group v-model="formChtTemp.sex">
								    		<el-radio v-for="item in sexOption" :key="item.code" :label="item.code">{{item.name}}</el-radio>
							    	  </el-radio-group>
								    </el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="30">
									<el-col :sm="24" :md="12">
									  <el-form-item label="拼音简码" prop="pinyin">
								      <el-input v-model="formChtTemp.pinyin" placeholder="请输入拼音简码"></el-input>
									  </el-form-item>
									</el-col>
									<el-col :sm="24" :md="12">
									  <el-form-item label="五笔简码" prop="wubi">
								      <el-input v-model="formChtTemp.wubi" placeholder="请输入五笔简码"></el-input>
									  </el-form-item>
									</el-col>
								</el-row>				    
							  <el-form-item class="popover-button">
							    <el-button type="primary" @click="showCharacter">确认</el-button>
							    <el-button type="text" @click="chtPopOver = false">取消</el-button>
							  </el-form-item>
							</el-form>
						</el-popover>
			    	<el-table :data="characterList" :span-method="characterSpan" border highlight-current-row style="width: 100%" align='center' size="mini">
			    		<el-table-column type="index" label="序号" align="center" min-width="50"></el-table-column>
			    		<el-table-column prop="sex" label="适用性别" align="center" min-width="80" :formatter="formatterSex"></el-table-column>
				      <el-table-column prop="desc" label="描述" align="center" min-width="120" show-overflow-tooltip></el-table-column>
				      <el-table-column prop="diagnose" label="诊断" header-align="center" align="left" min-width="100" :formatter="formatterDiagnose"></el-table-column>
				      <el-table-column prop="ispositive" label="是否正常范围" align="center" min-width="40" :formatter="formatterPositive"></el-table-column>
				      <el-table-column label="操作" min-width="125" align='center'>
			          <template slot-scope="scope">
			        		<el-popover ref="chtpopdelete{{$index}}" placement="top-end" title="常见结果删除" v-model="scope.row.delete">
			        			<p>您确定要删除记录吗?</p>
			      			  <div class="popover-button">
			      			    <el-button type="primary" size="mini" @click="deleteCharacter(scope.$index)">确认</el-button>
			      			    <el-button type="text" size="mini" @click="scope.row.delete = false">取消</el-button>
			      			  </div>
			        		</el-popover>
			        		<el-popover width="450" ref="chtpopover{{$index}}" placement="bottom-end" title="修改常见结果" v-model="scope.row.edit">
			        			<el-form class="group" label-width="80px" label-position="left" ref="chtUpdateForm" :model="formChtTemp" :rules="chtRules" size="mini">
	        			  	  <el-row :gutter="30">
  	  									<el-col :sm="24" :md="12">
  	  									  <el-form-item label="描述" prop="desc">
  	  								      <el-input v-model="formChtTemp.desc" placeholder="请输入描述"></el-input>
  	  									  </el-form-item>
  	  									</el-col>
  	  									<el-col :sm="24" :md="12">
  	  									  <el-form-item label="诊断" prop="diagnose">
  	  									  	<el-select v-model="formChtTemp.diagnose" filterable placeholder="请选择">
  	  										    <el-option v-for="item in diagnoseOption" :key="item.code" :label="item.name" :value="item.code"></el-option>
  	  										  </el-select>
  	  								    </el-form-item>
  	  									</el-col>
  	  								</el-row>
  	  								<el-row :gutter="30">
  	  									<el-col :sm="24" :md="12">
  	  								    <el-form-item label="结果是否进入小结" prop="isresultin">
  	  									  	<el-switch v-model="formChtTemp.isresultin" active-value="1" inactive-value="2"></el-switch>
  	  								    </el-form-item>
  	  									</el-col>
  	  									<el-col :sm="24" :md="12">
  	  								    <el-form-item label="诊断是否进入小结" prop="isdiagnosein">
  	  									  	<el-switch v-model="formChtTemp.isdiagnosein" active-value="1" inactive-value="2"></el-switch>
  	  								    </el-form-item>
  	  									</el-col>
  	  								</el-row>
  	  							  <el-row :gutter="30">
  	  									<el-col :sm="24" :md="24">
  	  								    <el-form-item label="是否正常范围" label-width="110px" prop="isnormal">
  	  									  	<el-switch v-model="formChtTemp.isnormal" active-value="1" inactive-value="2"></el-switch>
  	  								    </el-form-item>
  	  									</el-col>
  	  								</el-row>
  	  							  <el-row :gutter="30">
  	  									<el-col :sm="24" :md="24">
  	  										<el-form-item label="适用性别" prop="sex">
  	  								    	<el-radio-group v-model="formChtTemp.sex">
  	  								    		<el-radio v-for="item in sexOption" :key="item.code" :label="item.code">{{item.name}}</el-radio>
  	  							    	  </el-radio-group>
  	  								    </el-form-item>
  	  									</el-col>
  	  								</el-row>
  	  								<el-row :gutter="30">
  	  									<el-col :sm="24" :md="12">
  	  									  <el-form-item label="拼音简码" prop="pinyin">
  	  								      <el-input v-model="formChtTemp.pinyin" placeholder="请输入拼音简码"></el-input>
  	  									  </el-form-item>
  	  									</el-col>
  	  									<el-col :sm="24" :md="12">
  	  									  <el-form-item label="五笔简码" prop="wubi">
  	  								      <el-input v-model="formChtTemp.wubi" placeholder="请输入五笔简码"></el-input>
  	  									  </el-form-item>
  	  									</el-col>
  	  								</el-row>
	        			  	  <el-form-item class="popover-button">
	        			  	    <el-button type="primary" @click="showCharacter">确认</el-button>
	        			  	    <el-button type="text" @click="scope.row.edit = false">取消</el-button>
	        			  	  </el-form-item>
			        			</el-form>
			        		</el-popover>
			            <el-button class="op-mini" @click="handleCharacterUpdate(scope.row, scope.$index)" type="primary" size="mini" icon="el-icon-edit" v-popover:chtpopover{{$index}}></el-button>
			            <el-button class="op-mini" type="danger" size="mini" icon="el-icon-delete" v-popover:chtpopdelete{{$index}}></el-button>
			          </template>
			        </el-table-column>
				    </el-table>
				    <el-button class="result-button" type="primary" size="small" @click="handleCharacterCreate" v-popover:chtpopover>添加常见结果</el-button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
  import TestprojectJs from './Testproject.js'

  export default TestprojectJs
</script>
<style scoped lang="scss">
	.result-button {
		margin:10px 0;
	}
	.input-with-select {
		/deep/ .el-input-group__append {
	    background-color: #fff;
	    border-left-width: 0;
	    /deep/ .el-input {
	    	width: 50px;
	    	text-align: center;
	    	/deep/ .el-input__inner {
	    		padding-left:5px;
	    	}
	    }
	  }
	}
</style>
