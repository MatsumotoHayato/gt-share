<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SongRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'song.name' => 'required|string|max:100|unique:songs,name',
        ];
    }
    
    public function messages()
    {
        return [
            'song.name.required' => '文字を入力してください',
            'song.name.string' => '文字を入力してください',
            'song.name.max' => '文字が長すぎます',
            'song.name.unique' => '同じ曲名が登録済みです',
        ];
    }
}
