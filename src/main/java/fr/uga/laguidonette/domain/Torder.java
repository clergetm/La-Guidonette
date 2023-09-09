package fr.uga.laguidonette.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import fr.uga.laguidonette.domain.enumeration.Status;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Torder.
 */
@Entity
@Table(name = "torder")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Torder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Column(name = "total")
    private Long total;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @OneToOne
    @JoinColumn(unique = true)
    private User userID;

    @ManyToMany
    @JoinTable(
        name = "rel_torder__product",
        joinColumns = @JoinColumn(name = "torder_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "categories", "torders" }, allowSetters = true)
    private Set<Product> products = new HashSet<>();

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
