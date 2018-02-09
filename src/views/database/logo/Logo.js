import {queryLogo} from '@/api/database'

export default {
	name: 'logo',
	data () {
		return {
			imageUrl: ''
		}
	},
  created () {
    this.getImg()
  },
	methods: {
    getImg () {
      // 查询徽标
      queryLogo().then(response => {
        this.imageUrl = response.data.logo
      })
    },
		handleUploadSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeUploadUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
	}
}
