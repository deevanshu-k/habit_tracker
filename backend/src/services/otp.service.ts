export const generateOTP = (length: number): string => {
    const options = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * options.length);
        otp += options[randomIndex];
    }
    return otp;
};
