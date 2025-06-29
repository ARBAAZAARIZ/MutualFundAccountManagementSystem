package com.arbaaz.MFAMS_backend.config;

import com.arbaaz.MFAMS_backend.model.User;
import com.arbaaz.MFAMS_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String rawPassword = authentication.getCredentials().toString();
        System.out.println("Printing username from custom authentication provider"+username);
        System.out.println("Printing password from custom authentication provider"+rawPassword);

        User user=userRepository.findByUsername(username).orElseThrow(
                ()-> new BadCredentialsException("User not found")
        );

        if(!passwordEncoder.matches(rawPassword,user.getPassword())){
            throw new BadCredentialsException("Invalid password");
        }

        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_"+ user.getRole()));

        return new UsernamePasswordAuthenticationToken(username,rawPassword,authorities);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
