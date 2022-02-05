<template>
  <div>
    <v-container>
      <v-row>
        <p class="text-h5 font-weight-bold">あなたの投稿</p>
      </v-row>
      <v-data-iterator class="elevation-1" :items="posts">
        <template v-slot:header>
          <v-toolbar flat dark color="blue darken-3" class="mb-1">
            <v-toolbar-title>
              <v-icon>
                mdi-text-box
              </v-icon>
              レビュー一覧
            </v-toolbar-title>
            <v-divider class="ml-4 mr-12" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

        <template v-slot:default>
          <v-row>
            <v-col v-for="post in posts" :key="post.id" cols="12">
              <v-card>
                <v-row>
                  <v-col cols="4">
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>{{ post.song.name }} / {{ post.song.artist.name }}</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="6">
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>
                          楽器: {{ post.instrument.name }}
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          難易度: {{ post.difficulty }}
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          {{ post.updated_at }}
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          内容: {{ post.body }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'MyList',
    data() {
      return {
        posts: [],
        user: [],
        dialog: false,
      }
    },
    methods: {
      getPosts() {
        axios.get('/myposts')
          .then((response) => {
            this.posts = response.data.posts,
              this.user = response.data.user
          })
      }
    },
    created() {
      this.getPosts()
    }
  }
</script>
