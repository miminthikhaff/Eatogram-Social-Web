package com.flavorgram.fgserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class FgServerApplication {

	public static void main(String[] args) {
		Environment env = SpringApplication.run(FgServerApplication.class, args).getEnvironment();
		System.out.println(String.format("\n\n::: Server alive @ %s :::\n\n", env.getProperty("server.port")));
	}

}
