import { useState } from "react";
import { Button } from "antd";
import products from "./products.json";
import { Skeleton } from "antd";

function Recommendation({ productId }: { productId: string }) {
  const [loaded, setLoaded] = useState(false);
  const productIndex = products.findIndex(
    (product) => product.title === productId
  );
  const product = products[productIndex];

  return (
    <div className="recommendation">
      <div>
        <Skeleton.Image
          active={!loaded}
          style={!loaded ? {} : { display: "none" }}
        />
        <img
          src={process.env.PUBLIC_URL + "/" + product.title + ".png"}
          alt={product.title}
          style={loaded ? { opacity: "100%" } : { opacity: "0%" }}
          onLoad={() => setLoaded(true)}
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
