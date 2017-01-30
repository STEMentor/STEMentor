var connectionString;

// If we are running on Heroku, use the remote database (with SSL)
if(process.env.DATABASE_URL !== undefined) {
  connectionString = process.env.DATABASE_URL + "?ssl=true";
} else {
  // running locally, use our local database instead
  connectionString = 'postgres://localhost:5432/stementor';
}

module.exports = connectionString;
