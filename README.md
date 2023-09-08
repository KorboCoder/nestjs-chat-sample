
## Description

A simple chat application using nestjs + socket.io for the backend and handlebars + htmx for the frontend.
Can also test either via docker or via kubernetes using minikube. The kubernetes setup has ingress configured
since socket.io need sticky sessions for chat to work across instances.

## Installation

```bash
$ npm install
```

## Running the app
Make sure to have a redis instance running at port 6379.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### With docker
After running, access the rooms via `localhost:3000/chat/rooms`
```bash
$ npm run start:docker # docker compose up -d
$ npm run stop:docker # docker compose down
```

#### With Minikube
Make sure to have a running minikube instance with `minikube addons enable ingress`. The current configuration will have
3 instances of the app running in pods and a redis instance runing with the default master-replica setup from helm.

``` bash
$ npm run deploy # apply k8s files to cluster
$ npm run teardown # delete k8s files from cluster
```

To access the app, run `minikube tunnel` in a seperate terminal then go to 
[http://127.0.0.1:80](http://127.0.0.1:80).



## License

[MIT licensed](LICENSE).
