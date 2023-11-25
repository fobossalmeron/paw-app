import { useState } from "react";
import { Button } from "antd";
import products from "./products.json";
import { Skeleton } from "antd";

const imageHosted: any = {
  "Salmon Oil": "d974be00-9509-4ac3-b1f2-71840459e140",
  "Hip & Joint": "e75361a4-810d-4c38-b548-330aa5d88392",
  Calming: "8569e10c-d14b-4b8f-931d-8d36a9af4543",
  "Skin & Coat": "959ddf44-bf14-4d03-98a9-998bac5cbf56",
  "Aller Inmune": "12dc8fac-5bea-45de-936a-d2ed84d64a9e",
  Probiotic: "696ae621-e78c-41b0-b285-4f5c49f327bc",
  "Shampoo Sensitive Skin": "3829eff2-a2ad-4568-99c9-f712b32cfb90",
  "Shampoo Itchy Dog": "39804cc5-29b1-4451-84c8-7cca056328e1",
  Pawtection: "5d761752-e9e4-4b8b-88d5-99db4ffa8b49",
  Pawsoother: "a7169be1-023c-420e-be63-9ef2eb77c532",
  "Snout Soother": "ebc4bc2f-0451-433b-917c-20eb90b868d6",
  "Skin Soother": "d6c8f5c8-b362-4d86-b010-9e79907b3c33",
  "Wrinkle Balm": "ee3c4c66-91d7-4920-adfd-5921d8259a60",
};

// const image: any = {
//   "Salmon Oil": "SalmonOil",
//   "Hip & Joint": "Hip&Joint",
//   Calming: "Calming",
//   "Skin & Coat": "Skin&Coat",
//   "Aller Inmune": "AllerInmune",
//   Probiotic: "Probiotic",
//   "Shampoo Sensitive Skin": "ShampooSensitiveSkin",
//   "Shampoo Itchy Dog": "ShampooItchyDog",
//   Pawtection: "Pawtection",
//   Pawsoother: "Pawsoother",
//   "Snout Soother": "SnoutSoother",
//   "Skin Soother": "SkinSoother",
//   "Wrinkle Balm": "WrinkleBalm",
// };

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
          // src={`https://fobossalmeron.github.io/paw-app/${
          //   image[product.title]
          // }.png`}
          src={`https://ucarecdn.com/${
            imageHosted[product.title]
          }/-/preview/500x500/-/quality/smart_retina/-/format/auto/`}
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
