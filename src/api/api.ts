import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = 'http://192.168.1.12:8080/api';
var api = {
    async request(url: string, method: string, body: any){
        var Body = body === null || body === undefined ? {} : body;
        let token = AsyncStorage.getItem("token");
        return await fetch(baseURL + url, {
            method : method,
            // mode : Body.profilePic == {} ? 'cors' : 'no-cors',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://192.168.1.12:8080",
                "Access-Control-Allow-Credentials": "true",
              },
            credentials: "include",
            body: method=== 'GET' ? null : JSON.stringify(Body),
        })
    }
}
export default api;