// Top Interfaces
interface Image {
  _key: string;
  _type: "image";
  asset: {
    url: string;
  };
}

interface Category {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  slug: {
    _type: "slug";
    current: string;
  };
  title: string;
}

interface Product {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: "product";
  _updatedAt: string;
  category: {
    _ref: "reference";
    _type: string;
  };
  image: Image[];
  price: number;
  slug: {
    _type: "slug";
    current: string;
  };
  title: string;
}
