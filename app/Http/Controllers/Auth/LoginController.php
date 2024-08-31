<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function index(): \Inertia\Response
    {
        return inertia('Auth/Login');
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        $isValid = auth()->guard()->attempt($request->only('email', 'password'), $request->boolean('remember'));
        if (!$isValid) {
            return back()->withErrors([
                'email' => __('auth.failed')
            ]);
        }

        $request->session()->regenerate();

        return redirect('/');
    }
}
