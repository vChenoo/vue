import {notifyConfig} from '@/utils/'
import {queryClinical, queryColor} from '@/api/database'

export default {
	name: 'clinical',
	data () {
		return {
			queryData: {
				page: 1,
        limit: 10,
				name: '',
				code: ''
			},
			colorOption: [],
			rules: {
				name: [
					{required: true, message: '请输入临床类型名称', trigger: 'blur'}
				],
				code: [
					{required: true, message: '请输入临床类型编号', trigger: 'blur'}
				],
				color: [
					{required: true, message: '请选择临床类型颜色', trigger: 'change'}
				]
			},
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
      return this.tableData ? this.tableData.slice(this.queryData.limit * (this.queryData.page - 1), this.queryData.page * this.queryData.limit) : this.tableData
    }
  },
	methods: {
		/* 格式化 */
  	formatterEnabled (item) { // 操作类型
      let valArr = []
      valArr = this.colorOption.filter(val => {
        return val.code === item.color
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
        this.$store.dispatch('set_bread_name', '编辑临床类型')
      } else {
        this.$store.dispatch('set_bread_name', '')
      }
    },
  	/* 交互方法 */
		clickQuery () {
			console.log('业务类型查询')
		},
		getList () { // 查询接口
      // 查询颜色编码常量
      queryColor().then(response => {
        this.colorOption = response.data
      })
      // 查询临床类型
      queryClinical().then(response => {
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
        code: '',
        color: null,
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
