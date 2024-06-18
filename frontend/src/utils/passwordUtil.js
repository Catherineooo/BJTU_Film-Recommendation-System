import CryptoJS from 'crypto-js';

const SALT = 'gj&drj9999';

export const encoder = (password) => {
  const saltedPassword = password + SALT;
  const hashedPassword = CryptoJS.SHA256(saltedPassword).toString(CryptoJS.enc.Hex);
  return hashedPassword;
};
