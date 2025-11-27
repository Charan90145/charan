package Forum.example;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // allow Vite frontend
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        try {
            String username = body.get("username");
            String password = body.get("password");
            String displayName = body.getOrDefault("displayName", username);

            User u = userService.register(username, password, displayName);
            u.setPasswordHash(null); // don’t return hash to frontend
            return ResponseEntity.ok(u);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", ex.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", "Username and password must be provided"));
        }

        var optionalUser = userService.login(username, password);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPasswordHash(null); // don’t leak password hash
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity
                    .status(401)
                    .body(Collections.singletonMap("error", "Invalid username or password"));
        }
    }
}
