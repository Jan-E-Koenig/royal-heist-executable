#version 430 core

in vec2 texCoords;

uniform sampler2D sceneTexture;
uniform float blurRadius;
uniform vec2 texelSize;

out vec4 fragColor;

void main() {
    vec3 color = vec3(0.0);
    float total = 0.0;

    // Vertical blur
    for (int y = -4; y <= 4; ++y) {
        float weight = exp(-float(y * y) / (2.0 * blurRadius * blurRadius));
        color += texture(sceneTexture, texCoords + vec2(0.0, texelSize.y * y)).rgb * weight;
        total += weight;
    }
    fragColor = vec4(color / total, 1.0);
}