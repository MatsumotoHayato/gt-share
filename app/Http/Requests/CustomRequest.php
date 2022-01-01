<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'artist.name' => 'required|string|max:50|unique:artists,name',
            'song.name' => 'required|string|max:100|unique:songs,name',
            'post.instrument_id' => 'required|integer',
            'post.experience' => 'required|integer|between:0,100',
            'post.difficulty' => 'required|integer|between:1,5',
            'post.body' => 'required|string|max:1000',
        ];
    }
    
    public function messages()
    {
        return [
            'artist.name.required' => '文字を入力してください。',
            'artist.name.string' => '文字を入力してください。',
            'artist.name.max' => '文字が長すぎます。',
            'artist.name.unique' => '同じアーティスト名が登録済みです。',
            
            'song.name.required' => '文字を入力してください。',
            'song.name.string' => '文字を入力してください。',
            'song.name.max' => '文字が長すぎます。',
            'song.name.unique' => '同じ曲名が登録済みです。',
            
            'post.instrument_id.integer' => '楽器を選択してください。',
            'post.experience.required'=> '0~100の半角数字を入力してください。',
            'post.experience.integer' => '0~100の半角数字を入力してください。',
            'post.difficulty.integer' => '難易度を選択してください。',
            'post.body.required' => '感想を入力してください。',
            'post.body.max' => '文字数が多すぎます。',
        ];
    }
}
