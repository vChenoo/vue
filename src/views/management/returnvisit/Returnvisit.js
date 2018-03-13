import {notifyConfig, pickerRangeTimeOptions, formatterTable} from '@/utils/'
import {getSex, getWhether} from '@/api/constant'
import {queryReturnVisit} from '@/api/management'

export default {
  name: 'returnvisit',
	data () {
		return {
			queryData: {
				page: 1,
				limit: 10,
				name: '',
				code: '',
        registerId: '',
				idcard: '',
        testtype: '0',
        totalExameTime: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()],
        isSend: '0'
			},
      pickerOption: pickerRangeTimeOptions,
			tableData: [],  //  表格数据
      whetherOption: [],    // 下拉 是否
      sexOption: []			  // 性别下拉
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
    formatterWhether (item) { // 是否
      let filterValue = formatterTable(this.whetherOption, item.isnotice)
      return filterValue ? filterValue.name : ''
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
  	/* 交互方法 */
		clickQuery () {
			console.log('个人体检预登记查询')
		},
		getList () {	// 	查询接口
      // 常量查询 是否
      getWhether().then(response => {
        this.whetherOption = response.data
        this.whetherOption.unshift({code: '0', name: '不限'})
      })
      // 常量查询 性别
      getSex().then(response => {
        this.sexOption = response.data
        this.sexOption.shift()
      })
      // 查询复诊通知
      queryReturnVisit().then(response => {
        this.tableData = response.data
      })
		},
		handleSizeChange (val) { // 每页条数改变
      this.queryData.limit = val
    },
    handleCurrentChange (val) { // 当前页数改变
      this.queryData.page = val
    },
    handleNotice (row, index) {
      this.$confirm('你确定要通知<strong style="padding: 0 5px;letter-spacing: 1px;color: #2dc3e8;">' + row.name + '</strong>复诊吗?', '确认复诊通知', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        this.$notify(notifyConfig('复诊通知', 'success'))
      }).catch(() => {})
    }
	}
}
