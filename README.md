A training project MongoDB-7 + (Express.js-4.8 + Node.js-18.14) + React.js-18.2, in which DBMS, backend and frontend applications are containerized at startup for deployment in a cloud service.

* To start application:
[1] - create two './env/*.env' files with credentials
```bash
    $ cat ./env/backend.env
MONGODB_USERNAME=user
MONGODB_PASSWORD=pass
    $ cat ./env/mongo.env
MONGO_INITDB_ROOT_USERNAME=user
MONGO_INITDB_ROOT_PASSWORD=pass
```

[2] - In the first bash terminal
```bash
    $ docker compose up
```

[3] - In the second bash terminal to correct stop and remove useless containers
```bash
    $ docker compose down
```
