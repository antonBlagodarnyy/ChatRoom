FROM openjdk:21-jdk

WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]

EXPOSE 8081