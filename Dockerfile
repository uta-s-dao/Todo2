FROM node:latest
#Dockerfileはテキストファイルであり、[イメージ]を作り上げるために実行する、
#コマンドライン命令をすべてこのふぁいるにふくめる
# From 以降の命令で使うベースイメージを指定


WORKDIR /var/www
#コンテナ内に作業ディレクトリをver/wwwを作ります
# 作業ディレクトリ
#以降に続くrun env コマンドを実行する場所として使う、作業ディレクトリを指定します。

RUN apt update && apt -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
#コンテナのビルド時に使用される命令の一つ

ENV LANG ja_JP.UTF-8ENV=LANGUAGE ja_JP:ja
ENV LC_ALL=ja_JP.UTF-8
ENV TZ=JST-9
ENV TERM=xterm

# Vimインストール
RUN apt install -y vim
#コンテナのビルド時に使用される命令の一つ


RUN npm install -g npm@latest && npm install create-next-app
#コンテナのビルド時に使用される命令の一つ
