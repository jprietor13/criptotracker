class Http {
    static instance = new Http();

    //metodo get
    get = async (url, body) => {
        try {
            let request = await fetch(url, {
                method: "GET",
                body
            });
            let json = await request.json();
            return json;
        } catch(err) {
            console.log("Http get method error", err)
            throw Error(err);
        }
    }

    //metodo post
    post = async (url, body) => {
       try {
            let request = await fetch(url, {
                method: "POST",
                body
            });
            let json = await request.json();
            return json; 
       } catch (err) {
            console.log("Http post method error", err);
            throw Error(err);
       }
    }

    //metodo delete 
    deleted = async (url, body) => {
        try {
            let request = await fetch(url, {
                method: "DELETE",
                body
            });
            let json = await request.json();
            return json;
        }
        catch (err){
            console.log("Http delete method error", err);
            throw Error(err);
        }
    }

    //metodo put
    put = async (url, body) => {
        try {
            let request = await fetch(url, {
                method: 'PUT',
                body
            });
            let json = await request.json();
            return json;
        }
        catch(err) {
            console.log("Http put method error", err);
            throw Error(err);
        }
    }
}

export default Http;