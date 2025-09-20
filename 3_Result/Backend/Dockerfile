FROM openjdk:17-jdk-slim

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B

RUN ./mvnw clean package -DskipTests

EXPOSE 5005

CMD ["java", "-jar", "target/group-project-0.0.1-SNAPSHOT.jar"]

