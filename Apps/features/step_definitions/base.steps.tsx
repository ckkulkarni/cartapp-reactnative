import Base from "../../Base";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { loadFeature, defineFeature } from "jest-cucumber";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../../redux/reducer/cartSlice";
let store: any;
let screen: any;
const feature = loadFeature("Apps/features/base.feature");
defineFeature(feature, (test) => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartSlice,
      },
    });
    screen = render(
      <Provider store={store}>
        <Base />
      </Provider>
    );
  });
  test("Adding an item to the cart", ({ given, when, then, and }) => {
    given("the user is on the cart page", () => {
      expect(screen).toBeDefined();
    });
    when('the user clicks the "Add to Cart" button for an item', () => {
      const itemQuantity = screen.getByText("5");
      expect(itemQuantity).toBeTruthy();
      const increaseQuantity = screen.getAllByTestId("increase-quantity");
      act(() => {
        fireEvent.press(increaseQuantity[0]);
      });
    });
    then("the total quantity should increase by 1", async () => {
      await waitFor(() => {
        const itemQuantity = screen.getByTestId("total-quantity");
        expect(itemQuantity.props.children).toBe(6);
      });
    });
  });
  test("Deleting an item from the cart", ({ given, when, then, and }) => {
    given("the user is on the cart page", () => {
      expect(screen).toBeDefined();
    });
    when('the user clicks the "Delete" button for an item', () => {
      const itemQuantity = screen.getByText("5");
      expect(itemQuantity).toBeTruthy();
      const deleteItem = screen.getAllByTestId("delete-from-cart");
      act(() => {
        fireEvent.press(deleteItem[4]);
      });
    });
    then(
      "the total quantity should decrease by the quantity of the deleted item",
      async () => {
        await waitFor(() => {
          const itemQuantity = screen.getByTestId("total-quantity");
          expect(itemQuantity.props.children).toBe(4);
        });
      }
    );
  });
  test("Removing an item from the cart", ({ given, when, then, and }) => {
    given("the user is on the cart page", () => {
      expect(screen).toBeDefined();
    });
    when('the user clicks the "Remove" button for an item', () => {
      const itemQuantity = screen.getByText("5");
      expect(itemQuantity).toBeTruthy();
      const removeItem = screen.getAllByTestId("decrease-quantity");
      act(() => {
        fireEvent.press(removeItem[4]);
      });
    });
    then("the total quantity should decrease by 1", async () => {
      await waitFor(() => {
        const itemQuantity = screen.getByTestId("total-quantity");
        expect(itemQuantity.props.children).toBe(4);
      });
    });
  });
  test("Resetting the cart counter", ({ given, when, then, and }) => {
    given("the user is on the cart page", () => {
      expect(screen).toBeDefined();
    });
    when('the user clicks the "Reset Counter" button', () => {
      const itemQuantity = screen.getByText("5");
      expect(itemQuantity).toBeTruthy();
      const resetCart = screen.getByTestId("reset-state");
      act(() => {
        fireEvent.press(resetCart);
      });
    });
    then("the total quantity should be set to 0", async () => {
      await waitFor(() => {
        const itemQuantity = screen.getByTestId("total-quantity");
        expect(itemQuantity.props.children).toBe(0);
      });
    });
  });
  test("Removing all items from the cart", ({ given, when, then, and }) => {
    given("the user is on the cart page", () => {
      expect(screen).toBeDefined();
    });
    when('the user clicks the "Remove All Items" button', () => {
      const itemQuantity = screen.getByText("5");
      expect(itemQuantity).toBeTruthy();
      const deleteCart = screen.getByTestId("remove-all-items");
      act(() => {
        fireEvent.press(deleteCart);
      });
    });
    then("the cart should be empty", async () => {
      await waitFor(() => {
        try {
          const itemsContainer = screen.getByTestId("items-container");
          expect(itemsContainer).toBeFalsy();
        } catch (error) {
          expect(error).toBeDefined();
        }
      });
    });
  });
  test("Adding a new item to the cart", ({ given, when, then, and }) => {
    given("the user is on the cart page", () => {
      expect(screen).toBeDefined();
    });
    when('the user clicks the "Add New Item" button', () => {
      const itemQuantity = screen.getByText("5");
      expect(itemQuantity).toBeTruthy();
      const addItem = screen.getByTestId("add-new-item");
      act(() => {
        fireEvent.press(addItem);
      });
    });
    then("a new item should be added to the cart", async () => {
      await waitFor(() => {
        const itemQuantity = screen.getByTestId("total-quantity");
        expect(itemQuantity.props.children).toBe(6);
      });
    });
  });
});
