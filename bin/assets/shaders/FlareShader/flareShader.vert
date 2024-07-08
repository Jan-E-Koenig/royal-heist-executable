#version 430

in vec2 aPos;

uniform vec4 transform; // pos (.xy) and scale (.zw) of the quad

out vec2 texCoords;

void main(void){
	// 1. calculate texCoords based on the position
	texCoords = aPos + vec2(0.5, 0.5);

	// 2. apply pos and scale to quad 
	vec2 screenPosition = aPos * transform.zw + transform.xy;
	
	// 3. convert to OpenGL coord system 
	screenPosition.x = screenPosition.x * 2.0 - 1.0;
	screenPosition.y = screenPosition.y * -2.0 + 1.0;
	gl_Position = vec4(screenPosition, 0.0, 1.0);
}