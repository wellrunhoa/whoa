export interface ApplicationConfig {
  name: string;
  description: string;
  version: string;
  host: string;
  port: number;
  contextPath: string;
  swaggerPath: string;
  table: {
    page_row_count: number;
  };
}
