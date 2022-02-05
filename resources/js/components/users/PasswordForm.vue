<template>
    <v-card class="mx-auto elevation-4" color="grey lighten-5" max-width="488">
      <v-card-title class="pa-8">
        <div class="text-h5 font-weight-bold">パスワード変更</div>
      </v-card-title>
      <v-form ref="form">
        <v-card-text style="max-width:424px" class="mx-auto">
          <v-row class="my-4">
            <v-text-field
              v-model="passwordForm.old_password"
              :rules="[passwordRules.required, passwordRules.min]"
              validate-on-blur
              type="password"
              outlined
              autofocus
              label="現在のパスワード"
            ></v-text-field>
          </v-row>
          <v-row class="my-4">
            <v-text-field
              v-model="passwordForm.password"
              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRules.required, passwordRules.min, passwordRules.same]"
              validate-on-blur
              :type="passwordShow ? 'text' : 'password'"
              outlined
              label="新しいパスワード"
              @click:append="passwordShow = !passwordShow"
            ></v-text-field>
          </v-row>
          <v-row class="my-4">
            <v-text-field
              v-model="passwordForm.password_confirmation"
              :rules="[passwordRules.required, passwordRules.confirm]"
              type="password"
              outlined
              label="新しいパスワード（確認用）"
              ></v-text-field>
          </v-row>
          <v-row class="mt-12 mb-8">
            <v-btn class="text-subtitle-1" color="warning" height="56" block @click="change">
              変更
            </v-btn>
          </v-row>
          <v-divider />
          <v-row class="mt-8 mb-4" justify="center">
            <v-btn
              color="blue darken-1"
              text
              to="/vue/profile"
            >
              プロフィール設定
            </v-btn>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
</template>

<script>
  export default {
    name: 'PasswordForm',
    data() {
      return {
        user: [],
        passwordForm: {
          old_password: '',
          password: '',
          password_confirmation: '',
        },
        passwordShow: false,
        passwordRules: {
          required: v => !!v || '入力は必須です',
          min: v => (v && v.length >= 8) || '8文字以上入力してください',
          same: v => v !== this.passwordForm.old_password || '現在のパスワードと同じです',
          confirm: v => v === this.passwordForm.password || 'パスワードが一致しません',
        },
        
      }
    },
    methods: {
      getUser() {
        axios.get('/users/get')
          .then((response) => {
            this.user = response.data.user
          })
      },
      change() {
        axios.put('/users/password', this.passwordForm)
          .then((response) => {
            if (response.status == 200) {
              this.$router.push('/')
            }
          })
      }
    },
    created() {
      this.getUser()
    }
  }
</script>