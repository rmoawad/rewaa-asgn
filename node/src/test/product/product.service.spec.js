const productService = require('../../app/product/product.service');
const product1 =  {id: 1, name: 'test'};
const product2 =  {id: 2, name: 'test'};
jest.mock('../../app/database/db', () => {
    return {
        Product: {
            findAll: () => { return [{id: 1}]},
            findOne: (query) => {
                if (query.where.name === 'test') {
                    return product2;
                }
                return undefined;
            },
            create: () => {
                return product1;
            },
            save: (product) => {
                return product;
            },
            findByPk: (id) => {
                if (id === -1) {
                  return undefined;
                } else if (id === 3) {
                    return {
                        id: 3, name: 'test3',
                        save: () => { return { id: 3, name: 'test3' } },
                        get: () => { return { id: 3, name: 'test3' } },
                    }
                }
                return {
                    id: 1, name: 'test',
                    save: () => { return product1 },
                    get: () => { return product1 },
                }
            }
        }
    };
});

describe("Product Service functions", () => {
    it("getAll()", async () => {
        // Act
        const res = await productService.getAll();

        //Assert
        expect(res).toEqual([{id: 1}]);
    });

    it("getById() where product exist, entity should return", async () => {
        // Act
        const res = await productService.getById(2);

        //Assert
        expect(res.name).toEqual('test');
    });

    it("getById() where product not exist, exception should get thrown", async () => {
        try {
            await productService.getById(-1);
            expect(true).toBe(false);
        } catch (error) {
            expect(error).toBe('Product not found');
        }
    });

    it("create() when valid value it should get added", async () => {
        // Act
        const res = await productService.create({name: 'test1'});

        //Assert
        expect(res.id).toEqual(1);
    });

    it("create() where product with same name exist, exception should get thrown", async () => {
        try {
            await productService.create({name: 'test'});
            expect(true).toBe(false);
        } catch (error) {
            expect(error).toBe('Product with name "test" is already exist');
        }
    });

    it("update() when valid value it should get updated", async () => {
        // Act
        const res = await productService.update(1, {name: 'test1'});

        //Assert
        expect(res.id).toEqual(1);
    });

    it("update() where product with same name exist, exception should get thrown", async () => {
        try {
            await productService.update(3,{name: 'test'});
            expect(true).toBe(false);
        } catch (error) {
            expect(error).toBe('Product with name "test" is already exist');
        }
    });
});
