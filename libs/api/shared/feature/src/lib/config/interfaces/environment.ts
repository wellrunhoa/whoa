export interface EnvironmentConfig {
  // Get node environment variable current environment identifier
  // 'dev' | 'prod' | 'test' | 'prov' | 'local'
  environment: string;
  // Host address
  host: string;
  // Port number
  port: number;
  //JWT secret
  jwt_secret: string;

  // Whether the development environment
  isDevelopment: boolean;
  // Whether the production environment
  isProduction: boolean;
  // Whether the UAT environment
  isUat: boolean;
}
