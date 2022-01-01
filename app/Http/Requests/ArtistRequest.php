<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArtistRequest extends FormRequest
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
        ];
    }
    
    public function messages()
    {
        return [
            'artist.name.required' => '文字を入力してください',
            'artist.name.string' => '文字を入力してください',
            'artist.name.max' => '文字が長すぎます',
            'artist.name.unique' => '同じアーティスト名が登録済みです',
        ];
    }
}
