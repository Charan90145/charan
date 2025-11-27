package Forum.example;



import Forum.example.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {
    private final CommentService commentService;
    private final PostRepository postRepository;
    private final UserService userService;

    public CommentController(CommentService commentService, PostRepository postRepository, UserService userService){
        this.commentService = commentService;
        this.postRepository = postRepository;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody Map<String,String> body){
        String content = body.get("content");
        Long postId = Long.valueOf(body.get("postId"));
        Long authorId = Long.valueOf(body.get("authorId"));
        Post post = postRepository.findById(postId).orElse(null);
        User author = userService.findById(authorId).orElse(null);
        if (post == null || author == null) return ResponseEntity.badRequest().body(Map.of("error","post or author not found"));
        Comment c = new Comment();
        c.setContent(content);
        c.setPost(post);
        c.setAuthor(author);
        Comment saved = commentService.save(c);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        commentService.delete(id);
        return ResponseEntity.ok(Map.of("status","deleted"));
    }
}
