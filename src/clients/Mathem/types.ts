export interface MathemProduct {
  id: string;
  name: string;
  fullName: string;
  gtin: string;
  url: string;
  images: {
    SMALL: string;
    MEDIUM: string;
    LARGE: string;
    ORIGINAL: string;
  };
  defaultQuantity: number;
  price: number;
  salesPriceOverride: null | number;
  recyleFee: number;
  quantity: number;
  unit: string;
  unitRatio: number;
  approximateQuantity: boolean;
  comparisonPrice: number;
  comparisonUnit: string;
  amountInPackage: number;
  deliverableWeekdays: string[];
  discount: {
    discountType: string;
    campaignType: string;
    id: number;
    quantityToBeBought: number;
    discountCountLimit: number;
    discountUsageLimitOnAllOrders: number;
    discountMessage: null | string;
    discountText: null | string;
    displayPrice: number;
    price: number;
    unitPrice: number;
    comparisonPrice: number;
    minPrice: null;
    minComparisonPrice: null;
    savings: number;
    percentageSavings: number;
    allowedMemberTypes: null;
  };
  department: {
    id: number;
    name: string;
    url: string;
    atHome: boolean;
  };
  category: {
    id: number;
    name: string;
    url: string;
    atHome: boolean;
  };
  categoryAncestry: {
    id: number;
    name: string;
    url: string;
  }[];
  brand: {
    id: number;
    name: string;
    url: string;
  };
  supplier: {
    id: number;
    name: string;
    url: string;
  };
  badges: {
    id: number;
    name: string;
    imageUrl: string;
    toolTip: string;
  }[];
  preferences: {
    dietary: string[];
    labels: {
      name: string;
    }[];
  };
  availability: string;
  subscriptionProduct: boolean;
  origin: {
    id: number;
    name: string;
    icon: string;
  };
  ageRestriction: boolean;
  isWine: boolean;
  rating: null;
  productPlacement: boolean;
  _score: number;
  subtitle: string;
  externalUrl: null;
  soldBy: string;
  showSoldBy: boolean;
  disclaimer: null;
  pharmacyInformation: null;
  siteRestrictions: {
    openOrder: {
      add: string;
      edit: string;
      remove: string;
    };
  };
  shops: {
    id: string;
    name: string;
  }[];
  stockInformation: {
    active: boolean;
    outOfStock: boolean;
    availableQuantity: null;
  };
  connections: {
    similarProducts: {
      availableIds: string[];
    };
  };
  splash: {
    quantityToBeBought: number;
    price: number;
    type: string;
  };
}
