import { IUserService } from ".";

export const makeMockUserService = () => {
  const mockUserService: jest.Mocked<IUserService> = {
    getMe: jest.fn(),
    createMe: jest.fn(),
  };

  const clearMockUserService = () => {
    mockUserService.getMe.mockClear();
    mockUserService.createMe.mockClear();
  };

  return {
    mockUserService,
    clearMockUserService,
  };
};
