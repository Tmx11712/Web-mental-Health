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

    /**
     * Store a newly created article in storage (Admin).
     */
    public function store(Request $request)
    {
        // Simple admin check
        if ($request->user() && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:artikel,slug',
            'kategori' => 'required|string|max:255',
            'emoji' => 'nullable|string|max:50',
            'ringkasan' => 'nullable|string',
            'konten' => 'required|string',
            'waktu_baca' => 'nullable|string|max:255',
            'penulis' => 'nullable|string|max:255',
            'published' => 'boolean',
        ]);

        $article = Artikel::create($validated);

        return response()->json([
            'message' => 'Artikel created successfully',
            'data' => $article
        ], 201);
    }

    /**
     * Update the specified article in storage (Admin).
     */
    public function update(Request $request, $id)
    {
        // Simple admin check
        if ($request->user() && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $article = Artikel::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:artikel,slug,' . $article->id,
            'kategori' => 'sometimes|required|string|max:255',
            'emoji' => 'nullable|string|max:50',
            'ringkasan' => 'nullable|string',
            'konten' => 'sometimes|required|string',
            'waktu_baca' => 'nullable|string|max:255',
            'penulis' => 'nullable|string|max:255',
            'published' => 'boolean',
        ]);

        $article->update($validated);

        return response()->json([
            'message' => 'Artikel updated successfully',
            'data' => $article
        ]);
    }

    /**
     * Remove the specified article from storage (Admin).
     */
    public function destroy(Request $request, $id)
    {
        // Simple admin check
        if ($request->user() && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $article = Artikel::findOrFail($id);
        $article->delete();

        return response()->json([
            'message' => 'Artikel deleted successfully'
        ]);
    }
}
