<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Polling;
use App\Models\PollingOption;

class PollingController extends Controller
{
    /**
     * Get the active polling with its options and total votes.
     */
    public function getActivePolling()
    {
        $polling = Polling::with('options')->where('is_active', true)->first();

        if (!$polling) {
            return response()->json(['message' => 'Tidak ada polling aktif'], 404);
        }

        $total_votes = $polling->options->sum('jumlah_vote');

        return response()->json([
            'data' => [
                'id' => $polling->id,
                'pertanyaan' => $polling->pertanyaan,
                'total_votes' => $total_votes,
                'opsi' => $polling->options
            ]
        ]);
    }

    /**
     * Submit a vote for a polling option.
     */
    public function vote(Request $request, $id)
    {
        $request->validate([
            'polling_option_id' => 'required|exists:polling_options,id'
        ]);

        $polling = Polling::findOrFail($id);

        if (!$polling->is_active) {
            return response()->json(['message' => 'Polling ini sudah tidak aktif'], 400);
        }

        $option = PollingOption::where('id', $request->polling_option_id)
            ->where('polling_id', $id)
            ->firstOrFail();

        $option->increment('jumlah_vote');

        return response()->json([
            'message' => 'Vote berhasil disimpan'
        ]);
    }

    /**
     * Create a new polling (Admin only).
     */
    public function store(Request $request)
    {
        // Simple admin check
        if ($request->user() && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'pertanyaan' => 'required|string|max:255',
            'is_active' => 'boolean',
            'opsi' => 'required|array|min:2',
            'opsi.*' => 'required|string|max:255'
        ]);

        // Deactivate other active polls if this one is active
        if ($request->input('is_active', true)) {
            Polling::where('is_active', true)->update(['is_active' => false]);
        }

        $polling = Polling::create([
            'pertanyaan' => $validated['pertanyaan'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        foreach ($validated['opsi'] as $opsiText) {
            $polling->options()->create([
                'teks_opsi' => $opsiText,
                'jumlah_vote' => 0
            ]);
        }

        return response()->json([
            'message' => 'Polling created successfully',
            'data' => $polling->load('options')
        ], 201);
    }
}
