/**
 * Get environment variables
 * @param key Key value of environment variable
 * @param fallbackValue Default value
 */
export const getEnv = (key: string, fallbackValue = ''): string => {
  const value: string | undefined = process.env[key];
  if (typeof value === 'undefined') {
    return fallbackValue;
  }
  return value;
};

/**
 * Get numeric environment variables
 * @param key Key value of environment variable
 * @param fallbackValue Default value
 */
export const getEnvNumber = (key: string, fallbackValue = 0): number => {
  const value: string = getEnv(key);
  return !isNaN(parseFloat(value)) && !isNaN(Number(value)) ? Number(value) : fallbackValue;
};

/**
 * Get boolean environment variables
 * @param key Key value of environment variable
 * @param fallbackValue Default value
 */
export const getEnvBoolean = (key: string, fallbackValue = false) => {
  const value: string = getEnv(key);
  return value === '' ? fallbackValue : value === 'true';
};

/**
 * Format object type environment variables can be parsed {} | [] Use JSON.parse to parse
 * @param key Key value of environment variable
 * @param fallbackValue Default value
 */
export const getEnvObject = (key: string, fallbackValue = null) => {
  const value: string = getEnv(key);
  if (!value) {
    return fallbackValue;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    return fallbackValue;
  }
};

