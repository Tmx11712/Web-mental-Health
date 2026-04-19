<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = \App\Models\User::where('name', $request->username)
            ->where('role', 'admin')
            ->first();

        if (!$user || !\Illuminate\Support\Facades\Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Username atau password salah, atau Anda bukan admin.'
            ], 401);
        }

        $token = $user->createToken('admin_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'data' => $request->user()
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
