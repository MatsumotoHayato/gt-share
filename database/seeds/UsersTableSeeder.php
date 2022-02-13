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
        $random_password = substr(str_shuffle('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'), 0, 12);
        User::create([
            'name'     => 'FirstUser',
            'email'    => 'firstuser@first.user',
            'password' => \Hash::make($random_password),
        ]);
        
        $random_password = substr(str_shuffle('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'), 0, 12);
        User::create([
            'name'      => 'HM',
            'email'     => 'hayatomatsumoto@hayato.matsumoto',
            'password'  => \Hash::make($random_password),
            'age'       => 20,
            'occupation'=> '学生（音楽系の部活・サークル所属）',
        ]);
        
        User::create([
            'name'     => 'テスト用',
            'email'    => 't@t.tt',
            'password' => \Hash::make('tttt1234'),
        ]);
    }
}
