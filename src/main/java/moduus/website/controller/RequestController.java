package moduus.website.controller;

import moduus.website.repository.RequestRepository;
import moduus.website.entity.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    private final RequestRepository requestRepository;

    @Autowired
    public RequestController(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    @PostMapping
    public ResponseEntity<?> createRequest(@RequestBody Map<String, String> req) {
        String userEmail = req.get("userEmail");
        String description = req.get("description");
        if (userEmail == null || description == null) {
            return ResponseEntity.badRequest().body("userEmail, description 필수");
        }
        Request request = new Request(userEmail, description);
        requestRepository.save(request);
        Map<String, Object> result = new HashMap<>();
        result.put("id", request.getId());
        result.put("userEmail", request.getUserEmail());
        result.put("description", request.getDescription());
        result.put("createdAt", request.getCreatedAt());
        result.put("status", request.getStatus());
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<?> getRequests(@RequestParam(required = false) String userEmail) {
        if (userEmail != null) {
            return ResponseEntity.ok(requestRepository.findAll().stream()
                .filter(r -> r.getUserEmail().equals(userEmail))
                .toList());
        } else {
            // 전체 요청 목록(관리자용)
            return ResponseEntity.ok(requestRepository.findAll());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRequest(@PathVariable Long id, @RequestBody Map<String, String> req) {
        var opt = requestRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        var request = opt.get();
        if (req.containsKey("status")) request.setStatus(req.get("status"));
        if (req.containsKey("description")) request.setDescription(req.get("description"));
        requestRepository.save(request);
        return ResponseEntity.ok(request);
    }
} 