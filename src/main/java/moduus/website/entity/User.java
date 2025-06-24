package moduus.website.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false, name = "admin_yn", length = 1)
    private String adminYn = "N";

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters, setters, 생성자 등 생략 (롬복 사용 가능)
    public User() {}

    public User(String email, String password, String nickname, String phone, String adminYn) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.phone = phone;
        this.adminYn = adminYn;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and setters ...
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public String getAdminYn() { return adminYn; }
    public void setAdminYn(String adminYn) { this.adminYn = adminYn; }
} 