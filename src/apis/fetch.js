import axios from "axios";

const host = "http://localhost:3060"

export const fetch = async (method, url, body) => {
    const mainFetch = async () => {

        if (method === "post") {
            return axios({
                method: 'post',
                url: host + url,
                data: body
            }).then(res => res)
        } else {
            return axios({
                method: 'get',
                url: host + url,
                responseType: 'json'
            })
            .then(res => res)
        }
    }

    try {
        const res = await mainFetch()
        return res
    }
    catch (err) {
        console.log(err)
    }
}