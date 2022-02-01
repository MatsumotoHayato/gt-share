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
            'post.score_easy' => 'required|integer|between:1,5',
            'post.score_copy' => 'required|integer|between:1,5',
            'post.score_memorize' => 'required|integer|between:1,5',
            'post.score_cost' => 'required|integer|between:1,5',
            'post.score_enjoyment' => 'required|integer|between:1,5',
            'post.body' => 'required|string|max:4000',
            'post.url' => 'nullable|url',
        ];
    }
}
