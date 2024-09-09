## Spin up things using docker compose
### How to use docker compose to run all services
```sh
CHATBOT_KNOWLEGEBASE_PATH=<path_to_your_json_knowledge_base> \
API_SERVER_DIR_PATH=<path_to_your_api_server_dockerfile_directory> \
docker compose up --build
```

#### Example
```sh
CHATBOT_KNOWLEGEBASE_PATH=/Users/subratpattanaik/Desktop/work/project-xyz/chatbot-api/knowledge_base.json \
API_SERVER_DIR_PATH=/Users/subratpattanaik/Desktop/work/project-xyz/institute-api \
docker compose up --build
```

To stop the services, run `docker compose down`.