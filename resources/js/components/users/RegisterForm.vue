<template>
  <v-dialog v-model="registerDialog" max-width="488" @click:outside="close" @keydown.esc="close">
    <v-card class="mx-auto">
      <v-card-title class="pa-8">
        <span class="text-h5 font-weight-bold">アカウントを作成</span>
      </v-card-title>
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
          <v-row class="mt-12 mb-8">
            <v-btn class="text-subtitle-1" color="primary" height="56" block @click="register">
              新規登録
            </v-btn>
          </v-row>
          <v-divider />
          <v-row class="mt-8 mb-4" justify="center">
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
          min: v => (v && v.length >= 8) || '8文字以上入力してください',
          confirm: v => v === this.userInfo.password || 'パスワードが一致しません',
        },
      }
    },
    methods: {
      register() {
        if (this.$refs.form.validate()){
          this.$emit('register', this.userInfo)
        }
      },
      loginLink() {
        this.$refs.form.reset()
        this.$emit('loginLink')
      },
      close() {
        this.$refs.form.reset()
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
