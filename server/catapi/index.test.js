
const API_HOST = 'https://api.thecatapi.com';
const API_KEY = 'DEMO-API-KEY';
const catapi = require('../catapi')(API_HOST, API_KEY, null);
const axios = require('axios');

jest.mock('axios');

describe('Cat API Tests', () => {
    describe('getBreeds', () => {

        // integration test
        test('should return', async () => {
            const res = await catapi.getBreeds()
            expect(res).not.toBeNull();
        })
    })

    // unit testing search
    describe('searchBreedByName', () => {

        test('When searching by q=a, expect 2 results', async () => {
            const mockData = {
                data: [
                    { id: 1, name: 'a1' },
                    { id: 2, name: 'Abyssinian' },
                    { id: 3, name: 'b1' },
                    { id: 4, name: 'c1' },
                ]
            }

            axios.get.mockImplementationOnce(() => Promise.resolve(mockData))

            const sut = await catapi.searchBreedByName('a');
            expect(sut).not.toBeNull();
            expect(sut.length).toBe(2);
        })

        test('When searching by q=Abyssinian, expect 1 result', async () => {
            const mockData = {
                data: [
                    { id: 1, name: 'a1' },
                    { id: 2, name: 'Abyssinian' },
                    { id: 3, name: 'b1' },
                    { id: 4, name: 'c1' },
                ]
            }

            axios.get.mockImplementationOnce(() => Promise.resolve(mockData))

            const sut = await catapi.searchBreedByName('Abyssinian');
            expect(sut).not.toBeNull();
            expect(sut.length).toBe(1);
        })

        test('When searching by q=<blank>, expect no results', async () => {
            const mockData = {
                data: [
                    { id: 1, name: 'a1' },
                    { id: 2, name: 'Abyssinian' },
                    { id: 3, name: 'b1' },
                    { id: 4, name: 'c1' },
                ]
            }

            axios.get.mockImplementationOnce(() => Promise.resolve(mockData))

            const sut = await catapi.searchBreedByName('');
            expect(sut).not.toBeNull();
            expect(sut.length).toBe(0);
        })
    })
})