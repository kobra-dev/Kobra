import { KNearestNeighbors } from './KNN';

export function knn_create(x: number[], y: number[]): KNearestNeighbors {
	let knn = new KNearestNeighbors();
	knn.loadData(x, y);
	return knn;
}

export function knn_fit(knn: KNearestNeighbors, k: number): void {
	knn.fit(k);
}

export function knn_predict(knn: KNearestNeighbors, x: number): number {
	return knn.predict(x);
}
