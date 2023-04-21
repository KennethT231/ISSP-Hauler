import axios from 'axios';
//import { NETWORK_URL } from '@env';

const url = "http://localhost:3000"
console.log(url);

//==============================To register Service Provider========================================//
export async function signUp(
  uid,
  firstName,
  lastName,
  // profilePicUrl,
  // dateOfBirth,
  province,
  city,
  streetAddress,
  unitNumber,
  email,
  contactNumber,
  vehicleType,
  // driverLicenseExpiry,
  serviceLocation
) {
  try {
  const res = await axios.post(`${url}/api/service-providers`, {
    uid: uid,
    firstName: firstName,
    lastName: lastName,
    profilePicUrl: "https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=v2&px=999",
    dateOfBirth: "01/01/2000",
    province: province,
    city: city,
    streetAddress: streetAddress,
    unitNumber: unitNumber,
    email: email,
    contactNumber: contactNumber,
    chequeDepositFormUrl: "https://i.pinimg.com/474x/40/f3/1d/40f31dd88a4ec213f8b21d1444242969.jpg",
    vehicle: vehicleType,
    driverLicenseExpiry: "01/01/2023",
    serviceLocation: serviceLocation,
    driverLicenseUrl: "https://i.pinimg.com/474x/40/f3/1d/40f31dd88a4ec213f8b21d1444242969.jpg",
    driverAbstractUrl: "https://i.pinimg.com/474x/40/f3/1d/40f31dd88a4ec213f8b21d1444242969.jpg",
    profileStatus: true,
    serviceProvided: "Junk Removal",
    serviceStatus: true,
    locationStatus: true
  });

  console.log('user created');
  return res
} catch (error) {
  console.log(error)
}
}


//================================== To get All active posts =========================================//
export async function getAllPosts() {
  try {
    const res = await axios.get(`${url}/api/posts/all`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//================================= To get posts by service ===========================================//
export async function getPostsByService(service) {
  try {
    const res = await axios.get(`${url}/api/posts/service/${service}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//================================== To get posts by location =========================================//
export async function getPostsByLocation(location) {
  try {
    const res = await axios.get(`${url}/api/posts/location/${location}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//==================================== To get single Post ===========================================//
export async function getOnePost(postId) {
  try {
    const res = await axios.get(`${url}/api/posts/one/${postId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//================================= To get Service Provider Profile ==================================//
export async function getOneServiceProvider(uid) {
  try {
    console.log(uid);
    const res = await axios.get(`${url}/api/service-providers/${uid}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//================================= To edit Profile info =============================================//
export async function updateOneServiceProvider(
  uid,
  firstName,
  lastName,
  profilePicUrl,
  dateOfBirth,
  province,
  city,
  streetAddress,
  unitNumber,
  contactNumber
) {
  try {
    const res = await axios.post(`${url}/api/service-providers/${uid}`, {
      firstName: firstName,
      lastName: lastName,
      profilePicUrl: "https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=v2&px=999",
      dateOfBirth: dateOfBirth,
      province: province,
      city: city,
      streetAddress: streetAddress,
      unitNumber: unitNumber,
      contactNumber: contactNumber,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//=================================== To get posts by serviceProviderId ===============================//
export async function getPostsByServiceProviderId(uid) {
  try {
    const res = await axios.get(`${url}/api/posts/serviceprovider/${uid}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//============================= To get posts by serviceProviderId and service ========================//
export async function getPostsByServiceProviderAndService(uid, service) {
  try {
    const res = await axios.get(`${url}/api/posts/serviceprovider/service/${uid}/${service}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//=========================== To get posts by serviceProviderId and location ========================//
export async function getPostsByServiceProviderIdAndLocation(uid, location) {
  try {
    const res = await axios.get(`${url}/api/posts/serviceprovider/location/${uid}/${location}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//========================== get response by getResponseByServiseProviderId ==========================//
export async function getResponseByServiseProviderId(uid, postId) {
  try {
    const res = await axios.get(`${url}/api/posts/response/service-provider/${uid}/${postId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//================================ post service provider response ====================================//
export async function addServiceProviserResponse(
  status,
  postId,
  serviceProviderId,
  responseStatus,
  serviceProviderActionButtons,
  serviceProviderResponse,
  serviceProviderActionPrice,
  userActionButtons
) {
  const res = await axios.post(`${url}/api/posts/response/service-provider`, {
    status: status,
    postId: postId,
    serviceProviderId: serviceProviderId,
    responseStatus: responseStatus,
    serviceProviderActionButtons: serviceProviderActionButtons,
    serviceProviderResponse: serviceProviderResponse,
    serviceProviderActionPrice: serviceProviderActionPrice,
    userActionButtons: userActionButtons
  });
  console.log('response sent');
  return res
}

//=============================== To change post visibility =====================================================//

export async function updatePostVisibility(postId, actionPrice,serviceProviderId) {
  try {
    const res = await axios.post(`${url}/api/posts/one/${postId}`,{
      price: actionPrice,
      serviceProviderId:  serviceProviderId
    });
    console.log('Hide post');
    return res
  } catch (err) {
    console.log(err);
  }
}
//----------------------------------To mark job as 'driving'-----------------------------
export async function markOnePostInProgress(postId) {
  try {
    const res = await axios.post(`${url}/api/posts/serviceprovider/one/${postId}`);
    return res.data
  } catch (err) {
    console.log(err);
  }}  

  //----------------------------------To send gps cordinates'-----------------------------
export async function sendGpsCordinates(postId,latitude,longitude) {
  try {
    const res = await axios.post(`${url}/api/posts/serviceprovider/gps/${postId}`,{
      latitude:latitude,
      longitude:longitude
    });
    return res.data
  } catch (err) {
    console.log(err);
  }
}

  //----------------------------------To mark the driver arrived'-----------------------------
  export async function markDriverArrival(postId) {
    try {
      const res = await axios.post(`${url}/api/posts/serviceprovider/arrived/${postId}`);
      return res.data
    } catch (err) {
      console.log(err);
    }}  
  
export async function createStripeAccount(email, appUrl,serviceProviderID) {
  try {
  const res = await axios.post(`${url}/api/stripe/createStripeAccount`, {
    email: email,
    appUrl: appUrl,
    serviceProviderID:serviceProviderID
  })
  return res.data
  } catch (err) {
    console.log(err)
  }

}

