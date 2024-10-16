const admin = require('firebase-admin');
const firestore = admin.firestore();

// Function to add a new service provider profile
async function addServiceProviderProfile(serviceProviderData) {
  const serviceProviderRef = firestore.collection('serviceProviderProfiles').doc(serviceProviderData.uid);

  try {
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
      vehicleType: serviceProviderData.vehicleType.map(vehicle => ({
        vehicle: vehicle.vehicle
      })),
      driverLicenseUrl: serviceProviderData.driverLicenseUrl,
      driverLicenseExpiry: serviceProviderData.driverLicenseExpiry,
      driverAbstractUrl: serviceProviderData.driverAbstractUrl,
      profileStatus: serviceProviderData.profileStatus,
      stripeAcc: serviceProviderData.stripeAcc,
      serviceProvided: serviceProviderData.serviceProvided.map(service => ({
        serviceProvided: service.serviceProvided,
        serviceStatus: service.serviceStatus,
        serviceLocations: service.serviceLocations.map(location => ({
          serviceLocation: location.serviceLocation,
          locationStatus: location.locationStatus
        }))
      })),
      code: serviceProviderData.code
    });
    console.log('Service provider profile successfully added to Firestore');
  } catch (error) {
    console.error('Error adding service provider profile:', error);
  }
}

module.exports = {
  addServiceProviderProfile
};
