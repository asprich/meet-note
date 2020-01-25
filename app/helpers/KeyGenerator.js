export default {
    new() {
        var dateBasedKey = new Date().toISOString().replace(/[-T:\.Z]/g,'');
        return dateBasedKey;
    },
    newRandomNumberKey() {
        return Math.floor(Math.random() * 100000000);
    }
}