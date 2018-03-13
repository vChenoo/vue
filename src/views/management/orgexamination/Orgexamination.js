import {notifyConfig, pickerRangeTimeOptions, formatDate} from '@/utils/'
import {getWhether} from '@/api/constant'
import {queryOrganization, queryOrgexamination, queryOrgGroup} from '@/api/management'

export default {
  name: 'orgexamination',
	data () {
		return {
			queryData: {
				page: 1,
				limit: 10,
				organization: '0',
				isOver: '0',
				exameTime: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()]
			},
			tableData: [],  //  表格数据
			rules: {
				organization: [
					{required: true, message: '请输入分组名称', trigger: 'blur'}
				],
				starttime: [
					{required: true, message: '请选择体检类别', trigger: 'change'}
				],
				endtime: [
					{required: true, message: '请选择是否启用', trigger: 'change'}
				],
				orggroup: [
					{required: true, message: '请选择分组类型', trigger: 'change'}
				]
			},
      pickerOption: pickerRangeTimeOptions,
			formTemp: null, // 表单渲染值
      indexTemp: null,  //  表单渲染值对应序号
      visibleList: 1,  // 列表是否可见
      statusForm: 'create', //  'update' or 'create'
      orgOption: [],				// 下拉 体检单位
      whetherOption: [],    // 下拉 是否
      orgGroups: [],			  // 下拉 单位分组
      orgOptSel: [],        // 查询下拉 体检单位
      chargeTemp: null,     // 收费 表单
      chargeInfo: {         // 收费 收费信息
        chargename: '',
        code: '',
        number: '225',  // 合计金额
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
      isInvoice: false,
      groupList: [
        {
          name: '男职工-已婚',
          cash: '350',
          counttype: '单位支付',
          number: '80',
          discount: '90',
          cashtotal: '25200'
        },
        {
          name: '男职工-未婚',
          cash: '300',
          counttype: '单位支付',
          number: '40',
          discount: '80',
          cashtotal: '9600'
        },
        {
          name: '女职工-已婚',
          cash: '350',
          counttype: '单位支付',
          number: '60',
          discount: '90',
          cashtotal: '18900'
        },
        {
          name: '女职工-未婚',
          cash: '300',
          counttype: '单位支付',
          number: '45',
          discount: '90',
          cashtotal: '12150'
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
	methods: {
		/* 格式化 */
    formatterOrg (item) { // 体检单位
      let valArr = []
      valArr = this.orgOption.filter(val => {
        return val.code === item.organization
      })
      return valArr.length ? valArr[0].name : ''
    },
    formatterWhether (item) { // 是否
      let valArr = []
      valArr = this.whetherOption.filter(val => {
        return val.code === item.isover
      })
      return valArr.length ? valArr[0].name : ''
    },
		/* 筛选 */
  	indexMethod (index) { // 表格序号
      return this.queryData.limit * (this.queryData.page - 1) + 1 + index
    },
    orgFilter(value) {
      let valArr = []
      valArr = this.orgOption.filter(val => {
        return val.code === value
      })
      return valArr.length ? valArr[0].name : ''
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
  	/* 交互方法 编辑单位体检 */
		clickQuery () {
			console.log('单位体检记录查询')
		},
		getList () {	// 	查询接口
			// 常量查询 体检单位
      queryOrganization().then(response => {
        this.orgOption = response.data
        this.orgOptSel = JSON.parse(JSON.stringify(this.orgOption))
        this.orgOptSel.unshift({code: '0', name: '不限'})
      })
      // 常量查询 是否
      getWhether().then(response => {
        this.whetherOption = response.data
        this.whetherOption.unshift({code: '0', name: '不限'})
      })
      // 常量查询 单位分组
      queryOrgGroup().then(response => {
        this.orgGroups = response.data
      })
      // 查询单位体检
      queryOrgexamination().then(response => {
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
        code: '',
        organization: '',
        starttime: new Date(),
        endtime: '',
        isover: '2',
        orggroup: []
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
    /* 交互方法 收费 */
    clickCharge (row, index) { // 编辑交互
      this.chargeTemp = Object.assign({}, row)
      this.chargeTemp.organizationName = this.orgFilter(this.chargeTemp.organization)
      this.visibleList = 3
      this.chargeInfo.chargename = this.chargeTemp.organizationName
      this.chargeInfo.code = this.chargeTemp.code
    },
    clickArrearage(row) {
      this.$confirm('你确定要设置此记录为欠费吗?', '确认欠费', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify(notifyConfig('设置欠费', 'success'))
      }).catch(() => {})
    },
    clickOver(row) {
      this.$confirm('你确定要设置此记录为完结吗?', '确认完结', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$set(row, 'isover', '1')
        this.$notify(notifyConfig('设置完结', 'success'))
      }).catch(() => {})
    },
    clickCancelOver(row) {
      this.$confirm('你确定要设置此记录为取消完结吗?', '取消完结', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$set(row, 'isover', '2')
        this.$notify(notifyConfig('取消完结', 'success'))
      }).catch(() => {})
    },
    limitNumber(event) {
      event.target.value = event.target.value.replace(/-/g, '')
    }
	}
}
