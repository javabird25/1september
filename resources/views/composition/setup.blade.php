@extends('base')

@section('head')
    <link rel="stylesheet" href="/css/compose.css">
@endsection

@section('body')
    <div class="result-wrapper">
        <img id="result" src="{{ $img_url }}">
    </div>
    <div class="frames">
        @foreach($frames_urls as $frame_url)
            <img src="{{ $frame_url }}" onclick="applyFrame(this)">
        @endforeach
    </div>
    <div class="send-wrapper">
        <button id="done" onclick="compositionDone()" disabled>Готово</button>
    </div>

    <div class="dialog-darken">
        <dialog>
            <a id="download" download="Фото с рамкой.png">Скачать</a>
        </dialog>
    </div>

    <script src="/js/compose.js"></script>
@endsection
