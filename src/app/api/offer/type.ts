export type addOfferType = {
    title: string;
    desc?: string;
    img?: string;
    discountedPrice?: number;
    discountedPercentage?: number;
    discountedOption?: string;
    originalPrice?: number;
    productId: string;
    shopSlug: string;
    time:Date;
};