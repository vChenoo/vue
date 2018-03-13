// import {test} from '@/api/test'
import {getCookie} from '@/utils/cookie'

export default {
  name: 'login',
  data () {
    return {
      data: {
        username: 'tester',
        password: '111111',
        isremember: false
        // token: ''
      },
      loginRules: {
        username: [{required: true, trigger: 'blur'}],
        password: [{required: true, min: 6, trigger: 'blur'}]
      }
    }
  },
  methods: {
    onLogin (ref, type) {
      // data: this[ref]
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('LoginByUsername', this.data).then(() => {
            this.$router.push('/main/homepage')
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('校验不通过')
          return false
        }
      })
    }
  },
  created () {
    let _cookieUser = getCookie('testuser')
    this.data.username = _cookieUser || 'tester'
    if (_cookieUser) {
      this.$router.push('/main/homepage')
    }
    /* let _test = {
      id: '00001',
      name: '测试',
      tmpSubEntityList: [{
        id: '01',
        content: '0111111',
        subSubEntity: {
          id: '111',
          sub: '111'
        },
        tmpSubSubEntityList: [
          {
            id: '222',
            sub: '2222'
          },
          {
            id: '333',
            sub: '3333'
          }
        ]
      }, {
        id: '02',
        content: '0222222',
        subSubEntity: {
          id: '222',
          sub: '222'
        },
        tmpSubSubEntityList: [
          {
            id: '444',
            sub: '444'
          }
        ]
      }],
      currentUserAccount: 'admin',
      digest: 'aaa'
    }
    test(_test).then(response => {
      console.log(response.data)
    }) */
  },
  mounted () {}
}
