<template>
    <v-card class="mx-auto elevation-4" color="grey lighten-5" max-width="488">
      <v-card-title class="pa-8">
        <div class="text-h5 font-weight-bold">プロフィール設定</div>
      </v-card-title>
      <v-form ref="form">
        <v-card-text style="max-width:424px" class="mx-auto">
          <v-row class="my-4">
            <v-text-field
              v-model="user.name"
              :rules="[nameRules.required]"
              validate-on-blur
              outlined
              label="ユーザー名"
            ></v-text-field>
          </v-row>
          <v-row class="my-4">
            <v-text-field
              v-model="user.email"
              :rules="[emailRules.required, emailRules.regex]"
              validate-on-blur
              outlined
              label="メールアドレス"
            ></v-text-field>
          </v-row>
          <v-row class="my-4">
            <v-select
              v-model="user.age"
              :items="ageList"
              item-text="text"
              item-value="value"
              label="年齢"
              outlined
            ></v-select>
          </v-row>
          <v-row class="my-4">
            <v-select
              v-model="user.occupation"
              :items="occupationList"
              item-text="text"
              item-value="value"
              label="職業"
              outlined
            ></v-select>
          </v-row>
          <v-row class="mt-12 mb-8">
            <v-btn class="text-subtitle-1" color="primary" height="56" block @click="edit">
              更新
            </v-btn>
          </v-row>
          <v-divider />
          <v-row class="mt-8 mb-4" justify="center">
            <v-btn
              color="blue darken-1"
              text
              to="/vue/password"
            >
              パスワード変更
            </v-btn>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
</template>

<script>
  export default {
    name: 'ProfileEdit',
    data() {
      return {
        user: [],
        ageList: [
          { text: '非公開', value: null },
          { text: '10代', value: 10 },
          { text: '20代', value: 20 },
          { text: '30代', value: 30 },
          { text: '40代', value: 40 },
          { text: '50代', value: 50 },
          { text: '60代', value: 60 },
          { text: '70代', value: 70 },
          { text: '80代', value: 80 },
          { text: '90代', value: 90 },
        ],
        occupationList: [
          { text: '非公開', value: null },
          { text: 'ミュージシャン', value: 'ミュージシャン' },
          { text: '社会人', value: '社会人' },
          { text: '社会人（音楽関係）', value: '社会人（音楽関係）' },
          { text: '学生', value: '学生' },
          { text: '学生（音楽系の部活・サークル所属）', value: '学生（音楽系の部活・サークル所属）' },
          { text: '無職', value: '無職' },
        ],
        nameRules: {
          required: v => !!v || '入力は必須です',
        },
        emailRules: {
          required: v => !!v || '入力は必須です',
          regex: v => /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'メールアドレスの形式が違います',
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
      edit() {
        axios.put('/users/profile', this.user)
          .then((response) => {
            if (response.status == 200) {
              this.getUser()
            }
          })
      }
    },
    mounted() {
      this.getUser()
    }
  }
</script>