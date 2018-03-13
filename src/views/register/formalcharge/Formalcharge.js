import {notifyConfig, formatDate} from '@/utils/'
import {getSex, getMarriage, getDepartment} from '@/api/constant'
import {queryTesttype, queryClinical, queryInvoice, queryOtherCharges} from '@/api/database'
import {queryFormalRegister} from '@/api/register'
import {queryPackage, queryGroupproject} from '@/api/testsetting'
import {queryOrganization} from '@/api/management'

export default {
  name: 'formalcharge',
	data () {
		return {
			active: 2,
			steps: [
			{
				id: '1',
				title: '个人信息'
			}, {
				id: '2',
				title: '选择体检项目'
			}],
			visibleFirst: true,
			queryData: {
				page: 1,
				limit: 10,
				name: '',
				code: '',
				idcard: '',
        testtype: '1'
			},
			tableData: [],  //  表格数据
			formTemp: null, // 表单渲染值
      indexTemp: null,  //  表单渲染值对应序号
      visibleList: true,  // 列表是否可见
      testtypeOption: [],				// 体检类别下拉
      orgOption: [],				// 下拉 体检单位
      marriageOption: [],	// 婚姻状况下拉
      sexOption: [],			// 性别下拉
      testOptSel: [],			// 查询下拉 体检类别
      packageList: [],		// 套餐列表
      pkgSelection: [],
      groupList: [],      // 组合项目
      invoiceList: [],  // 发票项目
      otherchargeList: [],  // 相关收费项目
      dpOption: [],
      dpOptSel: [],
      chargeInfo: {
        chargename: '套餐9折',
        invoice: 'fp0001',
        code: '',
        name: '',
        cptotal: '247.66',  // 合计金额
        cpreceivable: '222.89', // 合计应收
        balance: '+0.11',  // 凑整差额
        total: '223'     // 本次应收
      },
      settlement: {
        code: '0001',
        time: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        total: '223',
        actualtotal: '200',
        balance: '23'
      },
      cash: '200',
      cashChange: '0.00',
      invoiceName: '张三体检',
      isInvoice: false
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
    invoiceCharge() {
      let total = this.cash - this.cashChange
      return total > 0 ? total : 0
    }
  },
  filters: {
    yesorno(value) {
      return value ? '是' : '否'
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
    formatterInvoice(item) {
      let valArr = []
      valArr = this.invoiceList.filter(val => {
        return val.code === item.collect
      })
      return valArr.length ? valArr[0].name : ''
    },
		/* 筛选 */
  	indexMethod (index) { // 表格序号
      return this.queryData.limit * (this.queryData.page - 1) + 1 + index
    },
    indexItemMethod (index) { // 表格序号
      return this.queryData.limit * (this.queryItemData.page - 1) + 1 + index
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
      })
      // 常量查询 婚姻状况
      getMarriage().then(response => {
        this.marriageOption = response.data
      })
      // 常量查询 性别
      getSex().then(response => {
        this.sexOption = response.data
      })
      // 常量查询 体检套餐
      queryPackage().then(response => {
        this.packageList = []
      	this.packageList.push(response.data[0])
      })
      // 常量查询 科室
      getDepartment().then(response => {
        this.dpOption = response.data
        this.dpOptSel = JSON.parse(JSON.stringify(this.dpOption))
        this.dpOptSel.unshift({code: '0', name: '不限'})
      })
      // 常量查询 临床类型
      queryClinical().then(response => {
        this.clinicalOption = response.data
      })
      // 查询体检预登记
      queryFormalRegister().then(response => {
        this.tableData = response.data
      })
      // 查询组合项目
      queryGroupproject().then(response => {
        this.groupList = response.data
      })
      // 查询发票项目
      queryInvoice().then(response => {
        this.invoiceList = response.data
      })
      // 查询相关收费项目
      queryOtherCharges().then(response => {
        this.otherchargeList = response.data
        this.otherchargeList.map(v => {
          this.$set(v, 'number', 1)
          this.$set(v, 'ischarge', true)
          this.$set(v, 'edit', false)
          /* v.number = 1
          v.ischarge = true
          v.edit = false */
          return v
        })
      })
		},
		handleSizeChange (val) { // 每页条数改变
      this.queryData.limit = val
    },
    handleCurrentChange (val) { // 当前页数改变
      this.queryData.page = val
    },
    handleSizeItem (val) { // 每页条数改变
      this.queryItemData.limit = val
    },
    handleCurrentItem (val) { // 当前页数改变
      this.queryItemData.page = val
    },
    createData () {
      this.$refs['formEdit'].validate((valid) => {
        if (valid) {
          console.log(this.formTemp)
          this.tableData.unshift(this.formTemp)
          this.$notify(notifyConfig('新增', 'success'))
          this.next(true)
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

      this.chargeInfo.code = this.formTemp.code
      this.chargeInfo.name = this.formTemp.name
    },
    updateData () {
      this.$refs['formEdit'].validate((valid) => {
        if (valid) {
          console.log(this.formTemp)
          let tbIndex = this.indexMethod(this.indexTemp) - 1
          this.tableData.splice(tbIndex, 1, this.formTemp)
          this.$notify(notifyConfig('更新', 'success'))
          this.next(true)
        } else {
          console.log('校验不通过')
          return false
        }
      })
    },
    triggerEdit(row, column, cell, event) {
      this.$set(row, 'edit', true)
    },
    cancelEdit(row, column, cell, event) {
      this.$set(row, 'edit', false)
    },
    limitNumber(event) {
      event.target.value = event.target.value.replace(/-/g, '')
    }
	}
}
