<h1 align="center">Cerbos Fly Demo </h1>

<p align="center">
  React-based web application deployment that uses Cerbos for smooth authorization.
  React-based web application deployment that uses Cerbos for smooth authorization.
</p>

## Introduction

This cloud deployment of a React-based web application provides a platform for users to view and manage courses. The application uses Cerbos for authorization.
This cloud deployment of a React-based web application provides a platform for users to view and manage courses. The application uses Cerbos for authorization.

## Fly.io Development

Refer our documentation for detailed configuration for this demo - [Fly cloud deployment](https://docs.cerbos.dev/cerbos/latest/deployment/cloud-platforms)

1. Create a Fly.io [TOML file](fly.toml) that include Fly deployment configuration.

You can deploy Cerbos on Fly.io as a [Fly Launch](https://fly.io/docs/apps/) app. The following fly.toml file shows how to deploy Cerbos with health checks and metrics:
```
app = '<APPLICATION_NAME>' #The name of the Fly App
primary_region = '<REGION>' #Pick a Fly.io region

[build]
  image = 'ghcr.io/cerbos/cerbos:0.35.1'

[[mounts]]
  source = 'policies'
  destination = '/policies'
  initial_size = '1GB'

[[services]]
  protocol = ''
  internal_port = 3592

[[services.ports]]
    port = 3592
    handlers = ['tls', 'http']

[[services.http_checks]]
    interval = '5s'
    timeout = '2s'
    grace_period = '5s'
    method = 'get'
    path = '/_cerbos/health'
    protocol = 'http'

[[services]]
  protocol = ''
  internal_port = 3593

[[services.ports]]
    port = 3593
    handlers = ['tls']

    [services.ports.tls_options]
      alpn = ['h2']

[[vm]]
  memory = '1gb'
  cpu_kind = 'shared'
  cpus = 1

[metrics]
  port = 3592
  path = "/_cerbos/metrics"
```
2. Make sure you're exposing your application on the right endpoint as given below on `0.0.0.0`:

> Note: Fly Proxy reaches services through a private IPv4 address on each VM, so the process should listen on 0.0.0.0:<port> ([but see A note on IPv4 and IPv6 wildcards](https://fly.io/docs/networking/app-services/#a-note-on-ipv4-and-ipv6-wildcards)).

3. Dockerize our React application:
```
FROM node:20-alpine

WORKDIR /

COPY package.json .

COPY packages packages

RUN npm i 

COPY . .

RUN [ "npm", "run", "build" ]

EXPOSE 8080
CMD [ "npm", "run", "preview" ]
```

4. Deploy your application to Fly
- Create [Fly Account](https://fly.io/)
- Configure fly.io on your local system
- Run the following command in your terminal
```
fly launch
```
- Accept the changes if you want to change or tweak the name or region
- Check [Fly Dashboard](https://fly.io/dashbaord) for your application instance and volume details

5. If you'e done any changes to your local app or make any advancements, Simply run below commmand in your terminal to deploy the App:
```
fly deploy
```
6. If you wan to delete the App:
```
fly destroy <APPLICATION_NAME>
```

Thanks for Reading!
## Fly.io Development

Refer our documentation for detailed configuration for this demo - [Fly cloud deployment](https://docs.cerbos.dev/cerbos/latest/deployment/cloud-platforms)

1. Create a Fly.io [TOML file](fly.toml) that include Fly deployment configuration.

You can deploy Cerbos on Fly.io as a [Fly Launch](https://fly.io/docs/apps/) app. The following fly.toml file shows how to deploy Cerbos with health checks and metrics:
```
app = '<APPLICATION_NAME>' #The name of the Fly App
primary_region = '<REGION>' #Pick a Fly.io region

[build]
  image = 'ghcr.io/cerbos/cerbos:0.35.1'

[[mounts]]
  source = 'policies'
  destination = '/policies'
  initial_size = '1GB'

[[services]]
  protocol = ''
  internal_port = 3592

[[services.ports]]
    port = 3592
    handlers = ['tls', 'http']

[[services.http_checks]]
    interval = '5s'
    timeout = '2s'
    grace_period = '5s'
    method = 'get'
    path = '/_cerbos/health'
    protocol = 'http'

[[services]]
  protocol = ''
  internal_port = 3593

[[services.ports]]
    port = 3593
    handlers = ['tls']

    [services.ports.tls_options]
      alpn = ['h2']

[[vm]]
  memory = '1gb'
  cpu_kind = 'shared'
  cpus = 1

[metrics]
  port = 3592
  path = "/_cerbos/metrics"
```
2. Make sure you're exposing your application on the right endpoint as given below on `0.0.0.0`:

> Note: Fly Proxy reaches services through a private IPv4 address on each VM, so the process should listen on 0.0.0.0:<port> ([but see A note on IPv4 and IPv6 wildcards](https://fly.io/docs/networking/app-services/#a-note-on-ipv4-and-ipv6-wildcards)).

3. Dockerize our React application:
```
FROM node:17-alpine as build
WORKDIR /app
COPY ./react-app/package.json .
RUN npm i
COPY . .
RUN npm run build
FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
```

4. Deploy your application to Fly
- Create [Fly Account](https://fly.io/)
- Configure fly.io on your local system
- Run the following command in your terminal
```
fly launch
```
- Accept the changes if you want to change or tweak the name or region
- Check [Fly Dashboard](https://fly.io/dashbaord) for your application instance and volume details

5. If you'e done any changes to your local app or make any advancements, Simply run below commmand in your terminal to deploy the App:
```
fly deploy
```
6. If you wan to delete the App:
```
fly destroy <APPLICATION_NAME>
```

Thanks for Reading!

## Contributing

Contributions are always welcome! Feel free to open issues or submit PRs.
