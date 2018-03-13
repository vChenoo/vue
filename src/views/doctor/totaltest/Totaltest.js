import {deepClone, formatDate, notifyConfig} from '@/utils/'
import {getTotalGroup, getWhether, getSex} from '@/api/constant'
import {queryPersonalexamination} from '@/api/management'
import {queryGroupproject, queryTestproject, queryDiagnose, queryConclusion} from '@/api/testsetting'
import {getTester} from '@/api/doctor'

export default {
	name: 'totaltest',
	data () {
		return {
			queryData: {
        page: 1,
        limit: 10,
				name: '',
				code: '',
				registerid: '',
        totalGroup: '',
        isTotal: ''
			},
      tableData: [],  //  表格数据
      visibleList: true,  // 列表是否可见
      totalGroupOption: [],     // 下拉 工作站
			totalGroupOptSel: [],			// 查询下拉 工作站
      whetherOption: [],        // 下拉 是否
      sexOption: [],            // 下拉 性别
			tester: {                 // 详情体检者信息
				name: '',
				code: '',
				registerid: '',
				sex: '',
				age: '',
        testtype: '',
				imageUrl: ''
			},
      visibleProDetail: false, // 体检明细是否可见
			groupProject: [],
			projectDetail: [],
			rules: {
				register: [
					{required: true, message: '请输入注册码', trigger: 'blur'}
				]
			},
      suggest: [],              // 综述与建议
      indexSuggestTemp: null,   // 综述与建议index编辑值
      formSuggestTemp: {        // 综述与建议数据编辑值
        content: '',
        suggestion: ''
      },
      suggestPopOver: false,    // 综述与建议pop
			visiblePopOver: false,		// 诊断pop
			popTitle: [								// pop title
				'未选诊断', '已选诊断'
			],
			diagnose: [],							// 诊断
      conclusion: {                 // 结论
        content: ''
      },
      conclusionList: [],       // 体检结论
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
  computed: {
    total () { // 记录总数
      return this.tableData.length
    },
    tablePageData () { // 表格分页
      return this.tableData.slice(this.queryData.limit * (this.queryData.page - 1), this.queryData.page * this.queryData.limit)
    }
  },
  filters: {
  	yesorno(value) {
			return value === '1' ? '是' : '否'
  	}
  },
	methods: {
    /* 格式化 */
    formatterWhether (item) { // 是否
      let valArr = []
      valArr = this.whetherOption.filter(val => {
        return val.code === item.istotal
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterSex (item) { // 性别
      let valArr = []
      valArr = this.sexOption.filter(val => {
        return val.code === item.sex
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterStatus (item) {  // 总检状态
      return item.istotal === '1' ? '已总检' : '未总检'
    },
    /* 筛选 */
    indexMethod (index) { // 表格序号
      return this.queryData.limit * (this.queryData.page - 1) + 1 + index
    },
		/* 交互方法 */
		clickQuery () {
			console.log('体检者信息查询')
		},
		getList () {	// 	查询接口
			// 常量查询 总检分组
      getTotalGroup().then(response => {
        this.totalGroupOption = response.data
        this.totalGroupOptSel = deepClone(this.totalGroupOption)
        this.totalGroupOptSel.unshift({code: '0', name: '不限'})
      })
      // 常量查询 是否
      getWhether().then(response => {
        this.whetherOption = response.data
        this.whetherOption.unshift({code: '0', name: '不限'})
      })
      // 常量查询 性别
      getSex().then(response => {
        this.sexOption = response.data
      })
      // 查询个人体检管理
      queryPersonalexamination().then(response => {
        this.tableData = response.data
      })
      // 查询组合项目列表
      queryGroupproject().then(response => {
        this.groupProject = response.data
      })
      // 查询项目列表
      queryTestproject().then(response => {
        this.projectDetail = response.data
      })
      // 查询诊断建议
      queryDiagnose().then(response => {
        this.diagnoseList = response.data
        this.initDiagnose()
      })
      // 查询体检结论
      queryConclusion().then(response => {
        this.conclusionList = response.data
      })
    },
    handleSizeChange (val) { // 每页条数改变
      this.queryData.limit = val
    },
    handleCurrentChange (val) { // 当前页数改变
      this.queryData.page = val
    },
    handleCandle(row, index) { // 翻页跳转交互
      this.visibleList = false
      // 查询体检者信息
      getTester().then(response => {
        this.tester = response.data
      })
    },
    handleSuggestCreate() { // 添加综述与建议
      this.suggestPopOver = true
      this.indexSuggestTemp = this.suggest.length
      this.formSuggestTemp = {
        content: '',
        suggestion: '',
        edit: false,
        delete: false
      }
    },
    handleSuggestUpdate (row, index) { // 编辑交互 综述与建议
      row.edit = true
      this.indexSuggestTemp = index
      this.formSuggestTemp = deepClone(row)
    },
    showSuggest() {
      this.formVisitTemp.edit = false
      this.$set(this.suggest, this.indexSuggestTemp, this.formSuggestTemp)
      this.suggestPopOver = false
    },
    deleteSuggest (index) {
      this.suggest.splice(index, 1)
    },
    handleMenuSelect(index) {
    	this.projectDetail.map(v => {
        this.$set(v, 'edit', false)
        v.originalResult = v.result
        return v
      })
    },
    triggerEdit(row, column, cell, event) {
    	this.$set(row, 'edit', true)
    },
    cancelEdit(row, column, cell, event) {
    	this.$set(row, 'edit', false)
    },
    initDiagnose() {
      let zero = this.diagnoseList[0]
      this.diagnose = [{
        name: zero.name,
        department: '心内科',
        doctor: '王医生'
      }]

      this.suggest = []
      this.suggest.push({
        content: zero.name,
        suggestion: zero.science
      })
    },
    handleSelectConclusion(item) {
      console.log(item)
    },
    querySearchConclusion(queryString, cb) {
      let clist = this.conclusionList
      let results = queryString ? clist.filter(this.createFilter(queryString)) : clist
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (clist) => {
        return clist.value.indexOf(queryString) >= 0
      }
    },
    handlePopCreate() { // 添加复诊
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
    handlePopUpdate (row, index) { // 编辑交互
      row.edit = true
      this.indexVisitTemp = index
      this.formVisitTemp = deepClone(row)
      this.formVisitGroup = {
        code: this.formVisitTemp.code,
        name: this.formVisitTemp.name
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
