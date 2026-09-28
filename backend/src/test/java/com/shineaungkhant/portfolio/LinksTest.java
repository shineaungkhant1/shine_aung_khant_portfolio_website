package com.shineaungkhant.portfolio;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.shineaungkhant.portfolio.common.Links;
import org.junit.jupiter.api.Test;

class LinksTest {

  @Test
  void acceptsTheSeededProfileLinks() {
    assertEquals(
        "https://mail.google.com/mail/?view=cm&fs=1&to=shineaungkhant1@gmail.com",
        Links.emailHref("https://mail.google.com/mail/?view=cm&fs=1&to=shineaungkhant1@gmail.com"));
    assertEquals("tel:+84384401005", Links.phoneHref("tel:+84384401005"));
    assertEquals("/Shine-Aung-Khant-Resume.pdf", Links.resume("/Shine-Aung-Khant-Resume.pdf"));
    assertEquals("https://github.com/shineaungkhant1", Links.https("https://github.com/shineaungkhant1"));
  }

  @Test
  void rejectsUnexpectedSchemes() {
    assertThrows(IllegalArgumentException.class, () -> Links.https("javascript:bad"));
    assertThrows(IllegalArgumentException.class, () -> Links.resume("//cdn.example/resume.pdf"));
    assertThrows(IllegalArgumentException.class, () -> Links.resume("/../resume.pdf"));
    assertThrows(IllegalArgumentException.class, () -> Links.optionalHttps("http://store.example/app"));
    assertThrows(IllegalArgumentException.class, () -> Links.https("https://user:secret@github.com/me"));
    assertNull(Links.optionalHttps(" "));
  }
}
