package fr.uga.laguidonette.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import fr.uga.laguidonette.domain.enumeration.Status;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A Torder.
 */
@Table("torder")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Torder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    @Column("date")
    private Instant date;

    @Column("total")
    private Long total;

    @Column("status")
    private Status status;

    @Transient
    private User userID;

    @Transient
    @JsonIgnoreProperties(value = { "categories", "torders" }, allowSetters = true)
    private Set<Product> products = new HashSet<>();

    @Column("userid_id")
    private Long userIDId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Torder id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return this.date;
    }

    public Torder date(Instant date) {
        this.setDate(date);
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Long getTotal() {
        return this.total;
    }

    public Torder total(Long total) {
        this.setTotal(total);
        return this;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Status getStatus() {
        return this.status;
    }

    public Torder status(Status status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getUserID() {
        return this.userID;
    }

    public void setUserID(User user) {
        this.userID = user;
        this.userIDId = user != null ? user.getId() : null;
    }

    public Torder userID(User user) {
        this.setUserID(user);
        return this;
    }

    public Set<Product> getProducts() {
        return this.products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Torder products(Set<Product> products) {
        this.setProducts(products);
        return this;
    }

    public Torder addProduct(Product product) {
        this.products.add(product);
        product.getTorders().add(this);
        return this;
    }

    public Torder removeProduct(Product product) {
        this.products.remove(product);
        product.getTorders().remove(this);
        return this;
    }

    public Long getUserIDId() {
        return this.userIDId;
    }

    public void setUserIDId(Long user) {
        this.userIDId = user;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Torder)) {
            return false;
        }
        return id != null && id.equals(((Torder) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Torder{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", total=" + getTotal() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
