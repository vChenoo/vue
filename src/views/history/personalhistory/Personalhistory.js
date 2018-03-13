import {notifyConfig, deepClone} from '@/utils/'
import {getSex, getMarriage, getWhether, getDepartment} from '@/api/constant'
import {queryTesttype, queryClinical} from '@/api/database'
import {queryGroupproject, queryPackage} from '@/api/testsetting'
import {queryPersonalexamination, queryOrganization} from '@/api/management'

export default {
  name: 'personalhistory',
	data () {
		return {
			queryData: {
				page: 1,
				limit: 10,
				name: '',
				code: '',
				idcard: '',
        testtype: '1',
        isTotal: '0'
			},
			tableData: [],  //  表格数据
      visibleList: 1,  // 列表是否可见
      testtypeOption: [],				// 体检类别下拉
      whetherOption: [],    // 下拉 是否
      orgOption: [],        // 体检单位
      marriageOption: [],	// 婚姻状况下拉
      sexOption: [],			// 性别下拉
      testOptSel: [],				// 查询下拉 体检类别
      tableItem: [],
      dpOption: [],
      clinicalOption: [],
      /* 查看体检信息 */
      packageList: [],    // 套餐列表
      groupList: [],      // 组合项目
      projectList: [
        {
          name: '身高',
          code: '1',
          result: '170',
          unit: 'cm',
          isnormal: '1'
        },
        {
          name: '体重',
          code: '2',
          result: '50',
          unit: 'kg',
          isnormal: '2'
        }
      ]
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
  filters: {
    yesorno(value) {
      return value === '1' ? '是' : '否'
    }
  },
	methods: {
		/* 格式化 */
  	formatterType (item) { // 体检类别
      let valArr = []
      valArr = this.testtypeOption.filter(val => {
        return val.code === item.testtype
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterOrg (item) { // 体检单位
      let valArr = []
      valArr = this.orgOption.filter(val => {
        return val.code === item.org
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterWhether (item) { // 是否
      let valArr = []
      valArr = this.whetherOption.filter(val => {
        return val.code === item.istotal
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
    formatterPkg(item) {
      return item.isenabled === '1' ? '套餐A' : ''
    },
    formatterStatus(item) {
      return item.isenabled === '1' ? '是' : '否'
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
			console.log('个人体检预登记查询')
		},
		getList () {	// 	查询接口
      // 常量查询 体检类别
      queryTesttype().then(response => {
        this.testtypeOption = response.data
        this.testOptSel = JSON.parse(JSON.stringify(this.testtypeOption))
        this.testOptSel.unshift({code: '0', name: '不限'})
      })
      // 常量查询 体检单位
      queryOrganization().then(response => {
        this.orgOption = response.data
        /* this.orgOptSel = JSON.parse(JSON.stringify(this.orgOption))
        this.orgOptSel.unshift({code: '0', name: '不限'}) */
      })
      // 常量查询 是否
      getWhether().then(response => {
        this.whetherOption = response.data
        this.whetherOption.unshift({code: '0', name: '不限'})
      })
      // 常量查询 婚姻状况
      getMarriage().then(response => {
        this.marriageOption = response.data
      })
      // 常量查询 性别
      getSex().then(response => {
        this.sexOption = response.data
      })
      // 常量查询 科室
      getDepartment().then(response => {
        this.dpOption = response.data
      })
      // 常量查询 临床类型
      queryClinical().then(response => {
        this.clinicalOption = response.data
      })
      // 查询个人体检管理
      queryPersonalexamination().then(response => {
        this.tableData = response.data
      })
      // 查询体检套餐
      queryPackage().then(response => {
        this.packageList = []
        this.packageList.push(response.data[0])
      })
      // 查询组合项目
      queryGroupproject().then(response => {
        let _res = response.data
        this.tableItem = deepClone(_res)
        this.groupList = deepClone(_res)
      })
		},
		handleSizeChange (val) { // 每页条数改变
      this.queryData.limit = val
    },
    handleCurrentChange (val) { // 当前页数改变
      this.queryData.page = val
    },
    handleFiled (index) {
      this.$confirm('你确定要回撤此记录的归档吗?', '确认归档回撤', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let tbIndex = this.indexMethod(index) - 1
        this.tableData.splice(tbIndex, 1)
        this.$notify(notifyConfig('归档回撤', 'success'))
      }).catch(() => {})
    },
    tableRowClassName({row, rowIndex}) {
      if (row.isenabled !== '1') {
        return 'warning-row'
      }
      return ''
    },
    refusedExame (row, index) {
      this.$confirm('你确定要登记此记录为拒检吗?', '确认拒检', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$set(row, 'isenabled', '1')
        this.$notify(notifyConfig('拒检', 'success'))
      }).catch(() => {})
    },
    /* 查看体检信息项目详情 */
    handleInfo(row, index) {
      this.visibleList = 2
      this.formInfoTemp = deepClone(row)
    }
	}
}
