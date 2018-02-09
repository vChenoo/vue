import {notifyConfig} from '@/utils/'
import {getWhether, getOrgGroupType, getStatementType, getPayType} from '@/api/constant'
import {queryTesttype} from '@/api/database'
import {queryPackage, queryGroupproject} from '@/api/testsetting'
import {queryOrgGroup} from '@/api/management'

export default {
  name: 'orggroup',
	data () {
		return {
			queryData: {
				page: 1,
				limit: 10,
				name: '',
				shorthand: '',
				testtype: '0'
			},
			tableData: [],  //  表格数据
			rules: {
				name: [
					{required: true, message: '请输入分组名称', trigger: 'blur'}
				],
				testtype: [
					{required: true, message: '请选择体检类别', trigger: 'change'}
				],
				isenabled: [
					{required: true, message: '请选择是否启用', trigger: 'change'}
				],
				grouptype: [
					{required: true, message: '请选择分组类型', trigger: 'change'}
				],
        statement: [
          {required: true, message: '请选择结算人数', trigger: 'change'}
        ],
        originalprice: [
          {required: true, message: '请输入标准价格', trigger: 'blur'}
        ],
        discount: [
          {required: true, message: '请输入折扣', trigger: 'blur'}
        ],
        price: [
          {required: true, message: '请输入实际费用', trigger: 'blur'}
        ],
        addcount: [
          {required: true, message: '请选择加项折扣', trigger: 'change'}
        ],
        pay: [
          {required: true, message: '请选择分组支付方式', trigger: 'change'}
        ],
        addpay: [
          {required: true, message: '请选择加项支付方式', trigger: 'change'}
        ],
        groupproject: [
          {required: true, message: '项目分组类型必须选择至少一个体检组合项目', trigger: 'change'}
        ]
			},
			formTemp: null, // 表单渲染值
      indexTemp: null,  //  表单渲染值对应序号
      visibleList: true,  // 列表是否可见
      statusForm: 'create', //  'update' or 'create'
      typeOption: [],				// 下拉 体检类别
      whetherOption: [],    // 下拉 是否
      groupOption: [],			// 下拉 分组类型
      stateOption: [],      // 下拉 结算人数
      payOption: [],        // 下拉 支付方式
      groupOptSel: [],      // 查询下拉 分组类型
      typeOptSel: [],				// 查询下拉 体检类别
      groupProjects: [],    // 组合项目列表
      packageProjects: []   // 套餐列表
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
    originalPrice () {
      let originalprice = 0
      let valArr = []
      this.formTemp.groupproject.forEach(item => {
        valArr = this.groupProjects.filter(val => {
          return val.code === item
        })
        originalprice += valArr.length ? valArr[0].price : 0
      })
      return originalprice.toFixed(2)
    },
    Price () {
      return (this.originalPrice * this.formTemp.discount / 100).toFixed(2)
    }
  },
	methods: {
		/* 格式化 */
    formatterGroup (item) { // 分组类型
      let valArr = []
      valArr = this.groupOption.filter(val => {
        return val.code === item.grouptype
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterState (item) { // 结算人数
      let valArr = []
      valArr = this.stateOption.filter(val => {
        return val.code === item.statement
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterType (item) { // 体检类别
      let valArr = []
      valArr = this.typeOption.filter(val => {
        return val.code === item.testtype
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
			console.log('单位分组查询')
		},
		getList () {	// 	查询接口
			// 常量查询 体检类别
      queryTesttype().then(response => {
        this.typeOption = response.data
        this.typeOptSel = JSON.parse(JSON.stringify(this.typeOption))
        this.typeOptSel.unshift({code: '0', name: '不限'})
      })
      // 常量查询 是否
      getWhether().then(response => {
        this.whetherOption = response.data
      })
      // 常量查询 分组类型
      getOrgGroupType().then(response => {
        this.groupOption = response.data
        this.groupOptSel = JSON.parse(JSON.stringify(this.groupOption))
        this.groupOptSel.unshift({code: '0', name: '不限'})
      })
      // 常量查询 结算人数
      getStatementType().then(response => {
        this.stateOption = response.data
      })
      // 常量查询 支付方式
      getPayType().then(response => {
        this.payOption = response.data
      })
      // 查询体检组合项目
      queryGroupproject().then(response => {
        this.groupProjects = response.data
      })
      // 查询体检套餐列表
      queryPackage().then(response => {
        this.packageProjects = response.data
      })
      // 查询单位分组
      queryOrgGroup().then(response => {
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
        grouptype: this.groupOption.length ? this.groupOption[0].code : '',
        testtype: this.typeOption.length ? this.typeOption[0].code : '',
        isenabled: '1',
        statement: '1',
        remark: '',
        originalprice: '0',
        discount: '100',
        price: '0',
        addcount: '100',
        pay: '1',
        addpay: '1',
        packageproject: [],
        groupproject: []
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
    packageChanged (item) { //  取最后一位设置组合项目
      let _self = this
      if (!item.length) {
        return false
      }
      let _item = item[item.length - 1]
      _item.groupproject.forEach(pro => {
        let _index = _self.formTemp.groupproject.findIndex(val => pro.code === val.code)
        /* pro.pkgid = pro.pkgid ? _item.code : ''
        pro.pkgname = pro.pkgid ? _item.name : '' */
        if (_index < 0) {
          _self.formTemp.groupproject.push(pro)
        }
        /* else {
          _self.formTemp.groupproject[_index].pkgid = pro.pkgid ? _item.code : ''
          _self.formTemp.groupproject[_index].pkgname = pro.pkgid ? _item.pkgname : ''
        } */
      })
    }
	}
}
