package com.arbaaz.MFAMS_backend.config;

import com.arbaaz.MFAMS_backend.filter.CsrfCookieFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import java.util.List;


@Configuration
public class ProjectSecurityConfig {

        @Bean
        SecurityFilterChain securityFilterChain(HttpSecurity http)throws Exception{

            CsrfTokenRequestAttributeHandler csrfTokenRequestAttributeHandler=new CsrfTokenRequestAttributeHandler();
//            http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

            http.securityContext(contextConfig->contextConfig.requireExplicitSave(false))
                    .sessionManagement(sessionConfig->sessionConfig.sessionCreationPolicy(SessionCreationPolicy.ALWAYS));

            http.csrf(csrf -> csrf
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
            );


            http.cors(corsConfig->corsConfig.configurationSource(new CorsConfigurationSource() {
                @Override
                public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                    CorsConfiguration config=new CorsConfiguration();
                    config.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));  // Your React app's URL
                    config.setAllowedMethods(Collections.singletonList("*"));
                    config.setAllowCredentials(true);
                    config.setAllowedHeaders(Collections.singletonList("*"));
                    config.setMaxAge(3600L);
                    return config;
                }
            }));

            http.csrf(csrfConfig->csrfConfig.csrfTokenRequestHandler(csrfTokenRequestAttributeHandler)
                            .ignoringRequestMatchers("/logout","/api/auth/register")
                            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
                    .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class);

            http.authorizeHttpRequests(requests->
                    requests.requestMatchers(HttpMethod.POST,"/api/funds/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                            .requestMatchers(HttpMethod.PUT, "/api/funds/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE, "/api/funds/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.POST, "/api/transactions/**").authenticated()
                            .requestMatchers(HttpMethod.GET, "/api/transactions/**").authenticated()
                            .requestMatchers(HttpMethod.GET, "/api/funds/**").permitAll()
                            .requestMatchers("/api/auth/**").permitAll()
                            .anyRequest().authenticated()
            );

            http.logout(logout -> logout
                    .logoutUrl("/api/auth/logout") // the POST logout endpoint
                    .logoutSuccessHandler((request, response, authentication) -> {
                        response.setStatus(HttpServletResponse.SC_OK);
                        response.sendRedirect("http://localhost:5173/login"); // your React login page
                    })
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
            );


            http.formLogin(AbstractHttpConfigurer::disable);
            http.httpBasic(AbstractHttpConfigurer::disable);


            return http.build();
        }



        @Bean
        PasswordEncoder passwordEncoder(){
            return PasswordEncoderFactories.createDelegatingPasswordEncoder();
        }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource(){
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        config.setAllowedHeaders(Collections.singletonList("*"));
//        config.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//        return source;
//    }




        @Autowired
        @Lazy
        private CustomAuthenticationProvider customAuthenticationProvider;

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration config)throws Exception{
            return config.getAuthenticationManager();  // Auto-uses CustomAuthenticationProvider
        }




}
