# Node.js 최신 LTS 버전 사용
FROM node:lts

# 작업 디렉토리 생성
WORKDIR /app

# 의존성 설치를 위해 package.json과 package-lock.json 복사
COPY package*.json ./

RUN npm install

# 앱 소스 코드 복사
COPY . .

# 프로덕션 환경이라면 빌드 수행 (필요에 따라 주석 해제)
# RUN npm run build

# 앱 실행
CMD ["npm", "start"]

# 필요한 경우 포트 노출
EXPOSE 3000
