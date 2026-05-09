<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Laporan::all();

        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'nullable|string|max:255',
            'nim' => 'nullable|string|max:255',
            'jenis' => 'required|string|max:255',
            'level' => 'required|string|max:255',
            'cerita' => 'required|string',
            'email' => 'nullable|email|max:255',
        ]);

        // If user is authenticated via Sanctum token, attach user_id
        if ($user = auth('sanctum')->user()) {
            $validated['user_id'] = $user->id;
        }

        $laporan = Laporan::create($validated);

        return response()->json([
            'message' => 'success',
            'data' => $laporan
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Laporan $laporan)
    {
        return response()->json($laporan);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Laporan $laporan)
    {
        // Authorization check
        $user = auth('sanctum')->user();
        if (!$user || ($laporan->user_id !== $user->id && $user->role !== 'admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'nama' => 'nullable|string|max:255',
            'nim' => 'nullable|string|max:255',
            'jenis' => 'sometimes|required|string|max:255',
            'level' => 'sometimes|required|string|max:255',
            'cerita' => 'sometimes|required|string',
            'email' => 'nullable|email|max:255',
        ]);

        $laporan->update($validated);

        return response()->json([
            'message' => 'updated',
            'data' => $laporan
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Laporan $laporan)
    {
        // Authorization check
        $user = auth('sanctum')->user();
        if (!$user || ($laporan->user_id !== $user->id && $user->role !== 'admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $laporan->delete();

        return response()->json([
            'message' => 'deleted'
        ]);
    }

    /**
     * Get reports belonging to the authenticated user.
     */
    public function myReports(Request $request)
    {
        $laporan = Laporan::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($laporan);
    }

    /**
     * Update the status and counselor notes of the report (Admin only)
     */
    public function updateStatus(Request $request, $id)
    {
        $laporan = Laporan::findOrFail($id);
        
        $request->validate([
            'status' => 'required|in:baru,diproses,selesai',
            'catatan_konselor' => 'nullable|string',
        ]);

        $laporan->update([
            'status' => $request->status,
            'catatan_konselor' => $request->catatan_konselor,
        ]);

        return response()->json([
            'message' => 'Status updated successfully',
            'data' => $laporan
        ]);
    }
}