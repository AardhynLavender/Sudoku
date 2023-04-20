export type Vec2 = { x: number; y: number };
export type Vec3 = Vec2 & { z: number };

export function isVec2(vec2: unknown): vec2 is Vec2 {
	return (
		typeof vec2 === 'object' &&
		vec2 !== null &&
		vec2 !== undefined &&
		'x' in vec2 &&
		'y' in vec2
	);
}

export function isVec3(vec3: unknown): vec3 is Vec3 {
	return isVec2(vec3) && 'z' in vec3;
}
