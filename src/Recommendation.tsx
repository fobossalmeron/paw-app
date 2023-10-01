import { Button } from "antd";
import products from "./products.json";

function Recommendation({ productId }: { productId: string }) {
  const productIndex = products.findIndex(
    (product) => product.title === productId
  );
  const product = products[productIndex];

  return (
    <div className="recommendation">
      <div>
        <img
          src={process.env.PUBLIC_URL + "/" + product.title + ".png"}
          alt={product.title}
        />
      </div>
      <h4>{product ? product.title : "No se encuentra"}</h4>
      <p>{product ? product.text : "No se encuentra"}</p>
      <a href={product.url_shopify} className="form_navigation">
        <Button type="primary" size="large" shape="round" htmlType="submit">
          Ver producto
        </Button>
      </a>
    </div>
  );
}

export default Recommendation;
