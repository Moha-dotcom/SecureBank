# Troubleshooting User Registration

## Problem
While registering users, we encountered two issues:
1. Duplicate UUID errors when inserting new users.
2. Routing number column too short in the database.

## Cause
- UUIDs were generated at the class level instead of per instance.
- The database column `routing_number` was `CHAR(5)`, smaller than the actual values.

## Solution
1. Moved `uuidv4()` into the User class constructor to ensure uniqueness per user.
2. Ensured `UserRepo.insertUser` is called only once per registration.
3. Updated database schema: `routing_number` column changed to `VARCHAR(30)` to accommodate full values.
4. Logged registration result after insertion.

## Result
User registration now works correctly, and no duplicate or overflow errors occur.
