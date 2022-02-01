<template>
  <v-dialog v-model="loginDialog" max-width="488" @click:outside="close" @keydown.esc="close">
    <v-card class="mx-auto">
      <v-card-title class="pa-8">
        <span class="text-h5 font-weight-bold">ログイン</span>
      </v-card-title>
      <v-form ref="form">
        <v-card-text style="max-width:424px" class="mx-auto">
          <v-row class="my-4">
            <v-text-field
              v-model="userInfo.email"
              :rules="[emailRules.required, emailRules.regex]"
              validate-on-blur
              autofocus
              outlined
              label="メールアドレス"
              @keydown.enter="focusNext"
            ></v-text-field>
          </v-row>
          <v-row class="mt-4">
            <v-text-field
              v-model="userInfo.password"
              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRules.required, passwordRules.min]"
              validate-on-blur
              :type="passwordShow ? 'text' : 'password'"
              outlined
              label="パスワード"
              @click:append="passwordShow = !passwordShow"
              ref="focusThis"
              @keydown.enter="login"
            ></v-text-field>
          </v-row>
          <v-row class="mt-16 mb-8">
            <v-btn
              class="text-subtitle-1"
              color="primary"
              height="56"
              block
              @click="login"
            >
              ログイン
            </v-btn>
          </v-row>
          <v-divider />
          <v-row class="mt-8 mb-4" justify="center">
            <span>アカウントをお持ちでないですか？</span>
            <v-btn class="x-small link-text align-center" color="blue darken-1" width="80" text @click="registerLink">
              新規登録
            </v-btn>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'LoginForm',
    props: [
      'loginDialog',
    ],
    data() {
      return {
        userInfo: {
          email: '',
          password: '',
        },
        emailRules: {
          required: v => !!v || '入力は必須です',
          regex: v => /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'メールアドレスの形式が違います',
        },
        passwordShow: false,
        passwordRules: {
          required: value => !!value || '入力は必須です',
          min: v => (v && v.length >= 8) || '8文字以上入力してください'
        },
      }
    },
    methods: {
      login() {
        if (this.$refs.form.validate()){
          this.$emit('login', this.userInfo)
        }
      },
      registerLink() {
        this.$refs.form.reset()
        this.$emit('registerLink')
      },
      close() {
        this.$refs.form.reset()
        this.$emit('close')
      },
      focusNext() {
        this.$refs.focusThis.focus()
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
