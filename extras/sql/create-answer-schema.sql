    --    psql --dbname=bitnami_keycloak --username=bn_keycloak --file=/sql/answer/create-answer-db.sql
    --    psql --dbname=answer_db --username=answer_db_user --file=/sql/answer/create-answer-schema.sql

CREATE SCHEMA IF NOT EXISTS answer_schema AUTHORIZATION answer_db_user;

ALTER ROLE answer_db_user SET search_path = 'answer_schema';