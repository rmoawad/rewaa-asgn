const userService = require('../../app/user/user.service');
const user1 = {
    id: 11,
    hashedPassword: '$2a$10$PdqnWlvrL4NVGD3jPOAcTOvX9axf8uKsLQuOj8kKZRVGs7WYVCjxW',
    username: 'test'
}
jest.mock('../../app/database/db', () => {
    return {
        User: {
            create: (user) =>  user,
            scope: (s) => {
               return {
                   findOne: () => {
                       return {
                           id: 11,
                           hashedPassword: '$2a$10$PdqnWlvrL4NVGD3jPOAcTOvX9axf8uKsLQuOj8kKZRVGs7WYVCjxW',
                           get: () => user1
                       }
                   }
               }
            },
        }
    };
});

describe("User Service functions", () => {

    it("authenticate() with valid username and password", async () => {
        // Act
        const res = await userService.authenticate({username: 'user', password: 'test123'});

        //Assert
        expect(res.token).toBeTruthy();
        expect(res.username).toEqual('test');
        expect(res.hashedPassword).toBeFalsy();
    });

    it("authenticate() where invalid password", async () => {
        // Act
        try {
            await userService.authenticate({username: 'user', password: 'invalid password'});
            expect(true).toBe(false);
        } catch (error) {
            expect(error).toBe('Username or Password is incorrect');
        }
    });
});
