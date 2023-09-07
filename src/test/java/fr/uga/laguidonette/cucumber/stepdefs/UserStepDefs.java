package fr.uga.laguidonette.cucumber.stepdefs;

import static org.hamcrest.Matchers.is;

import fr.uga.laguidonette.security.AuthoritiesConstants;
import fr.uga.laguidonette.web.rest.UserResource;
import io.cucumber.java.Before;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.test.web.reactive.server.WebTestClient;

public class UserStepDefs extends StepDefs {

    @Autowired
    private UserResource userResource;

    private WebTestClient userResourceMock;

    @Before
    public void setup() {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(AuthoritiesConstants.ADMIN));
        User principal = new User("username", "", true, true, true, true, grantedAuthorities);
        Authentication authentication = new UsernamePasswordAuthenticationToken(
            principal,
            principal.getPassword(),
            principal.getAuthorities()
        );
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);
        this.userResourceMock = WebTestClient.bindToController(userResource).build();
    }

    @When("I search user {string}")
    public void i_search_user(String userId) throws Throwable {
        actions = userResourceMock.get().uri("/api/admin/users/" + userId).accept(MediaType.APPLICATION_JSON).exchange();
    }

    @Then("the user is found")
    public void the_user_is_found() throws Throwable {
        actions.expectStatus().isOk().expectHeader().contentTypeCompatibleWith(MediaType.APPLICATION_JSON_VALUE);
    }

    @Then("his last name is {string}")
    public void his_last_name_is(String lastName) throws Throwable {
        actions.expectBody().jsonPath("$.lastName").value(is(lastName));
    }
}
