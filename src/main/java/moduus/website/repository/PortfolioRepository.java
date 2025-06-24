package moduus.website.repository;

import moduus.website.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    List<Portfolio> findAllByOrderByCreatedAtDesc();
} 