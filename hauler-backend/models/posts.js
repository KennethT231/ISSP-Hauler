// Importing Firebase Admin SDK and Firestore
const admin = require('firebase-admin');
const firestore = admin.firestore();

// Function to add a new post to Firestore
async function addPost(postData) {
  const postRef = firestore.collection('posts').doc();  // Generates a new document with a random ID

  try {
    await postRef.set({
      userId: postData.userId,
      service: postData.service,
      postHeading: postData.postHeading,
      postDescription: postData.postDescription || '',
      loadWeight: postData.loadWeight || '',
      numberOfItems: postData.numberOfItems || 0,
      loadImages: postData.loadImages.map(image => ({
        imageUrl: image.imageUrl || 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
      })),
      price: postData.price || 50,
      totalOffers: postData.totalOffers || 0,
      show: postData.show !== undefined ? postData.show : true,
      status: postData.status || 'Available',
      acceptedPrice: postData.acceptedPrice || null,
      acceptedServiceProvider: postData.acceptedServiceProvider || null,
      pickUpAddress: postData.pickUpAddress,
      pickUpCity: postData.pickUpCity,
      pickUpAddressLat: postData.pickUpAddressLat,
      pickUpAddressLng: postData.pickUpAddressLng,
      pickUpContactPerson: postData.pickUpContactPerson || '',
      pickUpContactNumber: postData.pickUpContactNumber,
      pickUpSpecialInstruction: postData.pickUpSpecialInstruction || '',
      dropOffAddress: postData.dropOffAddress || '',
      dropOffCity: postData.dropOffCity || '',
      dropOffAddressLat: postData.dropOffAddressLat || null,
      dropOffAddressLng: postData.dropOffAddressLng || null,
      dropOffContactPerson: postData.dropOffContactPerson || '',
      dropOffContactNumber: postData.dropOffContactNumber || '',
      dropOffSpecialInstruction: postData.dropOffSpecialInstruction || '',
      distance: postData.distance || null,

      // Handled response array, added null/array checks and default initialization
      response: postData.response.map(response => ({
        serviceProviderId: response.serviceProviderId || '',
        responseStatus: response.responseStatus || '',
        notificationOnServiceProvider: response.notificationOnServiceProvider || 'none',
        notificationOnUser: response.notificationOnUser || 'none',
        serviceProviderActionButtons: response.serviceProviderActionButtons || false,
        userActionButtons: response.userActionButtons || false,

        // Checked and mapped serviceProviderResponseSchema, with default values
        serviceProviderResponseSchema: response.serviceProviderResponseSchema.map(resp => ({
          serviceProviderResponse: resp.serviceProviderResponse || '',
          serviceProviderActionPrice: resp.serviceProviderActionPrice || 0,
          timeStamp: admin.firestore.FieldValue.serverTimestamp()
        })),

        // Checked and mapped userResponseSchema, with default values
        userResponseSchema: response.userResponseSchema.map(resp => ({
          userResponse: resp.userResponse || '',
          userResponsePrice: resp.userResponsePrice || 0,
          timeStamp: admin.firestore.FieldValue.serverTimestamp()
        }))
      })),
      driverLat: postData.driverLat || 49.198913,
      driverLong: postData.driverLong || -122.865984,
      paymentIntent: postData.paymentIntent || null
    });
    
    console.log('Post successfully added to Firestore');
    return { success: true, postId: postRef.id };  // Return post ID
  } catch (error) {
    console.error('Error adding post:', error);
    return { success: false, message: error.message };  // Return error message
  }
}

module.exports = {
  addPost
};
