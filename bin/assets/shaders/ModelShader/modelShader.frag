#version 430 core

in vec2 texCoords;
in vec3 fragPos; 
in vec3 normal; 

uniform sampler2D textureDiffuse;
uniform sampler2D textureSpecular;      // Specular map
uniform vec3 lightPos;                  // Light position
uniform vec3 viewPos;                   // View position
uniform vec3 lightColor;                // color of the main light source (sun)
uniform float shininess;                // Shininess of the object
uniform float brightness;

out vec4 color;

void main()
{
    // Ambient
    vec3 ambient = 0.1 * vec3(texture(textureDiffuse, texCoords)); // Modify as needed

    // Diffuse
        // NOTE: technically, we should not inverse the z-value to give a realistic specular component. 
        // But then the models would be hard to see from the starting position. 
        // Hence, we inverse the z-value of the lightDir to highlight the models from the starting position by choice. 
    vec3 norm = normalize(normal);
    vec3 lightDir = normalize(lightPos - fragPos);
    lightDir.z = lightDir.z * -1.0;
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * vec3(texture(textureDiffuse, texCoords)) * lightColor;

    // Specular
    vec3 viewDir = normalize(viewPos - fragPos);
    lightDir.z = lightDir.z * -1.0;
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = spec * vec3(texture(textureSpecular, texCoords)) * lightColor;

    vec3 result = (ambient + diffuse + specular) * brightness;
    color = vec4(result, 1.0);
}