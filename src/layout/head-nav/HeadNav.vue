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
                  <span v-text="userName">XXX</span>
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
    <el-dialog title="修改密码" :visible.sync="changePwdDialog" @close="handlePwdClose">
      <el-form class="line-form" label-width="30%" label-position="right" ref="formPwd" size="small" :model="changePwdForm" :rules="pwdRules">
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model.trim="changePwdForm.password" auto-complete="off" @change="changePwd"></el-input>
          <el-rate class="password-rate" v-model="pwdRate" :max="pwdRateMax" :texts="pwdRateText" :colors="pwdRateColors" :low-threshold.number="1" :high-threshold.number="3" show-text disabled></el-rate>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmpwd">
          <el-input type="password" v-model="changePwdForm.confirmpwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="guide-wrap">
          <p class="guide">*建议包含数字、字母和特殊字符</p>
        </el-form-item>
      </el-form>
      <div class="submit-container">
        <el-button type="primary" @click="updatePwd">确 定</el-button>
        <el-button @click="changePwdDialog = false">取 消</el-button>
      </div>
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
  .password-rate {
    position: absolute;
    right: -8px;
    top: 7px;
  }
  .guide-wrap {
    margin: 0;
    .guide {
      margin: 0 0.4rem;
      color: #2dc3e8;
      font-size: 12px;
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