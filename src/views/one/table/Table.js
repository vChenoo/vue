import {notifyConfig, pickerDateOptions} from '@/utils/'
import E from 'wangeditor'

export default {
  name: 'tablemix',
  data () {
    return {
      fields: { //  表格初始化
        sex: {
          filter: {
            list: [{
              text: '男',
              value: 1
            }, {
              text: '女',
              value: 2
            }],
            multiple: false
          }
        },
        status: {
          filter: {
            list: [{
              text: '启用',
              value: 1
            }, {
              text: '禁用',
              value: 2
            }],
            multiple: false
          }
        }
      },
      rules: {  //  校验规则
        date: [
          {required: true, message: '请输入日期', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'change'},
          {min: 2, max: 20, message: '长度为2-20个字符', trigger: 'change'}
        ],
        address: [
          {required: true, message: '请输入地址', trigger: 'change'}
        ]
      },
      tableData: null,  //  表格数据
      listQuery: {  //  查询接口参数
        page: 1,
        limit: 10,
        name: '',
        address: '',
        date: ''
      },
      formTemp: null, // 表单渲染值
      indexTemp: null,  //  表单渲染值对应序号
      visibleList: true,  // 列表是否可见
      statusForm: 'create', //  'update' or 'create'
      pickerDateOptions: {  // 时间控件初始化
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: pickerDateOptions
      },
      wangEditor: {   // 自定义编辑器
        bar: [
          'head',  // 标题
          'bold',  // 粗体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ],
        obj: null
      },
      temp: { //  编辑器纯文本
        content: ''
      }
    }
  },
  created () {
    this.resetFormTemp()
    this.getList()
  },
  computed: {
    total () { // 记录总数
      return this.tableData.length
    },
    tablePageData () { // 表格分页
      return this.tableData.slice(this.listQuery.limit * (this.listQuery.page - 1), this.listQuery.page * this.listQuery.limit)
    }
  },
  methods: {
    /* 动画 */
    enter (el, done) {
      if (this.$refs['formEdit']) {
        this.$refs['formEdit'].clearValidate()
        this.$store.dispatch('set_bread_name', '编辑表格')
        this.initWangeditor()
      } else {
        this.$store.dispatch('set_bread_name', '')
      }
    },
    /* 格式化 */
    formatterSex (item) { // 性别
      return item.sex === '1' ? '男' : '女'
    },
    formatterStatus (item) { // 状态
      return item.status === '1' ? '启用' : '禁用'
    },
    /* 筛选 */
    filterSex (value, item) {
      return item.sex === value
    },
    filterStatus (value, item) {
      return item.status === value
    },
    indexMethod (index) { // 表格序号
      return this.listQuery.limit * (this.listQuery.page - 1) + 1 + index
    },
    /* 交互方法 */
    getList () { // 查询接口
      console.log('初始化')
      this.tableData = [{date: '1992-01-26', name: '张三', sex: '1', status: '1', address: '北京苏州街'},
        {date: '2006-05-02', name: '李四', sex: '1', status: '1', address: '西直河', content: ''},
        {date: '2010-05-04', name: '王五', sex: '2', status: '2', address: '朝阳区', content: ''},
        {date: '1998-05-01', name: '人思1', sex: '1', status: '1', address: '上海滩1', content: ''},
        {date: '1998-05-01', name: '人思2', sex: '1', status: '1', address: '上海滩2', content: ''},
        {date: '1998-05-01', name: '人思3', sex: '1', status: '1', address: '上海滩3', content: ''},
        {date: '1998-05-01', name: '人思4', sex: '1', status: '1', address: '上海滩4', content: ''},
        {date: '1998-05-01', name: '人思5', sex: '1', status: '1', address: '上海滩5', content: ''},
        {date: '1998-05-01', name: '人思6', sex: '1', status: '1', address: '上海滩6', content: ''},
        {date: '1998-05-01', name: '人思7', sex: '1', status: '1', address: '上海滩7', content: ''},
        {date: '1998-05-01', name: '人思8', sex: '1', status: '1', address: '上海滩8', content: ''},
        {date: '1998-05-01', name: '人思9', sex: '1', status: '1', address: '上海滩9', content: ''},
        {date: '1998-05-01', name: '人思10', sex: '1', status: '1', address: '上海滩10', content: ''}
      ]
    },
    handleFilter () { // 查询交互
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange (val) { // 每页条数改变
      this.listQuery.limit = val
    },
    handleCurrentChange (val) { // 当前页数改变
      this.listQuery.page = val
    },
    resetFormTemp () {
      this.formTemp = {
        date: '',
        name: '',
        sex: '1',
        status: '1',
        address: ''
      }
    },
    handleCreate () { // 新增交互
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
    handleUpdate (row, index) { // 编辑交互
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
      this.$confirm('你确定退出要删除记录吗?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let tbIndex = this.indexMethod(index) - 1
        this.tableData.splice(tbIndex, 1)
        this.$notify(notifyConfig('删除', 'success'))
      }).catch(() => {})
    },
    setContent (html, text) {
      this.formTemp.content = html
      this.temp.content = text
    },
    initWangeditor () {
      this.wangEditor.obj = new E('#editorContent')

      // this.wangEditor.obj.customConfig.menus = this.wangEditor.bar   // 自定义工具栏
      this.wangEditor.obj.customConfig.zIndex = 0 //  配置z-index
      this.wangEditor.obj.customConfig.onchange = (html) => {
        let text = this.wangEditor.obj.txt.text().replace(/(^\s*)|(\s*$)/g, '')
        // html = this.wangEditor.obj.txt.html()
        this.setContent(html, text)
      }

      this.wangEditor.obj.create()
    }
  }
}
