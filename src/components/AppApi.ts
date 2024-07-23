import { Api, ApiListResponse } from '../components/base/api';
import { IItemsProducts, IUser, IResOred } from '../types/index';

export interface IApi {
	getProducts: () => Promise<IItemsProducts[]>;
	changeOrder: (order: IUser) => Promise<IResOred>;
}

export class AppApi extends Api implements IApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProducts(): Promise<IItemsProducts[]> {
		return this.get('/product/').then((data: ApiListResponse<IItemsProducts>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}
	changeOrder(order: IUser): Promise<IResOred> {
		return this.post('/order', order).then((data: IResOred) => data);
	}
}
