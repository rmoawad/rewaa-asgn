const authorize = require('../../app/auth/authorize');
jest.mock('../../app/database/db', () => {
    return {
        User: {
            findByPk: (id) => {
                if (id === -1) {
                  return undefined;
                }

                return {
                    id: 1, username: 'test',
                    get: () => { username: 'test' }
                }
            }
        }
    };
});

describe("Authorize Service functions", () => {
    it("authorize()", async () => {
        // Arrange
        const next = jest.fn(() => {});

        // Act
        await authorize()[1]({ user: {sub: 1} }, {}, next)

        //Assert
        expect(next).toHaveBeenCalled();
    });
});
