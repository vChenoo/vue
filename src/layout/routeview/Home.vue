<template>
	<div class="home">
    <left-menu></left-menu>
		<div class="left-fixed-right-auto" :style="{marginLeft:$store.state.leftmenu.width}">
      <div class="right-header">
        <head-nav></head-nav>
        <tag-view></tag-view>
      </div>
      <div class="right-content clearfix">
        <div class="content">
          <!-- <el-tabs v-model="currentTab" type="card" closable @tab-remove="removeTab">
            <el-tabs-pane v-for="(item, index) in mainTabs" :key="item.name" :label="item.title" name="item.name">
            </el-tabs-pane>
          </el-tabs> -->
          <div class="right-layout">
            <transition name="fade" mode="out-in">
              <keep-alive :include="cachedViews">
                <router-view></router-view>
              </keep-alive>
            </transition>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
	import HeadNav from '../head-nav/HeadNav.vue'
	import LeftMenu from '../left-menu/LeftMenu.vue'
  import TagView from '../tag-view/TagView.vue'

	export default {
	  name: 'home',
	  components: {
      HeadNav, LeftMenu, TagView
	  },
    data () {
      return {
        mainTabs: [],
        currentTab: ''
      }
    },
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      }
    }
	}
</script>
<style scoped lang='scss'>
  .content {
    padding: 10px 16px;
    background: #FFF;
  }
  .right-header {
  }

  .right-content {
    margin-bottom: 50px;
    width: 100%;
  }
  .fade-enter-active{
    transition: opacity .3s
  }
  .fade-leave-active {
    transition: opacity .05s
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

</style>