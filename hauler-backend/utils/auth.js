// utils/auth.js
const admin = require('firebase-admin');

async function setCustomClaims(uid, claims) {
  await admin.auth().setCustomUserClaims(uid, claims);
}

module.exports = {
  setCustomClaims
};