#version 430 core

in vec3 texCoords;

uniform samplerCube skybox;
uniform float colorModifierNorm; // modifies color of the texture relative to distance to info point

out vec4 color;

void main()
{    
    // 1. Get the color of the skybox texture
    vec4 tempColor = texture(skybox, texCoords);

    // 2. calculate greyscale value
    float gray = dot(tempColor.rgb, vec3(0.299, 0.587, 0.114)); 

    // 3. Create grayscale color
    vec3 grayscaleColor = vec3(gray); 

    // 4. Mix grayscale color with original color
    vec3 finalColor = mix(grayscaleColor, tempColor.rgb, colorModifierNorm); 

    // 5. Set final color with original alpha
    color = vec4(finalColor, tempColor.a); 
}