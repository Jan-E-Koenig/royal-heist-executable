#version 430 core

layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal; 
layout(location = 2) in vec2 aTexCoords;
layout(location = 5) in ivec4 aBoneIds;     // contains indices for reading from finalBonesMatrices
layout(location = 6) in vec4 aWeights;      // contains weights for blending

const int MAX_BONES = 100;
const int MAX_BONE_INFLUENCE = 4;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform mat4 finalBonesMatrices[MAX_BONES];

out vec2 texCoords;
out vec3 fragPos; 
out vec3 normal; 

void main()
{
    vec4 totalPosition = vec4(0.0f);
    for (int i = 0; i < MAX_BONE_INFLUENCE; i++)
    {
        int boneIndex = clamp(aBoneIds[i], 0, MAX_BONES - 1);
        vec4 localPosition = finalBonesMatrices[boneIndex] * vec4(aPos, 1.0);
        totalPosition += localPosition * aWeights[i];
    }
    mat4 viewModel = view * model;
    fragPos = vec3(viewModel * totalPosition);        
    normal = mat3(transpose(inverse(model))) * aNormal; // correct non-uniform scale
    gl_Position =  projection * viewModel * totalPosition;
	texCoords = aTexCoords;
}