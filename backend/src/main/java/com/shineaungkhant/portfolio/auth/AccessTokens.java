package com.shineaungkhant.portfolio.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.stereotype.Component;

@Component
public class AccessTokens {

  static final long LIFETIME_SECONDS = 15 * 60;

  private final TokenSecret secret;
  private final ObjectMapper json;

  public AccessTokens(TokenSecret secret, ObjectMapper json) {
    this.secret = secret;
    this.json = json;
  }

  public String issue(String sessionId, String username, String deviceId, Instant expiresAt) {
    Map<String, Object> payload = new LinkedHashMap<>();
    payload.put("sub", username);
    payload.put("sid", sessionId);
    payload.put("did", deviceId);
    payload.put("iat", Instant.now().getEpochSecond());
    payload.put("exp", expiresAt.getEpochSecond());
    String encodedHeader = encode(Map.of("alg", "HS256", "typ", "JWT"));
    String encodedPayload = encode(payload);
    String signingInput = encodedHeader + "." + encodedPayload;
    return signingInput + "." + sign(signingInput);
  }

  public Map<String, Object> verify(String token) {
    String[] parts = token == null ? new String[0] : token.split("\\.");
    if (parts.length != 3) {
      return null;
    }
    String signingInput = parts[0] + "." + parts[1];
    if (!MessageDigest.isEqual(decode(parts[2]), decode(sign(signingInput)))) {
      return null;
    }
    try {
      @SuppressWarnings("unchecked")
      Map<String, Object> payload = json.readValue(decode(parts[1]), Map.class);
      Object exp = payload.get("exp");
      if (!(exp instanceof Number number) || number.longValue() < Instant.now().getEpochSecond()) {
        return null;
      }
      if (!(payload.get("sid") instanceof String) || !(payload.get("did") instanceof String) || !(payload.get("sub") instanceof String)) {
        return null;
      }
      return payload;
    } catch (Exception exception) {
      return null;
    }
  }

  private String encode(Object value) {
    try {
      return Base64.getUrlEncoder().withoutPadding().encodeToString(json.writeValueAsBytes(value));
    } catch (JsonProcessingException exception) {
      throw new IllegalStateException(exception);
    }
  }

  private String sign(String signingInput) {
    try {
      Mac mac = Mac.getInstance("HmacSHA256");
      mac.init(new SecretKeySpec(secret.value().getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
      return Base64.getUrlEncoder().withoutPadding().encodeToString(mac.doFinal(signingInput.getBytes(StandardCharsets.UTF_8)));
    } catch (Exception exception) {
      throw new IllegalStateException(exception);
    }
  }

  private byte[] decode(String value) {
    try {
      return Base64.getUrlDecoder().decode(value);
    } catch (IllegalArgumentException exception) {
      return new byte[0];
    }
  }
}
