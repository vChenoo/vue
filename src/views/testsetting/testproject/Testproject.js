import {notifyConfig} from '@/utils/'
import {getDepartment, getResultType, getWhether, getSex} from '@/api/constant'
import {queryClinical} from '@/api/database'
import {queryTestproject} from '@/api/testsetting'

export default {
	name: 'testproject',
	data () {
		return {
			queryData: {
				page: 1,
				limit: 10,
				name: '',
				department: '0',
				clinical: '0',
				result: '0',
				isenabled: '0'
			},
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
				price: [
					{required: true, message: '请输入标准价格', trigger: 'blur'}
				],
				sex: [
					{required: true, message: '请选择适用性别', trigger: 'change'}
				],
				resulttype: [
					{required: true, message: '请选择结果类型', trigger: 'change'}
				],
				unit: [
					{required: true, message: '请输入单位', trigger: 'blur'}
				],
				isenabled: [
					{required: true, message: '请选择是否启用', trigger: 'change'}
				]
			},
			formTemp: null, // 表单渲染值
      indexTemp: null,  //  表单渲染值对应序号
      visibleList: true,  // 列表是否可见
      statusForm: 'create', //  'update' or 'create'
      dpOption: [],				// 科室下拉
      clinicalOption: [],	// 临床类型下拉
      resultOption: [],		// 结果类型下拉
      whetherOption: [],	// 是否启用下拉
      sexOption: [],			// 性别下拉
      dpOptSel: [],				// 查询下拉 科室
      clinicalOptSel: [],
      resultOptSel: [],
      whetherOptSel: [],
      visibleClinical: false
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
  	formatterDp (item) { // 科室
      let valArr = []
      valArr = this.dpOption.filter(val => {
        return val.code === item.department
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterClinical (item) { // 临床类型
      let valArr = []
      valArr = this.clinicalOption.filter(val => {
        return val.code === item.clinical
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterWhether (item) { // 是否
      let valArr = []
      valArr = this.whetherOption.filter(val => {
        return val.code === item.isenabled
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
			console.log('业务类型查询')
		},
		getList () {	// 	查询接口
			// 常量查询 科室
      getDepartment().then(response => {
        this.dpOption = response.data
        this.dpOptSel = JSON.parse(JSON.stringify(this.dpOption))
        this.dpOptSel.unshift({code: '0', name: '不限'})
      })
      // 常量查询 临床类型
      queryClinical().then(response => {
        this.clinicalOption = response.data
        this.clinicalOptSel = JSON.parse(JSON.stringify(this.clinicalOption))
        this.clinicalOptSel.unshift({code: '0', name: '不限'})
      })
      // 常量查询 结果类型
      getResultType().then(response => {
        this.resultOption = response.data
        this.resultOptSel = JSON.parse(JSON.stringify(this.resultOption))
        this.resultOptSel.unshift({code: '0', name: '不限'})
      })
      // 常量查询 是否
      getWhether().then(response => {
        this.whetherOption = response.data
        this.whetherOptSel = JSON.parse(JSON.stringify(this.whetherOption))
        this.whetherOptSel.unshift({code: '0', name: '不限'})
      })
      // 常量查询 性别
      getSex().then(response => {
        this.sexOption = response.data
      })
      // 查询体检项目
      queryTestproject().then(response => {
        this.tableData = response.data
      })
		},
		handleSizeChange (val) { // 每页条数改变
      this.queryData.limit = val
    },
    handleCurrentChange (val) { // 当前页数改变
      this.queryData.page = val
    },
    resetFormTemp () {
      this.formTemp = {
        lasttime: '',
        lastaccount: '',
        department: this.dpOption.length ? this.dpOption[0].code : '',
        name: '',
        price: '',
        sex: '1',
        clinical: '',
        unit: '',
        resulttype: '',
        result: '',
        isenabled: '1'
      }
    },
    clickCreate () { // 新增交互
      this.statusForm = 'create'
      this.resetFormTemp()
      this.visibleList = false
    },
    createData () {
      this.$refs['formEdit'].validate((valid) => {
        if (valid) {
          console.log(this.formTemp)
          this.tableData.unshift(this.formTemp)
          this.visibleList = true
          this.$notify(notifyConfig('新增', 'success'))
        } else {
          console.log('校验不通过')
          return false
        }
      })
    },
    clickUpdate (row, index) { // 编辑交互
      this.statusForm = 'update'
      this.indexTemp = index
      this.formTemp = Object.assign({}, row)
      this.visibleList = false
    },
    updateData () {
      this.$refs['formEdit'].validate((valid) => {
        if (valid) {
          console.log(this.formTemp)
          let tbIndex = this.indexMethod(this.indexTemp) - 1
          this.tableData.splice(tbIndex, 1, this.formTemp)
          this.visibleList = true
          this.$notify(notifyConfig('更新', 'success'))
        } else {
          console.log('校验不通过')
          return false
        }
      })
    },
    deleteData (index) {
      this.$confirm('你确定要删除记录吗?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let tbIndex = this.indexMethod(index) - 1
        this.tableData.splice(tbIndex, 1)
        this.$notify(notifyConfig('删除', 'success'))
      }).catch(() => {})
    },
    dpChanged (item) {
    	let valArr = []
    	let _type = ''
      valArr = this.dpOption.filter(val => {
        return val.code === item
      })
      _type = valArr.length ? valArr[0].type : ''
    	this.visibleClinical = _type === '3'
    }
	}
}
