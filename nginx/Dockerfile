# Nginx 공식 이미지를 베이스로 사용
FROM nginx:alpine

# 기본 nginx 설정 파일 제거
RUN rm /etc/nginx/conf.d/default.conf

# 커스텀 nginx 설정 파일 복사
COPY ./myconfig1.conf /etc/nginx/conf.d/

# 작업 디렉토리 설정
WORKDIR /usr/share/nginx/html

# 호스트의 현재 디렉토리의 파일들을 컨테이너의 작업 디렉토리로 복사
COPY . .

# 80 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
