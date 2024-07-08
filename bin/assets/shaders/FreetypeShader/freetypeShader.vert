#version 430 core

layout (location = 0) in vec4 aVertex; 

uniform mat4 projection;

out vec2 texCoords;

void main()
{
    gl_Position = projection * vec4(aVertex.xy, 0.0, 1.0);
    texCoords = aVertex.zw;
}  