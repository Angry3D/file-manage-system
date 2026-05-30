
Application created by [ThinkJS](http://www.thinkjs.org)

## Install dependencies

```
npm install
```

## Start server

```
npm start
```

## Configuration

Server configuration can be overridden with environment variables.

| Variable | Default | Description |
| --- | --- | --- |
| `BABYLIFE_SERVER_PORT` | `20000` | API server port. |
| `BABYLIFE_DB_HOST` | `127.0.0.1` | MySQL host. |
| `BABYLIFE_DB_PORT` | `3306` | MySQL port. |
| `BABYLIFE_DB_NAME` | `db_babylife` | MySQL database name. |
| `BABYLIFE_DB_PREFIX` | `admin_` | MySQL table prefix. |
| `BABYLIFE_DB_USER` | `root` | MySQL user. |
| `BABYLIFE_DB_PASSWORD` | empty | MySQL password. Set this outside source control. |
| `BABYLIFE_DB_ENCODING` | `utf8` | MySQL connection encoding. |
| `BABYLIFE_DB_CHARSET` | `utf8mb4` | MySQL connection charset. |
| `BABYLIFE_UPLOAD_DIR` | development: `/Users/relax/Documents/upload`; production: `/mnt/a/data/upload` | Upload file storage directory. |
| `BABYLIFE_FILE_HOST` | development: `http://127.0.0.1:11000/`; production: `http://file.relaxcoder.top/` | Public file URL prefix. |
| `BABYLIFE_FILE_SERVER_PORT` | `11000` | Local static file server port used by `script/file-server.sh`. |

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```
