// Importing Firebase Admin SDK and Firestore
const admin = require('firebase-admin');
const firestore = admin.firestore();

// Function to add a new service provider profile
async function addServiceProviderProfile(serviceProviderData) {
// Creates a document reference in Firestore using the `uid` as the document ID
  const serviceProviderRef = firestore.collection('serviceProviders').doc(serviceProviderData.uid);

  try {
// Setting the document data for the new service provider profile
    await serviceProviderRef.set({
      uid: serviceProviderData.uid,
      firstName: serviceProviderData.firstName,
      lastName: serviceProviderData.lastName,
      profilePicUrl: serviceProviderData.profilePicUrl,
      dateOfBirth: serviceProviderData.dateOfBirth,
      stars: serviceProviderData.stars || 5,  // default value
      timeStamp: admin.firestore.FieldValue.serverTimestamp(),  // Firebase server timestamp
      province: serviceProviderData.province,
      city: serviceProviderData.city,
      streetAddress: serviceProviderData.streetAddress,
      unitNumber: serviceProviderData.unitNumber,
      email: serviceProviderData.email,
      contactNumber: serviceProviderData.contactNumber,
      chequeDepositFormUrl: serviceProviderData.chequeDepositFormUrl,
// Maps array of `vehicleType` objects, transforming each for Firestore format
      vehicleType: serviceProviderData.vehicleType.map(vehicle => ({
        vehicle: vehicle.vehicle
      })),
      driverLicenseUrl: serviceProviderData.driverLicenseUrl,
      driverLicenseExpiry: serviceProviderData.driverLicenseExpiry,
      driverAbstractUrl: serviceProviderData.driverAbstractUrl,
      profileStatus: serviceProviderData.profileStatus,
      stripeAcc: serviceProviderData.stripeAcc,
// Service details, mapping nested arrays `serviceProvided` and `serviceLocations` to Firestore format
      serviceProvided: serviceProviderData.serviceProvided.map(service => ({
        serviceProvided: service.serviceProvided,
        serviceStatus: service.serviceStatus,
        serviceLocations: service.serviceLocations.map(location => ({
          serviceLocation: location.serviceLocation,
          locationStatus: location.locationStatus
        }))
      })),
      code: serviceProviderData.code // Verification code
    });
// Logging any errors during the write process
    console.log('Service provider profile successfully added to Firestore');
  } catch (error) {
    console.error('Error adding service provider profile:', error);
  }
}

module.exports = {
  addServiceProviderProfile
};
