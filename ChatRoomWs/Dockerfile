FROM maven:3.9.6-eclipse-temurin-21

WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]

EXPOSE 8081