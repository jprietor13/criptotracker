import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {

    static instance = new Storage(); 
    store = async (key, value) => {
        try { 
            await AsyncStorage.setItem(key, value);
            return true;
        } catch(err) {
            console.log("Storage store error", err);;
            return false;
        }
    }

    get = async (key) => {
        try {
            return await AsyncStorage.getItem(key)
        } catch(err) {
            console.log("get store err", err);
            throw Error(err);
        }
    }

    //devolvemos toda la lista de los que queramos
    multiGet =  async (keys) => {
        try {
            return await AsyncStorage.multiGet(keys);
        } catch(err) {
            console.log("storage multiGet err", err);
            throw Error(err);
        }
    }

    getAllKeys = async () => {
        try {
            return await AsyncStorage.getAllKeys()
        } catch(err) {
            console.log("Strafe getAllKeys err", err);
            throw Error(err);
        }
    }

    remove = async(key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch(err) {
            console.log("storage remove err", err);
            return false;
        }
    }

}

export default Storage;