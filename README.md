# 平成ドロー

平成という時代の終わりに。

Inspired by https://twitter.com/trumpdraws


## Requirements

* nginx-proxy
* Visual Studio Code


## Depoly

Init.

```
git clone https://github.com/walkingmask/nonushuffler.walkingmask.tk.git
cd nonushuffler.walkingmask.tk
docker-compose up -d
```

Update.

```
cd nonushuffler.walkingmask.tk
git pull
docker-compose build
docker-compose restart
```


## Develop

Use VS Code devcontainer.
