<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    /**
     * Get list of all users/mahasiswa
     */
    public function index()
    {
        // Get all users except admin, or if role is not defined, get all
        $mahasiswa = User::where('role', '!=', 'admin')
            ->orWhereNull('role')
            ->get();
            
        return response()->json([
            'message' => 'success',
            'data' => $mahasiswa
        ]);
    }
}
