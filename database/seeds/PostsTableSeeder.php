<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Post;

class PostsTableSeeder extends Seeder
{
    public function run()
    {
        factory(Post::class, 2000)
            ->create()
            ->each(function (Post $post) {
                $users_list = range(2, \App\User::count());  // ユーザー数分の連番リスト
                shuffle($users_list); // ランダムにいいねを生成するためシャッフル
                $favorite_count_list = array(0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 4, 5);
                $favorite_count = $favorite_count_list[array_rand($favorite_count_list, 1)];  // いいね数をランダムに決定
                $favorite_users = array_slice($users_list, 0, $favorite_count);  // リストの先頭からいいね数分ID取得
                foreach($favorite_users as $user_id) {
                    $post->users()->attach($user_id);  // 中間テーブルに紐づけていいねをつける
                }
            });
    }
}
