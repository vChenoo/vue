<template>
  <div class='bread'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for='(item,index) in $route.matched' :key='item.path' v-if="item.meta.title">{{item.meta.title}}</el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'bread',
    data () {
      return {
        strong: ''
      }
    },
    methods: {
      getPageText (name) {
        return name
      }
    },
    mounted () {

    },
    created () {
      /* if (this.$route.matched.length) {
        var name = this.$route.matched[this.$route.matched.length - 1].name
        console.log(4444)
        this.strong = this.getPageText(name)
        this.$store.dispatch('set_bread_name', name)
      } */
    },
    watch: {
      $route (to, from) {
        this.strong = this.getPageText(to.name)
      }
    }
  }
</script>

<style scoped lang='scss'>
  .bread {
    height: 40px;
    line-height: 26px;
    padding: 0 4px;
    .title {
      font-size: 16px;
      color: #5a5e66;
      border-left: 3px solid #e6a23c;
      padding: 4px 6px;
    }
    .el-breadcrumb {
      display: inline-block;
      margin-left: 10px;
      text-align: right;
      font-size: 14px;
      line-height: 50px;
    }
  }
  /deep/ .el-breadcrumb__inner {
    color: #b4bccc;
    font-weight: 400;
    cursor: text;
  }
</style>
