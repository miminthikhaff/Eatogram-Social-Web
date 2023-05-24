package com.flavorgram.fgserver.config.authentication;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtAuthenticationFilter jwtAuthenticationFilter;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    http.csrf()
        .disable()
        .authorizeHttpRequests()
        .requestMatchers("/api/authenticate", "/api/register", "/login/**")
        .permitAll()
        .anyRequest()
        .authenticated()
        .and()
        .oauth2Login() // enable social logins
        .defaultSuccessUrl("http://localhost:3000/sample/")
        // .and()
        // .sessionManagement()
        // .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .addFilterBefore(jwtAuthenticationFilter,
            UsernamePasswordAuthenticationFilter.class); // do jwt authentication first

    return http.build();
  }

}
