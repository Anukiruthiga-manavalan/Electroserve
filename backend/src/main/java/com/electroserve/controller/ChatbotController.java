package com.electroserve.controller;

import com.electroserve.dto.ChatMessage;
import com.electroserve.service.ChatbotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    private final ChatbotService chatbotService;

    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping("/message")
    public ResponseEntity<Map<String, String>> chat(@RequestBody ChatMessage message) {
        String response = chatbotService.getResponse(message.getMessage());
        return ResponseEntity.ok(Map.of("reply", response));
    }
}
