package com.kob.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class BackendApplicationTests {

	@Test
	void contextLoads() {
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		System.out.println(passwordEncoder.encode("pzbw"));
		System.out.println(passwordEncoder.encode("pa"));
		System.out.println(passwordEncoder.matches("pzbw", "$2a$10$w9mgT0B.hnTZZ6Sb.geuLeuDF4rxE1jyHCJaAdjmkwx05UVwPlNvC"));
		System.out.println(passwordEncoder.matches("pa", "$2a$10$uum2ySphj.uaJ33cL4u9ROvD/5HByozCyVdUKp73nv7d5NKoEbqQ."));
	}

}
