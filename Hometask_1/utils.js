const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateHash = (length) => {
    let string = '';

    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 62);
        const randomSymbol = symbols.charAt(randomNumber);
        string = string.concat(randomSymbol);
    }

    return string;
}



module.exports = {
    generateHash,
}