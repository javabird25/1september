<?php

namespace App\Http\Controllers;

use App\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

use function GuzzleHttp\Psr7\mimetype_from_filename;

class CompositionController extends Controller
{
    function uploadPhoto(Request $request)
    {
        $photos_disk = Storage::disk("photos");

        $image_path = $photos_disk->putFile("/", $request->file("photo"));

        $img_mime_type = mimetype_from_filename($image_path);
        if (!Str::contains($img_mime_type, 'image/'))
            return view("composition.upload", ["bad_file" => true]);

        $photo = new Photo([
            "id" => $image_path
        ]);
        $photo->save();


        return redirect()->route("composition.setup", ["id" => $image_path]);
    }

    function getSetupForm(Request $request) {
        $id = $request->input("id");
        if ($id == null)
            return redirect()->route("composition.upload");

        $img_url = Storage::disk("photos")->url($id);
        $frames_disk = Storage::disk("frames");
        $frames_urls = array_map(fn($path) => $frames_disk->url($path), $frames_disk->allFiles());
        return view("composition.setup", ["img_url" => $img_url, "frames_urls" => $frames_urls]);
    }
}
