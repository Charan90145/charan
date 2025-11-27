package Forum.example;



import Forum.example.*;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    public CommentService(CommentRepository commentRepository){ this.commentRepository = commentRepository; }

    public Comment save(Comment c){ return commentRepository.save(c); }
    public void delete(Long id){ commentRepository.deleteById(id); }
}

