FROM maven:3.9.6-eclipse-temurin-21

WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env \
    export $(grep -v '^#' /etc/secrets/.env | xargs) && \
    echo "Building app with DB $DB_URL and API_KEY $API_KEY" && \
    mvn clean package
	

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]

EXPOSE 8081