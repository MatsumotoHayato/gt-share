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
            'name'     => 'テスト用',
            'email'    => 't@t.tt',
            'password' => \Hash::make('tttt1234'),
        ]);

        User::create([
            'name'      => 'HM',
            'email'     => 'hayatomatsumoto@hayato.matsumoto',
            'password'  => \Hash::make(substr(str_shuffle('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'), 0, 12)),
            'age'       => 20,
            'occupation'=> '学生（音楽系の部活・サークル所属）',
        ]);

        factory(User::class, 200)->create();
    }
}
