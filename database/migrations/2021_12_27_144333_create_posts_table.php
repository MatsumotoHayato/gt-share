<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedSmallInteger('song_id');
            $table->unsignedSmallInteger('instrument_id');
            $table->unsignedTinyInteger('experience')->nullable(); // 経験年数（0,1,2...年）
            $table->unsignedTinyInteger('score_easy');  // 簡単さ(1~5)
            $table->unsignedTinyInteger('score_copy');  // 耳コピしやすさ(1~5)
            $table->unsignedTinyInteger('score_memorize');  // 覚えやすさ(1~5)
            $table->unsignedTinyInteger('score_cost');  // 必要機材の揃えやすさ(1~5)
            $table->unsignedTinyInteger('score_enjoyment');  // 演奏時の楽しさ(1~5)
            $table->text('body');  // レビュー内容
            $table->string('url')->nullable(); // URL
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
