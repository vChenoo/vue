<template>
  <div class="notice">
    <el-row>
      <h4>alert</h4>
      <el-alert
        title="成功提示的文案"
        type="success"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon>
      </el-alert>
      <el-alert
        title="消息提示的文案"
        type="info"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon>
      </el-alert>
      <el-alert
        title="警告提示的文案"
        type="warning"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon>
      </el-alert>
      <el-alert
        title="错误提示的文案"
        type="error"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon>
      </el-alert>
    </el-row>
    
    <el-row>
      <el-button
          type="primary"
          @click="openFullScreen"
          v-loading.fullscreen.lock="fullscreenLoading">
          指令方式
        </el-button>
        <el-button
          type="primary"
          @click="openFullScreen2">
          服务方式
        </el-button>
    </el-row>
    <el-row>
      <el-button :plain="true" @click="open5">消息</el-button>
        <el-button :plain="true" @click="open6">成功</el-button>
        <el-button :plain="true" @click="open7">警告</el-button>
        <el-button :plain="true" @click="open8">错误</el-button>
    </el-row>
    <el-row>
      <h4>确认消息</h4>
      <el-button type="text" @click="open2">点击打开 Message Box</el-button>
    </el-row>
    <el-row>
      <h4>通知</h4>
      <el-button
          plain
          @click="opennotify3">
          成功
        </el-button>
        <el-button
          plain
          @click="opennotify4">
          警告
        </el-button>
        <el-button
          plain
          @click="opennotify5">
          消息
        </el-button>
        <el-button
          plain
          @click="opennotify6">
          错误
        </el-button>
    </el-row>
  </div>
</template>

<script>
  import NoticeJs from './Notice.js'

  export default NoticeJs
</script>
<style scoped lang="scss">
  .demo-layout .el-row{margin-bottom:20px}
</style>
