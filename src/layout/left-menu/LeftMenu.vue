<template>
  <div class="left clearfix" :style="{'height':win_size.height,'width':$store.state.leftmenu.width}" id='admin-left'>
    <div id='left-menu'>
      <div class='tac'>
        <div class='logo-container'>
          <img src="../../assets/logo.png" class='logo' alt="">
        </div>
        <el-menu class="el-menu-vertical" theme="dark" :default-active="$route.path" @open="handleOpen" @close="handleClose" :collapse="!$store.state.leftmenu.menu_flag"  unique-opened router>
          <template v-for="(item,index) in $router.options.routes">
            <el-submenu :index="item.path" :key='item.path' v-if='!item.hidden && !item.ignore'>
              <template slot="title">
                <!-- <el-tooltip class="item" effect="dark" placement="right" :disabled="$store.state.leftmenu.menu_flag" :content="item.name">
                  <i :class="'fa fa-'+item.icon"></i>
                </el-tooltip>
                <span class='menu-name' v-if="$store.state.leftmenu.menu_flag">{{item.name}}</span> -->
                <i :class="'el-icon-'+item.meta.icon"></i>
                <span class='menu-name'>{{item.meta.title}}</span>
              </template>

              <el-menu-item v-for='(child,cindex) in item.children' :key='child.path' v-if="!child.hidden" :index='item.path+"/"+child.path'>
                <!-- <el-tooltip class="item" effect="dark" placement="right" :disabled="$store.state.leftmenu.menu_flag" :content="child.name">
                  <i :class="'fa fa-'+child.icon"></i>
                </el-tooltip>
                <span class="menu-name" v-if="$store.state.leftmenu.menu_flag">{{child.name}}</span> -->
                {{child.meta.title}}
              </el-menu-item>
            </el-submenu>
            <div v-else-if='item.ignore'>
              <el-menu-item v-for='(child,cindex) in item.children' :key='child.path' :index='item.path+"/"+child.path' v-if='!child.hidden'>
                <i :class="'el-icon-'+child.meta.icon"></i>
                <span slot="title">{{child.meta.title}}</span>                
              </el-menu-item>
            </div>
          </template>
        </el-menu>
      </div>
    </div>
  </div>
</template>
<script>
  import LeftMenuJs from './LeftMenu.js'

  export default LeftMenuJs
</script>

<style scoped lang='scss'>
  .logo-container {
    height: 50px;
    /* background-color: #2dc3e8; */
    /* box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1); */
  }

  .logo {
    height: 40px;
    width: auto;
    margin-left: 10px;
    margin-top: 2px;
  }
  .fa {
    margin-right: 8px;
  }
  .tac {
    height: 100%;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  }
  .left-fixed-right-auto {
    padding-top: 50px;
  }

  .left {
    position: absolute;
    float: left;
    /*width:190px;
    margin-right:-190px;
    top: 50px;*/
    z-index: 1;
  }

  #left-menu {
    height: 100%;
  }
</style>