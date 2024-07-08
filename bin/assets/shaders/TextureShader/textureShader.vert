#version 430 core

layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aUV;

uniform mat4 modelMatrix;		// set on geometry creation
uniform mat3 normalMatrix;		// set on geometry creation
uniform mat4 viewProjMatrix;	// set each frame	

out VertexData {
	vec3 posWorld;
	vec3 normalWorld;
	vec2 uv;
} vert;

void main() {
	vert.normalWorld = normalMatrix * aNormal;
	vert.uv = aUV;
	vec4 tempPos = modelMatrix * vec4(aPos, 1);
	vert.posWorld = tempPos.xyz;
	gl_Position = viewProjMatrix * tempPos;
}