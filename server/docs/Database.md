# LostAndFound Database Documentation

## Schema

Below is how each schema is defined in the database.

### User

| Column | Properties | Type | Foreign Key |
| --- | --- | --- | --- |
| id | `NOT NULL` `PRIMARY KEY` | bigint | |
| email | `NOT NULL` | varchar | |
| full_name | `NOT NULL` | varchar | |
| username | `NOT NULL` | varchar | |
| password | `NOT NULL` | varchar | |
| contact_info | | varchar | |
| created_at | `NOT NULL` | timestamp | |
| updated_at | `NOT NULL` | timestamp | |

### Post

| Column | Properties | Type | Foreign Key |
| --- | --- | --- | --- |
| id | `NOT NULL` `PRIMARY KEY` | bigint | |
| author | `NOT NULL` `FOREIGN KEY`| bigint | [User](#user): id |
| title | `NOT NULL` | varchar | |
| description | `NOT NULL` | text | |
| image | | varchar | |
| location | `NOT NULL` `FOREIGN KEY` | bigint | [Location](#location): id |
| compensation | `NOT NULL` | double | |
| created_at | `NOT NULL` | timestamp | |
| updated_at | `NOT NULL` | timestamp | |

### Location

| Column | Properties | Type | Foreign Key |
| --- | --- | --- | --- |
| id | `NOT NULL` `PRIMARY KEY` | bigint | |
| latitude | `NOT NULL` | double | |
| longitude | `NOT NULL` | double | |
