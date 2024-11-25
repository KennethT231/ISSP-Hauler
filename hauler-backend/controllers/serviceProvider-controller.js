const admin = require('firebase-admin');
const firestore = admin.firestore();
const textflow = require("textflow.js")
const { setCustomClaims } = require('../utils/auth');

textflow.useKey("JZI6ELhqXlkk40ILQx3hFueY0jZb62cfHyv65kWEBqL6uLVV5XhOVr1zO3by7McY");

//===================================== To register service provider =================================//
const createServiceProvider = async (req, res) => {
    console.log(req.body);
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
            chequeDepositFormUrl,
            vehicle,
            driverLicenseUrl,
            driverLicenseExpiry,
            driverAbstractUrl,
            profileStatus,
            serviceProvided,
            serviceStatus,
            serviceLocation,
            locationStatus,
        } = req.body;

        let result = await textflow.verifyCode(contactNumber, code);

        if (!result.valid) {
            return res.status(400).json({ success: false });
        }

        const newServiceProvider = {
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
            chequeDepositFormUrl,
            vehicleType: {
                vehicle
            },
            driverLicenseUrl,
            driverLicenseExpiry,
            driverAbstractUrl,
            profileStatus,
            serviceProvided: {
                serviceProvided,
                serviceStatus,
                serviceLocations: {
                    serviceLocation,
                    locationStatus,
                }
            },
        };
        console.log('code', code);

        // Storing new service provider profile in Firestore (using collection and document structure)
        await firestore.collection('serviceProviders').doc(uid).set(newServiceProvider);

        // Setting custom claims in Firebase Auth to assign 'serviceProvider' role
        await setCustomClaims(uid, { role: 'serviceProvider' });
        
        res.status(201).json({ success: true, serviceProviderProfile: newServiceProvider });
    } catch (error) {
        console.log(error)
        res.status(404).json({ success: false, message: error.message });
    }
}
//================================ To verify service providers =====================================//
const verifyProvider = async (req, res) => {
    const { contactNumber } = req.body;
    let result = await textflow.sendVerificationSMS(contactNumber);
    console.log('result for sms', result);

    if (result.ok) //send sms here
        return res.status(200).json({ success: true });

    return res.status(400).json({ success: false });

}
//================================ To get all service providers =====================================//
const getServiceProvider = async (req, res) => {
    try {
        // Fetching all service provider documents from Firestore
        const snapshot = await firestore.collection('serviceProviders').get();

        // Mapping documents to an array of data
        const serviceProviders = snapshot.docs.map(doc => doc.data()); 

        res.status(200).json(serviceProviders)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//================================= To get One service provider =====================================//
const getOneServiceProvider = async (req, res) => {
    try {
        const id = req.params.uid;
        // Fetching a single service provider document by UID
        const serviceProviderRef = firestore.collection('serviceProviders').doc(id);
        const serviceProviderDoc = await serviceProviderRef.get();

        if (!serviceProviderDoc.exists) {
            return res.status(404).json({ message: "Service Provider not found" }); // Added response if not found
        }

        res.status(200).json(serviceProviderDoc.data()); // Sending service provider data if found
    } catch (error) {
        res.status(500).json({ message: error.message }); // Improved error handling for internal server errors
    }
};

//================================= To delete service provider ======================================//
const deleteOneServiceProvider = async (req, res) => {
    try {
        const id = req.params.uid;
        // Deleting the service provider document by UID
        const serviceProviderRef = firestore.collection('serviceProviders').doc(id);
        await serviceProviderRef.delete();

        res.status(200).json('Service Provider deleted');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//================================ To edit servise provider profile =================================//
const updateOneServiceProvider = async (req, res) => {
    try {
        const id = req.params.uid;
        const {
            firstName,
            lastName,
            profilePicUrl,
            province,
            city,
            streetAddress,
            unitNumber,
            contactNumber,
        } = req.body;

        // Fetching the document reference and updating fields in Firestore
        const serviceProviderRef = firestore.collection('serviceProviders').doc(id);

        await serviceProviderRef.update({
            firstName,
            lastName,
            profilePicUrl,
            province,
            city,
            streetAddress,
            unitNumber,
            contactNumber
        });

        res.status(200).json('Service Provider profile updated');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//=============================== Post user profile picture  =================================================//
const postProfilePic = async (req, res) => {
    try {
        const id = req.params.uid;
        const profilePicUrl = req.file.location;
        console.log({ profilePicUrl, id });

        // Find the service provider document by ID
        const serviceProviderRef = firestore.collection('serviceProviders').doc(id);

        // Update the profile picture URL
        await serviceProviderRef.update({
            profilePicUrl
        });

        res.status(200).send('Profile picture updated successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};

exports.getOneServiceProvider = getOneServiceProvider;
exports.getServiceProvider = getServiceProvider;
exports.createServiceProvider = createServiceProvider;
exports.deleteOneServiceProvider = deleteOneServiceProvider;
exports.updateOneServiceProvider = updateOneServiceProvider;
exports.postProfilePic = postProfilePic;
exports.verifyProvider = verifyProvider;
