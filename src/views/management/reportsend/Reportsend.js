import {notifyConfig, pickerRangeTimeOptions, deepClone} from '@/utils/'
import {getSex, getMarriage, getWhether} from '@/api/constant'
import {queryTesttype} from '@/api/database'
import {queryReportSend, queryOrganization} from '@/api/management'

export default {
  name: 'reportsend',
	data () {
		return {
			queryData: {
				page: 1,
				limit: 10,
				name: '',
				code: '',
        registerId: '',
				idcard: '',
        testtype: '0',
        totalExameTime: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()],
        isSend: '0'
			},
      pickerOption: pickerRangeTimeOptions,
			tableData: [],  //  表格数据
			rules: {
				name: [
					{required: true, message: '请输入项目名称', trigger: 'blur'}
				],
				department: [
					{required: true, message: '请选择体检科室', trigger: 'change'}
				],
				clinical: [
					{required: true, message: '请选择临床类型', trigger: 'change'}
				],
				collect: [
					{required: true, message: '请选择汇总项目', trigger: 'change'}
				],
				sex: [
					{required: true, message: '请选择适用性别', trigger: 'change'}
				],
				isgynaecology: [
					{required: true, message: '请选择是否妇科', trigger: 'change'}
				]
			},
			formTemp: null, // 表单渲染值
      indexTemp: null,  //  表单渲染值对应序号
      visibleList: true,  // 列表是否可见
      statusForm: 'create', //  'update' or 'create'
      testtypeOption: [],				// 体检类别下拉
      orgOption: [],    // 下拉 是否
      whetherOption: [],   // 下拉 体检单位
      marriageOption: [],	// 婚姻状况下拉
      sexOption: [],			// 性别下拉
      testOptSel: []				// 查询下拉 体检类别
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
	methods: {
		/* 格式化 */
  	formatterType (item) { // 体检类别
      let valArr = []
      valArr = this.testtypeOption.filter(val => {
        return val.code === item.testtype
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterOrg (item) { // 体检单位
      let valArr = []
      valArr = this.orgOption.filter(val => {
        return val.code === item.org
      })
      return valArr.length ? valArr[0].name : ''
    },
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
		/* 筛选 */
  	indexMethod (index) { // 表格序号
      return this.queryData.limit * (this.queryData.page - 1) + 1 + index
    },
    /* 动画 */
    enter (el, done) {
      if (this.$refs['formEdit']) {
        this.$refs['formEdit'].clearValidate()
        this.$store.dispatch('set_bread_name', '编辑标本类型')
      } else {
        this.$store.dispatch('set_bread_name', '')
      }
    },
  	/* 交互方法 */
		clickQuery () {
			console.log('个人体检预登记查询')
		},
		getList () {	// 	查询接口
      // 常量查询 体检类别
      queryTesttype().then(response => {
        this.testtypeOption = response.data
        this.testOptSel = deepClone(this.testtypeOption)
        this.testOptSel.unshift({code: '0', name: '不限'})
      })
      // 常量查询 体检单位
      queryOrganization().then(response => {
        this.orgOption = response.data
        /* this.orgOptSel = JSON.parse(JSON.stringify(this.orgOption))
        this.orgOptSel.unshift({code: '0', name: '不限'}) */
      })
      // 常量查询 是否
      getWhether().then(response => {
        this.whetherOption = response.data
        this.whetherOption.unshift({code: '0', name: '不限'})
      })
      // 常量查询 婚姻状况
      getMarriage().then(response => {
        this.marriageOption = response.data
      })
      // 常量查询 性别
      getSex().then(response => {
        this.sexOption = response.data
        this.sexOption.shift()
      })
      // 查询体检报告发放
      queryReportSend().then(response => {
        this.tableData = response.data
      })
		},
		handleSizeChange (val) { // 每页条数改变
      this.queryData.limit = val
    },
    handleCurrentChange (val) { // 当前页数改变
      this.queryData.page = val
    },
    handleSend (row, index) {
      this.$confirm('你确定要发放<strong style="padding: 0 5px;letter-spacing: 1px;color: #2dc3e8;">' + row.name + '</strong>的体检报告吗?', '确认归档', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        this.$notify(notifyConfig('发放', 'success'))
      }).catch(() => {})
    }
	}
}
