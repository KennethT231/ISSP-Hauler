const admin = require('firebase-admin');
const firestore = admin.firestore();

//================================ Create new post on user app =====================================//
const createPost = async (req, res) => {
    try {
        const {
            userId,
            service,
            postHeading,
            postDescription,
            loadWeight,
            numberOfItems,
            imageUrl,
            price,
            totalOffers,
            status,
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
            distance,
            serviceProviderId,
            responseStatus,
            notificationOnServiceProvider,
            notificationOnUser,
            serviceProviderActionButtons,
            userActionButtons,
            serviceProviderResponse,
            serviceProviderActionPrice,
            userResponse,
            userResponsePrice,
        } = req.body;

        const postData = {
            userId,
            service,
            postHeading,
            postDescription,
            loadWeight,
            numberOfItems,
            loadImages: [
                { imageUrl }
            ],
            price,
            totalOffers,
            status,
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
            distance,
            response: [{
                serviceProviderId,
                responseStatus,
                notificationOnServiceProvider,
                notificationOnUser,
                serviceProviderActionButtons,
                userActionButtons,
                serviceProviderResponseSchema: [{
                    serviceProviderResponse,
                    serviceProviderActionPrice
                }],
                userResponseSchema: [{
                    userResponse,
                    userResponsePrice
                }]
            }],
            createdAt: admin.firestore.FieldValue.serverTimestamp()  // Store the timestamp
        };
        
        const newPostRef = await firestore.collection('posts').add(postData);
        
        res.status(201).json({ success: true, postId: newPostRef.id, post: postData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//=============================get all posts for testing ===========================================//
const getAll = async (req, res) => {
    try {
        const snapshot = await firestore.collection('posts').get();
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map over the documents to include their IDs

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//=============================delete all posts for testing ===========================================//
const deleteAll = async (req, res) => {
    try {
        const postsSnapshot = await firestore.collection('posts').get();
        // Check if the collection is empty
        if (postsSnapshot.empty) {
            return res.status(404).json({ message: 'No posts found to delete' });
        }

        // Create a batch to delete all documents
        const batch = firestore.batch();

        postsSnapshot.forEach((doc) => {
            batch.delete(doc.ref); // Add each delete operation to the batch
        });

        await batch.commit();

        res.status(200).json('all posts deleted')
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//=========================== To get all posts posted by user on user app ==========================//
const getPostsByUid = async (req, res) => {
    const id = req.params.uid; // Get the user ID from the request parameters
    try {
        const postsSnapshot = await firestore.collection('posts').where('userId', '==', id).get(); // Query Firestore for posts

        // Check if the snapshot is empty
        if (postsSnapshot.empty) {
            return res.status(404).json({ message: 'No posts found for this user.' });
        }

        // Map the documents to an array
        const posts = postsSnapshot.docs.map(doc => ({
            id: doc.id, // Include the document ID
            ...doc.data() // Spread the document data
        }));

        res.status(200).json(posts); // Send the posts in the response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

//========================== To get user's posts by location on user app ===========================//
const getPostsByIdAndLocation = async (req, res) => {
    const id = req.params.uid;
    const location = req.params.location;

    try {
        // Query Firestore to get posts for the specified user and location
        const postsSnapshot = await firestore.collection('posts')
            .where('userId', '==', id)
            .where('pickUpCity', '==', location)
            .get();

        // Check if any posts were found
        if (postsSnapshot.empty) {
            return res.status(404).json({ message: 'No posts found for this user and location.' });
        }

        // Map the posts to include their IDs and data
        const posts = postsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Send the response back to the client
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//========================= To get user's posts by service on user app ==============================//
const getPostsByIdAndService = async (req, res) => {
    const id = req.params.uid;
    const service = req.params.service;

    try {
        // Query Firestore to get posts for the specified user and service
        const postsSnapshot = await firestore.collection('posts')
            .where('userId', '==', id)
            .where('service', '==', service)
            .get();

        // Check if any posts were found
        if (postsSnapshot.empty) {
            return res.status(404).json({ message: 'No posts found for this user and service.' });
        }

        // Map the posts to include their IDs and data
        const posts = postsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Send the response back to the client
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//================================= Delete post on user app =========================================// 
const deleteOnePost = async (req, res) => {
    const id = req.params.postId;
    console.log('delete post id', id);

    try {
        // Get the post from Firestore
        const postRef = firestore.collection('posts').doc(id);
        const postDoc = await postRef.get();

        // Check if the post exists
        if (!postDoc.exists) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        const postData = postDoc.data();

        // Check if the post is in an active status
        if (['Available', 'Negotiating'].includes(postData.status)) {
            await postRef.delete(); // Delete the post
            res.status(200).json("Post deleted");
        } else {
            res.status(200).json("This post is already accepted. You cannot delete it!");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//==================================== Edit post on user app ========================================//
const updateOnePost = async (req, res) => {
    const id = req.params.postId;

    try {
        const postRef = firestore.collection('posts').doc(id);
        const postDoc = await postRef.get();

        // Check if the post exists
        if (!postDoc.exists) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        const postData = postDoc.data();

        // Check if the post is in an active status
        if (['Available', 'Negotiating'].includes(postData.status)) {
            const {
                postHeading,
                postDescription,
                loadWeight,
                numberOfItems,
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
            } = req.body;

            // Update the post in Firestore
            await postRef.update({
                postHeading,
                postDescription,
                loadWeight,
                numberOfItems,
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
            });

            res.status(200).json('Post updated');
        } else {
            res.status(403).json("This post is already accepted. You cannot edit it!");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//SK - to change job status to "in progress" once driver is en route
const changeJobStatusToDriving = async (req, res) => {
    const id = req.params.postId;

    try {
        const postRef = firestore.collection('posts').doc(id);
        const postDoc = await postRef.get();

        // Check if the post exists
        if (!postDoc.exists) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        // Update the status to "In Progress"
        await postRef.update({
            status: "In Progress"
        });

        res.status(200).json('Status updated to driving');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//================================ To change post visibilty on both apps =============================//
// generate accepted price and service provider id
const updatePostVisibility = async (req, res) => {
    const id = req.params.postId;
    const {
        price,
        serviceProviderId
    } = req.body;

    try {
        const postRef = firestore.collection('posts').doc(id);
        const postDoc = await postRef.get();

        // Check if the post exists
        if (!postDoc.exists) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        // Update the post visibility
        await postRef.update({
            show: false,
            status: "Awaiting Payment",
            acceptedPrice: price,
            acceptedServiceProvider: serviceProviderId
        });

        res.status(200).json('Visibility updated');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//============================= To get single post by post Id on both apps ==========================//
const getOnePost = async (req, res) => {
    const postId = req.params.postId;

    try {
        const postRef = firestore.collection('posts').doc(postId);
        const postDoc = await postRef.get();

        // Check if the post exists
        if (!postDoc.exists) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        // Return the post data
        res.status(200).json({ id: postDoc.id, ...postDoc.data() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//======================== To get all Active posts on service provider app ==========================//
const getAllPosts = async (req, res) => {
    try {
        const postsSnapshot = await firestore.collection('posts').where('show', '==', true).get();

        // Check if there are any posts
        if (postsSnapshot.empty) {
            return res.status(404).json({ message: 'No posts found.' });
        }

        // Map the posts data to an array
        const posts = postsSnapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data() 
        }));

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//======================= To get Active posts by location on service provider app ====================//
const getPostsByLocation = async (req, res) => {
    const location = req.params.location;
    try {
        // Reference to the 'posts' collection in Firestore
        const postsRef = firestore.collection('posts');

        // Query to get posts where 'show' is true and 'pickUpCity' matches the location
        const snapshot = await postsRef.where('show', '==', true).where('pickUpCity', '==', location).get();

        // Check if there are any posts and create an array of the results
        if (snapshot.empty) {
            return res.status(404).json({ message: 'No posts found' });
        }

        const posts = snapshot.docs.map(doc => ({
            id: doc.id, // Include the document ID
            ...doc.data(), // Spread the document data
        }));

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//======================= To get Active Jobs by service on service provider app ======================//
const getPostsByService = async (req, res) => {
    const service = req.params.service;
    try {
        // Reference to the 'posts' collection in Firestore
        const postsRef = firestore.collection('posts');

        // Query to get posts where 'show' is true and 'service' matches the provided service
        const snapshot = await postsRef.where('show', '==', true).where('service', '==', service).get();

        // Check if there are any posts and create an array of the results
        if (snapshot.empty) {
            return res.status(404).json({ message: 'No posts found' });
        }

        const posts = snapshot.docs.map(doc => ({
            id: doc.id, // Include the document ID
            ...doc.data(), // Spread the document data
        }));

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//=========================== To get all post by serviceProviderId ===================================//
const getPostsByServiceProviderId = async (req, res) => {
    try {
        const serviceProviderId = req.params.serviceProviderId;
        const postsRef = firestore.collection('posts');

        // Query to get posts where 'response.serviceProviderId' matches the provided ID
        const snapshot = await postsRef.where('response.serviceProviderId', '==', serviceProviderId).get();

        // Check if there are any posts and create an array of the results
        if (snapshot.empty) {
            return res.status(404).json({ message: 'No posts found for this service provider' });
        }

        const posts = snapshot.docs.map(doc => ({
            id: doc.id, // Include the document ID
            ...doc.data(), // Spread the document data
        }));

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//=================== To get all post by serviceProviderId and service ==============================//
const getPostsByServiceProviderAndService = async (req, res) => {
    try {
        const service = req.params.service;
        const serviceProviderId = req.params.serviceProviderId;
        const postsRef = firestore.collection('posts');

        // Query to get posts where 'response.serviceProviderId' matches the provided ID and service matches the provided service
        const snapshot = await postsRef
            .where('response.serviceProviderId', '==', serviceProviderId)
            .where('service', '==', service)
            .get();

        // Check if there are any posts and create an array of the results
        if (snapshot.empty) {
            return res.status(404).json({ message: 'No posts found for this service provider and service' });
        }

        const posts = snapshot.docs.map(doc => ({
            id: doc.id, // Include the document ID
            ...doc.data(), // Spread the document data
        }));

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//=================== To get all post by serviceProviderId and location ==============================//
const getPostsByServiceProviderIdAndLocation = async (req, res) => {
    try {
        const location = req.params.location;
        const serviceProviderId = req.params.serviceProviderId;
        const postsRef = firestore.collection('posts');

        // Query to get posts where 'response.serviceProviderId' matches the provided ID and 'pickUpCity' matches the location
        const snapshot = await postsRef
            .where('response.serviceProviderId', '==', serviceProviderId)
            .where('pickUpCity', '==', location)
            .get();

        // Check if there are any posts and create an array of the results
        if (snapshot.empty) {
            return res.status(404).json({ message: 'No posts found for this service provider in the specified location' });
        }

        const posts = snapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data(), 
        }));

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//==================== To add service provider response on service provider app ======================//

const addServiceProviserResponse = async (req, res) => {

    const {
        status,
        postId,
        serviceProviderId,
        responseStatus,
        // notificationOnServiceProvider,
        // notificationOnUser,
        serviceProviderActionButtons,
        serviceProviderResponse,
        serviceProviderActionPrice,
        userActionButtons
    } = req.body;


    let activePost = await PostData.findOne({ _id: postId, status: { $in: ['Available', 'Negotiating'] } })
    if (!!activePost) {//finds offers this service provider has already made on this post
        let existedResponse = await PostData.aggregate([
            { $match: { _id: ObjectId(postId), } },
            { $unwind: "$response" },
            { $replaceRoot: { newRoot: "$response" } },
            { $match: { serviceProviderId: serviceProviderId } },
        ]);
        const incrementValue = status === 'Declined' ? -1 : existedResponse.length > 0 ? 0 : 1
        //if this service provider has alread made an offer on this post
        if (existedResponse.length > 0) {
            try {
                const updatedResponse = await PostData.updateOne(
                    { _id: postId, 'response.serviceProviderId': serviceProviderId }, {
                    $push: {
                        'response.$.serviceProviderResponseSchema': [{
                            serviceProviderResponse,
                            serviceProviderActionPrice
                        }
                        ]
                    },
                    $set: {
                        'status': status,
                        'response.$.responseStatus': responseStatus,
                        'response.$.serviceProviderActionButtons': serviceProviderActionButtons,
                        'response.$.notificationOnServiceProvider': 'none',
                        'response.$.notificationOnUser': 'flex',
                        'response.$.userActionButtons': userActionButtons
                    },
                    $inc: {
                        totalOffers: incrementValue
                    }
                }
                )
                res.status(200).json("Response sent");
            } catch (error) {
                res.status(404).json({ message: error.message });
            }
        }
        //iff service provider has not made an offer on this post before
        else {
            try {
                const newResponse = await PostData.updateOne({ _id: postId },
                    {
                        $push: {
                            response:
                                [{
                                    serviceProviderId: serviceProviderId,
                                    responseStatus: responseStatus,
                                    notificationOnServiceProvider: 'none',
                                    notificationOnUser: 'flex',
                                    serviceProviderActionButtons: serviceProviderActionButtons,
                                    userActionButtons: userActionButtons,
                                    serviceProviderResponseSchema: [{
                                        serviceProviderResponse: serviceProviderResponse,
                                        serviceProviderActionPrice: serviceProviderActionPrice,
                                    }],
                                }]
                        },
                        $inc: {
                            totalOffers: incrementValue
                        },
                        $set: {
                            'status': status
                        }
                    })
                res.status(200).json("Response sent")
            } catch (error) {
                res.status(404).json({ message: error.message });
            }
        }
    } else {
        res.status(200).json("This post is not available")
    }
};
//================================= To add user response on user app ================================//
const addUserResponse = async (req, res) => {
    const {
        status,
        postId,
        serviceProviderId,
        responseStatus,
        // notificationOnServiceProvider,
        // notificationOnUser,
        serviceProviderActionButtons,
        userResponse,
        userResponsePrice,
        userActionButtons
    } = req.body
    //only need to change number of offers for user if they are declining a service provider offer - users cannot initiate offers
    const incrementValue = status === 'Declined' ? -1 : 0
    let activePost = await PostData.findOne({ _id: postId, status: { $in: ['Available', 'Negotiating'] } })
    if (!!activePost) {
        try {
            const updatedResponse = await PostData.updateOne(
                { _id: postId, 'response.serviceProviderId': serviceProviderId }, {
                $push: {
                    'response.$.userResponseSchema': [{
                        userResponse,
                        userResponsePrice
                    }
                    ]
                },
                $set: {
                    'status': status,
                    'response.$.responseStatus': responseStatus,
                    'response.$.serviceProviderActionButtons': serviceProviderActionButtons,
                    'response.$.notificationOnServiceProvider': 'flex',
                    'response.$.notificationOnUser': 'none',
                    'response.$.userActionButtons': userActionButtons
                },
                $inc: {
                    totalOffers: incrementValue
                }
            }
            )
            res.status(200).json(updatedResponse);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    } else {
        res.status(200).json("This post is not available")
    }
}

//=================== To get respone by serviceProviderId on serviceProvider App =====================//
const getResponseByServiseProviderId = async (req, res) => {
    try {
        const id = req.params.postId;
        const serviceProviderId = req.params.serviceProviderId;
        let newResponse = await PostData.aggregate([
            { $match: { _id: ObjectId(id), } },
            { $unwind: "$response" },
            { $replaceRoot: { newRoot: "$response" } },
            { $match: { serviceProviderId: serviceProviderId } },
        ]);
        res.status(200).json(newResponse)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//================================= To Delete Response on both apps====================================//
const deleteResponse = async (req, res, next) => {
    try {
        const responseId = req.params.responseId;
        await PostData.update({}, { $pull: { response: { _id: ObjectId(responseId) } } }, { multi: true })
        res.status(201).json({ "item deleted": 1 })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Neeraj  - send live gps cordinates to database
const postGpsCordinates = async (req, res) => {
    try {
        const id = req.params.postId;
        const { latitude, longitude } = req.body

        console.log("called the server")
        console.log(req.body)
        await PostData.findOneAndUpdate({ _id: id },
            {
                driverLat: latitude,
                driverLong: longitude
            }
        ), { upsert: true };
        res.status(200).json('Gps Data Posted Sucessfully')
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Neeraj  - Update post status on Driver arrival

const markDriverArrival = async (req, res) => {
    try {
        const id = req.params.postId;

        await PostData.findOneAndUpdate({ _id: id },
            {
                $set: {
                    status: "Driver Arrived"
                }
            });
        res.status(200).json('Status Updated Sucesssfully')
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
//============================== To mark job as paid==============================
const markJobPaid = async (req, res) => {
    try {
        const id = req.params.postId;

        await PostData.findOneAndUpdate({ _id: id },
            {
                $set: {
                    status: "Paid"
                }
            });
        res.status(200).json('Status Updated Sucesssfully')
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Neeraj  - Update post status on Driver arrival

const markJobComplete = async (req, res) => {
    try {
        const id = req.params.postId;

        await PostData.findOneAndUpdate({ _id: id },
            {
                $set: {
                    status: "Complete"
                }
            });
        res.status(200).json('Status Updated Sucesssfully')
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//===================================================================================================//
exports.getAllPosts = getAllPosts;
exports.getPostsByUid = getPostsByUid;
exports.getOnePost = getOnePost;
exports.createPost = createPost;
exports.deleteOnePost = deleteOnePost;
exports.updateOnePost = updateOnePost;
exports.updatePostVisibility = updatePostVisibility;
exports.getPostsByService = getPostsByService;
exports.getPostsByLocation = getPostsByLocation;
exports.getPostsByIdAndService = getPostsByIdAndService;
exports.getPostsByIdAndLocation = getPostsByIdAndLocation;
exports.addServiceProviserResponse = addServiceProviserResponse;
exports.addUserResponse = addUserResponse;
exports.getResponseByServiseProviderId = getResponseByServiseProviderId;
exports.deleteResponse = deleteResponse;
exports.getPostsByServiceProviderId = getPostsByServiceProviderId;
exports.getPostsByServiceProviderAndService = getPostsByServiceProviderAndService;
exports.getPostsByServiceProviderIdAndLocation = getPostsByServiceProviderIdAndLocation;
exports.getAll = getAll;
exports.deleteAll = deleteAll;
exports.changeJobStatusToDriving = changeJobStatusToDriving;
exports.postGpsCordinates = postGpsCordinates;
exports.markDriverArrival = markDriverArrival;
exports.markJobPaid = markJobPaid;
exports.markJobComplete = markJobComplete;