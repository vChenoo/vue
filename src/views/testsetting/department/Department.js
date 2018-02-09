import {notifyConfig} from '@/utils/'
import {getDepartment, getDepartmentType} from '@/api/constant'

export default {
  name: 'department',
	data () {
		return {
			queryData: {
				page: 1,
				limit: 10,
				name: '',
				type: '0'
			},
			tableData: [],  //  表格数据
			rules: {
				name: [
					{required: true, message: '请输入体检科室名称', trigger: 'blur'}
				],
				type: [
					{required: true, message: '请选择体检科室类型', trigger: 'change'}
				],
				isenabled: [
					{required: true, message: '请选择是否允许一个项目多个诊断', trigger: 'change'}
				]
			},
			formTemp: null, // 表单渲染值
      indexTemp: null,  //  表单渲染值对应序号
      visibleList: true,  // 列表是否可见
      statusForm: 'create', //  'update' or 'create'
      dptypeOption: [],				// 科室类型下拉
      dptypeOptSel: []				// 查询下拉 科室类型
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
  	formatterType (item) { // 科室类型
      let valArr = []
      valArr = this.dptypeOption.filter(val => {
        return val.code === item.type
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterWhether (item) { // 是否
      return item.type === '1' ? '是' : '否'
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
			console.log('体检科室查询')
		},
		getList () {	// 	查询接口
			// 常量查询 科室类型
      getDepartmentType().then(response => {
        this.dptypeOption = response.data
        this.dptypeOptSel = JSON.parse(JSON.stringify(this.dptypeOption))
        this.dptypeOptSel.unshift({code: '0', name: '不限'})
      })
      // 查询体检项目
      getDepartment().then(response => {
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
        name: '',
        type: '',
        remark: '',
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
    }
	}
}
