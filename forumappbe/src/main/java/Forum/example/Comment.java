package Forum.example;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class Comment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    private LocalDateTime createdAt = LocalDateTime.now();

    // getters/setters
    public Long getId(){ return id; }
    public void setId(Long id){ this.id = id; }

    public String getContent(){ return content; }
    public void setContent(String content){ this.content = content; }

    public Post getPost(){ return post; }
    public void setPost(Post post){ this.post = post; }

    public User getAuthor(){ return author; }
    public void setAuthor(User author){ this.author = author; }

    public LocalDateTime getCreatedAt(){ return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt){ this.createdAt = createdAt; }
}
