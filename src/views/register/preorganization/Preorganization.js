import {notifyConfig} from '@/utils/'
import {getSex, getMarriage, getWhether} from '@/api/constant'
import {queryOrganization, queryOrgexamination, queryOrgGroup, queryPersonalInfo} from '@/api/management'

export default {
  name: 'preorganization',
	data () {
		return {
			queryData: {
				page: 1,
				limit: 10,
				organization: '0',
        'isprepare': '0'
			},
			tableData: [],  //  表格数据 体检
      queryPersonData: {
        page: 1,
        limit: 10,
        orggroup: '0',
        name: '',
        idcard: '',
        sex: '0',
        marry: '0'
      },
      tablePersonData: [],  // 表格数据 人员
			rules: {
				targetgroup: [
					{required: true, message: '请选择目标分组', trigger: 'change'}
				]
			},
      changeGroupTemp: {       // 表单渲染值 更换分组
        'targetgroup': ''
      },
      indexGroupTemp: null,     // 表单渲染值 对应序号
			formTemp: null,           // 表单渲染值 体检信息
      indexTemp: null,          // 表单渲染值  对应序号
      visibleList: true,  // 列表是否可见
      statusForm: 'create', //  'update' or 'create'
      orgGroupOptions: [],  // 下拉 单位分组
      sexOption: [],				// 查询下拉 性别
      marryOption: [],      // 查询下拉 婚姻状况
      orgGpSel: [],         // 查询下拉 单位分组
      orgSel: [],           // 查询下拉 体检单位
      wetherOptSel: [],     // 查询下拉 是否预登记
      selection: []         // 选中项
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
    },
    totalPerson () { // 记录总数
      return this.tablePersonData.length
    },
    tablePagePerson () { // 表格分页
      return this.tablePersonData.slice(this.queryPersonData.limit * (this.queryPersonData.page - 1), this.queryPersonData.page * this.queryPersonData.limit)
    }
  },
	methods: {
		/* 格式化 */
    formatterOrg (item) { // 体检单位
      let valArr = []
      valArr = this.orgSel.filter(val => {
        return val.code === item.organization
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterWehter (item) { // 是否
      let valArr = []
      valArr = this.wetherOptSel.filter(val => {
        return val.code === item.isprepare
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
    formatterGroup (item) { // 单位分组
      let valArr = []
      valArr = this.orgGroupOptions.filter(val => {
        return val.code === item.orggroup
      })
      return valArr.length ? valArr[0].name : ''
    },
		/* 筛选 */
  	indexMethod (index) { // 表格序号
      return this.queryData.limit * (this.queryData.page - 1) + 1 + index
    },
    indexPersonMethod (index) { // 表格序号
      return this.queryPersonData.limit * (this.queryPersonData.page - 1) + 1 + index
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
			console.log('单位体检预登记查询')
		},
		getList () {	// 	查询接口
			// 常量查询 体检单位
      queryOrganization().then(response => {
        this.orgSel = response.data
        this.orgSel.unshift({code: '0', name: '不限'})
      })
      // 常量查询 是否
      getWhether().then(response => {
        this.wetherOptSel = response.data
        this.wetherOptSel.unshift({code: '0', name: '不限'})
      })
      // 常量查询 性别
      getSex().then(response => {
        this.sexOption = response.data
        this.sexOption.unshift({code: '0', name: '不限'})
      })
      // 常量查询 婚姻状况
      getMarriage().then(response => {
        this.marryOption = response.data
        this.marryOption.unshift({code: '0', name: '不限'})
      })
      // 常量查询 单位分组
      queryOrgGroup().then(response => {
        this.orgGroupOptions = response.data
        this.orgGpSel = JSON.parse(JSON.stringify(this.orgGroupOptions))
        this.orgGpSel.unshift({code: '0', name: '不限'})
      })
      // 查询单位体检预登记
      queryOrgexamination().then(response => {
        this.tableData = response.data
      })
      // 查询单位体检下的人员
      queryPersonalInfo().then(response => {
        this.tablePersonData = response.data
      })
		},
		handleSizeChange (val) { // 每页条数改变
      this.queryData.limit = val
    },
    handleCurrentChange (val) { // 当前页数改变
      this.queryData.page = val
    },
    handleSizePerson (val) { // 每页条数改变
      this.queryPersonData.limit = val
    },
    handleCurrentPerson (val) { // 当前页数改变
      this.queryPersonData.page = val
    },
    resetFormTemp () {
      this.formTemp = {
        code: '',
        organization: '',
        starttime: new Date(),
        endtime: '',
        times: '1',
        isover: '2',
        orggroup: []
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
      /* this.statusForm = 'update'
      this.indexTemp = index */
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
    selectionChange (selection) {
      this.selection = selection
    },
    handleTagClose (tag) {
      this.selection.splice(this.selection.indexOf(tag), 1)
    },
    handleTagAllClose () {
      this.$refs.personTable.clearSelection()
    },
    handleChangeGroup () {
      console.log(this.selection)
    }
	}
}
