package moduus.website.controller;

import moduus.website.entity.Portfolio;
import moduus.website.repository.PortfolioRepository;
import moduus.website.repository.UserRepository;
import moduus.website.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;

    @Autowired
    public PortfolioController(PortfolioRepository portfolioRepository, UserRepository userRepository) {
        this.portfolioRepository = portfolioRepository;
        this.userRepository = userRepository;
    }

    // 글 등록 (관리자만)
    @PostMapping
    public ResponseEntity<?> createPortfolio(@RequestBody Map<String, String> req) {
        String email = req.get("writerEmail");
        String title = req.get("title");
        String description = req.get("description");
        String imageUrl = req.get("imageUrl");
        if (email == null || title == null || description == null) {
            return ResponseEntity.badRequest().body("writerEmail, title, description 필수");
        }
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty() || !"Y".equals(userOpt.get().getAdminYn())) {
            return ResponseEntity.status(403).body("관리자만 등록 가능");
        }
        Portfolio p = new Portfolio(title, description, imageUrl, email, userOpt.get().getNickname());
        portfolioRepository.save(p);
        return ResponseEntity.ok(p);
    }

    // 전체 목록 (최신순)
    @GetMapping
    public List<Portfolio> getAll() {
        return portfolioRepository.findAllByOrderByCreatedAtDesc();
    }

    // 상세
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        return portfolioRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
} 