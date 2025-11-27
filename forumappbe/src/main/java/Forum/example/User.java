package Forum.example;


import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String username;

    @Column(nullable=false)
    private String passwordHash;

    @Column
    private String displayName;

    // Optional: One-to-many relationship with posts
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Post> posts;

    // getters/setters
    public Long getId(){ return id; }
    public void setId(Long id){ this.id = id; }

    public String getUsername(){ return username; }
    public void setUsername(String username){ this.username = username; }

    public String getPasswordHash(){ return passwordHash; }
    public void setPasswordHash(String passwordHash){ this.passwordHash = passwordHash; }

    public String getDisplayName(){ return displayName; }
    public void setDisplayName(String displayName){ this.displayName = displayName; }

    public List<Post> getPosts(){ return posts; }
    public void setPosts(List<Post> posts){ this.posts = posts; }
}
