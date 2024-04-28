@REM Uncomment for creating a dind container
docker run -d --privileged ^
--env CI_COMMIT_SHORT_SHA="123456" ^
--env CI_SERVER_HOST="%GITLAB_CI_SERVER_HOST%" ^
--env CI_REGISTRY_USER="%GITLAB_USER_LOGIN%" ^
--env PERSONAL_ACCESS_TOKEN="%GITLAB_PERSONAL_ACCESS_TOKEN%" ^
--env IMAGE_REGISTRY_PATH_MAIN="%IMAGE_REGISTRY_PATH_MAIN%" ^
--env APP_SERVER="%DSPDF_APP_SERVER%" ^
--env APP_NAME="hfbcast" ^
-v %cd%:/code -w /code --name docker-dind %IMAGE_REGISTRY_PATH_MAIN%/docker:20.10.16-dind --insecure-registry=docker.sys.utv --insecure-registry=gitlab.sys.utv:4567
