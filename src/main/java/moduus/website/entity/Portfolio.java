package moduus.website.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "portfolio")
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(nullable = true)
    private String imageUrl;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private String writerEmail;

    @Column(nullable = false)
    private String writerNickname;

    public Portfolio() {}

    public Portfolio(String title, String description, String imageUrl, String writerEmail, String writerNickname) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.writerEmail = writerEmail;
        this.writerNickname = writerNickname;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public String getWriterEmail() { return writerEmail; }
    public void setWriterEmail(String writerEmail) { this.writerEmail = writerEmail; }
    public String getWriterNickname() { return writerNickname; }
    public void setWriterNickname(String writerNickname) { this.writerNickname = writerNickname; }
} 