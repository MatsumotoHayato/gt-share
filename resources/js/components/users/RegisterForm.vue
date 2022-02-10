<template>
  <v-dialog v-model="registerDialog" max-width="488" @click:outside="close" @keydown.esc="close">
    <v-card class="mx-auto">
      <v-card-title class="pa-8">
        <span class="text-h5 font-weight-bold">アカウントを作成</span>
      </v-card-title>
      <v-alert
        class="mx-12 mt-n6 mb-n4"
        v-model="hasError"
        type="error"
        dense
      >
        そのメールアドレスは既に登録されています
      </v-alert>
      <v-form ref="form">
        <v-card-text style="max-width:424px" class="mx-auto">
          <v-row class="my-4">
            <v-text-field
              v-model="userInfo.name"
              :rules="[nameRules.required]"
              validate-on-blur
              autofocus
              outlined
              label="ユーザー名"
              @keydown.enter="focusNext('email')"
            ></v-text-field>
          </v-row>
          <v-row class="my-4">
            <v-text-field
              v-model="userInfo.email"
              :rules="[emailRules.required, emailRules.regex]"
              validate-on-blur
              outlined
              ref="focusEmail"
              label="メールアドレス"
              @keydown.enter="focusNext('password')"
            ></v-text-field>
          </v-row>
          <v-row class="my-4">
            <v-text-field
              v-model="userInfo.password"
              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRules.required, passwordRules.min]"
              validate-on-blur
              :type="passwordShow ? 'text' : 'password'"
              outlined
              ref="focusPassword"
              label="パスワード"
              @click:append="passwordShow = !passwordShow"
              @keydown.enter="focusNext('confirm')"
            ></v-text-field>
          </v-row>
          <v-row class="my-4">
            <v-text-field
              v-model="userInfo.password_confirmation"
              :rules="[passwordRules.required, passwordRules.confirm]"
              type="password"
              outlined
              ref="focusConfirm"
              label="パスワード（確認用）"
              @keydown.enter="register"
              ></v-text-field>
          </v-row>
          <v-row class="mt-4 mb-16">
            <v-btn class="text-subtitle-1" color="warning" height="56" block @click="register">
              新規登録
            </v-btn>
          </v-row>
          <v-divider />
          <v-row class="my-8">
            <v-btn href="/login/google" style="text-transform: none;" height="56" block color="grey" outlined>
              <v-row justify="space-between" align="center">
                <svg xmlns="https://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 48" aria-hidden="true" class="ml-2">
                  <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"></path>
                  <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"></path>
                  <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"></path>
                  <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"></path>
                  <path fill="none" d="M2 2h44v44H2z"></path>
                </svg>
                <span style="color: #000;">Googleアカウントでログイン</span>
                <span></span>
              </v-row>
            </v-btn>
          </v-row>
          <v-row class="my-4" justify="center">
            <span>すでにアカウントをお持ちですか？</span>
            <v-btn class="x-small link-text align-center" color="blue darken-1" width="80" text @click="loginLink">
              ログイン
            </v-btn>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'Register',
    props: [
      'registerDialog',
    ],
    data() {
      return {
        userInfo: {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        },
        hasError: false,
        nameRules: {
          required: v => !!v || '入力は必須です',
        },
        emailRules: {
          required: v => !!v || '入力は必須です',
          regex: v => /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'メールアドレスの形式が違います',
        },
        passwordShow: false,
        passwordRules: {
          required: v => !!v || '入力は必須です',
          min: v => (v || '').length >= 8 || '8文字以上入力してください',
          confirm: v => v === this.userInfo.password || 'パスワードが一致しません',
        },
      }
    },
    methods: {
      register() {
        if (this.$refs.form.validate()){
          axios.post('/register', this.userInfo)
            .then((response) => {
              if (response.status == 200) {
                this.$emit('register')
              }
            })
            .catch((error) => {
              this.hasError = true
            })
        }
      },
      loginLink() {
        this.$refs.form.reset()
        this.hasError = false
        this.$emit('loginLink')
      },
      close() {
        this.$refs.form.reset()
        this.hasError = false
        this.$emit('close')
      },
      focusNext(text) {
        if (text === 'email') {
          this.$refs.focusEmail.focus()
        } else if (text === 'password') {
          this.$refs.focusPassword.focus()
        } else if (text === 'confirm') {
          this.$refs.focusConfirm.focus()
        }
      }
    }
  }
</script>

<style scoped>
  .link-text {
    display: inline-block;
    height: inherit !important;
  }
</style>
