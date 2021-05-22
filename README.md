# 平成ドロー

平成という時代の終わりに。

Inspired by https://twitter.com/trumpdraws


## Requirements

* nginx-proxy
* Visual Studio Code


## Depoly

Init.

```
git clone https://github.com/walkingmask/heiseidraw.walkingmask.tk.git
cd heiseidraw.walkingmask.tk
git checkout fastapi
docker-compose up -d
```

Update.

```
cd heiseidraw.walkingmask.tk
git pull
docker-compose build
docker-compose restart
```


## Develop

Use VS Code devcontainer.
