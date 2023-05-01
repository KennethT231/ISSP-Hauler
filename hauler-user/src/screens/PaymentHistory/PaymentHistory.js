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
import { BarChart } from "react-native-chart-kit";
import Ionicons from 'react-native-vector-icons/Ionicons';

const PaymentHistory = ({ navigation }) => {
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

    console.log({ posts });
    // filter paid posts
    const isPaid = posts.filter((post) => post.status === "Paid");
    // console.log(isPaid);

    // total amount paid
    const totalPaid = isPaid.reduce((acc, curr) => {
        return acc + curr.acceptedPrice;
    }, 0);

    // filter paid Junk Removal posts
    const isPaidJunk = isPaid.filter((post) => post.service === "Junk");

    // total amount paid for Junk Removal
    const totalPaidJunk = isPaidJunk.reduce((acc, curr) => {
        return acc + curr.acceptedPrice;
    }, 0);

    // filter paid Moving posts
    const isPaidMoving = isPaid.filter((post) => post.service === "Moving");

    // total amount paid for Moving
    const totalPaidMoving = isPaidMoving.reduce((acc, curr) => {
        return acc + curr.acceptedPrice;
    }, 0);

    // filter paid Delivery posts
    const isPaidErrand = isPaid.filter((post) => post.service === "Errand");

    // total amount paid for Errand
    const totalPaidErrand = isPaidErrand.reduce((acc, curr) => {
        return acc + curr.acceptedPrice;
    }, 0);

    const chartData = {
        labels: isPaid.map((post) => post.service),
        datasets: [
            {
                data: isPaid.map((post) => post.acceptedPrice),
            },
        ],
    };

    const chartConfig = {
        backgroundColor: "#fff",
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barPercentage: 0.5,
    };

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
            <Text>${item.acceptedPrice}</Text>
        )


        return (
            <View style={styles.bodyContent}>
                <Text style={styles.bodyContentText}>{paymentDate}</Text>
                <Text style={[styles.bodyContentText, { marginRight: 15 }]}>
                    {paidPrice}</Text>
                <View style={styles.bodyContentText}>{paymentStatus}</View>
                {/* detail check mark */}
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("PaymentDetail", {
                            post: item,
                        });
                    }}
                >
                    <View style={styles.detail}>
                        <Ionicons name="ios-information-circle-outline" size={24} color="#000" />
                    </View>
                </TouchableOpacity>
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
            <View style={styles.chartContainer}>
                {isPaid.length > 0 ? (
                    <BarChart
                        data={chartData}
                        width={380}
                        height={220}
                        yAxisLabel="$"
                        chartConfig={chartConfig}
                        style={styles.chart}
                    />
                ): <Text>No Payment History</Text>}
            </View>

            {/* total spent amount */}
            <View style={{ backgroundColor: '#F5F5F5', padding: 20, borderRadius: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Total Spent Amount</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#4CAF50' }}>Junk Removal:</Text>
                    <Text style={{ fontSize: 14 }}>${totalPaidJunk ? totalPaidJunk : 0}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#2196F3' }}>Moving:</Text>
                    <Text style={{ fontSize: 14 }}>${totalPaidMoving ? totalPaidMoving : 0}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#9C27B0' }}>Errand:</Text>
                    <Text style={{ fontSize: 14 }}>${totalPaidErrand ? totalPaidErrand : 0}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, paddingTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Total:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>${totalPaid ? totalPaid : 0}</Text>
                </View>
            </View>


            <View style={styles.body}>
                <View style={styles.bodyHeader}>
                    <Text style={styles.bodyHeaderText}>Date</Text>
                    <Text style={styles.bodyHeaderText}>Amount</Text>
                    <Text style={styles.bodyHeaderText}>Status</Text>
                    <Text style={styles.bodyHeaderText}>Detail</Text>
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
        </View>
    );
};

export default PaymentHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    header: {
        alignItems: "center",
        marginBottom: 20
    },
    headerText: {
        fontSize: 17,
        fontWeight: "bold"
    },
    chartContainer: {
        alignItems: "center",
        marginBottom: 20
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16
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
        fontWeight: "bold",
        width: "23%",
        textAlign: "center"
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
        width: "25%",
        textAlign: "center"
    },
    detail: {
        backgroundColor: "#fff",
        padding: 8,
        marginRight: 25,
        borderRadius: 5
    }
})
