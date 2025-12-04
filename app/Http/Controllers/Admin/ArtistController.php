<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Artist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $artists = Artist::withCount('products')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Artists/Index', [
            'artists' => $artists
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Artists/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:artists,email',
            'phone' => 'required|string|max:20',
            'username' => 'required|string|max:100|unique:artists,username',
            'country' => 'required|string|max:100',
            'address' => 'nullable|string|max:500',
            'profile_image' => 'nullable|url|max:500',
            'bio' => 'nullable|string',
            'social_links' => 'nullable|json',
            'is_active' => 'boolean',
        ]);

        Artist::create([
            'name' => $request->full_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'username' => $request->username,
            'country' => $request->country,
            'address' => $request->address,
            'profile_image' => $request->profile_image,
            'bio' => $request->bio,
            'social_links' => $request->social_links ? json_decode($request->social_links) : null,
            'is_active' => $request->is_active ?? true,
        ]);

        return redirect()->route('admin.artists.index')
            ->with('success', 'Artist created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Artist $artist)
    {
        $artist->load(['products']);

        return Inertia::render('Admin/Artists/Show', [
            'artist' => $artist
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Artist $artist)
    {
        $artist->loadCount('products');
        
        return Inertia::render('Admin/Artists/Edit', [
            'artist' => $artist
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Artist $artist)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:artists,email,' . $artist->id,
            'phone' => 'required|string|max:20',
            'username' => 'required|string|max:100|unique:artists,username,' . $artist->id,
            'country' => 'required|string|max:100',
            'address' => 'nullable|string|max:500',
            'profile_image' => 'nullable|url|max:500',
            'bio' => 'nullable|string',
            'social_links' => 'nullable|json',
            'is_active' => 'boolean',
        ]);

        $artist->update([
            'name' => $request->full_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'username' => $request->username,
            'country' => $request->country,
            'address' => $request->address,
            'profile_image' => $request->profile_image,
            'bio' => $request->bio,
            'social_links' => $request->social_links ? json_decode($request->social_links) : null,
            'is_active' => $request->is_active ?? true,
        ]);

        return redirect()->route('admin.artists.index')
            ->with('success', 'Artist updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Artist $artist)
    {
        $artist->delete();

        return redirect()->route('admin.artists.index')
            ->with('success', 'Artist deleted successfully.');
    }
}
