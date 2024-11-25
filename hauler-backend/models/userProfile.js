const admin = require('firebase-admin');  // Firebase admin SDK for Firestore functions
const firestore = admin.firestore();      // Firestore initialization

// Function to add a new user profile
async function addUserProfile(userProfileData) {
  const userProfileRef = firestore.collection('users').doc(userProfileData.uid);  // Setting document reference using `uid` as the document ID in the 'users' collection

// Setting document fields with Firestore-compatible data and defaults
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
    console.log('User profile successfully added to Firestore'); // Log success message
  } catch (error) {
    console.error('Error adding user profile:', error); // Log error if the user profile addition fails
  }
}

module.exports = {
  addUserProfile
};