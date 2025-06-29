package com.arbaaz.MFAMS_backend.responseWrapper;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class LoginResponse {

    String username;
    String role;

}
