import {getLogType} from '@/api/constant'
import {querySystemlog} from '@/api/systemtools'

export default {
  name: 'systemlog',
  data () {
    return {
    	queryData: {  //  查询接口参数
    		page: 1,
        limit: 10,
    		type: '0',
    		testNum: '',
    		operateTime: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()],
    		operateAccount: '',
    		operateUser: '',
    		operateContent: ''
    	},
    	typeOption: [],
      logTableData: [],
    	pickerOption: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created () {
  	this.getList()
  },
  computed: {
  	total () { // 记录总数
      return this.logTableData.length
    },
    tablePageData () { // 表格分页
      return this.logTableData.slice(this.queryData.limit * (this.queryData.page - 1), this.queryData.page * this.queryData.limit)
    }
  },
  methods: {
  	/* 格式化 */
  	formatterType (item) { // 操作类型
      let valArr = []
      valArr = this.typeOption.filter(val => {
        return val.code === item.type
      })
      return valArr.length ? valArr[0].name : ''
    },
  	/* 筛选 */
  	indexMethod (index) { // 表格序号
      return this.queryData.limit * (this.queryData.page - 1) + 1 + index
    },
  	/* 交互方法 */
  	clickQuery () {
  		console.log('日志查询')
  	},
    getList () { // 查询接口
      // 常量查询 日志类型
      getLogType().then(response => {
        this.typeOption = response.data
        this.typeOption.unshift({code: '0', name: '不限'})
      })
      // 查询系统操作日志
      querySystemlog().then(response => {
        this.logTableData = response.data
      })
    },
    handleSizeChange (val) { // 每页条数改变
      this.queryData.limit = val
    },
    handleCurrentChange (val) { // 当前页数改变
      this.queryData.page = val
    }
  }
}
