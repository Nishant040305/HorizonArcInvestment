function generateUsername(email, objectId) {
    const objectIdPrefix = String(objectId).substring(0, 8);
    const sanitizedEmail = String(email).split('@')[0];
  
    const username = `${sanitizedEmail}-${objectIdPrefix}`;
  
    return username;
  }
  
module.exports = generateUsername;
