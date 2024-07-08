#version 430 core

in vec2 texCoord;

uniform sampler2D screenTexture;

out vec4 color;

void main()
{
    color = texture(screenTexture, texCoord);
}
