import axios from "axios";
//import { NETWORK_URL } from "@env";

//const url = NETWORK_URL;
const url = "https://hauler-backend-production.up.railway.app"
console.log("Connectimg to server");
console.log(url);

//========================================To register user ===================================================//
export async function signUp(
  uid,
  firstName,
  lastName,
  profilePicUrl,
  dateOfBirth,
  province,
  city,
  streetAddress,
  unitNumber,
  email,
  contactNumber
) {
  const res = await axios.post(`${url}/api/users`, {
    uid: uid,
    firstName: firstName,
    lastName: lastName,
    profilePicUrl:
      "http://2019wcsg.ca/wp-content/uploads/2018/01/profile-placeholder.png",
    dateOfBirth: dateOfBirth,
    province: province,
    city: city,
    streetAddress: streetAddress,
    unitNumber: unitNumber,
    email: email,
    contactNumber: contactNumber
  });
  console.log("user created");
  return res;
}

//======================================To get user's posts ==========================================//
export async function getAllPosts(uid) {
  try {
    const res = await axios.get(`${url}/api/posts/user/${uid}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//==================================== To add new post ===============================================//
export async function postItem(
  uid,
  service,
  postHeading,
  description,
  selectedweight,
  selectedquantity,
  image,
  sliderValue,
  pickUpAddress,
  pickUpCity,
  pickUpAddressLat,
  pickUpAddressLng,
  pickContactPerson,
  pickUpPhoneNumber,
  pickUpSpecialInstructions,
  dropOffAddress,
  dropOffCity,
  dropOffAddressLat,
  dropOffAddressLng,
  dropOffContactPerson,
  dropOffPhoneNumber,
  dropOffSpecialInstructions,
  distance
) {
  try {
    const res = await axios.post(`${url}/api/posts`, {
      userId: uid,
      service: service,
      postHeading: postHeading,
      postDescription: description,
      loadWeight: selectedweight,
      numberOfItems: selectedquantity,
      imageUrl:
        "https://cdn.apartmenttherapy.info/image/upload/v1558596110/at/archive/e06c0d4c7d9800f5d664133bf5185b850372f018.jpg",
      price: sliderValue,
      pickUpAddress: pickUpAddress,
      pickUpCity: pickUpCity,
      pickUpAddressLat: pickUpAddressLat,
      pickUpAddressLng: pickUpAddressLng,
      pickUpContactPerson: pickContactPerson,
      pickUpContactNumber: pickUpPhoneNumber,
      pickUpSpecialInstruction: pickUpSpecialInstructions,
      dropOffAddress: dropOffAddress,
      dropOffCity: dropOffCity,
      dropOffAddressLat: dropOffAddressLat,
      dropOffAddressLng: dropOffAddressLng,
      dropOffContactPerson: dropOffContactPerson,
      dropOffContactNumber: dropOffPhoneNumber,
      dropOffSpecialInstruction: dropOffSpecialInstructions,
      distance: distance,
    });
    console.log("user post created");
    return res;
  } catch (err) {
    console.log(err);
  }
}

//=============================== To get post by uid and service ====================================//
export async function getPostsByIdAndLocation(uid, location) {
  try {
    const res = await axios.get(
      `${url}/api/posts/user/location/${uid}/${location}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//=============================== To get post by uid and location ===================================//
export async function getPostsByIdAndService(uid, service) {
  try {
    const res = await axios.get(
      `${url}/api/posts/user/service/${uid}/${service}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//============================= To get service provider profile ====================================//
export async function getOneServiceProvider(uid) {
  try {
    const res = await axios.get(`${url}/api/service-providers/${uid}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//=============================== To get single post by postId ====================================//
export async function getOnePost(postId) {
  try {
    const res = await axios.get(`${url}/api/posts/one/${postId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//====================== get response by get Response By ServiseProviderId ==========================//
export async function getResponseByServiseProviderId(uid, postId) {
  try {
    const res = await axios.get(
      `${url}/api/posts/response/service-provider/${uid}/${postId}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//===================================== Post user Response =========================================//
export async function addUserResponse(
  status,
  postId,
  serviceProviderId,
  responseStatus,
  serviceProviderActionButtons,
  userResponse,
  userResponsePrice,
  userActionButtons
) {
  const res = await axios.post(`${url}/api/posts/response/user`, {
    status: status,
    postId: postId,
    serviceProviderId: serviceProviderId,
    responseStatus: responseStatus,
    serviceProviderActionButtons: serviceProviderActionButtons,
    userResponse: userResponse,
    userResponsePrice: userResponsePrice,
    userActionButtons: userActionButtons,
  });
  console.log("response sent");
  return res;
}

//=============================== To change post visibility ==========================================//
export async function updatePostVisibility(
  postId,
  actionPrice,
  serviceProviderId
) {
  try {
    const res = await axios.post(`${url}/api/posts/one/${postId}`, {
      price: actionPrice,
      serviceProviderId: serviceProviderId,
    });
    console.log("Hide post");
    return res;
  } catch (err) {
    console.log(err);
  }
}
//===================================To Get One User =================================================//
export async function getOneUser(uid) {
  try {
    const res = await axios.get(`${url}/api/users/${uid}`);
    console.log('res.data', res.data);
    return res.data;
  } catch (err) {
    console.log('There has been a problem with your fetch operation: ' + err.message);
    throw new Error(`Error fetching user data: ${err.message}`);
  }
}


//================================= To Update User Information ======================================//
export async function updateOneUser(
  uid,
  firstName,
  lastName,
  profilePicUrl,
  dateOfBirth,
  province,
  city,
  streetAddress,
  unitNumber,
  contactNumber,
  creditCardNumber,
  expiryDate,
  cvv
) {
  try {
    const res = await axios.post(`${url}/api/users/${uid}`, {
      firstName: firstName,
      lastName: lastName,
      profilePicUrl:
        "https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=v2&px=999",
      dateOfBirth: dateOfBirth,
      province: province,
      city: city,
      streetAddress: streetAddress,
      unitNumber: unitNumber,
      contactNumber: contactNumber,
      creditCardNumber: creditCardNumber,
      expiryDate: expiryDate,
      cvv: cvv,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//==================================== To delete post ===============================================//
export async function deleteOnePost(postId) {
  try {
    const res = await axios.delete(`${url}/api/posts/${postId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
//==========================To mark post as paid===============

export async function markPostPaid(postId) {
  try {
    const res = await axios.post(`${url}/api/posts/serviceprovider/paid/${postId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//==================================To create stripe payment intent ===========================//
export async function createPaymentIntent(postId, amount, serviceProviderAccount) {
  console.log(postId)
  try {
    const res = await axios.post(`${url}/api/stripe/createPaymentIntent`, {
      postId: postId,
      amount: amount,
      serviceProviderAccount: serviceProviderAccount
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
}
//==================================== To edit Post ==================================================//
export async function updateOnePost(
  postId,
  // service,
  postHeading,
  postDescription,
  loadWeight,
  numberOfItems,
  // imageUrl,
  price,
  pickUpAddress,
  pickUpCity,
  pickUpAddressLat,
  pickUpAddressLng,
  pickUpContactPerson,
  pickUpContactNumber,
  pickUpSpecialInstruction,
  dropOffAddress,
  dropOffCity,
  dropOffAddressLat,
  dropOffAddressLng,
  dropOffContactPerson,
  dropOffContactNumber,
  dropOffSpecialInstruction,
  distance
) {
  try {
    const res = await axios.post(`${url}/api/posts/${postId}`, {
      // service: service,
      postHeading: postHeading,
      postDescription: postDescription,
      loadWeight: loadWeight,
      numberOfItems: numberOfItems,
      // imageUrl: imageUrl,
      price: price,
      pickUpAddress: pickUpAddress,
      pickUpCity: pickUpCity,
      pickUpAddressLat: pickUpAddressLat,
      pickUpAddressLng: pickUpAddressLng,
      pickUpContactPerson: pickUpContactPerson,
      pickUpContactNumber: pickUpContactNumber,
      pickUpSpecialInstruction: pickUpSpecialInstruction,
      dropOffAddress: dropOffAddress,
      dropOffCity: dropOffCity,
      dropOffAddressLat: dropOffAddressLat,
      dropOffAddressLng: dropOffAddressLng,
      dropOffContactPerson: dropOffContactPerson,
      dropOffContactNumber: dropOffContactNumber,
      dropOffSpecialInstruction: dropOffSpecialInstruction,
      distance: distance,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}


//----------------------------------To mark the job complete'-----------------------------
export async function markJobComplete(postId) {
  console.log(postId)
  try {
    const res = await axios.post(`${url}/api/posts/complete/${postId}`);
    return res.data
  } catch (err) {
    console.log(err);
  }
}
