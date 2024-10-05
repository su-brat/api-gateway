> **Note:** This supports haystack version 1.x.x which has REST API support. Version 2.x.x does not have REST API support hence is not compatible with this app.

## Spin up things using docker compose

### How to use docker compose to run all services

```sh
API_SERVER_DIR_PATH=<path_to_your_api_server_dockerfile_directory> \
HAYSTACK_DIR_PATH=<path_to_your_haystack_directory> \
docker compose up
```

#### Example

```sh
API_SERVER_DIR_PATH=/Users/subratpattanaik/Desktop/work/project-xyz/institute-api \
HAYSTACK_DIR_PATH=/Users/subratpattanaik/Desktop/work/project-xyz/haystack \
docker compose up
```

To stop the services, run `docker compose down`.

### How to run manually without docker

1. Run the API server.
2. Run haystack API using [Haystack docs](https://docs.haystack.deepset.ai/v1.26/docs/rest_api#running-http-api-without-docker).
3. Add `.env` accordingly from `.env.example`.
4. Run the API gateway using `npm run start`.
