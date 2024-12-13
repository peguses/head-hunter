## Description

Head Hunter Demo.

## Project setup

```bash
$ npm install 
```
or 

```bash
$ npm install --legacy-peer-deps
```

## Compile and run the project

```bash
$ npm run start
```

## Run tests

### No unit test develop for the demo project

## Docker Setup

```bash
$ docker compose up -d
```
## Data Setup

### create two db schemas as tenant_1 & tenant_2
### Please excute shared DDLs scripts in src/sql/db.sql for tenant_1 & tenant_2
### Only execute DMLs for tenant_1 or tenant_2


## Sample APIs

#### pass x-tenant-id = 1 or 2 as http header in order to select tenent schama.

### Recruitment APIs

#### GET localhost:3000/recruitment: get all recruitment
#### GET localhost:3000/recruitment/1: get selected recruitment
#### UPDATE localhost:3000/recruitment/1: Update selected reqruitment

##### sampel request

```
{
   "offered_salary": 1234,
    "currency": "SE",
    "vacancy_reference": "12345553",
    "status": "RECRUTED"
}
```
### Reporting APis
#### POST localhost:3000/reporting generate repost

##### sample request

```
{
  "type": "MONEY_IN_PIPELINE",
  "params": {
      "tenantId": "1",
      "startDate": "2024-09-29",
      "endDate": "2024-10-01"
  }
}
```

### GET localhost:3000/reporting/PDF?name=money-in-pipe-2024-09-29-2024-10-01.json&type=MONEY_IN_PIPELINE: downaload report as PDF
### GET localhost:3000/reporting/JSON?name=money-in-pipe-2024-09-29-2024-10-01.json&type=MONEY_IN_PIPELINE: downaload report as JSON