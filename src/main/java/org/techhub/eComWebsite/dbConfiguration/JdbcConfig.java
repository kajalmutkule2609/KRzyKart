package org.techhub.eComWebsite.dbConfiguration;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;


@Configuration
public class JdbcConfig {
	
	@Bean(name="jdbcTemplate")
	public JdbcTemplate JdbcTemplate(DataSource dataSource) {
		return new JdbcTemplate(dataSource);
		
	}
}
