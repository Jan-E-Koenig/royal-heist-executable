#version 430 core

layout (location = 0) in vec3 aPos;
layout (location = 1) in vec2 aTexCoord;

const float PI = 3.14159265359;

uniform float rotation; // maps a float in range 0 to 59 to a 180° rotation of an image in case we ever want to rotate the loading symbol (currently we don't due to warping)

out vec2 texCoord;

void main()
{
    // 1. Convert the rotation range from [0, 59] to [0, PI] (0 to 180 degrees in radians)
    float angle = rotation * (PI / 59.0);
    
    // 2. Rotation matrix for z-axis
    mat3 rotZ = mat3(
        cos(angle), -sin(angle), 0.0,
        sin(angle),  cos(angle), 0.0,
        0.0,         0.0,        1.0
    );
    
    // 3. Apply rotation
    vec3 rotatedPos = rotZ * aPos;

    gl_Position = vec4(rotatedPos, 1.0);    
    texCoord = aTexCoord;
}