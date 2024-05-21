<?php
// database/seeders/TaskSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    public function run()
    {
        Task::create([
            'title' => 'Task 1',
            'description' => 'Description for Task 1',
            'due_date' => '2024-05-30',
            'status' => 'Active',
        ]);

        Task::create([
            'title' => 'Task 2',
            'description' => 'Description for Task 2',
            'due_date' => '2024-06-15',
            'status' => 'Expired',
        ]);
    }
}

