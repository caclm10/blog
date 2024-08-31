<?php

use Illuminate\Support\Facades\Route;

Route::get('hello-world', function () {
    return inertia('HelloWorld');
});
