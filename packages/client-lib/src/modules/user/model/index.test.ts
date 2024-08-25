import { User } from "@quoll/lib/modules";

import { makeUserModel, UserState } from ".";
import { makeMockStore } from "../../../store/mocks";
import { makeMockUserService } from "../service/mocks";

const mockStore = makeMockStore<UserState>({
  user: null,
  isLoading: false,
});

const mockService = makeMockUserService();

const mockUser: User = {
  _id: "123abc",
  feeds: [],
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe("User Model", () => {
  describe("get", () => {
    it("should set the user to the store and return it", async () => {
      mockService.getMe.mockResolvedValue(mockUser);

      const model = makeUserModel(mockStore, mockService);

      const user = await model.getMe();

      mockStore.state.user;

      expect(mockStore.setProperty).toHaveBeenCalledWith("isLoading", true);
      expect(mockStore.setProperty).toHaveBeenCalledWith("user", mockUser);
      expect(mockStore.setProperty).toHaveBeenCalledWith("isLoading", false);
      expect(user).toEqual(mockUser);
    });

    it("should return null if the user does not exist", async () => {
      const noUserError = new Error(JSON.stringify({ status: 404 }));
      mockService.getMe.mockRejectedValue(noUserError);

      const model = makeUserModel(mockStore, mockService);

      const user = await model.getMe();

      expect(mockStore.setProperty).toHaveBeenCalledWith("isLoading", true);
      expect(mockStore.setProperty).toHaveBeenCalledWith("isLoading", false);
      expect(user).toBeNull();
    });

    it("should throw an error for any other user service error", async () => {
      const error = new Error(JSON.stringify({ status: 500 }));
      mockService.getMe.mockRejectedValue(error);

      const model = makeUserModel(mockStore, mockService);

      await expect(model.getMe()).rejects.toThrow(error);
      expect(mockStore.setProperty).toHaveBeenCalledWith("isLoading", true);
      expect(mockStore.setProperty).toHaveBeenCalledWith("isLoading", false);
    });

    // TODO the getMe function breaks if the thrown error is not a stringified
    // JSON with a status property.
    it.todo("should throw an error for unexpected errors");
  });

  describe("create", () => {
    it("should set the new user to the store and return it", async () => {
      mockService.createMe.mockResolvedValue(mockUser);

      const model = makeUserModel(mockStore, mockService);

      const user = await model.createMe();

      expect(user).toEqual(mockUser);
      expect(mockStore.setProperty).toHaveBeenCalledWith("isLoading", true);
      expect(mockStore.setProperty).toHaveBeenCalledWith("user", mockUser);
      expect(mockStore.setProperty).toHaveBeenCalledWith("isLoading", false);
    });

    it("should throw an error if the user cannot be created", async () => {
      const error = new Error("User cannot be created");
      mockService.createMe.mockRejectedValue(error);

      const model = makeUserModel(mockStore, mockService);

      await expect(model.createMe()).rejects.toThrow(error);
      expect(mockStore.setProperty).toHaveBeenCalledWith("isLoading", true);
      expect(mockStore.setProperty).toHaveBeenCalledWith("isLoading", false);
    });
  });
});
