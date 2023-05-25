import axios from "axios";
export default class VdsServices{
    static async get_category(){
        const res_cat = await axios.get('http://192.168.0.13/api/vds/category/')
        return res_cat.data
    };

    static async get_product(cat_id, sub_id) {
        if (sub_id) {
            const res_product = await axios.get(`http://192.168.0.13/api/vds/product/?sub_category=${sub_id}`);
            return res_product.data;
        };
        const res_product = await axios.get(`http://192.168.0.13/api/vds/product/?category=${cat_id}`);
        return res_product.data;
    };

    static async get_product_detail(product_id) {
        const res_product = await axios.get(`http://192.168.0.13/api/vds/productdetail/${product_id}/`)
        return res_product.data  
    };
    static async get_order_product() {
        const res_product = await axios.get('http://192.168.0.13/api/vds/product_order/')
        return res_product.data
    };
    static async registerUser(user) {
        const res_reg = await axios.post('http://192.168.0.13/api/vds/auth/users/', user);
        console.log(res_reg.data);
    };

    static async logUser(user) {
        const res_log = await axios.post('http://192.168.0.13/auth/token/login/', user);
        return res_log.data;
    };    
    static async logout() {
        const res_logout = await axios.post('http://192.168.0.13/auth/logout/');
        return res_logout.data;
    };
 
    static async get_order_history(token) {
        
        const res_history = await axios.get('http://192.168.0.13/api/vds/order-history', {
            headers: token
        })
        return res_history;
    }

    static async post_review(data,token) {
        const res_review = await axios.post('http://192.168.0.13/api/vds/review/',data,{
            headers: token
        })
        return res_review;
    }
};

