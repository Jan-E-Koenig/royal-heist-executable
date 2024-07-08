#version 430 core

layout(location = 0) in vec3 baseParticleMesh;
layout(location = 1) in vec4 particleXYZW;		// positions of particles center (3 components) and size (1 component)
layout(location = 2) in vec4 particleColorIn;	// rgb color and alpha 

// constants for the whole mesh
uniform vec3 camRightWS;
uniform vec3 camUpWS;
uniform mat4 particleVP;		// View-Projection matrix (no model matrix needed since we use billboards)
uniform float infoPointNorm;	// sets a global alpha for the particle shader in dependence of the distance to the info point

out vec2 texCoords;
out vec4 particleColor;
out float infoPointModifier;

void main()
{
	vec3 vertexPosWS = particleXYZW.xyz
		+ camRightWS * baseParticleMesh.x * particleXYZW.w
		+ camUpWS * baseParticleMesh.y * particleXYZW.w;
	gl_Position = particleVP * vec4(vertexPosWS, 1.0f);
	texCoords = baseParticleMesh.xy + vec2(0.5, 0.5);
	particleColor = particleColorIn;
	infoPointModifier = 1 - infoPointNorm;
	if (infoPointModifier < 0.2f) infoPointModifier = 0.2f;
}