/* inspired by truncate-eth-address
    https://www.npmjs.com/package/truncate-eth-address/v/1.0.2
*/
export const ethAddrShortener = (address) => {
    const regex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
    const match = address.match(regex);
    if (!match)
        return address;
    return match[1] + "\u2026" + match[2]; 
}