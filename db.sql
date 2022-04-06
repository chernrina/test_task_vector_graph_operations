DROP DATABASE IF EXISTS test_task;

DROP USER IF EXISTS test_user_postgres;
CREATE USER test_user_postgres WITH PASSWORD 'user';

CREATE DATABASE test_task OWNER test_user_postgres;
