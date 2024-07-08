#version 430 core

in VertexData {
	vec3 posWorld;
	vec3 normalWorld;
	vec2 uv;
} vert;

uniform vec3 materialCoefficients; // x = ambient, y = diffuse, z = specular 
uniform float specularAlpha;
uniform sampler2D diffuseTexture;
uniform vec3 gamma;
uniform struct DirectionalLight {
	vec3 color;
	vec3 direction;
} dirL;

out vec4 color;

vec3 applyGammaCorrection(vec3 color, float gammaValue) {
    return pow(color, vec3(1.0 / gammaValue));
}

vec3 phong(vec3 n, vec3 l, vec3 v, vec3 diffuseC, float diffuseF, vec3 specularC, float specularF, float alpha, bool attenuate, vec3 attenuation) {
	float d = length(l);
	l = normalize(l);
	float att = 1.0;	
	if(attenuate) att = 1.0f / (attenuation.x + d * attenuation.y + d * d * attenuation.z);
	vec3 r = reflect(-l, n);
	return (diffuseF * diffuseC * max(0, dot(n, l)) + specularF * specularC * pow(max(0, dot(r, v)), alpha)) * att; 
}

void main() {	
	vec3 n = normalize(vert.normalWorld);
	vec3 v = normalize(vert.posWorld);
	vec4 texColor = texture(diffuseTexture, vert.uv);
	texColor.rgb = applyGammaCorrection(texColor.rgb, gamma.x); 	
	color = vec4(texColor.rgb * materialCoefficients.x, texColor.a); 
	color.rgb += phong(n, -dirL.direction, -v, dirL.color * texColor.rgb, materialCoefficients.y, dirL.color, materialCoefficients.z, specularAlpha, false, vec3(0));
}