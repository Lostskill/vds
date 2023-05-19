import React, {useState , useEffect} from "react";
import VdsServices from "../components/API/VdsService";
import ProductItems from "../components/ProductItems";

function Main({get_product_det}) {
  const [newProduct, setNewProduct] = useState()

  useEffect(() => {
    get_new_product();
  },[])

  async function get_new_product() {
    const new_product = await VdsServices.get_order_product()
    setNewProduct(new_product.results);
    console.log(new_product.results)
  };
  return (
      <div>
      <h1>Главная Страница</h1>  
      <div>
        <h2>Новинки:</h2>
        {newProduct !== undefined
          ? <div className="new-product">{newProduct.map((newProduct) =>
              <ProductItems product={newProduct}  get_product_det={get_product_det }  />
            )}</div>
          :''
        }
      </div>
    </div>

    );
}
export default Main;