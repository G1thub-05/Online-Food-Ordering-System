package com.digeshwar.foodiesapi.filters;

import com.digeshwar.foodiesapi.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        String header = request.getHeader("Authorization");
//        System.out.println("Authorization Header: " + header);



        String path = request.getRequestURI();
        // ✅ Skip authentication for public endpoints
//        if (path.startsWith("/api/foods")
//        ||path.startsWith("/api/reset")){
//        filterChain.doFilter(request, response);
//        System.out.println("Requested Path: " + path);
//        System.out.println("Authorization Header: " + authHeader);
//            return;
//        }


        if (path.startsWith("/api/foods")
                || path.startsWith("/api/reset")
                || path.startsWith("/api/reset-password")
                || path.startsWith("/api/verify-otp")
                || path.startsWith("/api/send-otp")
                || path.startsWith("/api/register")
                || path.startsWith("/api/login")) {
            filterChain.doFilter(request, response);
            System.out.println("Requested Path: " + path);
            System.out.println("Authorization Header: " + authHeader);
            return;
        }



        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String email = jwtUtil.extractUsername(token);

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                if (jwtUtil.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities()
                    );
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }

            }
        }
        filterChain.doFilter(request, response);
    }
}
