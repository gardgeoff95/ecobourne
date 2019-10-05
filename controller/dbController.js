const axios = require("axios");
const db = require("../models");

module.exports = {
    findAll: function(req, res){
        const {query: params} = req;
        axios
        .get("", {
            params
        })
        .then(results =>
            results.data.items.filter(
                result =>
                    result
            )
        )
    }
}