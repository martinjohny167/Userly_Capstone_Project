// Database connection configuration
const DB_CONFIG = {
  hostname: 'database-2.cy50qe2u6uhv.us-east-1.rds.amazonaws.com',
  username: 'admin',
  password: 'project1234',
  database: 'usermanagement', // You may need to adjust this to match your actual database name
  port: 3306 // Default MySQL port
};

// API base URL - replace with your actual backend URL
export const API_BASE_URL = 'http://54.91.162.58:5000/api';

export default DB_CONFIG; 
