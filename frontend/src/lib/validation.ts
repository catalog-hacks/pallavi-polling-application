export const ensureString = (value: unknown): string => {
    if (typeof value !== "string") {
      throw new Error("Expected a Base64URL string");
    }
    return value; // Return the value if it's a string
  };