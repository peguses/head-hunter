CREATE TABLE recruitment (
  id SERIAL PRIMARY KEY,
  offered_salary NUMERIC(10,2),
  offered_currency VARCHAR(255),
  vacancy_reference VARCHAR(255),
  status VARCHAR(20),
  lastUpdate date,
  createDate date default now()
);


CREATE TABLE vacancy_parameters (

  vacancy_reference VARCHAR(255) unique not null,
  name VARCHAR(255),
  contract_type VARCHAR(20),
  job_type VARCHAR(20),
  location_id int,
  max_salary NUMERIC(10,2),
  min_salary NUMERIC(10,2),
  currency VARCHAR(10),
  hourly_rate NUMERIC(10,2),
  weekly_rate NUMERIC(10,2),
  monthly_rate NUMERIC(10,2),
  job_description JSONB,
  lastUpdate date,
  createDate date default now()
  
);


CREATE TABLE client (
  client_reference VARCHAR(255),
  name VARCHAR(255),
  finance_email VARCHAR(255)
);


ALTER TABLE recruitment
ADD FOREIGN KEY (vacancy_reference) REFERENCES vacancy_parameters(vacancy_reference);


INSERT INTO tenant_1.client
(client_reference, "name", finance_email)
VALUES('1234', 'my_client_1', 'my_client_1@gmail.com');

INSERT INTO tenant_1.vacancy_parameters
(vacancy_reference, "name", contract_type, job_type, location_id, max_salary, min_salary, currency, hourly_rate, weekly_rate, monthly_rate, job_description, lastupdate, createdate)
VALUES('1234', 'SSE', 'FULL_TIME', 'REMOTE', 11, 3500.00, 2500.00, 'usd', NULL, NULL, NULL, '{}'::jsonb, NULL, '2024-10-01');

INSERT INTO tenant_1.recruitment
(id, offered_salary, offered_currency, vacancy_reference, status, last_update, create_date)
VALUES(1, 650000.00, 'lkr', '1234', 'RECRUTED', '2024-10-01', '2024-10-01');