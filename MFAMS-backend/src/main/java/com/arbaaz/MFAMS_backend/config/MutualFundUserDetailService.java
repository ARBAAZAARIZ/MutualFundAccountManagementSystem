package com.arbaaz.MFAMS_backend.config;

import com.arbaaz.MFAMS_backend.model.User;
import com.arbaaz.MFAMS_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class MutualFundUserDetailService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User>  foundUser =userRepository.findByUsername(username);
        if(foundUser.isPresent()){
            User user=foundUser.get();
//            List<GrantedAuthority> authorities=List.of(new SimpleGrantedAuthority(user.getRole()));
            return  org.springframework.security.core.userdetails.User
                    .withUsername(user.getUsername())
                    .password(user.getPassword())
                    .roles(user.getRole())
                    .build();

        }else{
            throw new UsernameNotFoundException("User don't Exist with username \" + username");
        }

    }
}
