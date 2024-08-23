export const isEmpty = (input: any) => {
	const type = input?.constructor?.name;
	if ([undefined, null].includes(input)) return true;
	if (type === "Array") return !input.length;
	if (type === "Number") return Number.isNaN(input);
	if (type === "Object") return !Object.keys(input).length;
	if (type === "String") return !input.trim().length;
	return false;
};

export const isNotEmpty = (...args: [any]) => !isEmpty(...args);
