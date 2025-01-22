const fs = require('fs/promises');
const path = require ('path');
const dbPath = path.resolve('data', 'db.json');

// AWS: Add Debug Configuration | AWS: Edit Debug configuration
exports.readFile = async () => {
    const data = await fs.readFile(dbPath);
    return JSON.parse(data);
};

// AWS: Add Debug Configuration | AWS: Edit Debug configuration
exports.writeFile = async (data) => {
    await fs.writeFile(dbPath, JSON.stringify(data));
};