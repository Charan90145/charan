package Forum.example;


import Forum.example.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    public PostService(PostRepository postRepository){ this.postRepository = postRepository; }

    public List<Post> listAll(){ return postRepository.findAll(); }
    public Optional<Post> get(Long id){ return postRepository.findById(id); }
    public Post create(Post p, User author){
        p.setAuthor(author);
        return postRepository.save(p);
    }
    public Post save(Post p){ return postRepository.save(p); }
    public void delete(Long id){ postRepository.deleteById(id); }
}

