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
        $songsList = [
            [ //  [Alexandros]の曲
            'artist_id' => 1,
            'name' => [
                'Adventure',
                'starrrrrrr feat.GEROCK',
                'Swan',
                '閃光',
                '月色ホライズン',
                'ワタリドリ',
                ]
            ],
            [ //  04 Limited Sazabysの曲
            'artist_id' => 2,
            'name' => [
                'swim',
                'Squall',
                'monolith',
                'Terminal',
                'fiction',
                'Kitchen',
                'Utopia',
                'knife',
                'Horizon',
                'escape',
                'climb',
                'Warp',
                'message',
                'midnight cruising',
                'Alien',
                'Buster call',
                ]
            ],
            [ //  10-FEETの曲
            'artist_id' => 3,
            'name' => [
                '1sec.',
                'RIVER',
                'ハローフィクサー',
                'その向こうへ',
                '2%',
                'super stomper',
                'goes on',
                '蜃気楼',
                'VIBES BY VIBES',
                '風',
                'STONE COLD BREAK',
                ]
            ],
            [ //  9mm Parabellum Bulletの曲
            'artist_id' => 4,
            'name' => [
                'ハートに火をつけて',
                'Black Market Blues',
                'Supernova',
                'Discommunication',
                'Cold Edge',
                'Punishment',
                ]
            ],
            [ //  a crowd of rebellionの曲
            'artist_id' => 5,
            'name' => [
                'M1917',
                'Nex:us',
                'The Crow',
                'Black Philosophy Bomb',
                ]
            ],
            [ //  a flood of circleの曲
            'artist_id' => 6,
            'name' => [
                '花',
                'ミッドナイト・クローラー',
                'Dancing Zombiez',
                'Beast Mode',
                'シーガル',
                ]
            ],
            [ //  AC / DCの曲
            'artist_id' => 7,
            'name' => [
                'Thunderstruck',
                'Back In Black',
                'Highway to Hell',
                ]
            ],
            [ //  Acid Black Cherryの曲
            'artist_id' => 8,
            'name' => [
                'イエス',
                'Black Cherry',
                '黒猫 ~Adult Black Cat~',
                ]
            ],
            [ //  ACIDMANの曲
            'artist_id' => 9,
            'name' => [
                '赤橙',
                'innocence',
                ]
            ],
            [ //  Adoの曲
            'artist_id' => 10,
            'name' => [
                '踊',
                '阿修羅ちゃん',
                'うっせぇわ',
                'ギラギラ',
                ]
            ],
            [ //  ASIAN KUNG-FU GENERATIONの曲
            'artist_id' => 16,
            'name' => [
                '遥か彼方',
                'リライト',
                'アフターダーク',
                'Re:Re:',
                'ブラッドサーキュレーター',
                'ソラニン',
                '未来の破片',
                ]
            ],
            [ //  ELLEGARDENの曲
            'artist_id' => 54,
            'name' => [
                'ジターバグ',
                'Missing',
                'Supernova',
                'スターフィッシュ',
                '風の日',
                'Make A Wish',
                'Space Sonic',
                'No.13',
                'TV Maniacs',
                ]
            ],
            [ //  KANA-BOONの曲
            'artist_id' => 86,
            'name' => [
                'シルエット',
                'ないものねだり',
                'フルドライブ',
                'Fighter',
                ]
            ],
            [ //  MONGOL800の曲
            'artist_id' => 111,
            'name' => [
                '小さな恋のうた',
                'あなたに',
                '月灯りの下で',
                ]
            ],
            [ //  ONE OK ROCKの曲
            'artist_id' => 132,
            'name' => [
                'The Beginning',
                '完全感覚Dreamer',
                'Clock Strikes',
                'Wherever you are',
                'Re:make',
                'C.h.a.o.s.m.y.t.h.',
                'Cry out',
                'Deeper Deeper',
                ]
            ],
            [ //  THE ORAL CIGARETTESの曲
            'artist_id' => 176,
            'name' => [
                '狂乱 Hey Kids!!',
                'BLACK MEMORY',
                'A-E-U-I',
                'カンタンナコト',
                'Uh...Man',
                ]
            ],
            [ //  スピッツの曲
            'artist_id' => 226,
            'name' => [
                'ロビンソン',
                '空も飛べるはず',
                'チェリー',
                ]
            ],
            [ //  マキシマム ザ ホルモンの曲
            'artist_id' => 239,
            'name' => [
                '恋のメガラバ',
                '「F」',
                '爪爪爪',
                '絶望ビリー',
                'シミ',
                "What's up, people?!",
                'え・い・り・あ・ん',
                'ロック番狂わせ',
                'Mrブギータンブリンマン',
                ]
            ],
            [ //  エレファントカシマシの曲
            'artist_id' => 202,
            'name' => [
                '今宵の月のように',
                '俺たちの明日',
                '桜の花、舞い上がる道を',
                '悲しみの果て',
                '風に吹かれて',
                ]
            ],
            [ //  Hi-STANDARDの曲
            'artist_id' => 75,
            'name' => [
                'STAY GOLD',
                'MY FIRST KISS',
                'MAXIMUM OVERDRIVE',
                'NEW LIFE',
                "CALIFORNIA DREAMIN'",
                ]
            ],
        ];

        foreach ($songsList as $songs) {
            foreach ($songs['name'] as $song) {
                Song::create(['name' => $song, 'artist_id' => $songs['artist_id']]);
            }
        }
    }
}
