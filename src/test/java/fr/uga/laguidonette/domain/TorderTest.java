package fr.uga.laguidonette.domain;

import static org.assertj.core.api.Assertions.assertThat;

import fr.uga.laguidonette.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TorderTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Torder.class);
        Torder torder1 = new Torder();
        torder1.setId(1L);
        Torder torder2 = new Torder();
        torder2.setId(torder1.getId());
        assertThat(torder1).isEqualTo(torder2);
        torder2.setId(2L);
        assertThat(torder1).isNotEqualTo(torder2);
        torder1.setId(null);
        assertThat(torder1).isNotEqualTo(torder2);
    }
}
