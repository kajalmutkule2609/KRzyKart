package org.techhub.eComWebsite.Configuration;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    	registry
        .addResourceHandler("/images/**")
        .addResourceLocations("file:/C:/Users/15s-eq0024au/git/EComWebsite/ECommerceWebsite/src/main/resources/static/Images/");
    
    }
}
