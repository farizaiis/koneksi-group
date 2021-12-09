
# Koneksi Group Test

#### HOW TO RUN IN LOCAL
- After clone this repo run npm install
- For create database ---> npx sequelize db:create  
- For migrate database ---> npx sequelize db:migrate

#### HOW TO RUN USING ENDPOIT HAS BEEN DEPLOYED
- Cek documentation for detail each Endpoint

#### HOW TO RUN UNIT TESTING
- After clone this repo run npm install
- If not installed Jest and Supertest, install manual for the devDependencies
- for create test database ---> npx cross-env NODE_ENV=test npx sequelize-cli db:create
- for migrate test database ---> npx cross-env NODE_ENV=test npx sequelize-cli db:migrate
- npm run test


Note : Screenshoot for every response endpoint at folder SS
