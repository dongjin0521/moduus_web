package moduus.website.controller;

import moduus.website.entity.User;
import moduus.website.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // (임시) 이메일로 내 정보 조회 (실제 서비스에서는 JWT 인증 필요)
    @GetMapping("/me")
    public ResponseEntity<?> getMe(@RequestParam String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return ResponseEntity.notFound().build();
        Map<String, Object> result = new HashMap<>();
        result.put("id", user.getId());
        result.put("email", user.getEmail());
        result.put("nickname", user.getNickname());
        result.put("phone", user.getPhone());
        return ResponseEntity.ok(result);
    }

    // (임시) 이메일로 내 정보 수정 (닉네임, 전화번호)
    @PutMapping("/me")
    public ResponseEntity<?> updateMe(@RequestParam String email, @RequestBody Map<String, String> req) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return ResponseEntity.notFound().build();
        user.setNickname(req.getOrDefault("nickname", user.getNickname()));
        user.setPhone(req.getOrDefault("phone", user.getPhone()));
        userRepository.save(user);
        Map<String, Object> result = new HashMap<>();
        result.put("id", user.getId());
        result.put("email", user.getEmail());
        result.put("nickname", user.getNickname());
        result.put("phone", user.getPhone());
        return ResponseEntity.ok(result);
    }
} 