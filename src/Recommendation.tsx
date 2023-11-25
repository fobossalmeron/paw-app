import { useState } from "react";
import { Button } from "antd";
import products from "./products.json";
import { Skeleton } from "antd";

const imageHosted: any = {
  "Salmon Oil": "044a8cc2-ceec-4434-8791-6d13a24786ba",
  "Hip & Joint": "2cec0bf9-18b6-42d3-949f-3cb45e0217f7",
  Calming: "dc352305-2a01-4932-a6b6-4287a4469541",
  "Skin & Coat": "bac33a8b-0be6-4aca-a630-b898b3b65f51",
  "Aller Inmune": "12dc8fac-5bea-45de-936a-d2ed84d64a9e",
  Probiotic: "696ae621-e78c-41b0-b285-4f5c49f327bc",
  "Shampoo Sensitive Skin": "61736d40-f720-49fc-bd72-0da957449bf8",
  "Shampoo Itchy Dog": "3c2f2ef2-7e33-404d-880e-8c68adfa77ed",
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
