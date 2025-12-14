# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src

# Package stage
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy the **Spring Boot repackaged JAR** explicitly
COPY --from=build /app/target/ChatRoomWs-0.0.1-SNAPSHOT.jar app.jar

# Optional: verify
RUN ls -l /app

ENTRYPOINT ["java","-jar","app.jar"]
EXPOSE 8080