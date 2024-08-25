import { IUserService } from ".";

export const makeMockUserService = (): jest.Mocked<IUserService> => {
  const mockService: jest.Mocked<IUserService> = {
    getMe: jest.fn(),
    createMe: jest.fn(),
  };

  return mockService;
};
