import {notifyConfig, deepClone} from '@/utils/'
import {getDepartment, getResultType, getWhether, getSex} from '@/api/constant'
import {queryClinical} from '@/api/database'
import {queryTestproject, queryDiagnose, queryResult} from '@/api/testsetting'

export default {
	name: 'testproject',
	data () {
    let validateLower = (rule, value, callback) => {
      if (!this.formNumerTemp.upperunit || !this.formNumerTemp.lowerunit) {  // 无上限或上限未选或下限单位未选
        callback()
      } else {
        let _lowerMonth = this.formNumerTemp.lowerunit === '月' ? this.formNumerTemp.lower : this.formNumerTemp.lower * 12
        let _upperMonth = this.formNumerTemp.upperunit === '月' ? this.formNumerTemp.upper : this.formNumerTemp.upper * 12
        if (_lowerMonth > _upperMonth) {
          callback(new Error('下限不能大于上限，请重新输入'))
        } else {
          callback()
        }
      }
    }
    let validateMin = (rule, value, callback) => {
      if (!this.formNumerTemp.max || !this.formNumerTemp.min) {  // 最大值未填写
        callback()
      } else {
        if (this.formNumerTemp.min > this.formNumerTemp.max) {
          callback(new Error('最小值不能大于最大值，请重新输入'))
        } else {
          callback()
        }
      }
    }
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
      visibleList: 1,  // 列表是否可见
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
      visibleClinical: false,
      projectId: '',
      resultType: '',
      diagnoseOption: [],  // 诊断列表
      /* 字符型常见结果 */
      characterList: [],
      chtPopOver: false,
      indexChtTemp: null,   // index编辑值
      formChtTemp: {},      // 数据编辑值
      /* 数值型常见结果 */
      numerList: [],
      numerPopOver: false,
      indexNumerTemp: null,   // index编辑值
      formNumerTemp: {},     // 数据编辑值
      numerRules: {
        lower: [
          {validator: validateLower, trigger: 'blur'},
          {type: 'integer', required: true, message: '请输入正数字值', trigger: 'blur'}
        ],
        upper: [
          {validator: validateLower, trigger: 'blur'},
          {type: 'integer', required: true, message: '请输入正数字值', trigger: 'blur'}
        ],
        min: [
          {validator: validateMin, trigger: 'blur'},
          {type: 'integer', required: true, message: '请输入正数字值', trigger: 'blur'}
        ],
        max: [
          {validator: validateMin, trigger: 'blur'},
          {type: 'integer', required: true, message: '请输入正数字值', trigger: 'blur'}
        ],
        desc: [
          {required: true, message: '请输入常见结果描述', trigger: 'blur'}
        ],
        diagnose: [
          {required: true, message: '请选择诊断', trigger: 'change'}
        ],
        isnormal: [
          {required: true, message: '请选择是否正常范围', trigger: 'change'}
        ],
        ispositive: [
          {required: true, message: '请选择是否阳性', trigger: 'change'}
        ],
        isresultin: [
          {required: true, message: '请选择结果是否进入小结', trigger: 'change'}
        ],
        isdiagnosein: [
          {required: true, message: '请选择诊断是否进入小结', trigger: 'change'}
        ],
        sex: [
          {required: true, message: '请选择适用性别', trigger: 'change'}
        ]
      },
      chtRules: {
        desc: [
          {required: true, message: '请输入常见结果描述', trigger: 'blur'}
        ],
        diagnose: [
          {required: true, message: '请选择诊断', trigger: 'change'}
        ],
        isnormal: [
          {required: true, message: '请选择是否阳性', trigger: 'change'}
        ],
        isresultin: [
          {required: true, message: '请选择结果是否进入小结', trigger: 'change'}
        ],
        isdiagnosein: [
          {required: true, message: '请选择诊断是否进入小结', trigger: 'change'}
        ],
        sex: [
          {required: true, message: '请选择适用性别', trigger: 'change'}
        ]
      }
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
    formatterPositive (item) { // 是否阳性
      let valArr = []
      valArr = this.whetherOption.filter(val => {
        return val.code === item.ispositive
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterNormal (item) { // 是否正常范围
      let valArr = []
      valArr = this.whetherOption.filter(val => {
        return val.code === item.isnormal
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterDiagnose (item) { // 诊断
      let valArr = []
      valArr = this.diagnoseOption.filter(val => {
        return val.code === item.diagnose
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterResultType (item) { // 结果类型
      let valArr = []
      valArr = this.resultOption.filter(val => {
        return val.code === item.resulttype
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
      // 查询诊断
      queryDiagnose().then(response => {
        this.diagnoseOption = response.data
      })
      // 查询常见结果
      queryResult().then(response => {
        let _res = response.data.sort(this.sexUp)
        this.characterList = deepClone(_res)
        this.numerList = deepClone(_res)
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
      this.visibleList = 2
    },
    createData () {
      this.$refs['formEdit'].validate((valid) => {
        if (valid) {
          console.log(this.formTemp)
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
          console.log(this.formTemp)
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
    /* 交互方法 字符型常见结果 */
    clickResult (row, index) {
      this.projectId = row.code
      this.resultType = row.resulttype
      this.visibleList = 3
    },
    characterSpan({row, column, rowIndex, columnIndex}) {
      return this.handleSpan(row, column, rowIndex, columnIndex, this.characterList)
    },
    handleSpan(row, column, rowIndex, columnIndex, list) {
      let _start = -1
      let _end = -1
      if (columnIndex !== 1) {  // 只有性别行合并
        return [1, 1]
      }
      list.forEach((item, index) => {
        if (item.sex === row.sex) {
          if (_start === -1) {  // 起始row
            _start = index
          } else {              // 终止row
            _end = index
          }
        }
      })
      if (_end === -1) { // 合并行只有一行
        return [1, 1]
      }
      if (rowIndex === _start) {
        return [_end - _start + 1, 1]
      }
      return [0, 0]
    },
    handleCharacterCreate() { // 添加
      this.chtPopOver = true
      this.indexChtTemp = this.characterList.length
      this.formChtTemp = {
        desc: '',
        diagnose: '',
        isnormal: '',
        sex: '1',
        isresultin: '2',
        isdiagnosein: '1',
        edit: false,
        delete: false
      }
      this.resetForm('chtCreateForm')
    },
    handleCharacterUpdate(row, index) { // 编辑交互
      row.edit = true
      this.indexChtTemp = index
      this.formChtTemp = deepClone(row)
    },
    showCharacter() {   // 提交
      this.formChtTemp.edit = false
      this.$set(this.characterList, this.indexChtTemp, this.formChtTemp)
      this.characterList.sort(this.sexUp)   // 排序
      this.chtPopOver = false
    },
    deleteCharacter (index) {   // 删除
      this.characterList.splice(index, 1)
    },
    resultCharacterBack() {   // 返回
      this.visibleList = 1
      this.resetPopOver(this.characterList) // 关闭列表pop
    },
    /* 交互方法 数值常见结果 */
    numerSpan({row, column, rowIndex, columnIndex}) {
      return this.handleSpan(row, column, rowIndex, columnIndex, this.numerList)
    },
    handleNumerCreate(row, index) { // 添加
      this.numerPopOver = true
      this.indexNumerTemp = this.numerList.length
      this.formNumerTemp = {
        desc: '',
        code: '',
        diagnose: '',
        lower: '0',
        lowerunit: '',
        upper: '0',
        upperunit: '',
        min: '0',
        max: '0',
        isnormal: '',
        ispositive: '',
        sex: '1',
        isresultin: '2',
        isdiagnosein: '1',
        edit: false,
        delete: false
      }
      this.resetForm('numerCreateForm')
    },
    handleNumerUpdate(row, index) { // 编辑交互
      row.edit = true
      this.indexNumerTemp = index
      this.formNumerTemp = deepClone(row)
    },
    showNumer() {   // 提交
      this.formNumerTemp.edit = false
      this.$set(this.numerList, this.indexNumerTemp, this.formNumerTemp)
      this.numerList.sort(this.sexUp)   // 排序
      this.numerPopOver = false
    },
    deleteNumer (index) {   // 删除
      this.numerList.splice(index, 1)
    },
    resultNumerBack() {   // 返回
      this.visibleList = 1
      this.resetPopOver(this.numerList) // 关闭列表pop
    },
    resetPopOver(list) {
      list.forEach(item => {
        this.$set(item, 'edit', false)
        this.$set(item, 'delete', false)
      })
    },
    resetForm(formName) {   // 重置表单
      this.$refs[formName].resetFields()
    }
	}
}
