let id = 1000

export default {
  name: 'tree',
  data () {
    return {
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterText: '',
      nodeChangeDialog: false,
      nodeValue: '',
      currentNode: '',
      isAdd: true
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    nodeChangeCfm () {
      if (this.isAdd) {
        this.appendHandle()
      } else {
        this.editHandle()
      }
    },
    append (data) {
      this.isAdd = true
      this.nodeChangeDialog = true
      this.currentNode = data
      this.nodeValue = ''
    },
    appendHandle (data) {
      const newChild = { id: id++, label: this.nodeValue, children: [] }
      if (!this.currentNode.children) {
        this.$set(this.currentNode, 'children', [])
      }
      this.currentNode.children.push(newChild)
      this.nodeChangeDialog = false
      this.$message({
        type: 'success',
        message: '成功修改节点为: ' + this.nodeValue
      })
    },
    edit (data) {
      this.isAdd = false
      this.nodeChangeDialog = true
      this.currentNode = data
      this.nodeValue = data.label
    },
    editHandle (data) {
      this.currentNode.label = this.nodeValue
      this.nodeChangeDialog = false
      this.$message({
        type: 'success',
        message: '成功修改节点为: ' + this.nodeValue
      })
    },
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    renderContent (h, { node, data, store }) {
      return (
        <span class="node-item">
          <span>
            <span>{node.label}</span>
          </span>
          <span class="node-button">
            <el-button type="text" icon="el-icon-plus" onClick={ () => this.append(data) }></el-button>
            <el-button type="text" icon="el-icon-edit" on-click={ () => this.edit(data) }></el-button>
            <el-button type="text" icon="el-icon-delete" onClick={ () => this.remove(node, data) }></el-button>
          </span>
        </span>
      )
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
