require("dotenv").config();
 
const env = (key, defaultValue) => {
  const value = process.env[key] || defaultValue;
  if (typeof value === "undefined") {
    throw new Error(`Environment variable ${key} not set.`);
  }

  return value;
};

const generateCode = () => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  
  return text;
};

module.exports = {
  env,
  generateCode,
};
