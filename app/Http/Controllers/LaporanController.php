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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $laporan = Laporan::create($request->all());

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
     * Show the form for editing the specified resource.
     */
    public function edit(Laporan $laporan)
    {
        //
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
}