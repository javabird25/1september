<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

use function GuzzleHttp\Psr7\mimetype_from_filename;

class CompositionController extends Controller
{
    function compose(Request $request)
    {
        $image_path = Storage::disk("temporary-photos")->putFile("/", $request->file("photo"));
        $img_mime_type = mimetype_from_filename($image_path);
        if (!Str::contains($img_mime_type, 'image/'))
            return view("composition.upload", ["bad_file" => true]);

        $img_url = Storage::disk("temporary-photos")->url($image_path);
        return view("composition.compose", ["img_url" => $img_url]);
    }
}
