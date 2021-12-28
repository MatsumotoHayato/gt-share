<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Instrument;

class InstrumentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $instruments = [
            'エレキギター',
            'アコースティックギター',
            'ベース',
            'ドラム',
            'キーボード',
            'その他',
        ];
        
        foreach ($instruments as $instrument) {
            Instrument::create(['name' => $instrument]);
        }
    }
}
