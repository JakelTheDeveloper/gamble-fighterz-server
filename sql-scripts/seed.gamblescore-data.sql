-- First, remove the table if it exists
BEGIN;
DROP TABLE IF EXISTS gamblescore_data;

-- Create the table anew
CREATE TABLE gamblescore_data (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    username TEXT NOT NULL,
    score INTEGER NOT NULL
);

COMMIT;
        