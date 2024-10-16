const admin = require('firebase-admin');
const firestore = admin.firestore();

// Function to add a new user profile
async function addUserProfile(userProfileData) {
  const userProfileRef = firestore.collection('users').doc(userProfileData.uid);

  try {
    await userProfileRef.set({
      uid: userProfileData.uid,
      approved: userProfileData.approved || false,
      firstName: userProfileData.firstName,
      lastName: userProfileData.lastName,
      profilePicUrl: userProfileData.profilePicUrl,
      dateOfBirth: userProfileData.dateOfBirth,
      timeStamp: admin.firestore.FieldValue.serverTimestamp(), // Firebase timestamp
      province: userProfileData.province,
      city: userProfileData.city,
      streetAddress: userProfileData.streetAddress,
      unitNumber: userProfileData.unitNumber,
      email: userProfileData.email,
      contactNumber: userProfileData.contactNumber,
      code: userProfileData.code,
    });
    console.log('User profile successfully added to Firestore');
  } catch (error) {
    console.error('Error adding user profile:', error);
  }
}

module.exports = {
  addUserProfile
};