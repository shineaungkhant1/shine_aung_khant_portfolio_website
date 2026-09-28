package com.shineaungkhant.portfolio;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProjectApiTest {

  @Autowired
  private MockMvc mvc;

  @Test
  void listsSeededProjectsWithoutAuth() throws Exception {
    mvc.perform(get("/api/projects"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].slug").value("saytaman"))
        .andExpect(jsonPath("$[0].featured").value(true));
  }

  @Test
  void rejectsAnonymousCreate() throws Exception {
    mvc.perform(post("/api/projects")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"Demo\",\"category\":\"Streaming\",\"org\":\"AXRA Tech\",\"period\":\"2026\",\"summary\":\"A demo app\"}"))
        .andExpect(status().isUnauthorized());
  }

  @Test
  void adminCanCreateAndDeleteAProject() throws Exception {
    String body = """
        {"name":"Demo App","category":"Commerce","org":"AXRA Tech","period":"2026","summary":"A demo shopping app","points":["Shipped the cart"],"stack":["Flutter"],"featured":false}
        """;

    mvc.perform(post("/api/projects")
            .with(httpBasic("admin", "changeme"))
            .contentType(MediaType.APPLICATION_JSON)
            .content(body))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.slug").value("demo-app"));

    mvc.perform(delete("/api/projects/demo-app").with(httpBasic("admin", "changeme")))
        .andExpect(status().isNoContent());
  }
}
