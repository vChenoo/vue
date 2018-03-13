import {notifyConfig, deepClone} from '@/utils/'
import {getDepartment, getWhether, getSex} from '@/api/constant'
import {queryClinical} from '@/api/database'
import {queryAccount} from '@/api/systemtools'
import {queryTestproject, queryWorkstation} from '@/api/testsetting'

export default {
	name: 'workstation',
	data () {
    let validateExist = (rule, value, callback) => {
      let _account = this.formAccountTemp.account
      let _arr = this.accountData.filter(val => {
        return val.account === _account
      })
      if (_arr.length > 0) {  // 列表已存在
        callback(new Error('不能加入已存在账户'))
      } else {
        callback()
      }
    }
		return {
			queryData: {
				page: 1,
				limit: 10,
				name: '',
				department: '0',
				account: '',
				groupproject: '',
        clinical: '0',
				isenabled: '0'
			},
			tableData: [],  //  表格数据
			rules: {
				name: [
					{required: true, message: '请输入工作台名称', trigger: 'blur'}
				],
				department: [
					{required: true, message: '请选择体检科室', trigger: 'change'}
				],
				clinical: [
					{required: true, message: '请选择临床类型', trigger: 'change'}
				],
				tip: [
					{required: true, message: '请输入提示信息', trigger: 'blur'}
				],
				address: [
					{required: true, message: '请输入工作台位置', trigger: 'blur'}
				],
				isenabled: [
					{required: true, message: '请选择是否启用', trigger: 'change'}
				]
			},
			formTemp: null, // 表单渲染值
      indexTemp: null,  //  表单渲染值对应序号
      visibleList: 1,  // 列表是否可见
      statusForm: 'create', //  'update' or 'create'
      dpOption: [],				// 科室下拉
      clinicalOption: [],	// 临床类型下拉
      resultOption: [],		// 结果类型下拉
      whetherOption: [],	// 是否启用下拉
      sexOption: [],			// 性别下拉
      dpOptSel: [],				// 查询下拉 科室
      clinicalOptSel: [],
      whetherOptSel: [],
      visibleClinical: false,
      /* 账户 */
      accountData: [],
      accountList: [],
      accountPopOver: false,
      indexAccountTemp: null,   // index编辑值
      formAccountTemp: {        // 数据编辑值
        account: '',
        name: ''
      },
      accountRules: {
        account: [
          {required: true, message: '请选择账户', trigger: 'change'},
          {validator: validateExist, trigger: 'blur'}
        ]
      },
      itemPopOver: false,
      popTitle: [               // pop title
        '未选体检项目', '已选体检项目'
      ],
      itemProjectData: [],      // 包含项目列表
      itemAlias: {          // 项目别名
        key: 'code',
        label: 'name'
      },
      itemChoose: [],       // 项目选择
      itemList: []          // 项目列表
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
      // 查询体检工作台
      queryWorkstation().then(response => {
        this.tableData = response.data
      })
      // 查询体检项目
      queryTestproject().then(response => {
        this.itemProjectData = []
        this.itemProjectData.push(response.data[0])
        this.itemChoose = []
        this.itemProjectData.forEach(item => {
          this.itemChoose.push(item.code)
        })
        this.itemList = response.data
      })
      // 查询常见结果
      queryAccount().then(response => {
        this.accountData = []
        this.accountData.push(response.data[0])
        this.accountList = response.data
      })
		},
    sexUp(x, y) {
      return x.sex - y.sex
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
        department: this.dpOption.length ? this.dpOption[0].code : '',
        clinical: '',
        tip: '',
        address: '',
        isenabled: '1',
        account: '',
        groupproject: ''
      }
    },
    clickCreate () { // 新增交互
      this.statusForm = 'create'
      this.resetFormTemp()
      this.visibleList = 2
    },
    createData () {
      this.$refs['formEdit'].validate((valid) => {
        if (valid) {
          this.tableData.unshift(this.formTemp)
          this.visibleList = 1
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
      this.visibleList = 2
    },
    updateData () {
      this.$refs['formEdit'].validate((valid) => {
        if (valid) {
          let tbIndex = this.indexMethod(this.indexTemp) - 1
          this.tableData.splice(tbIndex, 1, this.formTemp)
          this.visibleList = 1
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
    },
    resetForm(formName) {   // 重置表单
      this.$refs[formName].resetFields()
    },
    /* 账户 */
    handlePopCreate() { // 添加
      this.accountPopOver = true
      this.indexAccountTemp = this.accountData.length
      this.formAccountTemp = {
        name: '',
        account: '',
        edit: false,
        delete: false
      }
      this.resetForm('accountCreateForm')
    },
    handlePopUpdate(row, index) { // 编辑交互
      row.edit = true
      this.indexAccountTemp = index
      this.formAccountTemp = deepClone(row)
    },
    showAccount() {   // 提交
      this.formAccountTemp.edit = false
      this.$set(this.accountData, this.indexAccountTemp, this.formAccountTemp)
      this.accountPopOver = false
    },
    deleteAccount (index) {   // 删除
      this.accountData.splice(index, 1)
    },
    getAccountSelected(value) { // 账户选择
      let _arr = this.accountList.filter(val => {
        return val.account === value
      })
      if (_arr.length > 0) {
        this.formAccountTemp.name = _arr[0].name
      }
    },
    showItem() {  // 选择组合项目
      this.itemProjectData = []
      this.itemChoose.forEach(item => {
        let arr = this.itemList.filter(val => {
          return val.code === item
        })
        if (arr.length) {
          this.itemProjectData.push(arr[0])
        }
      })
      this.itemPopOver = false
    }
	}
}
