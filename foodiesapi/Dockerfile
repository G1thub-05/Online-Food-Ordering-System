FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

EXPOSE 8080
ENV PORT=8080

CMD ["sh", "-c", "java -jar target/*.jar"]
# CMD ["java", "-jar", "target/foodiesapi-0.0.1-SNAPSHOT.jar"]











