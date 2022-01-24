<template>
  <div>
    <v-card
      class="mx-auto elevation-4"
      color="grey lighten-5"
      max-width="488"
    >
        <v-card-title class="pa-8">
            <span class="text-h5 font-weight-bold">ログイン</span>
        </v-card-title>
        <v-card-text style="max-width:424px" class="mx-auto">
            <v-row class="my-4">
                <v-text-field
                    v-model="userInfo.email"
                    :rules="[emailRules.required, emailRules.regex]"
                    autofocus
                    outlined
                    label="メールアドレス"
                ></v-text-field>
            </v-row>
            <v-row class="mt-4">
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
            <v-row>
                <span>パスワードを忘れた場合は</span>
                <v-btn
                    class="x-small link-text align-center"
                    color="blue darken-1"
                    width="64"
                    text
                    to="/"
                >
                    こちら
                </v-btn>
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
            <v-divider/>
            <v-row class="mt-8 mb-4" justify="center">
                <span>アカウントをお持ちでないですか？</span>
                <v-btn
                    class="x-small link-text align-center"
                    color="blue darken-1"
                    width="80"
                    text
                    to="/vue/register"
                >
                    新規登録
                </v-btn>
            </v-row>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
    export default {
        name: 'Login',
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
                axios.post('/login', this.userInfo)
                    .then((response)=>{
                        if(response.status == 200) {
                            this.$router.push({
                                path: '/'
                            })
                        }
                    })
                    .catch(function(error){
                        console.log(error)
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