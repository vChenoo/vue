import {notifyConfig, pickerRangeTimeOptions} from '@/utils/'
import {getWhether} from '@/api/constant'
import {queryOrganization, queryOrgexamination, queryOrgGroup} from '@/api/management'

export default {
  name: 'orghistory',
	data () {
		return {
			queryData: {
				page: 1,
				limit: 10,
				organization: '0',
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
      visibleList: 1,  // 列表是否可见
      orgOption: [],				// 下拉 体检单位
      whetherOption: [],    // 下拉 是否
      orgGroups: [],			  // 下拉 单位分组
      orgOptSel: [],        // 查询下拉 体检单位
      chargeTemp: null,     // 单位体检 详情
      chargeInfo: {
        number: 225,
        total: 85690,
        istotal: '否'
      },
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
    /* 交互方法 收费 */
    clickDetail (row, index) { // 编辑交互
      this.chargeTemp = Object.assign({}, row)
      this.chargeTemp.organizationName = this.orgFilter(this.chargeTemp.organization)
      this.visibleList = 2
    },
    clickCancelOver(row) {
      this.$confirm('你确定要回撤此记录的归档吗?', '确认转档回撤', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify(notifyConfig('设置转档回撤', 'success'))
      }).catch(() => {})
    }
	}
}
