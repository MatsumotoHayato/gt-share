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
            'post.body' => 'required|string|max:4000',
            'post.url' => 'nullable|url',
        ];
    }
    
    public function messages()
    {
        return [
            'post.instrument_id.integer' => '楽器 は必須です',
            'post.difficulty.integer' => '難易度 は必須です',
        ];
    }
}
