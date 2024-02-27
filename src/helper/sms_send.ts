import axios from 'axios';
import config from 'config'

const sms91: any = config.get('sms91')

export const sendSMSHelper = async (phoneNumber: any) => {
    console.log(sms91?.template_id, "sms91?.template_id")
    try {
        let otp = await generateOTP(4);
        console.log(sms91?.template_id, phoneNumber, sms91?.auth_key, "Auth")
        return await axios.post(`${sms91?.base_url}?template_id=${sms91?.template_id}&mobile=91${phoneNumber}`, { OTP: otp }, { headers: { 'Authkey': sms91?.auth_key } })
            .then((response) => {
                console.log(response, "otppppppp")
                if (response) {
                    return response;
                }
            }).catch((err) => {
                console.log('err', err)
                return err
            })
    }
    catch (error) {
        console.log('error', error)
        return error
    }
}
// export const sendSMSHelper = async (phoneNumber: any) => {
//     try {
//         let otp = await generateOTP(4);

//         const url = `${sms91?.base_url}?template_id=${sms91?.template_id}&mobile=91${phoneNumber}`;
//         const data = { OTP: otp };
//         const headers = { 'Authkey': '410948A4wlUwjnQn8N65686e6eP1' };

//         const response = await axios.post(url, data, { headers });

//         console.log(response.data, "response");

//         if (response.data && response.data.type === 'success') {
//             // Successful response handling
//             return response.data;
//         } else {
//             // Handle error response
//             console.error('Error response:', response.data);
//             throw new Error(response.data.message || 'Unknown error');
//         }
//     } catch (error) {
//         console.error('Error:', error.message || error);
//         throw error;
//     }
// };
export const generateOTP = (length: number) => {
    const characters = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * characters.length);
        otp += characters[index];
    }
    return otp;
}