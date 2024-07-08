#version 430 core

in vec2 texCoords;
in vec3 fragPos;
in vec3 normal; 

uniform sampler2D textureDiffuse;
uniform sampler2D textureSpecular;
uniform vec3 lightPos; 
uniform vec3 viewPos; 
uniform vec3 lightColor;            
uniform float shininess; 
uniform float brightness;

out vec4 fragColor;

void main()
{   
    vec3 mixedLightColor = mix(lightColor, vec3(1.0, 1.0, 1.0), 0.2);

    // 1. Ambient
	vec3 ambient = 0.1 * vec3(texture(textureDiffuse, texCoords)); 

	// 2. Diffuse
    vec3 norm = normalize(normal);
    vec3 lightDir = normalize(lightPos - fragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * vec3(texture(textureDiffuse, texCoords)) * mixedLightColor;

    // 3. Specular
    vec3 viewDir = normalize(viewPos - fragPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular =  spec * vec3(texture(textureSpecular, texCoords)) * mixedLightColor;

	// 4. Combine results
    vec3 result = (ambient + diffuse + specular) * brightness;
    fragColor = vec4(result, 1.0);
}