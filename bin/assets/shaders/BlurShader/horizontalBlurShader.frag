#version 430 core

in vec2 texCoords;

uniform sampler2D sceneTexture;
uniform float blurRadius;
uniform vec2 texelSize;

out vec4 fragColor;

void main() {
    vec3 color = vec3(0.0);
    float total = 0.0;

    // Horizontal blur
    for (int x = -4; x <= 4; ++x) {
        float weight = exp(-float(x * x) / (2.0 * blurRadius * blurRadius));
        color += texture(sceneTexture, texCoords + vec2(texelSize.x * x, 0.0)).rgb * weight;
        total += weight;
    }
    fragColor = vec4(color / total, 1.0);
}