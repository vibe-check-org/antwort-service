CREATE ROLE answer_db_user LOGIN PASSWORD 'VibeCheck10.05.2025';

CREATE DATABASE answer_db;

GRANT ALL ON DATABASE answer_db TO answer_db_user;

CREATE TABLESPACE answerspace OWNER answer_db_user LOCATION '/var/lib/postgresql/tablespace/answer';