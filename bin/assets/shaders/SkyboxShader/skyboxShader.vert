#version 430 core

layout (location = 0) in vec3 aPos;

uniform mat4 projection;
uniform mat4 view;

out vec3 texCoords;

void main()
{
    vec4 pos = projection * view * vec4(aPos, 1.0); // final coords in screen space
    gl_Position = vec4(pos.x, pos.y, pos.w, pos.w); // second pos.w makes sure that skybox always has a depth value of 1.0f (behind all other objects)                         
    texCoords = vec3(aPos.x, aPos.y, aPos.z);
}  