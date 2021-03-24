FROM nginx

ARG DIST_FOLDER="./dist/job-hunter-frontend"

COPY ${DIST_FOLDER} /usr/share/nginx/html/