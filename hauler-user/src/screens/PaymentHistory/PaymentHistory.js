import React, { useState, useEffect, useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { getOneUser, getAllPosts } from "../../../network";
import { Context } from "../../context/ContextProvider";

const PaymentHistory = () => {
    const { currentUser } = useContext(Context);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const user = await getOneUser(currentUser.uid);
            setUser(user);
        };
        getUser();
    }, []);

    useEffect(() => {
        const getPosts = async () => {
            const posts = await getAllPosts(currentUser.uid);
            setPosts(posts);
        };
        getPosts();
    }, []);

    const isPaid = posts.filter((post) => post.status === "Paid");
    console.log(isPaid);
    const totalPaid = isPaid.reduce((acc, curr) => {
        return acc + curr.price;
    }, 0);


    const renderItem = ({ item }) => {
        const paymentDate = item.status === "Paid" && (
            new Date(item.timeStamp).toLocaleDateString()
        )
        const paymentStatus = item.status === "Paid" && (
            <View style={{ backgroundColor: "#27AE60", padding: 5, borderRadius: 5 }}>
                <Text style={{ color: "#fff" }}>Paid</Text>
            </View>
        )
        const paidPrice = item.status === "Paid" && (
            <Text>${item.price}</Text>
        )
        return (
            <View style={styles.bodyContent}>
                <Text style={styles.bodyContentText}>{paymentDate}</Text>
                <Text style={[styles.bodyContentText, { marginLeft: 30 }]}>
                    {paidPrice}</Text>
                <View style={{ width: "28%" }}>{paymentStatus}</View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {user && (
                    <Text style={styles.headerText}>
                        {user.firstName}'s Payment Dashboard
                    </Text>
                )}
            </View>
            <View style={styles.body}>
                <View style={styles.bodyHeader}>
                    <Text style={styles.bodyHeaderText}>Date</Text>
                    <Text style={styles.bodyHeaderText}>Amount</Text>
                    <Text style={styles.bodyHeaderText}>Status</Text>
                </View>
                {isPaid ? (
                    <FlatList
                        data={isPaid}
                        keyExtractor={(item) => item._id}
                        renderItem={renderItem}
                    />
                ) : (
                    <Text>No payments yet</Text>
                )}
            </View>
            {/* total amount */}
            <View style={styles.body}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Total Paid: ${totalPaid ? totalPaid : 0}
                </Text>
            </View>
        </View>
    );
};

export default PaymentHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20
    },
    header: {
        alignItems: "center",
        marginBottom: 20
    },
    headerText: {
        fontSize: 17,
        fontWeight: "bold"
    },
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10
    },
    bodyHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    bodyHeaderText: {
        fontSize: 14,
        fontWeight: "bold"
    },
    bodyContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    bodyContentText: {
        fontSize: 14,
        width: "33%"
    }
});

