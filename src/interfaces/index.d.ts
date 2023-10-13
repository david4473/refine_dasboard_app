export interface ICategory {
    id: number;
    title: string;
}

export type KpiCardProps = {
  title: string;
  total: number;
  trend: number;
  icon?: string;
  color?: string;
  target: number;
  formatTotal?: (value: number) => number | string;
};

export type DeltaType =
  | "error"
  | "warning"
  | "primary"
  | "secondary"
  | "success"
  | "info";

export interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
}

export interface IOrder {
    id: number;
    user: IUser;
    createdAt: string;
    status: IOrderStatus;
    address: IAddress;
    amount: number;
  }

  export interface IUser {
    id: number;
    fullName: string;
    gender: string;
    gsm: string;
    createdAt: string;
    addresses: IAddress[];
  }

  
export interface IOrderStatus {
    id: number;
    text: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
  }

  export interface IAddress {
    text: string;
    coordinate: [string, string];
  }
  
  export interface IChartDatum {
    date: string;
    value: string;
  }
  
  export interface IChart {
    data: IChartDatum[];
    total: number;
    trend: number;
  }
  
  export interface IProduct {
    id: number;
    name: string;
    isActive: boolean;
    description: string;
    createdAt: string;
    price: number;
    category: ICategory;
    stock: number;
    images: IImage[];
  }
  
  export interface IImage {
    url: string;
  }
  
  export interface ICategory {
    id: number;
    title: string;
    isActive: boolean;
    cover: string;
  }
  
  
  export interface IProductCategory {
    value: number;
    label: string;
  }
  
  interface IAreaGraphProps {
    data: IChartDatum[];
    stroke: string,
    fill: string,
  }
  
  interface IBarChartProps {
    data: IChartDatum[];
    fill: string,
  }