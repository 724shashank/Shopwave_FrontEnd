import axios from 'axios';
import { baseURL } from '../URLs';
const handleCheckout = async (cartTotal, authToken) => {
    try {
        const response = await axios.post(`${baseURL}/api/payment/order`, {
            amount: cartTotal, 
            currency: 'INR', 
        }, {
            headers: {
                authtoken: authToken,
            },
        });

        const { id, currency, amount } = response.data;

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount,
            currency,
            name: 'Shopwave',
            description: 'Test Transaction',
            order_id: id,
            handler: async function (response) {
                console.log("Payment successful:", response);
                // Send the payment response to your server for verification
                try {
                    await axios.post(`${baseURL}/payment/verify`, response, {
                        headers: { authtoken: authToken },
                    });
                    alert("Payment Verified and Successful!");
                } catch (error) {
                    console.error("Verification failed:", error);
                    alert("Payment verification failed!");
                }
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '9999999999',
            },
            notes: {
                address: 'note value',
            },
            theme: {
                color: '#004BAD',
            },
        };

        const razorpay = new window.Razorpay(options);

        razorpay.on("payment.failed", function (response) {
            console.error("Payment failed:", response.error);
            alert("Payment failed. Please try again.");
        });

        razorpay.open();
    } catch (error) {
        console.error('Error during checkout:', error);
    }
};

export default handleCheckout;
