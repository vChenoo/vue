import {notifyConfig, deepClone} from '@/utils/'
import {getSex, getMarriage, getDepartment} from '@/api/constant'
import {queryTesttype, queryClinical} from '@/api/database'
import {queryFormalRegister} from '@/api/register'
import addressOption from '@/api/area'
import {queryPackage, queryGroupproject} from '@/api/testsetting'
import {queryOrganization} from '@/api/management'

export default {
  name: 'formalregister',
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
        organization: '0',
				name: '',
				code: '',
				idcard: '',
        phone: ''
			},
			tableData: [],  //  表格数据
			rules: {
				isorg: [
					{required: true, message: '请选择是否单位体检', trigger: 'change'}
				],
				org: [
					{required: true, message: '请选择体检单位', trigger: 'change'}
				],
				name: [
					{required: true, message: '请输入姓名', trigger: 'blur'}
				],
				idcard: [
					{required: true, message: '请输入身份证号', trigger: 'blur'}
				],
				sex: [
					{required: true, message: '请选择性别', trigger: 'change'}
				],
				phone: [
					{required: true, message: '请输入联系电话', trigger: 'blur'}
				],
				age: [
					{required: true, message: '请输入年龄', trigger: 'blur'}
				],
				marriage: [
					{required: true, message: '请选择婚姻状况', trigger: 'change'}
				]
			},
			formTemp: null, // 表单渲染值
      indexTemp: null,  //  表单渲染值对应序号
      visibleList: 1,  // 列表是否可见
      statusForm: 'create', //  'update' or 'create'
      testtypeOption: [],				// 体检类别下拉
      orgOption: [],				// 下拉 体检单位
      marriageOption: [],	// 婚姻状况下拉
      addressOption: addressOption,  // 地址
      addressVm: [],
      addressProps: {
        value: 'name',
        label: 'name',
        children: 'child'
      },
      sexOption: [],			// 性别下拉
      testOptSel: [],			// 查询下拉 体检类别
      orgOptSel: [],     // 查询下拉 体检单位
      /* 选择体检项目 */
      packageList: [],		// 套餐列表
      pkgSelection: [],
      queryItemData: {
      	page: 1,
				limit: 10,
      	department: '0',
      	name: ''
      },
      dpOption: [],
      dpOptSel: [],
      clinicalOption: [],
      tableItem: [],
      itemSelection: [],
      /* 加做项目 */
      queryAddItemData: {
        page: 1,
        limit: 10,
        department: '0',
        name: ''
      },
      tableAddItem: [],
      addItemSelection: []
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
    totalItem () { // 记录总数
      return this.tableItem.length
    },
    tablePageItem () { // 表格分页
      return this.tableItem.slice(this.queryItemData.limit * (this.queryItemData.page - 1), this.queryItemData.page * this.queryItemData.limit)
    },
    totalAddItem () { // 记录总数
      return this.tableAddItem.length
    },
    tablePageAddItem () { // 表格分页
      return this.tableAddItem.slice(this.queryAddItemData.limit * (this.queryAddItemData.page - 1), this.queryAddItemData.page * this.queryAddItemData.limit)
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
		/* 筛选 */
  	indexMethod (index) { // 表格序号
      return this.queryData.limit * (this.queryData.page - 1) + 1 + index
    },
    indexItemMethod (index) { // 表格序号
      return this.queryItemData.limit * (this.queryItemData.page - 1) + 1 + index
    },
    indexAddItemMethod (index) { // 表格序号 加做项目
      return this.queryAddItemData.limit * (this.queryAddItemData.page - 1) + 1 + index
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
        this.orgOptSel = deepClone(this.orgOption)
        this.orgOptSel.unshift({code: '0', name: '不限'})
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
      	this.packageList = response.data
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
      queryGroupproject().then(response => {
        let _res = response.data
        this.tableItem = deepClone(_res)
        this.tableAddItem = deepClone(_res)
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
      this.visibleList = 2
      this.initStep()
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
      let address = []
      address.push(this.formTemp.county)
      address.push(this.formTemp.city)
      address.push(this.formTemp.province)
      this.addressVm = address
      this.visibleList = 2
      this.initStep()
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
    updateJump() {
      this.next(true)
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
    },
    /* step */
    initStep() {
    	this.visibleFirst = true
    	this.active = 2
    },
    next(isStep) {
			let _len = this.steps.length
			if (_len < 2) return false
      if (this.active > _len + 2) {
      	this.active = 4
      } else {
      	this.active++
      }
      if (isStep) this.visibleFirst = false
    },
  	last() {
  		this.visibleFirst = true
  		this.active = 2
  	},
  	saveItem() {
  		this.next()
  		console.log(111)
  	},
  	updateItem() {
  		this.saveItem()
  		this.visibleList = 1
  	},
  	/* 套餐选择 */
  	pkgSelected(selection, row) {	// 手动选中套餐
      let selArr = selection.filter(val => {
        return val.code === row.code
      })
      let isSel = selArr.length > 0
  		this.togglePkgSelection(row, isSel)	// 选择
  		this.setItem(row, isSel)						// 设置体检项目
    },
  	pkgSelectionChange (selection) {	// 套餐改变
      this.pkgSelection = selection
      /* this.setItemList() */
    },
    setItemList() {	// 设置体检项目列表
    	this.pkgSelection.forEach((pkg, index) => {
    		this.setItem(pkg, true)
    	})
    },
    handleTagClose (tag) {	// 关闭套餐tag
      this.pkgSelection.splice(this.pkgSelection.indexOf(tag), 1)
      this.togglePkgSelection(tag, false)	// 选择
  		this.setItem(tag, false)						// 设置体检项目
    },
    handleTagAllClose () {	// 关闭所有套餐tag
      this.$refs.pkgTable.clearSelection()
    },
    setItem(pkg, selected) {	// 设置单个体检项目
    	pkg.groupproject.forEach((item, index) => {
				let _index = this.tableItem.findIndex(x => x.code === item.code)
				if (_index !== undefined) {	// 套餐中的项目在项目列表中存在
					let _id = this.tableItem[_index].hasOwnProperty('pkgid') ? this.tableItem[_index].pkgid : ''
					let _name = this.tableItem[_index].hasOwnProperty('pkgname') ? this.tableItem[_index].pkgname : ''
					let _pkgid = pkg.code
					let _pkgname = pkg.name
					let _isIn = _id.split(',').indexOf(_pkgid)
					if (selected) {	// 选中时
						if (_isIn === -1) {	// 项目的套餐id中不存在当前套餐
							let comma = _id ? ',' : ''
							_id += comma + pkg.code
							_name += comma + pkg.name
						}
					} else {	// 未选中时
						if (_isIn !== -1) {
							let _arrid = _id.split(',')
							let _arrname = _name.split(',')
							let _isName = _arrname.indexOf(_pkgname)
							_arrid.splice(_isIn, 1)	// 删除此套餐id
							_id = _arrid.join(',')
							if (_isName !== -1) {
								_arrname.splice(_isName, 1)	// 删除此套餐name
								_name = _arrname.join(',')
							}
						}
					}
					this.tableItem[_index].pkgid = _id
					this.tableItem[_index].pkgname = _name
					this.toggleItemSelection(this.tableItem[_index], selected)
				}
			})
    },
    togglePkgSelection(row, selected) {	// 套餐选中切换
   		if (row) {
        this.$refs.pkgTable.toggleRowSelection(row, selected)
      } else {
        this.$refs.pkgTable.clearSelection()
      }
    },
    /* 项目选择 */
    itemSelected(selection, row) {
      let tagArr = this.itemSelection.filter(val => {
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
          this.itemSelection.push(row)
        }
      } else {
        if (isTag) {
          if (row.pkgid) {        // 套餐中的项目
            this.toggleItemSelection(row, true)
            this.$notify(notifyConfig('该项目在已选套餐中，必须选择', 'warning'))
          } else {
            this.itemTagClose(row)
          }
        }
      }
      /* if (arr.length < 1) { // 选中
        this.itemSelection.push(row)
        if (row.pkgid) {        // 套餐中的项目
          this.$notify(notifyConfig('该项目在已选套餐中，必须选择', 'warning'))
        } else {
          this.toggleItemSelection(row, false)
        }
      } else {              // 选中
        this.itemTagClose(row)
      }

    	if (selection.length) {		// 选中
    		this.toggleItemSelection(row, true)
    	} */
    },
  	/* itemSelectionChange (selection) {
      this.itemSelection = selection
      console.log(this.itemSelection)
    }, */
    itemTagClose (tag) {
    	if (tag.pkgid) {				// 套餐中的项目
    		this.$notify(notifyConfig('该项目在已选套餐中，必须选择', 'warning'))
    	} else {
    		this.itemSelection.splice(this.itemSelection.indexOf(tag), 1)
        this.$refs.itemTable.toggleRowSelection(tag, false)
    	}
    },
   	toggleItemSelection(row, selected) {
   		if (row.code) {
        this.$refs.itemTable.toggleRowSelection(row, selected)
        let tagArr = this.itemSelection.filter(val => {
          return val.code === row.code
        })
        if (selected) {
          if (tagArr.length <= 0) {
            this.itemSelection.push(row)
          }
        } else {
          this.itemTagClose(row)
        }
      } else {
        this.itemSelection = []
        this.$refs.itemTable.clearSelection()
      }
    },
    /* 加做项目 */
    clickAddItem(row, index) {
      this.visibleList = 3
    },
    handleSizeAddItem (val) { // 每页条数改变
      this.queryAddItemData.limit = val
    },
    handleCurrentAddItem (val) { // 当前页数改变
      this.queryAddItemData.page = val
    },
    addItemSelectionChange(selection) {
      this.addItemSelection = selection
    },
    addItemTagClose (tag) {
      this.addItemSelection.splice(this.addItemSelection.indexOf(tag), 1)
    },
    toggleAddItemSelection(row, selected) {
      if (row) {
        this.$refs.addItemTable.toggleRowSelection(row, selected)
      } else {
        this.$refs.addItemTable.clearSelection()
      }
    },
    submitAddItem() {
      console.log(this.addItemSelection)
    }
	}
}
