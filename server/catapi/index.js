const axios = require('axios');

//
// Cat API Proxy
//
// This code accepts an API_HOST name, API_KEY, and a cache handle
// from the parent. For this example we're using node-cache
//
// JD [ - ]
//
class CatApi {
    CACHE_KEY_ALL_BREEDS = "CACHE_KEY_ALL_BREEDS";
    CACHE_KEY_BREED_ID = "CACHE_KEY_BREED_ID";
    CACHE_KEY_BREED_IMAGE_LIMIT = "CACHE_KEY_BREED_IMAGE_LIMIT";

    constructor(host, api_key, cache) {
        this.API_KEY = api_key;
        this.API_HOST = host;
        this.HTTP_PARAMS = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.API_KEY
            }
        }
        this.APP_CACHE = cache;
    }

    async getBreeds() {
        let data = {};
        try {
            if (this.APP_CACHE && this.APP_CACHE.has(this.CACHE_KEY_ALL_BREEDS)) {
                return this.APP_CACHE.get(this.CACHE_KEY_ALL_BREEDS);
            }

            const response =
                await axios
                    .get(`${this.API_HOST}/v1/breeds`,
                        this.HTTP_PARAMS)

            data = response?.data;
            if (this.APP_CACHE) {
                this.APP_CACHE.set(this.CACHE_KEY_ALL_BREEDS, data);
            }
        } catch (error) {
            throw error;
        }

        return data;
    }

    async getBreedById(breedId) {
        const key = `${this.CACHE_KEY_BREED_ID}_${breedId}`;

        let data = {};
        try {
            if (this.APP_CACHE && this.APP_CACHE.get(key)) {
                return this.APP_CACHE.get(`${this.CACHE_KEY_BREED_ID}_${breedId}`);
            }
            const response =
                await axios
                    .get(`${this.API_HOST}/v1/breeds/${breedId}`,
                        this.HTTP_PARAMS);

            data = response?.data;

            if (this.APP_CACHE) {
                this.APP_CACHE.set(key, data);
            }
        } catch (error) {
            throw error;
        }
        return data;
    }

    async getImagesByBreedId(breedId, limit = 10) {
        const key = `${this.CACHE_KEY_BREED_IMAGE_LIMIT}_${breedId}_${limit}`;

        let data = {};
        try {
            if (this.APP_CACHE && this.APP_CACHE.has(key)) {
                return this.APP_CACHE.get(key);
            }

            const response =
                await axios
                    .get(`${this.API_HOST}/v1/images/search?breed_ids=${breedId}&limit=${limit}`,
                        this.HTTP_PARAMS);

            data =
                response
                    ?.data
                    .map(breed => (
                        {
                            id: breed.id,
                            name: breed.breeds[0].name,
                            url: breed.url
                        }));

            if (this.APP_CACHE) {
                this.APP_CACHE.set(key, data);
            }
        } catch (error) {
            throw error;
        }

        return data;
    }

    async searchBreedByName(query) {
        if (!query || query == '') {
            return [];
        }

        let dataset = {}
        try {
            // this will either pre-warm the cache or retrieve the dataset
            dataset = await this.getBreeds();
        } catch (error) {
            throw error;
        }

        const results =
            dataset.filter(breed =>
                breed?.name.toLowerCase().match(query.toLowerCase()))

        return results;
    }
}

module.exports = (API_HOST, API_KEY, APP_CACHE) => { return new CatApi(API_HOST, API_KEY, APP_CACHE) }