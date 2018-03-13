import {notifyConfig} from '@/utils/'
import {getSex, getMarriage} from '@/api/constant'
import {queryTesttype} from '@/api/database'
import {queryPrepersonal} from '@/api/register'
import addressOption from '@/api/area'

export default {
  name: 'prepersonal',
	data () {
		return {
			queryData: {
				page: 1,
				limit: 10,
				name: '',
				code: '',
				idcard: '',
        testtype: '1'
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
				]
			},
			formTemp: null, // 表单渲染值
      indexTemp: null,  //  表单渲染值对应序号
      visibleList: true,  // 列表是否可见
      statusForm: 'create', //  'update' or 'create'
      testtypeOption: [],				// 体检类别下拉
      marriageOption: [],	// 婚姻状况下拉
      addressOption: addressOption,  // 地址
      addressVm: [],
      addressProps: {
        value: 'name',
        label: 'name',
        children: 'child'
      },
      sexOption: [],			// 性别下拉
      testOptSel: []				// 查询下拉 体检类别
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
      // 常量查询 婚姻状况
      getMarriage().then(response => {
        this.marriageOption = response.data
      })
      // 常量查询 性别
      getSex().then(response => {
        this.sexOption = response.data
        this.sexOption.shift()
      })
      // 查询体检组合项目
      queryPrepersonal().then(response => {
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
        date: '',
        times: 1,
        testtype: '1',
        idcard: '',
        sex: '2',
        birthday: '',
        age: '',
        province: '',
        city: '',
        county: '',
        marriage: '1',
        nation: '',
        detailaddr: '',
        phone: '',
        email: '',
        profession: ''
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
      let address = []
      address.push(this.formTemp.county)
      address.push(this.formTemp.city)
      address.push(this.formTemp.province)
      this.addressVm = address
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
    addressChanged (item) {
      this.formTemp.county = item[0]
      this.formTemp.city = item[1]
      this.formTemp.province = item[2]
    	this.formTemp.detailaddr = item.join('')
    }
	}
}
