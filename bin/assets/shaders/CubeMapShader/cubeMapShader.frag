#version 430 core

in vec3 normal;
in vec3 position;

uniform vec3 cameraPos;
uniform samplerCube cubemap;

out vec4 FragColor;

void main()
{             
    vec3 mappedCamPos = cameraPos; 

    if (mappedCamPos.z < -1.0 && mappedCamPos.z > -100) {
        mappedCamPos.z = mix(-12.0, -1.0, (mappedCamPos.z + 100.0) / 99.0);
    } else if (mappedCamPos.z > 1.0 && mappedCamPos.z < 100.0) {
    mappedCamPos.z = mix(1.0, 12.0, (mappedCamPos.z - 1.0) / 99.0);
    }

    vec3 I = normalize(position - mappedCamPos);        // vector from the camera to the point on the surface of the cube 
    vec3 R = reflect(I, normalize(normal));             // reflected vector on the surface
    FragColor = vec4(texture(cubemap, R).rgb, 1.0);     // use R to sample from the cubeMap Texture
}