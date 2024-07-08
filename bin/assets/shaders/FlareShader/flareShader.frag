#version 430

in vec2 texCoords;

uniform sampler2D flareTexture;
uniform float brightness;
uniform float infoPointDistanceNorm; 

out vec4 color;

void main(void){
    color = texture(flareTexture, texCoords);
    color.a *= brightness;
    color.a *= infoPointDistanceNorm;
    }