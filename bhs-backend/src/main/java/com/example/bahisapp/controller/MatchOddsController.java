package com.example.bahisapp.controller;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class MatchOddsController {

    @GetMapping("/match-odds")
    public ResponseEntity<?> getAllMatchOdds() {
        try {
            String filePath = "src/main/resources/match.json";
            String content = Files.readString(Paths.get(filePath));

            ObjectMapper mapper = new ObjectMapper();

            // JSON dosyasını doğrudan liste olarak oku
            Map<String, List<Map<String, Object>>> data = mapper.readValue(content, new TypeReference<Map<String, List<Map<String, Object>>>>() {});
            List<Map<String, Object>> matches = data.get("matches");

            if (matches == null || matches.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("error", "Maç listesi bulunamadı veya boş."));
            }

            // Tüm maç listesini döndür
            return ResponseEntity.ok(matches);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Sunucu hatası: " + e.getMessage()));
        }
    }
}