<template>
	<div class="head-nav">
		<header class="clearfix">
        <!-- <el-col :span="16" class="function">
          <span class="menu-hor-toggle"><i class="el-icon-menu" @click="toggleHorHeader"></i></span>
                    <el-menu class="menu-hor-dropdown" theme="dark" :default-active="$store.state.router.headerCurRouter" mode="horizontal" unique-opened router
           :class="{'menu-hidden':menuHidden}">
                      <el-menu-item v-for='(item,index) in $router.options.routes' :index="item.path" :key='item.path' v-if='!item.hidden'>
              <template slot="title">
                <span :class="'el-icon-'+item.icon"></span>
                <span slot="title">{{item.name}}</span>
              </template>
            </el-menu-item>
                    </el-menu>
        </el-col> -->
          <div class="toggle-menu" @click='toggleMenu'>
            <i :class='[{"el-icon-tj-open":$store.state.leftmenu.menu_flag},{"el-icon-tj-shrink":!$store.state.leftmenu.menu_flag}]'></i>
          </div>
          <bread class="header-bread"></bread>
          <!-- <span class='username'><i class='fa fa-user'></i>{{this.$store.state.user.userinfo.username}}</span> -->
          <div class='username'>
            <el-dropdown @command='setDialogInfo'>
                <span class="el-dropdown-link">
                  <img width="40" height="40" src="../../assets/female.png" class='person' alt="用户">
                  XXX
                  <i class="el-icon-caret-bottom el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='info'>修改信息</el-dropdown-item>
                    <el-dropdown-item command='pass'>修改密码</el-dropdown-item>
                    <el-dropdown-item command='set'>系统设置</el-dropdown-item>
                    <el-dropdown-item command='color'>换肤</el-dropdown-item>
                    <el-dropdown-item command='logout'>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!-- <i class="fa fa-sign-out logout" @click='logout'></i> -->
		</header>
    <el-dialog title="切换主题" :visible.sync="colorChangeDialog" width="30%" center>
      <span>主题色</span>
      <el-select v-model="colorValue" placeholder="请选择">
        <el-option class="color-select" v-for="item in colorOptions" :key="item.value" :label="item.label" :value="item.value">
          <span class="color-block" :style="{background:item.color}"></span>
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="colorChange">切 换</el-button>
        <el-button @click="colorReset">重 置</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>
  import HeadNavJs from './HeadNav.js'

  export default HeadNavJs
</script>

<style scoped lang='scss'>
  .person {
    margin-top: 5px;
    margin-right: 4px;
    vertical-align: top;
  }
  .toggle-menu {
    width: 50px;
    height: 50px;
    float: left;
    // z-index: 1000;
    cursor: pointer;
    line-height: 60px;
    text-align: center;
    i {
      font-size: 22px;
    }
  }
  .header-bread {
    float: left;
  }

  .head-nav {
    width: 100%;
    height: 50px;
    /* position: fixed; */
    border-bottom: solid 1px #e6e6e6;
    .logout {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      float: right;
      cursor: pointer;
    }
  }

  .userinfo {
    text-align: right;
  }

  .username {
    float: right;
    height: 50px;
    line-height: 50px;
    cursor: pointer;

    .el-dropdown {
      /* color: #FFF; */
      .el-dropdown-link {
        display: inline-block;
        height: 50px;
        line-height: 50px;
      }
    }
  }
  .color-select {
    padding: 5px 15px;
    .color-block {
      display: inline-block;width: 100%;height: 100%;border-radius: 5px;
    }
  }
  @media only screen and (max-width:991px){
    /* .function, .userinfo {
      width: initial;
    }
    .userinfo {
      float: right;
      width: initial;
    } */
  }
  @media only screen and (min-width:992px){
    
  }
</style>