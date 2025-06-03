package org.techhub.eComWebsite.Configuration;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.techhub.eComWebsite.Model.UserModel;
import org.techhub.eComWebsite.repository.UserRepositoryImp;

@Service 
public class UserDetailsServiceConfig implements UserDetailsService {

    private final UserRepositoryImp userRepo;

    public UserDetailsServiceConfig(UserRepositoryImp userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserModel user = userRepo.searchUserByEmailId(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().toUpperCase()))
        );
    }
}
