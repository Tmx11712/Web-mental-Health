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
        $data = $request->all();

        // If user is authenticated via Sanctum token, attach user_id
        if ($user = auth('sanctum')->user()) {
            $data['user_id'] = $user->id;
        }

        $laporan = Laporan::create($data);

        return response()->json([
            'message' => 'success',
            'data' => $laporan
        ]);
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
        $laporan->update($request->all());

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