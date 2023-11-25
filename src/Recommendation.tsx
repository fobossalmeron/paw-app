import { useState } from "react";
import { Button } from "antd";
import products from "./products.json";
import { Skeleton } from "antd";
// import salmonOil from "./img/Salmon Oil.png";
// import hipJoint from "./img/Hip & Joint.png";
// import calming from "./img/Calming.png";
// import skinCoat from "./img/Skin & Coat.png";
// import allerImmune from "./img/Aller Inmune.png";
// import probiotic from "./img/Probiotic.png";
// import shampooSensitiveSkin from "./img/Shampoo Sensitive Skin.png";
// import shampooItchyDog from "./img/Shampoo Itchy Dog.png";
// import pawtection from "./img/Pawtection.png";
// import snoutSoother from "./img/Snout Soother.png";
// import skinSoother from "./img/Skin Soother.png";
// import wrinkleBalm from "./img/Wrinkle Balm.png";

const image: any = {
  "Salmon Oil": "SalmonOil",
  "Hip & Joint": "Hip&Joint",
  Calming: "Calmin",
  "Skin & Coat": "Skin&Coat",
  "Aller Inmune": "AllerInmune",
  Probiotic: "Probiotic",
  "Shampoo Sensitive Skin": "ShampooSensitiveSkin",
  "Shampoo Itchy Dog": "ShampooItchyDog",
  Pawtection: "Pawtection",
  "Snout Soother": "SnoutSoother",
  "Skin Soother": "SkinSoother",
  "Wrinkle Balm": "WrinkleBalm",
};

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
          src={`https://fobossalmeron.github.io/paw-app/${
            image[product.title]
          }.png`}
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
