#version 430 core

in vec2 texCoord;

uniform sampler2D texture1;
uniform float alpha;

out vec4 color;

void main()
{             
    vec4 texColor = texture(texture1, texCoord);
    color = vec4(texColor.rgb, texColor.a * alpha); // allows for alpha blending in case we ever need it (currently not in use though)
}