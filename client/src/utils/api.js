import axios from "axios";

export default {
    findAccounts: function(){
        return axios.get("/api/account");
    },
    findUser: function (req){
        return axios.get("/api/account", { params: { req: "username" + req }});
    },
    authenticate: function(user, pass) {
        return axios.get("/api/account", { params: { user: "username" + user} && {pass: "password" + pass}})
    },
    findAnimals: function(){
        return axios.get("/api/animal");
    },
    findAnimal: function(req){
        return axios.get("/api/animal", { params: { req: "race" + req }});
    },
    createUser: function(login, pass){
        return axios.post({
            user: login,
            pwd: pass,
            customData: {
                data: "taco"
            },
            roles: [{db: "ecobourne"}]
        })
    }
}