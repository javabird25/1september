@extends('base')

@section('title')Викторина@endsection

@section('head')
    <link rel="stylesheet" href="/css/quiz.css">
@endsection

@section('body')
    <div class='embed-container'><iframe src='https://www.youtube.com/embed/dQw4w9WgXcQ' frameborder='0' allowfullscreen></iframe></div>
    <div class='embed-container'><iframe src='https://www.youtube.com/embed/dQw4w9WgXcQ' frameborder='0' allowfullscreen></iframe></div>
    <div class='embed-container'><iframe src='https://www.youtube.com/embed/dQw4w9WgXcQ' frameborder='0' allowfullscreen></iframe></div>
    <div class='embed-container'><iframe src='https://www.youtube.com/embed/dQw4w9WgXcQ' frameborder='0' allowfullscreen></iframe></div>

    <checker>
        Число:
        <input type="number" maxlength="1">
        <message class="correct">Правильно! Молодец!</message>
        <message class="wrong">Извини, не угадал! Посмотри ролики ещё раз, чтобы узнать правильный ответ!</message>
        <button onclick="checkNumber()">Проверить</button>
    </checker>

    <script src="/js/checker.js"></script>
@endsection
