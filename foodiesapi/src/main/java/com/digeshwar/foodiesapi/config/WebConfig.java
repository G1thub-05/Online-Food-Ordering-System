//package in.bushansirgur.foodiesapi.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
////        registry.addMapping("/api/**")
////                .allowedOrigins("http://localhost:5173", "http://localhost:5174")  // ✅ Not "*"
//////                .allowedOrigins("**")  // React frontend
////                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
//////                .allowedHeaders("*")
////                .allowCredentials(true);
//
//        registry.addMapping("/api/foods/**")
//                .allowedOrigins("http://localhost:5173", "http://localhost:5174")  // ✅ Not "*"
////                .allowedOrigins("**")  // React frontend
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
//                .allowedHeaders("*")
//                .allowCredentials(true);
//
//
//    }
//}
