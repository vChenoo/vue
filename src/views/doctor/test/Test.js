import {deepClone, formatDate, notifyConfig} from '@/utils/'
import {getWorkstation} from '@/api/constant'
import {queryGroupproject, queryTestproject, queryDiagnose, queryResult} from '@/api/testsetting'
import {getTester} from '@/api/doctor'

export default {
	name: 'test',
	data () {
		return {
			queryWs: {
				currentName: '王医生',
				currentAccount: 'doctorWang',
				workstation: '1'
			},
			wsOption: [],			// 下拉 工作站
			queryTester: {
				num: '20180227001'
			},
			tester: {
				name: '',
				code: '',
				registerid: '',
				sex: '',
				age: '',
				imageUrl: ''
			},
			groupProject: [],
			projectDetail: [],
			rules: {
				register: [
					{required: true, message: '请输入注册码', trigger: 'blur'}
				]
			},
      commonList: [],
			visiblePopOver: false,		// pop
			popTitle: [								// pop title
				'未选诊断', '已选诊断'
			],
			diagnose: [],							// 诊断
			diagnoseAlias: {					// 诊断别名
				key: 'code',
				label: 'name'
			},
			diagnoseChoose: [],				// 诊断选择
			diagnoseList: [],					// 诊断列表
			result: {									// 小结
				content: ''
			},
			visitPopOver: false,			// 复诊pop
			returnvisit: [],
			indexVisitTemp: null,			// 复诊index编辑值
			formVisitTemp: {				// 复诊数据编辑值
				code: '',
    		name: '',
    		date: '',
    		doctor: '',
    		desc: ''
			},
			formVisitGroup: {}				// 复诊编辑中的组合项目
		}
	},
	created () {
  	this.getList()
  },
  filters: {
  	yesorno(value) {
			return value === '1' ? '是' : '否'
  	}
  },
	methods: {
		/* 交互方法 */
		clickQuery () {
			console.log('体检者信息查询')
		},
		getList () {	// 	查询接口
			// 常量查询 婚姻状况
      getWorkstation().then(response => {
        this.wsOption = response.data
      })
      // 查询体检者信息
      getTester().then(response => {
        this.tester = response.data
      })
      // 查询组合项目列表
      queryGroupproject().then(response => {
        this.groupProject = response.data
      })
      // 查询项目列表
      queryTestproject().then(response => {
        this.projectDetail = response.data
      })
      // 查询常见结果
      queryResult().then(response => {
        this.commonList = response.data
        this.commonList.map(v => {
          this.$set(v, 'value', v.desc)
          return v
        })
      })
      // 查询诊断建议
      queryDiagnose().then(response => {
        this.diagnoseList = response.data
      })
    },
    /* 体检项目 */
    handleMenuSelect(index) { // 点击组合项目列表
    	this.projectDetail.map(v => {
        this.$set(v, 'edit', false)
        v.originalResult = v.result
        return v
      })
    },
    querySearch(queryString, cb) {  // 搜素常见结果
      let commons = this.commonList
      let results = queryString ? commons.filter(this.createFilter(queryString)) : commons
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return common => {
        return common.desc.indexOf(queryString) === 0
      }
    },
    handleIptSelect(item) { // 选择常见结果
      console.log(item)
    },
    handleIconClick(ev) {   // 点击按钮
      console.log(ev)
    },
    /* triggerEdit(row, column, cell, event) {
    	this.$set(row, 'edit', true)
    },
    cancelEdit(row, column, cell, event) {
    	this.$set(row, 'edit', false)
    }, */
    /* 诊断 */
    showDiagnose() {
    	this.diagnose = []
    	this.diagnoseChoose.forEach(item => {
    		let arr = this.diagnoseList.filter(val => {
	        return val.code === item
	      })
	      if (arr.length) {
	      	this.diagnose.push(arr[0])
	      }
    	})
    	this.visiblePopOver = false
    },
    /* 复诊 */
    handlePopUpdate (row, index) { // 编辑交互
    	row.edit = true
      this.indexVisitTemp = index
      this.formVisitTemp = deepClone(row)
      this.formVisitGroup = {
      	code: this.formVisitTemp.code,
      	name: this.formVisitTemp.name
      }
    },
    handlePopCreate() {
    	this.visitPopOver = true
    	this.indexVisitTemp = this.returnvisit.length
    	this.formVisitTemp = {
    		code: '',
    		name: '',
    		date: formatDate(new Date(), 'yyyy-MM-dd'),
    		doctor: '王医生',
    		desc: '',
    		edit: false,
    		delete: false
    	}
    },
    showReturnVisit() {
    	let hasExist				// 判断已选项目是否已在复诊列表中
      let isEdit = this.formVisitTemp.edit
    	this.formVisitTemp.code = this.formVisitGroup.code
  		this.formVisitTemp.name = this.formVisitGroup.name
  		this.formVisitTemp.edit = false

    	hasExist = this.returnvisit.filter(item => {
    		return item.code === this.formVisitTemp.code
    	})
    	if (hasExist.length && isEdit === false) {
    		this.$notify(notifyConfig('复诊项目已存在', 'warning'))
    	} else {
    		this.$set(this.returnvisit, this.indexVisitTemp, this.formVisitTemp)
    		this.visitPopOver = false
    	}
    },
    deleteReturnVisit (index) {
      this.returnvisit.splice(index, 1)
    },
    submit() {
    	this.$notify(notifyConfig(this.tester.name + '体检记录', 'success'))
    }
	}
}
