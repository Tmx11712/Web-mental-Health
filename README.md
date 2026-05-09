# Web Mental Health

A web-based platform for mental health support and resources.

## Admin Credentials

You can use the following credentials to access the administrative dashboard:

- **Email:** `admin@umsu.ac.id`
- **Password:** `password`

## Regular User Credentials

- **Email:** `user@example.com`
- **Password:** `password`

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tmx11712/Web-mental-Health.git
   ```
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. Install JS dependencies:
   ```bash
   npm install
   ```
4. Copy environment file:
   ```bash
   cp .env.example .env
   ```
5. Generate application key:
   ```bash
   php artisan key:generate
   ```
6. Run migrations and seeders:
   ```bash
   php artisan migrate --seed
   ```
7. Start the development server:
   ```bash
   php artisan serve
   ```
