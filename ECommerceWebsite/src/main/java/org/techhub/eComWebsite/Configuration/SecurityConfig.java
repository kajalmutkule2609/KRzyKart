package org.techhub.eComWebsite.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors()  // enable CORS
            .and()
            .csrf().disable()  // disable CSRF for testing
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/ECommerceWebsite/User/getUserIdByEmail/**").permitAll()
                .requestMatchers("/ECommerceWebsite/Product/addProduct").permitAll()
                .requestMatchers("/ECommerceWebsite/Order/**").permitAll()
                .requestMatchers("/ECommerceWebsite/**").permitAll()
                .requestMatchers("/Images/**").permitAll() 
                .anyRequest().authenticated()
            );

        return http.build();
    }
}
