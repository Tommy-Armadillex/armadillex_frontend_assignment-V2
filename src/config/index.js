const apiUrl = process.env.VITE_API_URL
const devMode = process.env.VITE_ENV_MODE === 'development' || true

export { apiUrl, devMode }
