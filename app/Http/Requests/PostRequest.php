<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'post.instrument_id' => 'required|integer',
            'post.experience' => 'required|integer|between:0,100',
            'post.difficulty' => 'required|integer|between:1,5',
            'post.body' => 'required|string|max:1000',
            'post.url' => 'nullable|url',
        ];
    }
    
    public function messages()
    {
        return [
            'post.instrument_id.integer' => '楽器を選択してください',
            'post.experience.required'=> '半角数字を入力してください',
            'post.experience.integer' => '半角数字を入力してください',
            'post.experience.between' => '0~100の半角数字を入力してください',
            'post.difficulty.integer' => '難易度を選択してください',
            'post.body.required' => '感想を入力してください',
            'post.body.max' => '文字数が多すぎます',
            'post.url.url' => 'URLを正しく入力してください',
        ];
    }
}
