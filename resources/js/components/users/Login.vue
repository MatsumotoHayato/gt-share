<template>
  <div>
    <v-card
      class="mx-auto elevation-4"
      color="grey lighten-5"
      max-width="640"
    >
        <v-card-title class="pa-8">
            <span class="text-h5 font-weight-bold">ログイン</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="max-width:500px" class="mx-auto">
            <v-row class="my-8">
                <v-text-field
                    v-model="userInfo.email"
                    :rules="[emailRules.required, emailRules.regex]"
                    autofocus
                    outlined
                    label="メールアドレス"
                ></v-text-field>
            </v-row>
            <v-row class="my-8">
                <v-text-field
                    v-model="userInfo.password"
                    :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passRules.required, passRules.min]"
                    :type="passwordShow ? 'text' : 'password'"
                    outlined
                    label="パスワード"
                    @click:append="passwordShow = !passwordShow"
                ></v-text-field>
            </v-row>
            <v-row class="mt-8 mb-4">
                <v-btn
                    color="blue darken-1"
                    text
                    to="/vue/user/create"
                >
                    アカウントを作成
                </v-btn>
                <v-spacer/>
                <v-btn
                    color="primary"
                    large
                    @click="login"
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
        name: 'MenuBar',
        data() {
            return {
                userInfo: {
                    email: '',
                    password: '',
                    remember: false
                },
                emailRules: {
                    required: v => !!v || '入力は必須です',
                    regex: v => /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'メールアドレスの形式が違います',
                },
                passwordShow: false,
                passRules: {
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