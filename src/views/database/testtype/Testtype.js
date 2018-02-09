import {notifyConfig} from '@/utils/'
import {queryTesttype} from '@/api/database'
import {getReport, getOccupational, getServicetype} from '@/api/constant'

export default {
	name: 'testtype',
	data () {
		return {
			queryData: {
				page: 1,
        limit: 10,
				name: '',
				report: '0',
        occupational: '0',
        service: '0',
        remark: '',
        lastaccount: '',
        lasttime: ''
			},
			rules: {
				name: [
					{required: true, message: '请输入体检类别名称', trigger: 'blur'}
				],
        report: [
          {required: true, message: '请输入体检报告类型', trigger: 'blur'}
        ],
        occupational: [
          {required: true, message: '请输入职业病类型', trigger: 'blur'}
        ],
        service: [
          {required: true, message: '请输入业务类型', trigger: 'blur'}
        ]
			},
      reportOption: [],
      occupationalOption: [],
      serviceOption: [],
      reportOptions: [],
      occupationalOptions: [],
      serviceOptions: [],
			tableData: [],  //  表格数据
			formTemp: null, // 表单渲染值
      indexTemp: null,  //  表单渲染值对应序号
      visibleList: true,  // 列表是否可见
      statusForm: 'create' //  'update' or 'create'
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
    formatterReport (item) { // 报告类型
      let valArr = []
      valArr = this.reportOption.filter(val => {
        return val.code === item.report
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterOccupational (item) { // 职业病类型
      let valArr = []
      valArr = this.occupationalOption.filter(val => {
        return val.code === item.occupational
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterService (item) { // 业务类型
      let valArr = []
      valArr = this.serviceOption.filter(val => {
        return val.code === item.service
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
        this.$store.dispatch('set_bread_name', '编辑体检类别')
      } else {
        this.$store.dispatch('set_bread_name', '')
      }
    },
  	/* 交互方法 */
		clickQuery () {
			console.log('业务类型查询')
		},
		getList () { // 查询接口
      // 常量查询 报告类型
      getReport().then(response => {
        this.reportOption = response.data
        this.reportOptions = JSON.parse(JSON.stringify(this.reportOption))
        this.reportOptions.unshift({code: '0', name: '不限'})
      })
      // 常量查询 职业病类型
      getOccupational().then(response => {
        this.occupationalOption = response.data
        this.occupationalOptions = JSON.parse(JSON.stringify(this.occupationalOption))
        this.occupationalOptions.unshift({code: '0', name: '不限'})
      })
      // 常量查询 业务类型
      getServicetype().then(response => {
        this.serviceOption = response.data
        this.serviceOptions = JSON.parse(JSON.stringify(this.serviceOption))
        this.serviceOptions.unshift({code: '0', name: '不限'})
      })
      // 查询体检类别
      queryTesttype().then(response => {
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
        name: '',
        report: '',
        occupational: '',
        service: '',
        remark: '',
        lastaccount: '',
        lasttime: ''
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
      this.$confirm('你确定退出要删除记录吗?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let tbIndex = this.indexMethod(index) - 1
        this.tableData.splice(tbIndex, 1)
        this.$notify(notifyConfig('删除', 'success'))
      }).catch(() => {})
    }
	}
}
