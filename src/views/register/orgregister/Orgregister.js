import {notifyConfig, deepClone} from '@/utils/'
import {getSex, getWhether} from '@/api/constant'
import {queryOrganization, queryOrgGroup} from '@/api/management'
import {queryOrgRegister} from '@/api/register'

export default {
  name: 'orgregister',
	data () {
		return {
			queryData: {
				page: 1,
				limit: 10,
				name: '',
				idcard: '',
        organization: '0',
        group: '0'
			},
			tableData: [],  //  表格数据
      orgOption: [],				// 体检单位下拉
      marriageOption: [],	// 婚姻状况下拉
      cardtypeOption: [], // 证件类型下拉
      orgGroupOption: [], // 体检分组
      sexOption: [],			// 性别下拉
      whetherOption: [],  // 性别下拉
      orgOptSel: [],			// 查询下拉 体检单位
      orgGroupOptSel: [], // 查询下拉 体检分组
      tags: []            // 已选中人员
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
    formatterOrgGroup (item) { // 体检分组
      let valArr = []
      valArr = this.orgGroupOption.filter(val => {
        return val.code === item.orggroup
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
    formatterWhether (item) { // 是否
      let valArr = []
      valArr = this.whetherOption.filter(val => {
        return val.code === item.isregister
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
			console.log('单位体检下的人员信息查询')
		},
		getList () {	// 	查询接口
      // 常量查询 体检单位
      queryOrganization().then(response => {
        this.orgOption = response.data
        this.orgOptSel = deepClone(this.orgOption)
        this.orgOptSel.unshift({code: '0', name: '不限'})
      })
      // 常量查询 体检分组
      queryOrgGroup().then(response => {
        this.orgGroupOption = response.data
        this.orgGroupOptSel = deepClone(this.orgOption)
        this.orgGroupOptSel.unshift({code: '0', name: '不限'})
      })
      // 常量查询 性别
      getSex().then(response => {
        this.sexOption = response.data
      })
      // 常量查询 是否
      getWhether().then(response => {
        this.whetherOption = response.data
        this.whetherOption.unshift({code: '0', name: '不限'})
      })
      // 查询单位体检下的人员信息
      queryOrgRegister().then(response => {
        this.tableData = response.data
      })
		},
		handleSizeChange (val) { // 每页条数改变
      this.queryData.limit = val
    },
    handleCurrentChange (val) { // 当前页数改变
      this.queryData.page = val
    },
    selected(selection, row) {
      let tagArr = this.tags.filter(val => {
        return val.code === row.code
      })
      let selArr = selection.filter(val => {
        return val.code === row.code
      })
      let isTag = tagArr.length > 0
      let isSel = selArr.length > 0

      if (isSel) {
        if (isTag) {
          // nothing
        } else {
          this.tags.push(row)
        }
      } else {
        if (isTag) {
          this.handleTagClose(row)
        }
      }

      /* let arr = this.tags.filter(val => {
        return val.code === row.code
      })
      if (arr.length < 1) {
        this.tags.push(row)
      } else {
        this.handleTagClose(row)
      } */
    },
    handleTagClose (tag) {  // 关闭tag
      this.tags.splice(this.tags.indexOf(tag), 1)
      this.toggleSelection(tag, false) // 选择
    },
    handleTagAllClose () {  // 关闭所有tag
      this.tags = []
      this.$refs.personTb.clearSelection()
    },
    toggleSelection(row, selected) { // 选中切换
      if (row) {
        this.$refs.personTb.toggleRowSelection(row, selected)
      } else {
        this.$refs.personTb.clearSelection()
      }
    },
    register () {
      this.$confirm('你确定登记已选中的人员吗?', '确认登记', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleTagAllClose()
        this.$notify(notifyConfig('登记', 'success'))
      }).catch(() => {})
    },
    cancelRegister () {
      this.$confirm('你确定取消登记已选中的人员吗?', '确认取消登记', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleTagAllClose()
        this.$notify(notifyConfig('取消登记', 'success'))
      }).catch(() => {})
    }
	}
}
