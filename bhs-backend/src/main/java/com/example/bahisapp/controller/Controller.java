package com.example.bahisapp.controller;

import com.example.bahisapp.entities.User;
import com.example.bahisapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional; // Optional sınıfını eklemeyi unutmayın

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class Controller {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public Map<String, String> registerUser(@RequestBody User user) {
        // isPresent() ile kullanıcının varlığını kontrol edin
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return Map.of("message", "Kullanıcı adı zaten alınmış");
        }
        userRepository.save(user);
        return Map.of("message", "Kayıt başarılı");
    }

    @PostMapping("/login")
    public Map<String, String> loginUser(@RequestBody User user) {
        // Optional<User> objesini alın
        Optional<User> existingUserOptional = userRepository.findByUsername(user.getUsername());

        // isPresent() ile kullanıcının var olup olmadığını kontrol edin
        if (existingUserOptional.isEmpty()) { // Veya !existingUserOptional.isPresent() kullanabilirsiniz
            return Map.of("message", "Kullanıcı bulunamadı");
        }

        // Optional içindeki User objesine .get() ile güvenli bir şekilde erişin
        User existingUser = existingUserOptional.get();

        if (!existingUser.getPassword().equals(user.getPassword())) {
            return Map.of("message", "Şifre yanlış");
        }

        return Map.of("message", "Giriş başarılı");
    }
}