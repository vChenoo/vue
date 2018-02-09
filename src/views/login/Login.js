/**
 * Created by sailengsi on 2017/5/11.
 */
export default {
  name: 'login',
  data () {
    return {
      data: {
        username: 'aaa',
        password: 'aaa'
        // token: ''
      }
    }
  },
  methods: {
    onLogin (ref, type) {
      // data: this[ref]
      this.$router.push('/main/homepage')
    }
  },
  created () {},
  mounted () {}
}
