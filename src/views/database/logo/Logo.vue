<template>
	<div class="logo">
		<el-upload
		  class="avatar-uploader"
		  action="https://jsonplaceholder.typicode.com/posts/"
		  :show-file-list="false"
		  :on-success="handleUploadSuccess"
		  :before-upload="beforeUploadUpload">
		  <img v-if="imageUrl" :src="imageUrl" class="avatar">
		  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
		<span class="text-warning">*上传头像图片格式为 JPG 或 PNG,大小不能超过 2MB</span>
	</div>
</template>
<script>
  import LogoJs from './Logo.js'

  export default LogoJs
</script>
<style scoped lang="scss">
	.avatar-uploader {
		/deep/ .el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			&:hover {
		    border-color: #409EFF;
		  }
		}
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .text-warning {
  	font-size: 12px;
  	margin-left: 5px;
  }
</style>