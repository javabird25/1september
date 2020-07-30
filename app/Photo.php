<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ["id"];
}
