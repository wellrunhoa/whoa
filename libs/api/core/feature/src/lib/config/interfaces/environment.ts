export interface EnvironmentConfig {
  // Get node environment variable current environment identifier
  // 'dev' | 'prod' | 'test' | 'prov' | 'local'
  appEnv: string;
  // Host address
  host: string;
  // Port number
  port: number;
  //JWT secret
  jwtSecret: string;

  enableSwagger: boolean;
  // Whether the production environment
  isProduction: boolean;
  contextPath: string;
  swaggerPath: string;
  table: {
    page_row_count: number;
  };
  uploadLocation: string;
}
