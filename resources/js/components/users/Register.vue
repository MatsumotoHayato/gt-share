<template>
  <div>
    <v-card
      class="mx-auto elevation-4"
      color="grey lighten-5"
      max-width="488"
    >
        <v-card-title class="pa-8">
            <span class="text-h5 font-weight-bold">アカウントを作成</span>
        </v-card-title>
        <v-card-text style="max-width:424px" class="mx-auto">
            <v-row class="my-4">
                <v-text-field
                    v-model="userInfo.name"
                    :rules="[nameRules.required]"
                    autofocus
                    outlined
                    label="ユーザー名"
                ></v-text-field>
            </v-row>
            <v-row class="my-4">
                <v-text-field
                    v-model="userInfo.email"
                    :rules="[emailRules.required, emailRules.regex]"
                    outlined
                    label="メールアドレス"
                ></v-text-field>
            </v-row>
            <v-row class="my-4">
                <v-text-field
                    v-model="userInfo.password"
                    :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordRules.required, passwordRules.min]"
                    :type="passwordShow ? 'text' : 'password'"
                    outlined
                    label="パスワード"
                    @click:append="passwordShow = !passwordShow"
                ></v-text-field>
            </v-row>
            <v-row class="my-4">
                <v-text-field
                    v-model="userInfo.password_confirmation"
                    :rules="[passwordRules.required, passwordRules.confirm]"
                    type="password"
                    outlined
                    label="パスワード（確認用）"
                ></v-text-field>
            </v-row>
            <v-row class="mt-12 mb-8">
                <v-btn
                    class="text-subtitle-1"
                    color="primary"
                    height="56"
                    block
                    @click="register"
                >
                    新規登録
                </v-btn>
            </v-row>
            <v-divider/>
            <v-row class="mt-8 mb-4" justify="center">
                <span>すでにアカウントをお持ちですか？</span>
                <v-btn
                    class="x-small link-text align-center"
                    color="blue darken-1"
                    width="80"
                    text
                    to="/vue/login"
                >
                    ログイン
                </v-btn>
            </v-row>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
    export default {
        name: 'Register',
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
                axios.post('/register', this.userInfo)
                    .then((response)=>{
                        if(response.status == 200) {
                            this.login()
                        }
                    })
            },
            login() {
                axios.post('/login', this.userInfo)
                    .then((response)=>{
                        if(response.status == 200) {
                            this.$router.push({
                                path: '/'
                            })
                        }
                    })
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