#version 430 core

in vec2 texCoords;

uniform sampler2D text;
uniform vec3 textColor;
uniform float textAlpha; 

out vec4 color;

void main()
{    
    vec4 sampled = vec4(1.0, 1.0, 1.0, texture(text, texCoords).r);
    color = vec4(textColor, textAlpha) * sampled; 
}  
