package com.electroserve.dto;

public class AuthResponse {
    private String token;
    private String role;
    private Long userId;
    private String name;
    private String email;

    public AuthResponse() {}

    // Builder
    public static AuthResponseBuilder builder() { return new AuthResponseBuilder(); }

    public static class AuthResponseBuilder {
        private final AuthResponse r = new AuthResponse();
        public AuthResponseBuilder token(String v) { r.token = v; return this; }
        public AuthResponseBuilder role(String v) { r.role = v; return this; }
        public AuthResponseBuilder userId(Long v) { r.userId = v; return this; }
        public AuthResponseBuilder name(String v) { r.name = v; return this; }
        public AuthResponseBuilder email(String v) { r.email = v; return this; }
        public AuthResponse build() { return r; }
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
