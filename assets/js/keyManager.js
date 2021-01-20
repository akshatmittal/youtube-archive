YT.keyManager = {
    keys: ["AIzaSyBAqQyzfH8pLouP-JmNkfd_NUX2YYyI-2o"],
    keyIndex: 0,
    getKey: function () {
        this.keyIndex = (this.keyIndex + 1) % (this.keys.length);
        return this.keys[this.keyIndex];
    },
    shuffleKeys: function () {
        this.keys.shuffle();
    }
}