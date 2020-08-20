![node](https://img.shields.io/badge/node-v14.8.0-green) ![npm](https://img.shields.io/badge/npm-v6.14.7-green)

# backend

backend repository

## 주요 dependency

node v14.8.0

npm v6.14.7

이외 node module은 package.json에 정의되어 있습니다.

## run server 

```bash
## docker db 설정 
git clone -b develop --single-branch https://github.com/42-jiphyeonjeon/server.git
docker build server/mariadb/. --tag mariadb_service
docker run -d --name jiphyeonjeon_db -p 3306:3306 mariadb_service

git clone https://github.com/42-jiphyeonjeon/backend.git
cd backend
npm install
node src/app.js # 또는 npm start
```

## 코드 포맷팅

[eslint](https://eslint.org/), [airbnb style guide](https://github.com/tipjs/javascript-style-guide)을 사용하였습니다.

``` bash 
npx eslint src/ # src 폴더의 코드 스타일 점검
npx eslint src/ --format codeframe # src 폴더의 코드 스타일 점검 및 세부 사항 출력
npx eslint src/ --fix # src 폴더의 코드 스타일을 점검 및 수정
```

single quote, tab size 등의 자잘한 이슈는 --fix 옵션으로 해결 가능합니다. 

코드를 푸쉬하기전에 npx eslint src/ 로 코드를 점검해주세요

