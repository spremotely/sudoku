import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	private store = {};

	add(key: string, value: any)
	{
		this.store[key] = value;
	}

	get(key: string)
	{
		return this.store[key];
	}
}