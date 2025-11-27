package Forum.example;



import Forum.example.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {
    private final PostService postService;
    private final UserService userService;

    public PostController(PostService postService, UserService userService){
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping
    public List<Post> list(){ return postService.listAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id){
        return postService.get(id).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create post. Body should include title, content, authorId
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String,String> body){
        String title = body.get("title");
        String content = body.get("content");
        Long authorId = body.containsKey("authorId") ? Long.valueOf(body.get("authorId")) : null;
        if (authorId == null) return ResponseEntity.badRequest().body(Map.of("error","authorId required"));
        User author = userService.findById(authorId).orElse(null);
        if (author == null) return ResponseEntity.badRequest().body(Map.of("error","author not found"));
        Post p = new Post();
        p.setTitle(title);
        p.setContent(content);
        Post saved = postService.create(p, author);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        postService.delete(id);
        return ResponseEntity.ok(Map.of("status","deleted"));
    }
}

