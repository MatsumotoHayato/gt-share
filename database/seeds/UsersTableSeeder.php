<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name'      => '管理人',
            'email'     => 'k458253@kansai-u.ac.jp',
            'password'  => \Hash::make('TemporaryPassword'),
            'age'       => 20,
            'occupation'=> '学生（音楽系の部活・サークル所属）',
        ]);
        
        User::create([
            'name'     => 'テスト用',
            'email'    => 't@t.tt',
            'password' => \Hash::make('tttt1234'),
        ]);
        
        factory(User::class, 200)->create();
    }
}
