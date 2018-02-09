import {notifyConfig} from '@/utils/'
import {getOrgNature} from '@/api/constant'
import {queryOrganization} from '@/api/management'

export default {
  name: 'organization',
	data () {
		return {
			queryData: {
				page: 1,
				limit: 10,
				name: '',
				nature: '0'
			},
			tableData: [],  //  表格数据
			rules: {
				name: [
					{required: true, message: '请输入单位名称', trigger: 'blur'}
				],
				shorthand: [
					{required: true, message: '请输入单位简称', trigger: 'blur'}
				],
				nature: [
					{required: true, message: '请选择企业性质', trigger: 'change'}
				],
				contact: [
					{required: true, message: '请输入联系人', trigger: 'blur'}
				],
        phone: [
          {required: true, message: '请输入联系手机', trigger: 'blur'}
        ],
        numberofpeople: [
          {required: true, message: '请输入编制人数', trigger: 'blur'}
        ]
			},
			formTemp: null, // 表单渲染值
      indexTemp: null,  //  表单渲染值对应序号
      visibleList: true,  // 列表是否可见
      statusForm: 'create', //  'update' or 'create'
      natureOption: [],				// 下拉 企业性质
      natureOptSel: []				// 查询下拉 企业性质
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
    formatterNature (item) { // 企业性质
      let valArr = []
      valArr = this.natureOption.filter(val => {
        return val.code === item.nature
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
			console.log('体检套餐查询')
		},
		getList () {	// 	查询接口
			// 常量查询 企业性质
      getOrgNature().then(response => {
        this.natureOption = response.data
        this.natureOptSel = JSON.parse(JSON.stringify(this.natureOption))
        this.natureOptSel.unshift({code: '0', name: '不限'})
      })
      // 查询单位信息
      queryOrganization().then(response => {
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
        shorthand: '',
        nature: this.natureOption.length ? this.natureOption[0].code : '',
        contact: '',
        phone: '',
        numberofpeople: 100,
        bank: '',
        address: '',
        fax: '',
        postcode: '',
        pinyin: '',
        wubi: '',
        remark: ''
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
