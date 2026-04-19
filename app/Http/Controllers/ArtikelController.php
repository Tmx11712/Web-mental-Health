<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use Illuminate\Http\Request;

class ArtikelController extends Controller
{
    /**
     * Display a listing of published articles.
     */
    public function index()
    {
        $articles = Artikel::where('published', 1)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($articles);
    }

    /**
     * Display the specified article by slug.
     */
    public function show($slug)
    {
        $article = Artikel::where('slug', $slug)
            ->where('published', 1)
            ->first();

        if (!$article) {
            return response()->json(['message' => 'Artikel tidak ditemukan'], 404);
        }

        return response()->json($article);
    }
}
