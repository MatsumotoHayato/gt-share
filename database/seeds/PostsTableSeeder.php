<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Post;

class PostsTableSeeder extends Seeder
{
    public function run()
    {
        factory(Post::class, 3000)
            ->create()
            ->each(function (Post $post) {
                $users_list = range(1, \App\User::count());  // ユーザー数分の連番リスト
                shuffle($users_list); // ランダムにいいねを生成するためシャッフル
                $favorite_users = array_slice($users_list, 0, random_int(0, 5));  // リストの先頭から0~5個ID取得
                foreach($favorite_users as $user_id) {
                    $post->users()->attach($user_id);  // 中間テーブルに紐づけていいねをつける
                }
            });
    }
}
