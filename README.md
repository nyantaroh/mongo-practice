# MongoDB 練習

Docker の実行をローカルでおこなったうえで node index.js で接続確認する。

## Commands

docker run -d \
--name mongo-practice \
-p 27017:27017 \
mongo
