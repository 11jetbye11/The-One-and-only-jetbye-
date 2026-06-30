// scripts/migrate.js
// Database migration runner

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('../src/db/connection');

async function migrate() {
  try {
    console.log('🔄 Running database migrations...');
    
    const schemaSql = fs.readFileSync(path.join(__dirname, '../src/db/schema.sql'), 'utf8');
    
    // Split by semicolon and filter empty statements
    const statements = schemaSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    for (const statement of statements) {
      await db.query(statement);
      console.log('✅ Executed statement');
    }
    
    console.log('✅ Migration complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
