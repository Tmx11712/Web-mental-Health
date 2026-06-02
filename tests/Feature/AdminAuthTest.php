<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminAuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a default admin user
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@umsu.ac.id',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create a regular user
        User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);
    }

    /**
     * Test admin can login with email.
     */
    public function test_admin_can_login_with_email(): void
    {
        $response = $this->postJson('/api/admin/login', [
            'username' => 'admin@umsu.ac.id',
            'password' => 'password',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'token',
                'user' => [
                    'id',
                    'name',
                    'email',
                    'role',
                ],
            ]);
    }

    /**
     * Test admin can login with username (name).
     */
    public function test_admin_can_login_with_username(): void
    {
        $response = $this->postJson('/api/admin/login', [
            'username' => 'Administrator',
            'password' => 'password',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['token', 'user']);
    }

    /**
     * Test login fails with wrong password.
     */
    public function test_admin_login_fails_with_wrong_password(): void
    {
        $response = $this->postJson('/api/admin/login', [
            'username' => 'admin@umsu.ac.id',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Username/Email atau password salah, atau Anda bukan admin.'
            ]);
    }

    /**
     * Test regular user cannot login to admin panel.
     */
    public function test_regular_user_cannot_login_as_admin(): void
    {
        $response = $this->postJson('/api/admin/login', [
            'username' => 'user@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Username/Email atau password salah, atau Anda bukan admin.'
            ]);
    }
}
