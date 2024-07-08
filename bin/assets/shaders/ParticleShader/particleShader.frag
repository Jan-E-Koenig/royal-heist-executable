#version 430 core

in vec2 texCoords;
in vec4 particleColor;
in float infoPointModifier;

out vec4 color;

uniform sampler2D particleTexture;

void main(){
	color = texture( particleTexture, texCoords ) * particleColor;
	color = texture(particleTexture, texCoords) * particleColor;
	color.a *= infoPointModifier; 
}