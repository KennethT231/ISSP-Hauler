const admin = require('firebase-admin');
const firestore = admin.firestore();

const textflow = require("textflow.js")

// controllers/user-controller.js
const { setCustomClaims } = require('../utils/auth');

textflow.useKey("JZI6ELhqXlkk40ILQx3hFueY0jZb62cfHyv65kWEBqL6uLVV5XhOVr1zO3by7McY");

//================================== To register new user =========================================//
const createUser = async (req, res) => {
    try {
        const {
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
            contactNumber,
            code,
            userType
        } = req.body;

        let result = await textflow.verifyCode(contactNumber, code);

        if (!result.valid) {
            return res.status(400).json({ success: false, message: "Invalid code." });
        }

        const newUser = {
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
            contactNumber,
            code,
            userType,
            timeStamp: admin.firestore.FieldValue.serverTimestamp()
        };
        // Save user data to Firestore (Firestore .set() replaces Mongoose .save())
        await firestore.collection('users').doc(uid).set(newUser);
        console.log('newUser', newUser);

        // Set custom claims in Firebase Authentication for role management
        await setCustomClaims(uid, { role: 'user' });

        res.status(201).json({ success: true, userProfile: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//================================== To register new service provider ================================//
const verifyUser = async (req, res) => {
    const { contactNumber } = req.body;

    let result = await textflow.sendVerificationSMS(contactNumber)  // Call textflow to send a verification SMS
    console.log('result for sms', result);

    if (result.ok) //send sms here
        return res.status(200).json({ success: true });

    return res.status(400).json({ success: false });

}

//==================================== Get All users ================================================//
const getUser = async (req, res) => {
    try {
        // Fetch all users from Firestore; map through each document to retrieve data
        const snapshot = await firestore.collection('users').get();
        const users = snapshot.docs.map(doc => doc.data());

        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//===================================== Get One user ================================================//
const getOneUser = async (req, res) => {
    try {
        const id = req.params.uid;
        console.log('id get one user', id);

        const userDoc = await firestore.collection('users').doc(id).get();  // Retrieve a single user document by UID in Firestore

        if (!userDoc.exists) {
            return res.status(404).json({ message: "User not found" });
        }
        // let user = await UserData.findOne({ uid: id });
        res.status(200).json(userDoc.data())
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//====================================== Delete One User =============================================//
const deleteOneUser = async (req, res) => {
    try {
        const id = req.params.uid;
        await firestore.collection('users').doc(id).delete();  // Delete user document from Firestore

        res.status(200).json("user deleted")
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//=============================== Edit user Profile =================================================//
const updateOneUser = async (req, res) => {
    try {
        const id = req.params.uid;
        const {
            firstName,
            lastName,
            profilePicUrl,
            dateOfBirth,
            province,
            city,
            streetAddress,
            unitNumber,
            contactNumber
        } = req.body;
        // Update user profile information in Firestore
        await firestore.collection('users').doc(id).update({
            firstName,
            lastName,
            profilePicUrl,
            dateOfBirth,
            province,
            city,
            streetAddress,
            unitNumber,
            contactNumber
        });
        res.status(200).json("User Info updated")
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//=============================== Post user profile picture  =================================================//
const postProfilePic = async (req, res) => {
    try {
        const id = req.params.uid;
        const profilePicUrl = req.file.location;
        console.log({ profilePicUrl, id });

        // Update the user's profile picture in Firestore
        await firestore.collection('users').doc(id).update({
            profilePicUrl
        });

        res.status(200).send('Profile picture updated successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};


exports.getOneUser = getOneUser;
exports.getUser = getUser;
exports.createUser = createUser;
exports.deleteOneUser = deleteOneUser;
exports.updateOneUser = updateOneUser;
exports.postProfilePic = postProfilePic;
exports.verifyUser = verifyUser;

