@extends('base')

@section('body')
    @isset($bad_file)
        Файл не является фотографией
    @endisset

    <form method="POST" enctype="multipart/form-data">
        @csrf
        <label>
            Твоя фотография
            <input name="photo" type="file">
        </label>
        <input type="submit">
    </form>
@endsection
