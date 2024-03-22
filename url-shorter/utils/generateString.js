const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateString = (length) => {
    let string = '';

    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 62);
        const randomSymbol = symbols.charAt(randomNumber);
        string = string.concat(randomSymbol);
    }

    return string;
}