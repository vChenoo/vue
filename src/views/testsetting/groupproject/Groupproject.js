import {notifyConfig} from '@/utils/'
import {getDepartment, getMealtime, getAccessType, getCheckType, getInterfaceType, getWhether, getSex} from '@/api/constant'
import {queryClinical, querySample, queryCollect, queryConsumable} from '@/api/database'
import {queryTestproject, queryGroupproject} from '@/api/testsetting'

export default {
  name: 'groupproject',
	data () {
		return {
			queryData: {
				page: 1,
				limit: 10,
				name: '',
				department: '0',
				clinical: '0'
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
				collect: [
					{required: true, message: '请选择汇总项目', trigger: 'change'}
				],
				sex: [
					{required: true, message: '请选择适用性别', trigger: 'change'}
				],
				isgynaecology: [
					{required: true, message: '请选择是否妇科', trigger: 'change'}
				],
				accesstype: [
					{required: true, message: '请选择结果获取方式', trigger: 'change'}
				],
        checktype: [
          {required: true, message: '请选择检查类型', trigger: 'change'}
        ],
        checktime: [
          {required: true, message: '请输入平均检查时间', trigger: 'blur'}
        ],
        issample: [
          {required: true, message: '请选择是否需要标本', trigger: 'change'}
        ],
        sample: [
          {required: true, message: '请选择标本类型', trigger: 'change'}
        ],
        mealtime: [
          {required: true, message: '请选择用餐时间点', trigger: 'change'}
        ],
        isblood: [
          {required: true, message: '请选择是否需抽血', trigger: 'change'}
        ],
        originalprice: [
          {required: true, message: '请输入标准价格', trigger: 'blur'}
        ],
        discount: [
          {required: true, message: '请输入折扣', trigger: 'blur'}
        ],
        lowestdiscount: [
          {required: true, message: '请输入最低折扣', trigger: 'blur'}
        ],
        price: [
          {required: true, message: '请输入实际价格', trigger: 'blur'}
        ],
        isapplication: [
          {required: true, message: '请选择是否需申请单', trigger: 'change'}
        ],
        interfacetype: [
          {required: true, message: '请选择接口类型', trigger: 'change'}
        ],
				isenabled: [
					{required: true, message: '请选择是否启用', trigger: 'change'}
				],
        project: [
          {required: true, message: '请选择组合的体检项目', trigger: 'change'}
        ]
			},
			formTemp: null, // 表单渲染值
      indexTemp: null,  //  表单渲染值对应序号
      visibleList: true,  // 列表是否可见
      statusForm: 'create', //  'update' or 'create'
      dpOption: [],				// 科室下拉
      clinicalOption: [],	// 临床类型下拉
      collectOption: [],		// 汇总项目下拉
      accesstypeOption: [], // 结果获取方式下拉
      checktypeOption: [],  // 检查类型下拉
      sampleOption: [],     // 标本类型下拉
      mealtimeOption: [],   // 用餐时间点下拉
      interfaceOption: [],  // 接口类型下拉
      whetherOption: [],	// 是否启用下拉
      sexOption: [],			// 性别下拉
      dpOptSel: [],				// 查询下拉 科室
      clinicalOptSel: [],
      projectOption: [],     // 体检项目列表
      consumableOption: [],  // 耗材列表
      consumableSelected: [],
      visibleClinical: false,
      visibleClinicalSel: false,
      visibleSample: false,
      visibleConsumable: false
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
    tableConsumableData () { // 耗材选择
      let tableArr = []    // 选择表格绑定值
      this.consumableSelected.forEach(item => {
        let compareArr = this.consumableOption.filter(val => {
          return val.code === item
        })
        tableArr.push.apply(tableArr, compareArr) // 表格数据插入
      })
      tableArr = tableArr.map(v => {    // 表格数据增加属性值1
        v.count || this.$set(v, 'count', 1)
        return v
      })
      return tableArr
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
			console.log('体检组合项目查询')
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
      // 常量查询 汇总项目
      queryCollect().then(response => {
        this.collectOption = response.data
      })
      // 常量查询 结果获取方式
      getAccessType().then(response => {
        this.accesstypeOption = response.data
      })
      // 常量查询 检查类型
      getCheckType().then(response => {
        this.checktypeOption = response.data
      })
      // 常量查询 标本类型
      querySample().then(response => {
        this.sampleOption = response.data
      })
      // 常量查询 用餐时间点
      getMealtime().then(response => {
        this.mealtimeOption = response.data
      })
      // 常量查询 接口类型
      getInterfaceType().then(response => {
        this.interfaceOption = response.data
      })
      // 常量查询 是否
      getWhether().then(response => {
        this.whetherOption = response.data
      })
      // 常量查询 性别
      getSex().then(response => {
        this.sexOption = response.data
      })
      // 查询体检项目列表
      queryTestproject().then(response => {
        this.projectOption = response.data
      })
      // 查询耗材列表
      queryConsumable().then(response => {
        this.consumableOption = response.data
      })
      // 查询体检组合项目
      queryGroupproject().then(response => {
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
        department: this.dpOption.length ? this.dpOption[0].code : '',
        clinical: this.clinicalOption.length ? this.clinicalOption[0].code : '',
        collect: this.collectOption.length ? this.collectOption[0].code : '',
        sex: '1',
        isgynaecology: '1',
        accesstype: this.accesstypeOption.length ? this.accesstypeOption[0].code : '',
        checktype: this.checktypeOption.length ? this.checktypeOption[0].code : '',
        checktime: '5',
        issample: '1',
        sample: this.sampleOption.length ? this.sampleOption[0].code : '',
        mealtime: this.mealtimeOption.length ? this.mealtimeOption[0].code : '',
        isblood: '1',
        originalprice: 10,
        discount: 90,
        lowestdiscount: '0',
        price: '',
        isapplication: '1',
        interfacetype: this.interfaceOption.length ? this.interfaceOption[0].code : '',
        appinterface: '',
        reportinterface: '',
        tip: '',
        result: '',
        clinicalsign: '',
        pinyin: '',
        wubi: '',
        isenabled: '1',
        project: [],
        consumable: []
      }
    },
    resetProject () {
      this.formTemp.project = []
    },
    clickCreate () { // 新增交互
      this.statusForm = 'create'
      this.resetFormTemp()
      this.visibleList = false
      this.visibleConsumable = false
    },
    createData () {
      this.$refs['formEdit'].validate((valid) => {
        if (valid) {
          console.log(this.formTemp)
          this.updateConsumable()
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
      this.initConsumable()
      this.visibleList = false
      this.visibleConsumable = false
    },
    initConsumable () {
      this.consumableSelected = []   // 选择绑定值
      this.formTemp.consumable.forEach(item => {
        this.consumableSelected.push(item.code)
      })
    },
    updateConsumable () {
      this.formTemp.consumable = []
      this.formTemp.consumable = this.tableConsumableData.map(v => {
        return {'code': v.code, 'count': v.count}
      })
    },
    updateData () {
      this.$refs['formEdit'].validate((valid) => {
        if (valid) {
          console.log(this.formTemp)
          let tbIndex = this.indexMethod(this.indexTemp) - 1
          this.updateConsumable()
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
      if (_type === '3') {
        this.visibleClinical = true
      } else {
        this.visibleClinical = false
        this.formTemp.clinical = ''
      }
      this.resetProject()
    },
    dpSelChanged (item) {
      let valArr = []
      let _type = ''
      valArr = this.dpOptSel.filter(val => {
        return val.code === item
      })
      _type = valArr.length ? valArr[0].type : ''
      if (_type === '3' || !_type) {
        this.visibleClinicalSel = true
      } else {
        this.visibleClinicalSel = false
        this.queryData.clinical = ''
      }
    },
    sampleChanged (item) {
      if (item === '1') {
        this.visibleSample = true
      } else {
        this.visibleSample = false
        this.formTemp.sample = ''
      }
    },
    selectConsumable () {
      this.visibleConsumable = !this.visibleConsumable
    }
	}
}
