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
        <button>Готово</button>
    </div>

    <script src="/js/compose.js"></script>
@endsection
