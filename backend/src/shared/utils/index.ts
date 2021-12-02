export function arrayOrElementToArray<T>(arrayOrElement: T | T[]): T[] {
    return Array.isArray(arrayOrElement) ? arrayOrElement : [ arrayOrElement ];
}