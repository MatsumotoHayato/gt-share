<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Song;

class SongsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // [Alexandros]の曲
        $songs1 = [
            'I want u to love me',
            'Aoyama',
            '明日、またGOLD LYLIC',
            'Adventure',
            'アルペジオ',
            '言え',
            '今まで君が泣いた分取り戻そう',
            'Oblivion',
            'Kaiju',
            'Girl A',
            'Kick&Spin',
            'Kids',
            'Cat 2',
            "can't explain",
            'Kill Me If You Can',
            'Thunder',
            'city',
            '12/26以降の年末ソング',
            'starrrrrrr feat.GEROCK',
            'Stimulator',
            'SNOW SOUND',
            'spy',
            'Swan',
            '閃光',
            '月色ホライズン',
            'This Is Teenage',
            'Travel',
            'Dog 3',
            'Dracula La',
            'Droshky!',
            '涙がこぼれそう',
            'Nawe, Nawe',
            'NEW WALL',
            'Buzz Off!',
            'Feel like',
            'Famous Day',
            'Forever Young',
            'For Freedom',
            'Boo!',
            'ムーンソング',
            "You're So Sweet & I Love You",
            'Rise',
            'Run Away',
            'Leaving Grapefruits',
            'ワタリドリ',
            'Wanna Get Out',
            "ワンテンポ遅れたMonster ain't dead",
        ];
        foreach ($songs1 as $song) {
            Song::create(['name' => $song, 'artist_id' => 1]);
        }
        
        $songs2 = [
            'swim',
            'Squall',
            'soup',
            'monolith',
            'Terminal',
            'Just',
            'My HERO',
            'fade',
            'Letter',
            'fiction',
            'Milestone',
            'Now here, No where',
            'Kitchen',
            'Utopia',
            'knife',
            'milk',
            'nem...',
            'Horizon',
            'Galapagos',
            'Montage',
            'escape',
            'climb',
            'Warp',
            'Lost my way',
            'Give me',
            'Feel',
            'message',
            'midnight cruising',
            'hello',
            'cubic',
            'Alien',
            'Jumper',
            'Do it Do it',
            'Chicken race',
            'drops',
            'Puzzle',
            'Grasshopper',
            'eureka',
            'mahoroba',
            '夕凪',
            'Brain sugar',
            'Buster call',
            'Night on',
            'Any',
            'Cycle',
            'medley',
            'Higher',
            'happiness',
            'days',
            'me?',
            'discord',
            'Standing here',
            'Wednesday',
            'memory lane',
            'Shine',
            'Touch your shape',
            'Telepathy',
            'labyrinth',
            'in out',
            'Password',
            'paradise',
            'teleport',
            'bless you',
            'Remember',
            'sacrifice',
            'fog',
            'ghost',
            'imaginary',
            'compact karma',
            'No way',
            'Sleepwalking',
            'MONSTER',
            'Silly Song',
            'My Life',
            'capture',
        ];
        foreach ($songs2 as $song) {
            Song::create(['name' => $song, 'artist_id' => 2]);
        }
        
        $songs3 = [
            '1sec.',
            'RIVER',
            'ハローフィクサー',
            'その向こうへ',
            'アオ',
            'ヒトリセカイ',
            '2%',
            'シエラのように',
            'super stomper',
            'アンテナラスト',
            'goes on',
            'Fin',
            '蜃気楼',
            'VIBES BY VIBES',
            '太陽4号',
            'hammer ska',
            '風',
            '月 ~sound jammer せやな~',
            '火とリズム',
            'nil?',
            'ライオン',
            '1 size FITS ALL',
            'SHOES',
            'STONE COLD BREAK',
            'JUNGLES',
            'JUST A FALSE! JUST A HOLE!',
        ];
        foreach ($songs3 as $song) {
            Song::create(['name' => $song, 'artist_id' => 3]);
        }
    }
}
